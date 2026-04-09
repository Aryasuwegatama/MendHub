import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { providers, providerCategories, categories } from "@/db/schema";
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

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error fetching providers:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch providers" },
      { status: 500 }
    );
  }
}
