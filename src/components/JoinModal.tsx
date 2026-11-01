"use client";

import React, { useState } from "react";
import { X, UserPlus, CheckCircle2, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { Talent, TalentCategory } from "@/types";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTalent: (talent: Talent) => void;
}

export const JoinModal: React.FC<JoinModalProps> = ({
  isOpen,
  onClose,
  onAddTalent,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    category: "engineering" as TalentCategory,
    hourlyRate: 2500,
    experienceYears: 4,
    location: "Remote",
    skills: "Next.js, TypeScript, Tailwind CSS, Node.js",
    bio: "",
    github: "",
    portfolio: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const skillsArray = formData.skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const newTalent: Talent = {
      id: "talent-" + Date.now(),
      name: formData.name,
      title: formData.title,
      tagline: formData.title,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80`,
      bio: formData.bio || "Passionate software engineer building high performance applications.",
      hourlyRate: Number(formData.hourlyRate),
      experienceYears: Number(formData.experienceYears),
      location: formData.location,
      rating: 5.0,
      reviewCount: 1,
      availability: "available",
      category: formData.category,
      skills: skillsArray,
      verified: true,
      badges: ["New Verified Talent", "Pro Member"],
      socials: {
        github: formData.github || "https://github.com",
        portfolio: formData.portfolio || undefined,
      },
      featuredProjects: [
        {
          id: "p-" + Date.now(),
          title: "Flagship Portfolio Project",
          description: "High performance production application with modern architecture.",
          tags: skillsArray.slice(0, 3),
          githubUrl: formData.github || "https://github.com",
        },
      ],
      reviews: [
        {
          id: "r-" + Date.now(),
          author: "TalentHub Onboarding Team",
          role: "Technical Assessor",
          company: "TalentHub Vetting",
          rating: 5,
          comment: "Verified profile with solid credentials and portfolio background.",
          date: "Just now",
        },
      ],
    };

    try {
      if (isSupabaseConfigured) {
        await supabase.from("profiles").insert({
          name: newTalent.name,
          title: newTalent.title,
          category: newTalent.category,
          hourly_rate: newTalent.hourlyRate,
          experience_years: newTalent.experienceYears,
          location: newTalent.location,
          skills: newTalent.skills,
          bio: newTalent.bio,
          verified: true,
        });
      }

      onAddTalent(newTalent);
      setSuccess(true);
      confetti({
        particleCount: 50,
        spread: 60,
      });
    } catch (err) {
      console.error("Error creating talent profile:", err);
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

        {success ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Welcome to TalentHub!</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Your profile is now live in the verified directory and ready to be matched by clients using the AI engine.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-500 text-white transition cursor-pointer"
              >
                View in Directory
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
              <div className="p-3 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                <UserPlus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Join as Vetted Talent</h3>
                <p className="text-xs text-slate-400">
                  Showcase your portfolio and get matched to high-paying client contracts.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maya Lin"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Domain Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as TalentCategory })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="engineering">Software & Web Engineering</option>
                    <option value="ai">AI & Machine Learning</option>
                    <option value="design">UI/UX & Design Systems</option>
                    <option value="devops">DevOps & Cloud</option>
                    <option value="mobile">Mobile Development</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">
                  Professional Title / Role *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Senior Full-Stack Next.js & Cloud Architect"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Hourly Rate (₹)</label>
                  <input
                    type="number"
                    min="500"
                    max="15000"
                    step="100"
                    value={formData.hourlyRate}
                    onChange={(e) =>
                      setFormData({ ...formData, hourlyRate: Number(e.target.value) })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Years Experience</label>
                  <input
                    type="number"
                    min="1"
                    max="25"
                    value={formData.experienceYears}
                    onChange={(e) =>
                      setFormData({ ...formData, experienceYears: Number(e.target.value) })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Remote (US/EU)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">
                  Key Skills (comma separated) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="React, Next.js, TypeScript, PostgreSQL, Tailwind, GraphQL"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">
                  Bio & Professional Summary *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Describe your technical background, major achievements, and past projects..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">GitHub Profile URL</label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    placeholder="https://github.com/yourhandle"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Portfolio / Website</label>
                  <input
                    type="url"
                    value={formData.portfolio}
                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                    placeholder="https://yourportfolio.dev"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
              >
                {submitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    <span>Publish Talent Profile to Directory</span>
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
