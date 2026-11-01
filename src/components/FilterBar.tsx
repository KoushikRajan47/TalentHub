"use client";

import React from "react";
import { Search, SlidersHorizontal, X, ArrowUpDown } from "lucide-react";
import { FilterState } from "@/types";

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalFound: number;
}

const CATEGORIES = [
  { id: "all", label: "All Talents" },
  { id: "engineering", label: "Software & Web" },
  { id: "ai", label: "AI & Machine Learning" },
  { id: "design", label: "UI/UX & Design" },
  { id: "devops", label: "DevOps & Cloud" },
  { id: "mobile", label: "Mobile Apps" },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  setFilters,
  totalFound,
}) => {
  const handleCategoryChange = (cat: string) => {
    setFilters((prev) => ({ ...prev, category: cat }));
  };

  const handleReset = () => {
    setFilters({
      searchQuery: "",
      category: "all",
      selectedSkills: [],
      maxRate: 5000,
      availability: "all",
      sortBy: "rating",
    });
  };

  const hasActiveFilters =
    filters.searchQuery ||
    filters.category !== "all" ||
    filters.selectedSkills.length > 0 ||
    filters.maxRate < 5000 ||
    filters.availability !== "all";

  return (
    <div id="directory" className="space-y-4 pt-6 pb-2">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = filters.category === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold"
                  : "bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Search & Refinement Controls */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
            }
            placeholder="Search by skill (e.g. Next.js, PyTorch, Figma), name, or keyword..."
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          />
          {filters.searchQuery && (
            <button
              onClick={() => setFilters((prev) => ({ ...prev, searchQuery: "" }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Hourly Rate Slider & Sort */}
        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
          {/* Max Rate slider */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 text-xs">Max Rate:</span>
            <input
              type="range"
              min="1500"
              max="6000"
              step="250"
              value={filters.maxRate}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, maxRate: Number(e.target.value) }))
              }
              className="w-20 accent-blue-500 cursor-pointer"
            />
            <span className="font-semibold text-blue-400 text-xs sm:text-sm min-w-[70px] text-right">
              ₹{filters.maxRate.toLocaleString("en-IN")}/h
            </span>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: e.target.value as FilterState["sortBy"],
                }))
              }
              className="bg-transparent text-slate-300 text-xs focus:outline-none cursor-pointer"
            >
              <option value="rating" className="bg-slate-900">Highest Rated</option>
              <option value="experience" className="bg-slate-900">Most Experienced</option>
              <option value="rate_asc" className="bg-slate-900">Rate: Low to High</option>
              <option value="rate_desc" className="bg-slate-900">Rate: High to Low</option>
            </select>
          </div>

          {/* Reset button if active */}
          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          Showing <strong className="text-white font-semibold">{totalFound}</strong> vetted professional{totalFound !== 1 ? "s" : ""}
        </span>
        {filters.category !== "all" && (
          <span className="text-blue-400 font-medium">
            Category: {CATEGORIES.find((c) => c.id === filters.category)?.label}
          </span>
        )}
      </div>
    </div>
  );
};
