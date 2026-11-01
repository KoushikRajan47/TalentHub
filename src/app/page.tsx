"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FilterBar } from "@/components/FilterBar";
import { TalentCard } from "@/components/TalentCard";
import { TalentModal } from "@/components/TalentModal";
import { InquiryModal } from "@/components/InquiryModal";
import { AIMatchModal } from "@/components/AIMatchModal";
import { JoinModal } from "@/components/JoinModal";
import { SavedModal } from "@/components/SavedModal";
import { Footer } from "@/components/Footer";
import { INITIAL_TALENTS } from "@/data/mockTalents";
import { Talent, FilterState } from "@/types";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Sparkles, Users, SearchX } from "lucide-react";

export default function Home() {
  const [talents, setTalents] = useState<Talent[]>(INITIAL_TALENTS);
  const [selectedTalentDetail, setSelectedTalentDetail] = useState<Talent | null>(null);
  const [selectedTalentHire, setSelectedTalentHire] = useState<Talent | null>(null);
  const [isAIMatchOpen, setIsAIMatchOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    category: "all",
    selectedSkills: [],
    maxRate: 5000,
    availability: "all",
    sortBy: "rating",
  });

  // Initialize saved favorites from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("talenthub_saved_ids");
      if (stored) {
        setSavedIds(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Could not read saved talents from localStorage:", e);
    }
  }, []);

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("talenthub_saved_ids", JSON.stringify(updated));
      } catch (e) {
        console.warn("Could not persist saved talents:", e);
      }
      return updated;
    });
  };

  // Optional: fetch live profiles from Supabase if credentials are provided
  useEffect(() => {
    async function fetchSupabaseTalents() {
      if (!isSupabaseConfigured) return;
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*, projects(*), reviews(*)");
        if (data && data.length > 0 && !error) {
          // Map DB records if live database is connected
          console.log("Loaded profiles from Supabase:", data.length);
        }
      } catch (err) {
        console.warn("Supabase fetch fallback to mock dataset:", err);
      }
    }
    fetchSupabaseTalents();
  }, []);

  // Filter & Sort calculation
  const filteredTalents = useMemo(() => {
    return talents
      .filter((talent) => {
        // Category filter
        if (filters.category !== "all" && talent.category !== filters.category) {
          return false;
        }

        // Hourly rate filter
        if (talent.hourlyRate > filters.maxRate) {
          return false;
        }

        // Search query filter (matches name, skills, title, bio)
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const nameMatch = talent.name.toLowerCase().includes(q);
          const titleMatch = talent.title.toLowerCase().includes(q);
          const bioMatch = talent.bio.toLowerCase().includes(q);
          const skillMatch = talent.skills.some((s) => s.toLowerCase().includes(q));

          if (!nameMatch && !titleMatch && !bioMatch && !skillMatch) {
            return false;
          }
        }

        // Selected skill chips
        if (filters.selectedSkills.length > 0) {
          const hasAll = filters.selectedSkills.every((s) =>
            talent.skills.map((ts) => ts.toLowerCase()).includes(s.toLowerCase())
          );
          if (!hasAll) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "rating") return b.rating - a.rating;
        if (filters.sortBy === "experience") return b.experienceYears - a.experienceYears;
        if (filters.sortBy === "rate_asc") return a.hourlyRate - b.hourlyRate;
        if (filters.sortBy === "rate_desc") return b.hourlyRate - a.hourlyRate;
        return 0;
      });
  }, [talents, filters]);

  const handleSelectCategory = (cat: string) => {
    setFilters((prev) => ({ ...prev, category: cat }));
    const section = document.getElementById("directory");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSkillClick = (skill: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: skill }));
    const section = document.getElementById("directory");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAddTalent = (newTalent: Talent) => {
    setTalents((prev) => [newTalent, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenAIMatch={() => setIsAIMatchOpen(true)}
        onOpenJoin={() => setIsJoinOpen(true)}
        onOpenSaved={() => setIsSavedOpen(true)}
        savedCount={savedIds.length}
        totalTalents={talents.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Hero Section */}
        <HeroSection
          onOpenAIMatch={() => setIsAIMatchOpen(true)}
          onSelectCategory={handleSelectCategory}
        />

        {/* Directory Controls & Filter Bar */}
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          totalFound={filteredTalents.length}
        />

        {/* Talent Cards Grid */}
        {filteredTalents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            {filteredTalents.map((talent) => (
              <TalentCard
                key={talent.id}
                talent={talent}
                isSaved={savedIds.includes(talent.id)}
                onToggleSave={toggleSave}
                onSelect={(t) => setSelectedTalentDetail(t)}
                onHire={(t) => setSelectedTalentHire(t)}
                onSkillClick={handleSkillClick}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="py-20 text-center bg-slate-900/30 border border-slate-800/60 rounded-3xl mt-6 px-4">
            <div className="p-4 rounded-full bg-slate-800/80 w-16 h-16 mx-auto mb-4 flex items-center justify-center text-slate-400">
              <SearchX className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              No matching verified talent found
            </h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
              Try adjusting your search keywords, broadening your hourly rate cap, or
              switching categories.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() =>
                  setFilters({
                    searchQuery: "",
                    category: "all",
                    selectedSkills: [],
                    maxRate: 5000,
                    availability: "all",
                    sortBy: "rating",
                  })
                }
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer"
              >
                Reset All Filters
              </button>

              <button
                onClick={() => setIsAIMatchOpen(true)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/20"
              >
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>Try AI Matchmaker</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      <AIMatchModal
        isOpen={isAIMatchOpen}
        onClose={() => setIsAIMatchOpen(false)}
        talents={talents}
        onSelectTalent={(t) => setSelectedTalentDetail(t)}
        onHireTalent={(t) => setSelectedTalentHire(t)}
      />

      <TalentModal
        talent={selectedTalentDetail}
        onClose={() => setSelectedTalentDetail(null)}
        onHire={(t) => setSelectedTalentHire(t)}
      />

      <InquiryModal
        talent={selectedTalentHire}
        onClose={() => setSelectedTalentHire(null)}
      />

      <JoinModal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
        onAddTalent={handleAddTalent}
      />

      <SavedModal
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        savedTalents={talents.filter((t) => savedIds.includes(t.id))}
        onRemove={toggleSave}
        onSelectTalent={(t) => setSelectedTalentDetail(t)}
        onHireTalent={(t) => setSelectedTalentHire(t)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
