"use client";

import { SearchProvider } from "@/context/SearchContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <SearchProvider>{children}</SearchProvider>;
}
