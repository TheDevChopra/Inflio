import { motion } from "framer-motion";
import { EnhancedCreator } from "@/hooks/useCreatorData";
import { getScoreLabel } from "@/lib/scoring";
import { ArrowUpRight, ArrowDownRight, Minus, Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearch } from "@/context/SearchContext";

export default function InfluencerCard({
  id,
  name,
  username,
  platform,
  niche,
  followers,
  engagementRate,
  weeklyGrowth,
  profileImage,
  score,
  trend,
  isTop,
  isRealCreator,
}: EnhancedCreator) {
  const router = useRouter();
  const { savedCreators, toggleSave } = useSearch();
  const isSaved = savedCreators.includes(id);

  const handleCardClick = () => {
    router.push(`/creator/${username}`);
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSave(id);
  };

  // Format numbers
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num.toString();
  };

  // Platform styling
  const getPlatformStyles = (p: string) => {
    switch (p) {
      case "Instagram":
        return "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white border-0";
      case "YouTube":
        return "bg-[#FF0000] text-white border-0";
      case "X":
        return "bg-black text-white border-0";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  const getGrowthColor = (growth: number) => {
    if (growth > 15) return "text-emerald-600 font-bold";
    if (growth >= 5) return "text-gray-900 font-medium";
    return "text-gray-400";
  };

  const label = getScoreLabel(score);
  const TrendIcon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : Minus;
  const trendColor = trend === "up" ? "text-emerald-500" : trend === "down" ? "text-red-500" : "text-gray-400";

  const platformUrl = platform === "YouTube" ? `https://youtube.com/@${username}` : platform === "X" ? `https://x.com/${username}` : `https://www.instagram.com/${username}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      onClick={handleCardClick}
      className={`bg-white rounded-xl border p-5 shadow-sm flex flex-col relative cursor-pointer group ${
        isTop ? "border-indigo-400 ring-2 ring-indigo-100 shadow-indigo-100" : "border-[#E2E8F0] hover:border-indigo-300"
      }`}
    >
      {isTop && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md whitespace-nowrap z-10 animate-pulse">
          Trending Now
        </div>
      )}

      <div className={`flex items-start gap-4 ${isTop ? "mt-2" : ""}`}>
        <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
          <img src={profileImage} alt={name} className="w-full h-full object-cover" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <div className="min-w-0 pr-2">
              <h3 className="text-base font-semibold text-[#0F172A] truncate group-hover:text-indigo-600 transition-colors">{name}</h3>
              <p className="text-sm text-[#64748B] truncate">@{username}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold tracking-wide flex-shrink-0 ${getPlatformStyles(platform)}`}>
                {platform}
              </span>
              <button 
                onClick={handleSaveClick}
                className={`p-1 -mr-1 rounded-md transition-colors ${isSaved ? "text-indigo-600 hover:bg-indigo-50" : "text-gray-400 opacity-0 group-hover:opacity-100 hover:text-indigo-600 hover:bg-gray-50"}`}
              >
                <Bookmark className="w-4 h-4" fill={isSaved ? "currentColor" : "none"} strokeWidth={2.5} />
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="inline-block bg-[#F8FAFC] text-[#64748B] px-2 py-0.5 rounded text-[10px] font-medium border border-[#E2E8F0]">
              {niche}
            </span>
            {isRealCreator && (
              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-medium border border-blue-100">
                <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-4 border-t border-[#F1F5F9] pt-4">
        <div className="text-center">
          <p className="text-xs text-[#64748B] font-medium mb-1">Followers</p>
          <motion.p key={followers} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-semibold text-[#0F172A]">
            {formatNumber(followers)}
          </motion.p>
        </div>
        <div className="text-center border-x border-[#F1F5F9]">
          <p className="text-xs text-[#64748B] font-medium mb-1">Eng. Rate</p>
          <motion.p key={engagementRate} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-semibold text-[#0F172A]">
            {engagementRate.toFixed(1)}%
          </motion.p>
        </div>
        <div className="text-center">
          <p className="text-xs text-[#64748B] font-medium mb-1">Growth</p>
          <motion.p key={weeklyGrowth} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-sm tracking-tight ${getGrowthColor(weeklyGrowth)}`}>
            +{weeklyGrowth.toFixed(1)}%
          </motion.p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-[#F1F5F9] pt-4">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Growth Score</span>
          <span className="text-xs font-semibold text-[#0F172A] border border-gray-200 px-2 py-0.5 rounded bg-gray-50">{label}</span>
        </div>
        <div className="flex items-end gap-1">
          <TrendIcon className={`w-4 h-4 mb-1.5 ${trendColor}`} />
          <motion.span 
            key={score}
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl font-bold text-indigo-600 tracking-tighter leading-none"
          >
            {score}
          </motion.span>
        </div>
      </div>
      
      <div className="mt-4">
        <a 
          href={platformUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="w-full flex items-center justify-center gap-2 py-2 bg-gray-50 hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 rounded-lg text-sm font-semibold transition-colors border border-gray-200 hover:border-indigo-200"
          title={`Open on ${platform}`}
        >
          View Profile <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
        </a>
      </div>
    </motion.div>
  );
}
