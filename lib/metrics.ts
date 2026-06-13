type Profile = {
    solved: number;
    easy: number;
    medium: number;
    hard: number;
    topics: {
      advanced: { tagName: string; problemsSolved: number }[];
      intermediate: { tagName: string; problemsSolved: number }[];
      fundamental: { tagName: string; problemsSolved: number }[];
    };
    contest: {
        rating: number;
        attended: number;
        globalRanking: number;
        topPercentage: number;
      } | null;
  };
  
  export function calculateMetrics(profile: Profile) {
    const allTopics = [
      ...profile.topics.fundamental,
      ...profile.topics.intermediate,
      ...profile.topics.advanced,
    ];
  
    const topicCount = allTopics.length;
  
    const advancedTopicCount = profile.topics.advanced.length;
  
    const mediumRatio =
      profile.solved > 0 ? profile.medium / profile.solved : 0;
  
    const hardRatio =
      profile.solved > 0 ? profile.hard / profile.solved : 0;
  
    const topTopicSolves =
      allTopics.length > 0
        ? Math.max(...allTopics.map((t) => t.problemsSolved))
        : 0;
  
    const topicConcentration =
      profile.solved > 0
        ? topTopicSolves / profile.solved
        : 0;
  
    let coverageScore = 0;
  
    coverageScore += Math.min(
      profile.topics.fundamental.length * 4,
      30
    );
  
    coverageScore += Math.min(
      profile.topics.intermediate.length * 4,
      30
    );
  
    coverageScore += Math.min(
      profile.topics.advanced.length * 8,
      40
    );
    const contestRating = profile.contest?.rating ?? null;
    const contestsAttended = profile.contest?.attended ?? 0;
  
    let coverageLevel = "Early Stage";

if (topicCount >= 10) {
  coverageLevel = "Developing";
}

if (topicCount >= 20) {
  coverageLevel = "Broad";
}

if (topicCount >= 35) {
  coverageLevel = "Extensive";
}

let difficultyProfile = "Easy-Focused";

if (mediumRatio >= 0.4) {
  difficultyProfile = "Medium-Focused";
}

if (hardRatio >= 0.15) {
  difficultyProfile = "Hard-Inclusive";
}

let confidence = "Low";

if (profile.solved >= 100) {
  confidence = "Medium";
}

if (profile.solved >= 300) {
  confidence = "High";
}

return {
  topicCount,
  advancedTopicCount,
  mediumRatio,
  hardRatio,
  topicConcentration,
  coverageLevel,
  difficultyProfile,
  confidence,
  contestRating,
  contestsAttended,
};
  }