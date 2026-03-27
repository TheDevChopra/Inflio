"use client";
import InfluencerCard from "@/components/ui/InfluencerCard";
import { useSearch } from "@/context/SearchContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Bookmark } from "lucide-react";

export default function SavedPage() {
  const { creators: allCreators, savedCreators } = useSearch();

  // If savedCreators contains IDs that we can find in the allCreators globally live array:
  const savedList = allCreators.filter(c => savedCreators.includes(c.id));

  // Sort them so they don't randomly jump purely, but wait they might due to the live simulation! This is cool.
  // Actually let's just sort them by score descending as well.
  const sortedSaved = [...savedList].sort((a, b) => b.score - a.score);

  return (
    <div className="p-8 max-w-7xl mx-auto flex-1 h-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#0F172A] tracking-tight">Saved Creators</h2>
        <p className="text-[#64748B] mt-2 text-lg">
          Your curated list of high-potential influencers.
        </p>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {sortedSaved.map((influence) => (
            <InfluencerCard key={influence.id} {...influence} />
          ))}
        </AnimatePresence>
        
        {sortedSaved.length === 0 && (
          <div className="col-span-full py-24 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 text-indigo-300 mb-6 border border-indigo-100">
              <Bookmark className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">No saved creators yet</h3>
            <p className="mt-2 text-base text-gray-500 max-w-sm mx-auto">Start browsing the search page and bookmark high-growth influencers to build your list.</p>
            <Link 
              href="/"
              className="mt-6 inline-block bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Discover Creators
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
