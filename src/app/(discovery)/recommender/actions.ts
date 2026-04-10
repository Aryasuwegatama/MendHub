"use server";

import { db } from "@/db";
import { providers, providerCategories, categories, services } from "@/db/schema";
import { eq, and, ilike, exists } from "drizzle-orm";

/**
 * Fetches all active providers matching the given category and suburb.
 * When serviceFilter is provided (exact service name from DB), further
 * narrows results to only providers who offer that specific service.
 */
export async function getRecommendedProviders(
  categoryName: string,
  suburbParam: string,
  serviceFilter: string | null = null
) {
  const conditions = [eq(providers.status, "active")];

  if (suburbParam.trim()) {
    conditions.push(ilike(providers.suburb, `%${suburbParam.trim()}%`));
  }

  // Filter by category name (exact match against categories.name)
  conditions.push(
    exists(
      db
        .select()
        .from(providerCategories)
        .innerJoin(categories, eq(providerCategories.categoryId, categories.id))
        .where(
          and(
            eq(providerCategories.providerId, providers.id),
            eq(categories.name, categoryName)
          )
        )
    )
  );

  // If a specific service was selected, further narrow to providers offering that service
  if (serviceFilter) {
    conditions.push(
      exists(
        db
          .select()
          .from(services)
          .where(
            and(
              eq(services.providerId, providers.id),
              eq(services.isActive, true),
              eq(services.name, serviceFilter) // exact match — value comes from our controlled mapping
            )
          )
      )
    );
  }

  const rawProviders = await db
    .select()
    .from(providers)
    .where(and(...conditions))
    .orderBy(providers.isFeatured, providers.businessName);

  const augmentedProviders = await Promise.all(
    rawProviders.map(async (p) => {
      const cats = await db
        .select({ name: categories.name, slug: categories.slug })
        .from(providerCategories)
        .innerJoin(categories, eq(providerCategories.categoryId, categories.id))
        .where(eq(providerCategories.providerId, p.id));

      // When a specific service is filtered, prefer that service's price for accuracy
      let specificServiceRows: { startingPrice: string | null }[] = [];
      if (serviceFilter) {
        specificServiceRows = await db
          .select({ startingPrice: services.startingPrice })
          .from(services)
          .where(
            and(
              eq(services.providerId, p.id),
              eq(services.isActive, true),
              eq(services.name, serviceFilter)
            )
          )
          .limit(1);
      }

      // Fall back to cheapest active service if specific service has no price or no filter
      const [priceRow] = specificServiceRows.length
        ? specificServiceRows
        : await db
            .select({ startingPrice: services.startingPrice })
            .from(services)
            .where(and(eq(services.providerId, p.id), eq(services.isActive, true)))
            .orderBy(services.startingPrice)
            .limit(1);

      const price = priceRow?.startingPrice
        ? `From $${Number(priceRow.startingPrice).toFixed(0)}`
        : "Quote required";

      return {
        ...p,
        categories: cats,
        price,
      };
    })
  );

  return augmentedProviders;
}
