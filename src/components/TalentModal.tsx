"use client";

import {
  X,
  Star,
  ShieldCheck,
  MapPin,
  ExternalLink,
  Globe,
  Briefcase,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { Talent } from "@/types";

interface TalentModalProps {
  talent: Talent | null;
  onClose: () => void;
  onHire: (talent: Talent) => void;
}

export const TalentModal: React.FC<TalentModalProps> = ({
  talent,
  onClose,
  onHire,
}) => {
  if (!talent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 my-8 text-white max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Hero Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-slate-800">
          <img
            src={talent.avatar}
            alt={talent.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-slate-800 shadow-xl"
          />

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {talent.name}
              </h2>
              {talent.verified && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Pro
                </span>
              )}
            </div>

            <p className="text-sm sm:text-base font-medium text-slate-300 mb-2">
              {talent.title}
            </p>

            {/* Badges / Metrics row */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>{talent.rating.toFixed(2)}</span>
                <span className="text-slate-500 font-normal">
                  ({talent.reviewCount} client reviews)
                </span>
              </div>

              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{talent.location}</span>
              </div>

              <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                <CheckCircle className="w-3.5 h-3.5" />
                <span className="capitalize">{talent.availability} for work</span>
              </div>
            </div>
          </div>

          {/* Rate & Hire CTA */}
          <div className="w-full sm:w-auto flex flex-row sm:flex-col items-center sm:items-end justify-between gap-3 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-800">
            <div className="sm:text-right">
              <span className="text-2xl font-black text-emerald-400">
                ${talent.hourlyRate}
              </span>
              <span className="text-xs text-slate-400">/hr</span>
              <p className="text-[11px] text-slate-500 font-medium">
                {talent.experienceYears}+ years experience
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                onHire(talent);
              }}
              className="px-6 py-2.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 flex items-center gap-2 transition cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Hire / Contact</span>
            </button>
          </div>
        </div>

        {/* Social Links Bar */}
        <div className="flex items-center gap-3 py-4 border-b border-slate-800 text-xs">
          <span className="text-slate-500 font-medium">Links & Verified Accounts:</span>
          {talent.socials.github && (
            <a
              href={talent.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              GitHub
            </a>
          )}
          {talent.socials.linkedin && (
            <a
              href={talent.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-blue-400" />
              LinkedIn
            </a>
          )}
          {talent.socials.portfolio && (
            <a
              href={talent.socials.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              Portfolio
            </a>
          )}
        </div>

        {/* Bio Section */}
        <div className="py-6 border-b border-slate-800">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
            Professional Overview
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
            {talent.bio}
          </p>
        </div>

        {/* Core Competencies & Skills */}
        <div className="py-6 border-b border-slate-800">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
            Core Competencies & Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {talent.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Featured Projects Showcase */}
        <div className="py-6 border-b border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-400" />
              Featured Work & Projects ({talent.featuredProjects.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {talent.featuredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between"
              >
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-36 object-cover rounded-xl mb-3 border border-slate-800"
                  />
                )}
                <div>
                  <h4 className="font-bold text-white text-base mb-1.5">
                    {project.title}
                  </h4>
                  <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80 text-xs font-medium">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      <GithubIcon className="w-3 h-3" />
                      <span>Code Repo</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Reviews */}
        {talent.reviews.length > 0 && (
          <div className="pt-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
              Verified Client Feedback
            </h3>
            <div className="space-y-3">
              {talent.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h5 className="font-bold text-sm text-white">{rev.author}</h5>
                      <p className="text-xs text-slate-400">
                        {rev.role} at <span className="text-slate-300">{rev.company}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
