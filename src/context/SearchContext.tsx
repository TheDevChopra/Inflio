import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useCreatorData, EnhancedCreator } from "@/hooks/useCreatorData";

export type Filters = {
  platform: string[];
  followers: string;
  engagement: string;
  growth: string;
};

export type SortOption = "score" | "growth" | "engagement" | "followers";

interface SearchContextType {
  creators: EnhancedCreator[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  savedCreators: string[];
  toggleSave: (id: string) => void;
}

const defaultFilters: Filters = {
  platform: [],
  followers: "all",
  engagement: "all",
  growth: "all",
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const creators = useCreatorData();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [sortBy, setSortBy] = useState<SortOption>("score");
  const [savedCreators, setSavedCreators] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const stored = localStorage.getItem("inflio_saved");
    if (stored) {
      try {
        setSavedCreators(JSON.parse(stored));
      } catch (e) {}
    }
  }, []);

  const toggleSave = (id: string) => {
    setSavedCreators(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem("inflio_saved", JSON.stringify(next));
      return next;
    });
  };

  return (
    <SearchContext.Provider
      value={{
        creators,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
        sortBy,
        setSortBy,
        savedCreators: isClient ? savedCreators : [],
        toggleSave,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
