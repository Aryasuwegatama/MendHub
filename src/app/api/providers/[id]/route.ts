import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { providers, services, providerCategories, categories } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // Fetch provider
    const providerResults = await db
      .select()
      .from(providers)
      .where(eq(providers.id, id))
      .limit(1);

    if (providerResults.length === 0) {
      return NextResponse.json(
        { success: false, error: "Provider not found" },
        { status: 404 }
      );
    }

    const provider = providerResults[0];

    // Fetch associated services
    const providerServices = await db
      .select()
      .from(services)
      .where(and(eq(services.providerId, id), eq(services.isActive, true)));

    // Fetch associated categories
    const providerCategoryList = await db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
      })
      .from(providerCategories)
      .innerJoin(categories, eq(providerCategories.categoryId, categories.id))
      .where(eq(providerCategories.providerId, id));

    return NextResponse.json({
      success: true,
      data: {
        ...provider,
        services: providerServices,
        categories: providerCategoryList,
      },
    });
  } catch (error) {
    console.error(`Error fetching provider with id ${id}:`, error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch provider details" },
      { status: 500 }
    );
  }
}
