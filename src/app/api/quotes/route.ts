import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { quoteRequests, providers } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      providerId,
      customerName,
      customerEmail,
      customerPhone,
      issueDescription,
      deviceDetails,
      preferredDate,
    } = body;

    // Basic validation
    if (!providerId || !customerName || !customerEmail || !customerPhone || !issueDescription) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify provider exists
    const providerExists = await db
      .select({ id: providers.id })
      .from(providers)
      .where(eq(providers.id, providerId))
      .limit(1);

    if (providerExists.length === 0) {
      return NextResponse.json(
        { success: false, error: "Provider not found" },
        { status: 400 }
      );
    }

    const [newQuoteRequest] = await db
      .insert(quoteRequests)
      .values({
        providerId,
        customerName,
        customerEmail,
        customerPhone,
        issueDescription,
        deviceDetails: deviceDetails || null,
        preferredDate: preferredDate || null,
        status: "pending",
      })
      .returning({ id: quoteRequests.id });

    return NextResponse.json({
      success: true,
      id: newQuoteRequest.id,
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    console.error("Error creating quote request:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create quote request" },
      { status: 500 }
    );
  }
}
