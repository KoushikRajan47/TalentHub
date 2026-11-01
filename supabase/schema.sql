-- ==============================================================================
-- TalentHub AI: Production PostgreSQL & Supabase Database Schema
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE (Talents and Clients)
create table if not exists public.profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  title text not null,
  tagline text,
  avatar_url text,
  bio text,
  hourly_rate numeric(10, 2) default 2500.00,
  experience_years integer default 3,
  location text default 'Remote',
  category text not null check (category in ('engineering', 'design', 'ai', 'devops', 'mobile')),
  skills text[] default '{}',
  badges text[] default '{}',
  rating numeric(3, 2) default 5.00,
  review_count integer default 0,
  availability text default 'available' check (availability in ('available', 'busy', 'booked')),
  verified boolean default false,
  github_url text,
  linkedin_url text,
  portfolio_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. FEATURED PROJECTS TABLE
create table if not exists public.projects (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text not null,
  tags text[] default '{}',
  live_url text,
  github_url text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. CLIENT INQUIRIES & BOOKING PROPOSALS TABLE
create table if not exists public.inquiries (
  id uuid primary key default uuid_generate_v4(),
  talent_id uuid references public.profiles(id) on delete cascade not null,
  client_name text not null,
  client_email text not null,
  project_title text not null,
  budget text not null,
  timeline text not null,
  message text not null,
  status text default 'pending' check (status in ('pending', 'accepted', 'declined')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. REVIEWS TABLE
create table if not exists public.reviews (
  id uuid primary key default uuid_generate_v4(),
  talent_id uuid references public.profiles(id) on delete cascade not null,
  author text not null,
  role text,
  company text,
  rating integer check (rating >= 1 and rating <= 5) not null,
  comment text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. AI MATCH LOGS (For analytics & auditing)
create table if not exists public.ai_match_queries (
  id uuid primary key default uuid_generate_v4(),
  prompt_requirement text not null,
  detected_skills text[] default '{}',
  matched_talent_count integer default 0,
  top_match_score integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes for lightning fast queries
create index if not exists idx_profiles_category on public.profiles(category);
create index if not exists idx_profiles_availability on public.profiles(availability);
create index if not exists idx_profiles_hourly_rate on public.profiles(hourly_rate);
create index if not exists idx_projects_profile_id on public.projects(profile_id);
create index if not exists idx_inquiries_talent_id on public.inquiries(talent_id);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.inquiries enable row level security;
alter table public.reviews enable row level security;

-- Public read access policies
create policy "Public can read profiles" on public.profiles for select using (true);
create policy "Public can read projects" on public.projects for select using (true);
create policy "Public can read reviews" on public.reviews for select using (true);
create policy "Anyone can insert inquiries" on public.inquiries for insert with check (true);
