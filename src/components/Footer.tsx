"use client";

import { Sparkles, ExternalLink, Heart } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 pt-12 pb-10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1 */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-blue-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                TalentHub AI
              </span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Open-source next-generation freelance platform pairing clients and senior tech/design
              talent via semantic vector matching algorithms.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300">
                Next.js App Router
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300">
                TypeScript
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300">
                Supabase
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300">
                Tailwind CSS
              </span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white font-semibold mb-3 uppercase tracking-wider text-[11px]">
              Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#directory" className="hover:text-white transition">
                  Verified Directory
                </a>
              </li>
              <li>
                <a href="#ai-match" className="hover:text-white transition">
                  AI Matchmaker Engine
                </a>
              </li>
              <li>
                <a href="#post" className="hover:text-white transition">
                  Post a Project Scope
                </a>
              </li>
              <li>
                <a href="#vetting" className="hover:text-white transition">
                  Vetting & Quality Standards
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white font-semibold mb-3 uppercase tracking-wider text-[11px]">
              Developer & Source
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  GitHub Repository
                </a>
              </li>
              <li>
                <span className="text-slate-500">PostgreSQL Schema (Supabase)</span>
              </li>
              <li>
                <span className="text-slate-500">Edge Route API (/api/ai-match)</span>
              </li>
              <li>
                <span className="text-slate-500">MIT Open Source License</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 TalentHub AI. Built for high-impact portfolio & production showcase.</p>
          <p className="flex items-center gap-1">
            Engineered with modern fullstack standards
          </p>
        </div>
      </div>
    </footer>
  );
};
