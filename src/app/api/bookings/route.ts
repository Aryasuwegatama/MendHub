import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { bookings, providers } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      providerId,
      customerName,
      customerEmail,
      customerPhone,
      serviceAddress,
      bookingDate,
      issueDescription,
      serviceId,
    } = body;

    // Basic validation
    if (
      !providerId ||
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !serviceAddress ||
      !bookingDate ||
      !issueDescription
    ) {
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

    // Parse bookingDate (expected as ISO string)
    const parsedDate = new Date(bookingDate);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        { success: false, error: "Invalid booking date format" },
        { status: 400 }
      );
    }

    const [newBooking] = await db
      .insert(bookings)
      .values({
        providerId,
        serviceId: serviceId || null,
        customerName,
        customerEmail,
        customerPhone,
        serviceAddress,
        bookingDate: parsedDate,
        issueDescription,
        status: "pending",
      })
      .returning({ id: bookings.id });

    return NextResponse.json({
      success: true,
      id: newBooking.id,
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    console.error("Error creating booking:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create booking request" },
      { status: 500 }
    );
  }
}
