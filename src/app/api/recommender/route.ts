import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { recommenderLogs } from "@/db/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { itemType, issueType, recommendedCategoryId } = body;

    // Basic validation
    if (!itemType || !issueType) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (itemType, issueType)" },
        { status: 400 }
      );
    }

    const [newLog] = await db
      .insert(recommenderLogs)
      .values({
        itemType,
        issueType,
        recommendedCategoryId: recommendedCategoryId || null,
      })
      .returning({ id: recommenderLogs.id });

    return NextResponse.json({
      success: true,
      id: newLog.id,
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    console.error("Error creating recommender log:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create recommender log" },
      { status: 500 }
    );
  }
}
