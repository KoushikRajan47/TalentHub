"use client";

import React, { useState } from "react";
import { X, Send, CheckCircle2, DollarSign, Calendar, MessageSquare } from "lucide-react";
import confetti from "canvas-confetti";
import { Talent } from "@/types";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface InquiryModalProps {
  talent: Talent | null;
  onClose: () => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ talent, onClose }) => {
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    projectTitle: "",
    budget: "$3,000 - $5,000",
    timeline: "2-4 Weeks",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!talent) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (isSupabaseConfigured) {
        await supabase.from("inquiries").insert({
          talent_id: talent.id,
          client_name: formData.clientName,
          client_email: formData.clientEmail,
          project_title: formData.projectTitle,
          budget: formData.budget,
          timeline: formData.timeline,
          message: formData.message,
        });
      } else {
        // Fallback simulation for offline/preview demo
        await new Promise((r) => setTimeout(r, 600));
      }

      setSubmitted(true);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err) {
      console.error("Inquiry submission error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 my-8 text-white">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Proposal Dispatched!</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Your inquiry has been sent to{" "}
              <strong className="text-blue-400 font-semibold">{talent.name}</strong>. They
              typically respond within <span className="text-emerald-400 font-medium">4 hours</span>.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl font-semibold text-sm bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
              <img
                src={talent.avatar}
                alt={talent.name}
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-800"
              />
              <div>
                <h3 className="text-lg font-bold text-white">
                  Send Project Proposal to {talent.name}
                </h3>
                <p className="text-xs text-slate-400">
                  Rate: ${talent.hourlyRate}/hr • Verified Response Time: &lt; 4h
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1.5 font-medium">
                    Your Name / Company *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) =>
                      setFormData({ ...formData, clientName: e.target.value })
                    }
                    placeholder="e.g. Alex (CEO at FintechXYZ)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1.5 font-medium">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.clientEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, clientEmail: e.target.value })
                    }
                    placeholder="alex@fintechxyz.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1.5 font-medium">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.projectTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, projectTitle: e.target.value })
                  }
                  placeholder="e.g. Next.js Migration & Real-time Chart Integration"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1.5 font-medium flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    Estimated Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                    <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="$10,000+">$10,000+ (Enterprise Retainer)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1.5 font-medium flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    Target Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) =>
                      setFormData({ ...formData, timeline: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="Urgent (< 1 Week)">Urgent (&lt; 1 Week)</option>
                    <option value="2-4 Weeks">2-4 Weeks</option>
                    <option value="1-3 Months">1-3 Months</option>
                    <option value="Ongoing Contract">Ongoing Contract</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1.5 font-medium">
                  Project Scope & Deliverables *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Outline the main objectives, tech constraints, or links to Figma / GitHub PRDs..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
              >
                {submitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Proposal Direct to {talent.name.split(" ")[0]}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
