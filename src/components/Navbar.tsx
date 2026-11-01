"use client";

import { Sparkles, Users, Search, PlusCircle } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

interface NavbarProps {
  onOpenAIMatch: () => void;
  onOpenJoin: () => void;
  totalTalents: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAIMatch,
  onOpenJoin,
  totalTalents,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                TalentHub
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wider">
                AI Match
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Vetted Senior Talent Marketplace
            </p>
          </div>
        </div>

        {/* Center / Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAIMatch}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-md shadow-indigo-500/25 transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
            <span>AI Matchmaker</span>
          </button>

          <button
            onClick={onOpenJoin}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>Join as Talent</span>
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="View on GitHub"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </header>
  );
};
