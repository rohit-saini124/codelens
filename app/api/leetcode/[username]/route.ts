import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  return NextResponse.json({
    success: true,
    profile: {
      username,
      ranking: 821,
      solved: 250,
      easy: 120,
      medium: 100,
      hard: 30,
    },
  });
}