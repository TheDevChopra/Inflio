export interface ScoredMetrics {
  weeklyGrowth: number;
  engagementRate: number;
  recentViralPosts: number;
  followers: number;
}

export function calculateGrowthScore({
  weeklyGrowth,
  engagementRate,
  recentViralPosts,
  followers,
}: ScoredMetrics): number {
  // Normalize weekly growth (assume max realistic is 30% for 100 points)
  const normGrowth = Math.min((Math.max(weeklyGrowth, 0) / 30) * 100, 100);
  
  // Normalize engagement (assume max realistic is 20% for 100 points)
  const normEng = Math.min((Math.max(engagementRate, 0) / 20) * 100, 100);
  
  // Normalize viral posts (assume 10 is max for 100 points)
  const normViral = Math.min((Math.max(recentViralPosts, 0) / 10) * 100, 100);
  
  // Weights calculation
  let score = (normGrowth * 0.40) + (normEng * 0.30) + (normViral * 0.20);
  
  // Small creator bonus (< 50K followers) -> 10%
  if (followers < 50000) {
    score += 10;
  }
  
  // Clamp between 0-100
  return Math.min(Math.max(Math.round(score), 0), 100);
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return "🔥 High Potential";
  if (score >= 60) return "🚀 Rising";
  return "⚡ Early Stage";
}
