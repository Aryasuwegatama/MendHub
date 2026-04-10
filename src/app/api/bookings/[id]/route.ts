import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { bookings, providers } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * GET /api/bookings/[id]
 * Retrieves a single booking with its linked provider name.
 * Used by the payment page to display real booking context.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const [booking] = await db
      .select({
        id: bookings.id,
        customerName: bookings.customerName,
        customerEmail: bookings.customerEmail,
        customerPhone: bookings.customerPhone,
        serviceAddress: bookings.serviceAddress,
        bookingDate: bookings.bookingDate,
        issueDescription: bookings.issueDescription,
        status: bookings.status,
        totalAmount: bookings.totalAmount,
        createdAt: bookings.createdAt,
        providerName: providers.businessName,
        providerId: providers.id,
      })
      .from(bookings)
      .innerJoin(providers, eq(bookings.providerId, providers.id))
      .where(eq(bookings.id, id))
      .limit(1);

    if (!booking) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch booking" },
      { status: 500 }
    );
  }
}
