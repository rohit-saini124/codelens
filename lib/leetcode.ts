export async function getLeetCodeProfile(username: string) {
  const query = `
    query getUserProfile($username: String!) {
  matchedUser(username: $username) {
    username

    profile {
      ranking
    }

    tagProblemCounts {
      advanced {
        tagName
        tagSlug
        problemsSolved
      }

      intermediate {
        tagName
        tagSlug
        problemsSolved
      }

      fundamental {
        tagName
        tagSlug
        problemsSolved
      }
    }

    submitStatsGlobal {
      acSubmissionNum {
        difficulty
        count
      }
    }
  }

  userContestRanking(username: $username) {
    attendedContestsCount
    rating
    globalRanking
    topPercentage
  }
  userContestRankingHistory(username: $username) {
    attended
    rating

    contest {
      title
    }
}
  
}  
  `;

  const response = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Referer": "https://leetcode.com",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137.0.0.0 Safari/537.36",
    },
    body: JSON.stringify({
      query,
      variables: {
        username,
      },
    }),
    cache: "no-store",
  });

  const result = await response.json();
  console.log(JSON.stringify(result, null, 2));
  const user = result?.data?.matchedUser;

  if (!user) {
    return null;
  }

  const stats = user.submitStatsGlobal.acSubmissionNum;
  const contest = result?.data?.userContestRanking;

  const contestHistory = result?.data?.userContestRankingHistory ?? [];

  console.log(
   "History Length:",
  contestHistory.length
  );

  console.log(
   "Attended Contests:",
    contest?.attendedContestsCount
  );
  result?.data?.userContestRankingHistory ?? [];
  return {
    username: user.username,
    ranking: user.profile.ranking,
    solved:
      stats.find((s: any) => s.difficulty === "All")?.count ?? 0,
    easy:
      stats.find((s: any) => s.difficulty === "Easy")?.count ?? 0,
    medium:
      stats.find((s: any) => s.difficulty === "Medium")?.count ?? 0,
    hard:
      stats.find((s: any) => s.difficulty === "Hard")?.count ?? 0,
  
    topics: user.tagProblemCounts,
    contest: contest
  ? {
      rating: contest.rating,
      attended: contest.attendedContestsCount,
      globalRanking: contest.globalRanking,
      topPercentage: contest.topPercentage,
    }
  : null,
  
  contestHistory,
  };
}