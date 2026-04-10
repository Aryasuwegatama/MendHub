import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { providers, providerCategories, categories, services } from "@/db/schema";
import { eq, and, ilike, exists } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categorySlug = searchParams.get("category");
    const suburb = searchParams.get("suburb");

    const conditions = [eq(providers.status, "active")];

    if (suburb) {
      conditions.push(ilike(providers.suburb, `%${suburb}%`));
    }

    if (categorySlug) {
      // Use exists to filter providers that have the specified category
      conditions.push(
        exists(
          db
            .select()
            .from(providerCategories)
            .innerJoin(categories, eq(providerCategories.categoryId, categories.id))
            .where(
              and(
                eq(providerCategories.providerId, providers.id),
                eq(categories.slug, categorySlug)
              )
            )
        )
      );
    }

    const data = await db
      .select()
      .from(providers)
      .where(and(...conditions))
      .orderBy(providers.businessName);

    // Augment each provider with categories and price
    const augmented = await Promise.all(
      data.map(async (p) => {
        const cats = await db
          .select({ name: categories.name, slug: categories.slug })
          .from(providerCategories)
          .innerJoin(categories, eq(providerCategories.categoryId, categories.id))
          .where(eq(providerCategories.providerId, p.id));

        const [cheapest] = await db
          .select({ startingPrice: services.startingPrice, priceMethod: services.priceMethod })
          .from(services)
          .where(and(eq(services.providerId, p.id), eq(services.isActive, true)))
          .orderBy(services.startingPrice)
          .limit(1);

        const price = cheapest?.startingPrice
          ? `From $${Number(cheapest.startingPrice).toFixed(0)}`
          : "Quote required";

        return { ...p, categories: cats, price };
      })
    );

    return NextResponse.json({
      success: true,
      data: augmented,
    });
  } catch (error) {
    console.error("Error fetching providers:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch providers" },
      { status: 500 }
    );
  }
}
