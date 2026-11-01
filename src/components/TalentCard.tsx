"use client";

import React from "react";
import { Star, ShieldCheck, MapPin, Briefcase, ExternalLink, MessageSquare } from "lucide-react";
import { Talent } from "@/types";

interface TalentCardProps {
  talent: Talent;
  onSelect: (talent: Talent) => void;
  onHire: (talent: Talent) => void;
  onSkillClick: (skill: string) => void;
}

export const TalentCard: React.FC<TalentCardProps> = ({
  talent,
  onSelect,
  onHire,
  onSkillClick,
}) => {
  return (
    <div className="group relative bg-slate-900/70 hover:bg-slate-900/90 border border-slate-800/80 hover:border-blue-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1">
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={talent.avatar}
                alt={talent.name}
                className="w-13 h-13 rounded-xl object-cover ring-2 ring-slate-800 group-hover:ring-blue-500/40 transition"
              />
              <span
                className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-slate-950 ${
                  talent.availability === "available"
                    ? "bg-emerald-500"
                    : "bg-amber-500"
                }`}
                title={`Status: ${talent.availability}`}
              />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-semibold text-white group-hover:text-blue-400 transition text-base">
                  {talent.name}
                </h3>
                {talent.verified && (
                  <span title="Verified Expert">
                    <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 line-clamp-1">{talent.title}</p>
            </div>
          </div>

          {/* Hourly Rate */}
          <div className="text-right shrink-0">
            <div className="text-base font-bold text-emerald-400">
              ${talent.hourlyRate}
              <span className="text-xs font-normal text-slate-400">/hr</span>
            </div>
            <span className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
              {talent.experienceYears}y exp
            </span>
          </div>
        </div>

        {/* Tagline / Bio snippet */}
        <p className="text-xs text-slate-300 line-clamp-2 mb-3.5 leading-relaxed">
          {talent.tagline || talent.bio}
        </p>

        {/* Skills list */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {talent.skills.slice(0, 5).map((skill) => (
            <button
              key={skill}
              onClick={(e) => {
                e.stopPropagation();
                onSkillClick(skill);
              }}
              className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-800/80 hover:bg-blue-600/20 hover:text-blue-300 text-slate-300 border border-slate-700/60 transition cursor-pointer"
            >
              {skill}
            </button>
          ))}
          {talent.skills.length > 5 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded text-slate-500 font-medium">
              +{talent.skills.length - 5} more
            </span>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div>
        <div className="flex items-center justify-between text-xs text-slate-400 py-3 border-t border-slate-800/80 mb-3">
          <div className="flex items-center gap-1 text-amber-400 font-semibold">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{talent.rating.toFixed(1)}</span>
            <span className="text-slate-500 font-normal">({talent.reviewCount})</span>
          </div>

          <div className="flex items-center gap-1 text-slate-400 text-[11px]">
            <MapPin className="w-3 h-3 text-slate-500" />
            <span className="truncate max-w-[130px]">{talent.location}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onSelect(talent)}
            className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700/80 hover:border-slate-600 transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Briefcase className="w-3.5 h-3.5 text-slate-400" />
            <span>Portfolio ({talent.featuredProjects.length})</span>
          </button>

          <button
            onClick={() => onHire(talent)}
            className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Hire / Inquire</span>
          </button>
        </div>
      </div>
    </div>
  );
};
