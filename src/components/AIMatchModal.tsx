"use client";

import React, { useState } from "react";
import { Sparkles, X, ArrowRight, CheckCircle2, Star, ShieldCheck, Zap, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";
import { Talent, AIMatchResult } from "@/types";

interface AIMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  talents: Talent[];
  onSelectTalent: (talent: Talent) => void;
  onHireTalent: (talent: Talent) => void;
}

const SAMPLE_PROMPTS = [
  "Seeking an LLM & RAG engineer with PyTorch and pgvector experience to build a multi-agent document analysis copilot.",
  "Need a Senior Next.js + Go developer to architect a high-throughput real-time WebSocket dashboard.",
  "Looking for a Figma Design System lead to audit and build tokenized components for our SaaS platform.",
  "Experienced React Native developer to build an offline-first fitness app with Apple HealthKit sync.",
];

export const AIMatchModal: React.FC<AIMatchModalProps> = ({
  isOpen,
  onClose,
  talents,
  onSelectTalent,
  onHireTalent,
}) => {
  const [prompt, setPrompt] = useState("");
  const [maxBudget, setMaxBudget] = useState<number>(4500);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [results, setResults] = useState<{ match: AIMatchResult; talent: Talent }[] | null>(null);

  if (!isOpen) return null;

  const handleRunMatch = async (customQuery?: string) => {
    const textToMatch = customQuery || prompt;
    if (!textToMatch.trim()) return;

    setLoading(true);
    setResults(null);

    // Multi-phase animation for realistic AI processing
    setLoadingStep("Extracting technical dependencies & scope...");
    await new Promise((r) => setTimeout(r, 400));
    setLoadingStep("Traversing candidate skill vectors & experience graph...");
    await new Promise((r) => setTimeout(r, 450));
    setLoadingStep("Synthesizing compatibility rationales...");

    try {
      const res = await fetch("/api/ai-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: textToMatch, maxBudget }),
      });

      const data = await res.json();
      if (data.matches) {
        const paired = (data.matches as AIMatchResult[])
          .map((m) => {
            const found = talents.find((t) => t.id === m.talentId);
            return found ? { match: m, talent: found } : null;
          })
          .filter(Boolean) as { match: AIMatchResult; talent: Talent }[];

        setResults(paired);

        // Fire celebratory confetti if top match is >= 85%
        if (paired.length > 0 && paired[0].match.matchScore >= 80) {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
          });
        }
      }
    } catch (err) {
      console.error("Match error:", err);
    } finally {
      setLoading(false);
      setLoadingStep("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 my-8 text-white overflow-hidden">
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6 relative">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold">AI Talent Matchmaker</h2>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Semantic Engine
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400">
                Describe your project goals or stack — AI calculates instant compatibility scores.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Form */}
        <div className="space-y-4 mb-6 relative">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Project Description / Scope & Required Technologies
            </label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. We need a senior Next.js and Go engineer to build a high-speed dashboard with WebSockets. Budget is up to ₹3,500/hr, starting in two weeks..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>

          {/* Quick Preset Prompts */}
          <div>
            <span className="text-[11px] font-medium text-slate-400 block mb-1.5">
              Or click a sample requirement to test:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SAMPLE_PROMPTS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPrompt(p);
                    handleRunMatch(p);
                  }}
                  className="text-left text-xs p-2.5 rounded-xl bg-slate-950/70 hover:bg-slate-800 border border-slate-800/80 hover:border-blue-500/40 text-slate-300 transition line-clamp-2 cursor-pointer"
                >
                  &ldquo;{p}&rdquo;
                </button>
              ))}
            </div>
          </div>

          {/* Budget filter & Match Trigger Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3 bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Target Max Rate:</span>
              <input
                type="range"
                min="1500"
                max="6000"
                step="250"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-24 accent-blue-500 cursor-pointer"
              />
              <span className="text-xs font-bold text-blue-400 min-w-[70px] text-right">
                ₹{maxBudget.toLocaleString("en-IN")}/hr
              </span>
            </div>

            <button
              onClick={() => handleRunMatch()}
              disabled={loading || !prompt.trim()}
              className="px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Analyzing Match Graph...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>Run AI Matchmaker</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Loading Progress State */}
        {loading && (
          <div className="p-6 rounded-2xl bg-slate-950/90 border border-blue-500/30 text-center space-y-3">
            <div className="inline-flex p-3 rounded-2xl bg-blue-500/10 text-blue-400 animate-pulse">
              <Zap className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-blue-300">{loadingStep}</p>
            <div className="w-48 h-1.5 bg-slate-800 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-[shimmer_1.5s_infinite]" />
            </div>
          </div>
        )}

        {/* Results List */}
        {results && results.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Ranked Candidates for Your Scope
              </h3>
              <span className="text-xs text-slate-400">
                Found {results.length} ranked professionals
              </span>
            </div>

            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {results.map(({ match, talent }, i) => (
                <div
                  key={talent.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    i === 0
                      ? "bg-slate-950/90 border-blue-500/60 shadow-lg shadow-blue-500/10"
                      : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    {/* Candidate Info */}
                    <div className="flex items-center gap-3">
                      <img
                        src={talent.avatar}
                        alt={talent.name}
                        className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-800"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-sm">{talent.name}</h4>
                          {i === 0 && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                              🏆 Top Pick
                            </span>
                          )}
                          <span className="text-xs text-slate-400 font-medium">
                            ₹{talent.hourlyRate.toLocaleString("en-IN")}/hr
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1">{talent.title}</p>
                      </div>
                    </div>

                    {/* Match Score Badge */}
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="text-right">
                        <div className="flex items-center gap-1.5 justify-end">
                          <span
                            className={`text-lg font-black ${
                              match.matchScore >= 85
                                ? "text-emerald-400"
                                : match.matchScore >= 70
                                ? "text-blue-400"
                                : "text-amber-400"
                            }`}
                          >
                            {match.matchScore}%
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium">Match</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-medium block">
                          {match.fitLabel}
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            onClose();
                            onSelectTalent(talent);
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer"
                        >
                          Portfolio
                        </button>
                        <button
                          onClick={() => {
                            onClose();
                            onHireTalent(talent);
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition shadow-sm cursor-pointer"
                        >
                          Hire Now
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* AI Rationale */}
                  <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-300 flex items-start gap-2 bg-slate-900/50 p-2.5 rounded-xl">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-blue-300">AI Analysis: </span>
                      <span>{match.rationale}</span>
                    </div>
                  </div>

                  {/* Matched Skills Chips */}
                  {match.matchedSkills.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5 items-center">
                      <span className="text-[10px] text-slate-500 font-medium">Matched:</span>
                      {match.matchedSkills.map((s) => (
                        <span
                          key={s}
                          className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/20 font-medium"
                        >
                          ✓ {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
