import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { businessSubmissions } from "@/db/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { businessName, contactName, email, phone, suburb, description } = body;

    // Basic validation
    if (!businessName || !contactName || !email || !phone || !suburb || !description) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    const [newSubmission] = await db
      .insert(businessSubmissions)
      .values({
        businessName,
        contactName,
        email,
        phone,
        suburb,
        description,
        status: "pending",
      })
      .returning({ id: businessSubmissions.id });

    return NextResponse.json({
      success: true,
      id: newSubmission.id,
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    console.error("Error creating business submission:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit listing application" },
      { status: 500 }
    );
  }
}
