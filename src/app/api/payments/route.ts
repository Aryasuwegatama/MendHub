import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { payments } from "@/db/schema";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, quoteRequestId, amount, paymentMethod } = body;

    // Validation: amount and method required, and at least one relation
    if (!amount || !paymentMethod) {
      return NextResponse.json(
        { success: false, error: "Missing amount or payment method" },
        { status: 400 }
      );
    }

    if (!bookingId && !quoteRequestId) {
      return NextResponse.json(
        { success: false, error: "Payment must be linked to a booking or quote request" },
        { status: 400 }
      );
    }

    // Generate a unique transaction reference
    const transactionReference = `MH-${Date.now()}-${randomUUID().substring(0, 8).toUpperCase()}`;

    const [newPayment] = await db
      .insert(payments)
      .values({
        bookingId: bookingId || null,
        quoteRequestId: quoteRequestId || null,
        amount: amount.toString(), // Drizzle decimal is often string-based to preserve precision
        paymentMethod,
        status: "completed", // Simulated as completed
        transactionReference,
      })
      .returning({ id: payments.id });

    return NextResponse.json({
      success: true,
      id: newPayment.id,
      transactionReference,
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    console.error("Error creating payment record:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process payment record" },
      { status: 500 }
    );
  }
}
