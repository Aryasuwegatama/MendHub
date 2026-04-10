import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { payments } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * GET /api/payments/[ref]
 * Retrieves a payment record by transaction reference string (e.g. MH-1234-ABCD).
 * Used by the confirmation page to display a real receipt.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ ref: string }> }
) {
  const { ref } = await params;

  try {
    const [payment] = await db
      .select()
      .from(payments)
      .where(eq(payments.transactionReference, ref))
      .limit(1);

    if (!payment) {
      return NextResponse.json(
        { success: false, error: "Payment record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: payment });
  } catch (error) {
    console.error("Error fetching payment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch payment" },
      { status: 500 }
    );
  }
}
