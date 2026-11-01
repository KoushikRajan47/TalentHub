export type AvailabilityStatus = "available" | "busy" | "booked";

export type TalentCategory = 
  | "engineering" 
  | "design" 
  | "ai" 
  | "devops" 
  | "mobile";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Talent {
  id: string;
  name: string;
  title: string;
  tagline: string;
  avatar: string;
  bio: string;
  hourlyRate: number;
  experienceYears: number;
  location: string;
  rating: number;
  reviewCount: number;
  availability: AvailabilityStatus;
  category: TalentCategory;
  skills: string[];
  featuredProjects: Project[];
  reviews: Review[];
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    portfolio?: string;
  };
  badges: string[];
  verified: boolean;
}

export interface AIMatchResult {
  talentId: string;
  matchScore: number;
  fitLabel: "Perfect Match" | "Strong Match" | "Good Potential";
  rationale: string;
  matchedSkills: string[];
  recommendedRoles: string[];
}

export interface Inquiry {
  id: string;
  talentId: string;
  clientName: string;
  clientEmail: string;
  projectTitle: string;
  budget: string;
  timeline: string;
  message: string;
  status: "pending" | "accepted" | "declined";
  createdAt: string;
}

export interface FilterState {
  searchQuery: string;
  category: string;
  selectedSkills: string[];
  maxRate: number;
  availability: string;
  sortBy: "rating" | "rate_asc" | "rate_desc" | "experience";
}
