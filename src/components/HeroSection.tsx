"use client";

import React from "react";
import { Sparkles, ShieldCheck, Zap, ArrowRight, Star } from "lucide-react";

interface HeroSectionProps {
  onOpenAIMatch: () => void;
  onSelectCategory: (cat: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenAIMatch,
  onSelectCategory,
}) => {
  return (
    <div className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-800/60">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-blue-600/15 via-purple-600/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Top announcement pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-xs text-slate-300 mb-6 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium text-emerald-400">Next-Gen Freelance Platform</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Powered by Semantic Vector AI</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
          Hire World-Class Tech & Design Talent{" "}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            Ranked by AI
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 mb-8 leading-relaxed">
          Describe your project requirement in plain English. Our semantic engine
          analyzes skill graphs, portfolio depth, and client ratings to deliver your
          ideal match in seconds.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={onOpenAIMatch}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2.5 transition duration-200 cursor-pointer hover:scale-[1.02]"
          >
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span>Find Talent with AI Matchmaker</span>
            <ArrowRight className="w-4 h-4 ml-1 opacity-80" />
          </button>

          <a
            href="#directory"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 transition flex items-center justify-center gap-2"
          >
            Browse Verified Directory
          </a>
        </div>

        {/* Quick popular chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
          <span className="text-slate-500 font-medium mr-1">Trending specialties:</span>
          {[
            { label: "LLM & RAG Engineers", cat: "ai" },
            { label: "Fullstack Next.js", cat: "engineering" },
            { label: "Design Systems (Figma)", cat: "design" },
            { label: "Kubernetes & Cloud", cat: "devops" },
            { label: "React Native Mobile", cat: "mobile" },
          ].map((tag) => (
            <button
              key={tag.label}
              onClick={() => onSelectCategory(tag.cat)}
              className="px-3 py-1 rounded-full bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 transition cursor-pointer"
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 pt-8 border-t border-slate-800/60 text-left">
          <div className="flex items-center gap-3.5 p-3 rounded-lg bg-slate-900/40 border border-slate-800/40">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Top 3% Vetted</p>
              <p className="text-xs text-slate-400">Rigorous code & portfolio audits</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-lg bg-slate-900/40 border border-slate-800/40">
            <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Semantic AI Match</p>
              <p className="text-xs text-slate-400">No keyword guessing or recruiter spam</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-lg bg-slate-900/40 border border-slate-800/40">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Instant Direct Connect</p>
              <p className="text-xs text-slate-400">Direct inquiries with zero hidden cuts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
