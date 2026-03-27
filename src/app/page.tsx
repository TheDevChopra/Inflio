"use client";
import InfluencerCard from "@/components/ui/InfluencerCard";
import { useSearch, Filters, SortOption } from "@/context/SearchContext";
import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { creators: allCreators, searchQuery, filters, setFilters, sortBy, setSortBy } = useSearch();

  // Logic pipeline
  const filteredAndSorted = useMemo(() => {
    let result = allCreators.filter((c) => {
      // 1. Search Query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches =
          c.name.toLowerCase().includes(q) ||
          c.username.toLowerCase().includes(q) ||
          c.niche.toLowerCase().includes(q) ||
          c.platform.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // 2. Filters
      if (filters.platform.length > 0 && !filters.platform.includes(c.platform)) return false;

      if (filters.followers !== "all") {
        if (filters.followers === "0-10K" && c.followers > 10000) return false;
        if (filters.followers === "10K-50K" && (c.followers <= 10000 || c.followers > 50000)) return false;
        if (filters.followers === "50K-150K" && c.followers <= 50000) return false;
      }

      if (filters.engagement !== "all") {
        if (filters.engagement === "<5%" && c.engagementRate >= 5) return false;
        if (filters.engagement === "5-10%" && (c.engagementRate < 5 || c.engagementRate >= 10)) return false;
        if (filters.engagement === "10%+" && c.engagementRate < 10) return false;
      }

      if (filters.growth !== "all") {
        if (filters.growth === "<5%" && c.weeklyGrowth >= 5) return false;
        if (filters.growth === "5-15%" && (c.weeklyGrowth < 5 || c.weeklyGrowth >= 15)) return false;
        if (filters.growth === "15%+" && c.weeklyGrowth < 15) return false;
      }

      return true;
    });

    // 3. Sort
    result.sort((a, b) => {
      if (sortBy === "score") return b.score - a.score;
      if (sortBy === "growth") return b.weeklyGrowth - a.weeklyGrowth;
      if (sortBy === "engagement") return b.engagementRate - a.engagementRate;
      if (sortBy === "followers") return b.followers - a.followers;
      return 0;
    });

    return result;
  }, [searchQuery, filters, sortBy, allCreators]);

  const togglePlatform = (p: string) => {
    setFilters({
      ...filters,
      platform: filters.platform.includes(p)
        ? filters.platform.filter((x) => x !== p)
        : [...filters.platform, p],
    });
  };

  const removeFilter = (key: keyof Filters, value?: string) => {
    if (key === "platform" && value) {
      setFilters({ ...filters, platform: filters.platform.filter((p) => p !== value) });
    } else {
      setFilters({ ...filters, [key]: "all" });
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto flex gap-8 relative">
      <div className="flex-1 min-w-0">
        {/* Page Header */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
          <div>
            <h2 className="text-3xl font-bold text-[#0F172A] tracking-tight">Search Results</h2>
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <span className="text-sm font-medium text-[#64748B]">Showing {filteredAndSorted.length} creators</span>
              
              {/* Active Filters */}
              {filters.platform.map(p => (
                <span key={p} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-medium border border-indigo-100">
                  {p}
                  <button onClick={() => removeFilter("platform", p)} className="hover:text-indigo-900">&times;</button>
                </span>
              ))}
              {filters.followers !== "all" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-medium border border-indigo-100">
                  Followers: {filters.followers}
                  <button onClick={() => removeFilter("followers")} className="hover:text-indigo-900">&times;</button>
                </span>
              )}
              {filters.engagement !== "all" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-medium border border-indigo-100">
                  Engagement: {filters.engagement}
                  <button onClick={() => removeFilter("engagement")} className="hover:text-indigo-900">&times;</button>
                </span>
              )}
              {filters.growth !== "all" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-medium border border-indigo-100">
                  Growth: {filters.growth}
                  <button onClick={() => removeFilter("growth")} className="hover:text-indigo-900">&times;</button>
                </span>
              )}
            </div>
          </div>
          
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-sm text-[#64748B] font-medium hidden sm:block">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-sm font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="growth">Growth %</option>
              <option value="engagement">Engagement Rate</option>
              <option value="followers">Followers</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredAndSorted.map((influence) => (
              <InfluencerCard key={influence.id} {...influence} />
            ))}
          </AnimatePresence>
          {filteredAndSorted.length === 0 && (
            <div className="col-span-full py-16 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-400 mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">No creators found</h3>
              <p className="mt-1 text-sm text-gray-500">We couldn't find anything matching your current filters.</p>
              <button 
                onClick={() => setFilters({ platform: [], followers: "all", engagement: "all", growth: "all" })}
                className="mt-4 text-indigo-600 font-medium hover:text-indigo-800"
              >
                Clear all filters
              </button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Filter Panel (Right Sidebar) */}
      <div className="w-64 flex-shrink-0 hidden xl:block">
        <div className="sticky top-24 bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0F172A]">Filters</h3>
            <button 
              onClick={() => setFilters({ platform: [], followers: "all", engagement: "all", growth: "all" })}
              className="text-xs text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Reset
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Platforms */}
            <div>
              <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-3 block">Platform</label>
              <div className="space-y-2.5">
                {["Instagram", "YouTube", "X"].map(p => (
                  <label key={p} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                      checked={filters.platform.includes(p)}
                      onChange={() => togglePlatform(p)}
                    />
                    <span className="text-sm text-[#0F172A] group-hover:text-indigo-600 transition-colors">{p}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Followers */}
            <div>
              <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-3 block">Followers</label>
              <select 
                value={filters.followers}
                onChange={e => setFilters({...filters, followers: e.target.value})}
                className="w-full px-3 py-2 bg-gray-50 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="all">Any Size</option>
                <option value="0-10K">0 - 10K</option>
                <option value="10K-50K">10K - 50K</option>
                <option value="50K-150K">50K - 150K</option>
              </select>
            </div>

            {/* Engagement */}
            <div>
              <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-3 block">Engagement Rate</label>
              <select 
                value={filters.engagement}
                onChange={e => setFilters({...filters, engagement: e.target.value})}
                className="w-full px-3 py-2 bg-gray-50 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="all">Any Rate</option>
                <option value="<5%">&lt; 5%</option>
                <option value="5-10%">5% - 10%</option>
                <option value="10%+">10% +</option>
              </select>
            </div>

            {/* Growth */}
            <div>
              <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-3 block">Weekly Growth</label>
              <select 
                value={filters.growth}
                onChange={e => setFilters({...filters, growth: e.target.value})}
                className="w-full px-3 py-2 bg-gray-50 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="all">Any Growth</option>
                <option value="<5%">&lt; 5%</option>
                <option value="5-15%">5% - 15%</option>
                <option value="15%+">15% +</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
