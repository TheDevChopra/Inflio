import { useState, useEffect } from "react";
import { creators as initialCreators, Creator } from "@/data/creators";
import { calculateGrowthScore } from "@/lib/scoring";

export type Trend = "up" | "down" | "neutral";

export type EnhancedCreator = Creator & {
  score: number;
  trend: Trend;
  isTop?: boolean;
};

export function useCreatorData() {
  const [data, setData] = useState<EnhancedCreator[]>([]);

  useEffect(() => {
    // 1. Fetch from production API
    fetch('/api/creators')
      .then(res => res.json())
      .then(json => {
        let initial = json.data.map((c: Creator) => ({
          ...c,
          score: calculateGrowthScore({
            weeklyGrowth: c.weeklyGrowth,
            engagementRate: c.engagementRate,
            recentViralPosts: c.recentViralPosts,
            followers: c.followers,
          }),
          trend: "neutral" as Trend,
        }));
        
        initial.sort((a: EnhancedCreator, b: EnhancedCreator) => b.score - a.score);
        setData(initial.map((c: EnhancedCreator, i: number) => ({ ...c, isTop: i < 3 })));
      })
      .catch(err => console.error("Failed to fetch API:", err));
  }, []);

  useEffect(() => {
    if (data.length === 0) return;
    
    // Random updates every 5 seconds
    const interval = setInterval(() => {
      setData((prev) => {
        let updated = prev.map((c) => {
          // 30% chance to update a creator this tick
          if (Math.random() > 0.3) return { ...c, trend: "neutral" as Trend };

          // Fluctuate growth by -1.5% to +1.5%
          const growthDelta = Math.random() * 3 - 1.5;
          const newGrowth = Math.max(0, c.weeklyGrowth + growthDelta);

          // Fluctuate engagement by -0.5% to +0.5%
          const engDelta = Math.random() * 1 - 0.5;
          const newEng = Math.max(0, c.engagementRate + engDelta);

          // 2% chance to add a viral post
          const newViral = c.recentViralPosts + (Math.random() > 0.98 ? 1 : 0);

          const newScore = calculateGrowthScore({
            weeklyGrowth: newGrowth,
            engagementRate: newEng,
            recentViralPosts: newViral,
            followers: c.followers,
          });

          let trend: Trend = "neutral";
          if (newScore > c.score || newGrowth > c.weeklyGrowth) trend = "up";
          else if (newScore < c.score || newGrowth < c.weeklyGrowth) trend = "down";

          return {
            ...c,
            weeklyGrowth: newGrowth,
            engagementRate: newEng,
            recentViralPosts: newViral,
            score: newScore,
            trend,
          };
        });

        // Re-sort globally and update Top 3
        updated.sort((a, b) => b.score - a.score);
        return updated.map((c, i) => ({ ...c, isTop: i < 3 }));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return data;
}
