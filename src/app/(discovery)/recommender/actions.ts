"use server";

import { db } from "@/db";
import { providers, providerCategories, categories, services } from "@/db/schema";
import { eq, and, ilike, exists } from "drizzle-orm";

export async function getRecommendedProviders(categoryName: string, suburbParam: string) {
  const conditions = [eq(providers.status, "active")];

  if (suburbParam.trim()) {
    conditions.push(ilike(providers.suburb, `%${suburbParam.trim()}%`));
  }

  // Filter by category name
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

      const [cheapest] = await db
        .select({ startingPrice: services.startingPrice })
        .from(services)
        .where(and(eq(services.providerId, p.id), eq(services.isActive, true)))
        .orderBy(services.startingPrice)
        .limit(1);

      const price = cheapest?.startingPrice
        ? `From $${Number(cheapest.startingPrice).toFixed(0)}`
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
