export function generateObservations(profile: Profile): string[] {
    const observations: string[] = [];
  
    const mediumRatio =
      profile.solved > 0 ? profile.medium / profile.solved : 0;
  
    const allTopics = [
      ...profile.topics.fundamental,
      ...profile.topics.intermediate,
      ...profile.topics.advanced,
    ];
  
    const totalTopicSolves = allTopics.reduce(
      (sum, topic) => sum + topic.problemsSolved,
      0
    );
  
    const sortedTopics = [...allTopics].sort(
      (a, b) => b.problemsSolved - a.problemsSolved
    );
  
    const topTopic = sortedTopics[0];
  
    const topTopicShare =
      totalTopicSolves > 0
        ? (topTopic.problemsSolved / totalTopicSolves) * 100
        : 0;
  
    if (mediumRatio > 0.5) {
      observations.push(
        "More than half of your solved problems are Medium difficulty, suggesting early exposure to challenging problems."
      );
    }
  
    if (profile.hard === 0) {
      observations.push(
        "There is currently insufficient Hard-problem data to assess advanced difficulty performance."
      );
    }
  
    if (topTopicShare > 35) {
      observations.push(
        `Your profile is heavily concentrated in ${topTopic.tagName}, which represents a significant share of your topic exposure.`
      );
    }
  
    if (profile.topics.advanced.length > 0) {
      observations.push(
        "Advanced-topic exposure is present, indicating exploration beyond beginner-level DSA concepts."
      );
    }
  
    const lowExposureCount = allTopics.filter(
      (topic) => topic.problemsSolved <= 2
    ).length;
  
    if (lowExposureCount >= 4) {
      observations.push(
        "Several topics have very limited exposure, making it too early to reliably assess proficiency in those areas."
      );
    }
  
    return observations;
  }