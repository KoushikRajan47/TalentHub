"use client";

import React from "react";
import { X, Heart, Trash2, Briefcase, MessageSquare, ArrowRight } from "lucide-react";
import { Talent } from "@/types";

interface SavedModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedTalents: Talent[];
  onRemove: (id: string) => void;
  onSelectTalent: (talent: Talent) => void;
  onHireTalent: (talent: Talent) => void;
}

export const SavedModal: React.FC<SavedModalProps> = ({
  isOpen,
  onClose,
  savedTalents,
  onRemove,
  onSelectTalent,
  onHireTalent,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 my-8 text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
          <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <Heart className="w-6 h-6 fill-rose-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Saved Candidates</h3>
            <p className="text-xs text-slate-400">
              Shortlisted talent ready for project proposals ({savedTalents.length} saved)
            </p>
          </div>
        </div>

        {/* List of Saved Talents */}
        {savedTalents.length > 0 ? (
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {savedTalents.map((talent) => (
              <div
                key={talent.id}
                className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={talent.avatar}
                    alt={talent.name}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-800"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-white">{talent.name}</h4>
                    <p className="text-xs text-slate-400 line-clamp-1">{talent.title}</p>
                    <span className="text-xs font-semibold text-emerald-400">
                      ₹{talent.hourlyRate.toLocaleString("en-IN")}/hr
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectTalent(talent);
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer flex items-center gap-1"
                  >
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    <span>Portfolio</span>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onHireTalent(talent);
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition shadow-sm cursor-pointer flex items-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Hire</span>
                  </button>

                  <button
                    onClick={() => onRemove(talent.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
              <Heart className="w-6 h-6" />
            </div>
            <p className="text-sm text-slate-400">You haven't bookmarked any talents yet.</p>
            <p className="text-xs text-slate-500">
              Click the heart icon on any candidate in the directory to save them here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
