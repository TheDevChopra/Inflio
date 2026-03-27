import { NextResponse } from "next/server";
import { creators } from "@/data/creators";
import { calculateGrowthScore } from "@/lib/scoring";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase() || "";
  const platforms = searchParams.getAll("platform");
  const followers = searchParams.get("followers") || "all";
  const engagement = searchParams.get("engagement") || "all";
  const growth = searchParams.get("growth") || "all";
  const sortBy = searchParams.get("sortBy") || "score";

  let result = creators.map((c) => ({
    ...c,
    score: calculateGrowthScore({
      weeklyGrowth: c.weeklyGrowth,
      engagementRate: c.engagementRate,
      recentViralPosts: c.recentViralPosts,
      followers: c.followers,
    }),
  }));

  result = result.filter((c) => {
    // 1. Search Query
    if (q) {
      const matches =
        c.name.toLowerCase().includes(q) ||
        c.username.toLowerCase().includes(q) ||
        c.niche.toLowerCase().includes(q) ||
        c.platform.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q);
      if (!matches) return false;
    }

    // 2. Filters
    if (platforms.length > 0 && !platforms.includes(c.platform)) return false;

    if (followers !== "all") {
      if (followers === "0-10K" && c.followers > 10000) return false;
      if (followers === "10K-50K" && (c.followers <= 10000 || c.followers > 50000)) return false;
      if (followers === "50K-150K" && c.followers <= 50000) return false;
    }

    if (engagement !== "all") {
      if (engagement === "<5%" && c.engagementRate >= 5) return false;
      if (engagement === "5-10%" && (c.engagementRate < 5 || c.engagementRate >= 10)) return false;
      if (engagement === "10%+" && c.engagementRate < 10) return false;
    }

    if (growth !== "all") {
      if (growth === "<5%" && c.weeklyGrowth >= 5) return false;
      if (growth === "5-15%" && (c.weeklyGrowth < 5 || c.weeklyGrowth >= 15)) return false;
      if (growth === "15%+" && c.weeklyGrowth < 15) return false;
    }

    return true;
  });

  // 3. Sort
  result.sort((a, b) => {
    if (sortBy === "score") return ((b as any).score || 0) - ((a as any).score || 0);
    if (sortBy === "growth") return b.weeklyGrowth - a.weeklyGrowth;
    if (sortBy === "engagement") return b.engagementRate - a.engagementRate;
    if (sortBy === "followers") return b.followers - a.followers;
    return 0;
  });

  return NextResponse.json({ data: result, total: result.length, success: true });
}
