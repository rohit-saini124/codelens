import { NextResponse } from "next/server";

const query = `
query getUserProfile($username: String!) {
  matchedUser(username: $username) {
    username
    profile {
      ranking
    }
    submitStatsGlobal {
      acSubmissionNum {
        difficulty
        count
      }
    }
  }
}
`;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;

    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          username,
        },
      }),
    });

    const result = await response.json();

    const user = result?.data?.matchedUser;

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const stats = user.submitStatsGlobal.acSubmissionNum;

    const easy =
      stats.find((s: any) => s.difficulty === "Easy")?.count ?? 0;
    const medium =
      stats.find((s: any) => s.difficulty === "Medium")?.count ?? 0;
    const hard =
      stats.find((s: any) => s.difficulty === "Hard")?.count ?? 0;
    const total =
      stats.find((s: any) => s.difficulty === "All")?.count ?? 0;

    return NextResponse.json({
      success: true,
      profile: {
        username: user.username,
        ranking: user.profile.ranking,
        solved: total,
        easy,
        medium,
        hard,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch LeetCode data",
      },
      { status: 500 }
    );
  }
}