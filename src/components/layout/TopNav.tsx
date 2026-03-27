"use client";

import { useEffect, useState } from "react";
import { useSearch } from "@/context/SearchContext";

export default function TopNav() {
  const { setSearchQuery } = useSearch();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 300);
    return () => clearTimeout(handler);
  }, [inputValue, setSearchQuery]);

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] sticky top-0 z-10 flex items-center justify-between px-8">
      {/* Search Bar */}
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-[#E2E8F0] rounded-xl leading-5 bg-[#F8FAFC] placeholder-[#94a3b8] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#4F46E5] focus:border-[#4F46E5] sm:text-sm transition-colors"
            placeholder="Search creators growing fast in India"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="ml-4 flex items-center gap-4">
        <button className="text-[#64748B] hover:text-[#0F172A] transition-colors relative">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#818cf8]" />
      </div>
    </header>
  );
}
