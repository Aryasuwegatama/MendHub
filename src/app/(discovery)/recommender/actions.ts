"use server";

import { db } from "@/db";
import { providers, providerCategories, categories, services } from "@/db/schema";
import { eq, and, ilike, exists, inArray } from "drizzle-orm";

/**
 * Fetches all active providers matching the given category and suburb.
 * When serviceFilter is provided (exact service name from DB), further
 * narrows results to only providers who offer that specific service.
 */
export async function getRecommendedProviders(
  categoryName: string,
  suburbParam: string,
  serviceFilter: string[] | null = null  // array of service names to match (any), or null for no filter
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

  // If specific services were selected, narrow to providers offering ANY of those service names.
  // Using an array + inArray allows multiple semantically equivalent service names to match
  // (e.g. "Screen Replacement" and "On-Site Screen Repair" are both valid for a cracked screen).
  if (serviceFilter && serviceFilter.length > 0) {
    conditions.push(
      exists(
        db
          .select()
          .from(services)
          .where(
            and(
              eq(services.providerId, providers.id),
              eq(services.isActive, true),
              inArray(services.name, serviceFilter) // matches any of the provided service names
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

      // When specific services are filtered, prefer the matched service's price.
      // Use the first service from serviceFilter that this provider actually has.
      let specificServiceRows: { startingPrice: string | null }[] = [];
      if (serviceFilter && serviceFilter.length > 0) {
        specificServiceRows = await db
          .select({ startingPrice: services.startingPrice })
          .from(services)
          .where(
            and(
              eq(services.providerId, p.id),
              eq(services.isActive, true),
              inArray(services.name, serviceFilter)
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
