export function analyzeContestHistory(history: any[]) {
    if (!history || history.length === 0) {
        return {
          status: "none",
        };
      }
  
    const ratings = history
      .filter((contest) => contest.attended)
      .map((contest) => contest.rating);

    if (ratings.length === 1) {
  return {
    status: "insufficient",
    currentRating: Math.round(ratings[0]),
    contests: 1,
  };
}
  
    if (ratings.length === 0) {
      return null;
    }
  
    const firstRating = ratings[0];
    const currentRating = ratings[ratings.length - 1];
    const peakRating = Math.max(...ratings);
  
    const growth = Math.round(currentRating - firstRating);
  
    let trend = "Stable";
  
    if (ratings.length >= 5) {
      const recent = ratings.slice(-5);
  
      const change = recent[recent.length - 1] - recent[0];
  
      if (change > 50) {
        trend = "Upward";
      } else if (change < -50) {
        trend = "Downward";
      }
    }
  
    return {
      status : "complete",
      firstRating: Math.round(firstRating),
      currentRating: Math.round(currentRating),
      peakRating: Math.round(peakRating),
      growth,
      contests: ratings.length,
      trend,
    };
  }