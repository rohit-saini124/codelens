import { NextResponse } from "next/server";
import { getLeetCodeProfile } from "@/lib/leetcode";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;

    const profile = await getLeetCodeProfile(username);

    if (!profile) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch LeetCode data",
      },
      { status: 500 }
    );
  }
}