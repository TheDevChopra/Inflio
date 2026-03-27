"use client";

import { useSearch } from "@/context/SearchContext";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ArrowDownRight, Minus, Bookmark, Share } from "lucide-react";
import { getScoreLabel } from "@/lib/scoring";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useMemo } from "react";

// Mock chart data generation based on actual metrics
const generateMockChartData = (currentFollowers: number, weeklyGrowth: number) => {
  const data = [];
  let current = currentFollowers / (1 + (weeklyGrowth / 100) * 4); // Starting point roughly 4 weeks ago
  for (let i = 30; i >= 0; i--) {
    let growthFactor = 1 + ((weeklyGrowth / 100) / 7) * (Math.random() * 0.5 + 0.75); // Daily random growth factor
    current = current * growthFactor;
    data.push({
      day: `Day ${31 - i}`,
      followers: Math.round(current)
    });
  }
  return data;
};

export default function CreatorPage() {
  const params = useParams();
  const router = useRouter();
  const { creators, savedCreators, toggleSave } = useSearch();
  const username = typeof params.username === "string" ? params.username : "";
  
  const creator = creators.find(c => c.username === username);

  const chartData = useMemo(() => {
    if (!creator) return [];
    return generateMockChartData(creator.followers, creator.weeklyGrowth);
  }, [creator]);

  if (!creator) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50 h-[calc(100vh-64px)]">
        <h2 className="text-2xl font-bold text-gray-900">Creator not found</h2>
        <button onClick={() => router.back()} className="mt-4 text-indigo-600 hover:text-indigo-800">Go back to search</button>
      </div>
    );
  }

  const isSaved = savedCreators.includes(creator.id);
  const label = getScoreLabel(creator.score);
  const TrendIcon = creator.trend === "up" ? ArrowUpRight : creator.trend === "down" ? ArrowDownRight : Minus;
  const trendColor = creator.trend === "up" ? "text-emerald-500" : creator.trend === "down" ? "text-red-500" : "text-gray-400";
  
  // Format numbers to K or M
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    return num.toString();
  };

  const getPlatformStyles = (p: string) => {
    switch (p) {
      case "Instagram": return "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white border-0";
      case "YouTube": return "bg-[#FF0000] text-white border-0";
      case "X": return "bg-black text-white border-0";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getInsightText = () => {
    if (creator.weeklyGrowth > 15) {
      return `This creator is growing rapidly due to an exceptionally high engagement rate (${creator.engagementRate.toFixed(1)}%) and producing consistent viral content in the ${creator.niche} niche. They are a breakout star.`;
    } else if (creator.weeklyGrowth > 5) {
      return `This creator shows steady, healthy growth driven by a highly interactive and loyal core audience in the ${creator.niche} space. Excellent bet for long-term campaigns.`;
    }
    return `This creator is currently maintaining a stable baseline presence within the ${creator.niche} community. Ideal for highly targeted, niche-specific brand integrations.`;
  };

  // Mock Content
  const mockContent = Array.from({ length: 4 }).map((_, i) => ({
    id: i,
    thumbnail: `https://picsum.photos/seed/${creator.id}-${i}/400/500`,
    likes: formatNumber(Math.floor(creator.followers * creator.engagementRate / 100 * (Math.random() * 0.5 + 0.5))),
    comments: formatNumber(Math.floor(creator.followers * 0.005 * (Math.random() * 0.5 + 0.5)))
  }));

  return (
    <div className="flex-1 bg-[#F8FAFC] min-h-full pb-16">
      {/* Header Bar */}
      <div className="bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] sticky top-16 z-20 px-4 md:px-8 py-4 flex items-center justify-between">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-sm font-medium text-[#64748B] hover:text-[#0F172A] transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block">
            <Share className="w-5 h-5" />
          </button>
          <button 
            onClick={() => toggleSave(creator.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors border ${isSaved ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm"}`}
          >
            <Bookmark className="w-4 h-4" fill={isSaved ? "currentColor" : "none"} strokeWidth={2} />
            {isSaved ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
        
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start relative overflow-hidden">
          {creator.isTop && (
            <div className="absolute top-0 right-0 bg-gradient-to-l from-indigo-500 to-purple-500 text-white px-8 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-bl-2xl shadow-sm">
              Trending Top 3
            </div>
          )}
          
          <img src={creator.profileImage} alt={creator.name} className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-gray-50 shadow-sm flex-shrink-0" />
          
          <div className="flex-1 min-w-0 flex flex-col md:flex-row justify-between w-full gap-6 md:gap-8 text-center md:text-left">
            <div className="space-y-3">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#0F172A] tracking-tight">{creator.name}</h1>
                <p className="text-[#64748B] text-base md:text-lg">@{creator.username}</p>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-3">
                <span className={`inline-flex items-center rounded-md px-3 py-1 text-xs font-bold tracking-wide ${getPlatformStyles(creator.platform)}`}>
                  {creator.platform}
                </span>
                <span className="inline-flex items-center bg-[#F8FAFC] text-[#64748B] px-3 py-1 rounded text-xs font-semibold border border-[#E2E8F0]">
                  {creator.niche}
                </span>
                <span className="inline-flex items-center text-[#64748B] text-xs font-medium bg-gray-50 px-2 py-1 rounded border border-gray-100">
                  📍 {creator.location}
                </span>
              </div>
              <div className="mt-4 flex justify-center md:justify-start">
                <a 
                  href={creator.platform === "YouTube" ? `https://youtube.com/@${creator.username}` : creator.platform === "X" ? `https://x.com/${creator.username}` : `https://www.instagram.com/${creator.username}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors shadow-sm"
                  title={`Open on ${creator.platform}`}
                >
                  Open {creator.platform} Profile <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              </div>
            </div>

            {/* Score Highlight Box */}
            <div className="bg-indigo-50 md:bg-transparent md:border-none border border-indigo-100 rounded-xl p-5 md:p-0 min-w-full md:min-w-[200px] flex flex-col items-center justify-center relative md:shadow-none shadow-inner">
              <p className="text-[10px] md:text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">Growth Score</p>
              <div className="flex items-end gap-2 mb-2">
                <TrendIcon className={`w-6 h-6 mb-1.5 ${trendColor}`} strokeWidth={3} />
                <motion.span key={creator.score} initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="text-4xl md:text-5xl font-black text-indigo-600 tracking-tighter leading-none">
                  {creator.score}
                </motion.span>
              </div>
              <span className="text-xs md:text-sm font-semibold text-indigo-800 bg-white px-3 py-1 rounded-full shadow border border-indigo-100">{label}</span>
            </div>
          </div>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Followers", value: formatNumber(creator.followers) },
            { label: "Engagement Rate", value: `${creator.engagementRate.toFixed(1)}%` },
            { label: "Weekly Growth", value: `+${creator.weeklyGrowth.toFixed(1)}%`, highlight: creator.weeklyGrowth > 15 },
            { label: "Viral Posts", value: creator.recentViralPosts }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl border border-[#E2E8F0] p-4 md:p-5 shadow-sm text-center md:text-left">
              <p className="text-[10px] md:text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1 m-auto md:m-0 w-fit md:mb-2">{stat.label}</p>
              <p className={`text-xl md:text-2xl font-bold ${stat.highlight ? "text-emerald-600" : "text-[#0F172A]"}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Middle Section: Chart and Insight */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-[#E2E8F0] p-4 md:p-6 shadow-sm">
            <h3 className="text-base md:text-lg font-bold text-[#0F172A] mb-4 md:mb-6">Growth Trajectory (30 Days)</h3>
            <div className="h-48 md:h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="day" hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: any) => [formatNumber(Number(value)), "Followers"] as any}
                    labelStyle={{ display: 'none' }}
                  />
                  <Line type="monotone" dataKey="followers" stroke="#4F46E5" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: "#4F46E5", stroke: "#fff", strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Insight Box */}
          <div className="bg-gradient-to-br from-[#0F172A] to-indigo-950 rounded-xl p-6 text-white shadow-lg flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 text-white/5 p-4 pointer-events-none">
              <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="bg-white/10 p-1.5 rounded-lg border border-white/10"><ArrowUpRight className="w-4 h-4 text-emerald-400" /></span>
              Growth Insight
            </h3>
            <p className="text-indigo-100 text-sm leading-relaxed font-medium z-10">
              {getInsightText()}
            </p>
          </div>
        </div>

        {/* Recent Content */}
        <div>
          <h3 className="text-lg md:text-xl font-bold text-[#0F172A] mb-4">Recent Top Content</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {mockContent.map(post => (
              <div key={post.id} className="group relative rounded-xl overflow-hidden aspect-[4/5] bg-gray-100 cursor-pointer shadow-sm">
                <img src={post.thumbnail} alt="Content thumbnail" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 md:p-4">
                  <div className="flex items-center gap-3 text-white text-xs md:text-sm font-bold">
                    <span className="flex items-center gap-1">❤️ {post.likes}</span>
                    <span className="flex items-center gap-1">💬 {post.comments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
