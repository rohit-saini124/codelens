export async function getLeetCodeProfile(username: string) {
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
      cache: "no-store",
    });
  
    const result = await response.json();
  
    const user = result?.data?.matchedUser;
  
    if (!user) {
      return null;
    }
  
    const stats = user.submitStatsGlobal.acSubmissionNum;
  
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
    };
  }