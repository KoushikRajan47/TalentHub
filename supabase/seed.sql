-- ==============================================================================
-- TalentHub AI: Supabase Seed Data (PostgreSQL)
-- Run this script in your Supabase SQL Editor after running schema.sql
-- ==============================================================================

-- 1. SEED PROFILES
insert into public.profiles (
  id, name, title, tagline, avatar_url, bio, hourly_rate, experience_years, location, category, skills, badges, rating, review_count, availability, verified
) values
(
  '11111111-1111-1111-1111-111111111111',
  'Alex Rivera',
  'Senior Full-Stack & Distributed Systems Architect',
  'Ex-Stripe engineer building scalable microservices & real-time WebApps',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  'Passionate software architect with 8+ years crafting high-throughput backends in Go/Node.js and reactive frontends in Next.js & TypeScript. Specialized in zero-downtime database migrations, micro-frontends, and serverless edge compute.',
  3500.00,
  8,
  'San Francisco, CA (Remote)',
  'engineering',
  array['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Go', 'Docker', 'GraphQL', 'Redis'],
  array['Top 1% Talent', 'Verified Architect', 'Quick Responder'],
  4.98,
  34,
  'available',
  true
),
(
  '22222222-2222-2222-2222-222222222222',
  'Elena Rostova',
  'Staff Generative AI & LLM Systems Engineer',
  'Fine-tuning multi-modal models, building RAG pipelines & agentic workflows',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  'Machine learning specialist with deep expertise in retrieval-augmented generation (RAG), vector databases (Pinecone/Qdrant/pgvector), LangChain, and fine-tuning open-source LLMs like Llama 3 and Mistral. Published researcher in automated multi-agent reasoning.',
  4500.00,
  6,
  'Seattle, WA (Remote)',
  'ai',
  array['Python', 'PyTorch', 'LLMs', 'RAG', 'pgvector', 'LangChain', 'FastAPI', 'Next.js'],
  array['AI Pioneer', 'Top Rated', 'Google Scholar'],
  5.00,
  28,
  'available',
  true
),
(
  '33333333-3333-3333-3333-333333333333',
  'Kenji Sato',
  'Principal UI/UX Product Designer & Design Systems Lead',
  'Bridging aesthetics and micro-interactions for high-converting SaaS products',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  'Design lead with 9+ years crafting delightful, accessible user journeys. Author of multiple open-source Figma design systems used by 40,000+ designers. Fluent in Figma tokens, Framer Motion prototypes, and modern Tailwind CSS design tokens.',
  2800.00,
  9,
  'Tokyo, Japan (Remote Worldwide)',
  'design',
  array['Figma', 'Design Systems', 'UI/UX', 'Tailwind CSS', 'Framer Motion', 'Prototyping', 'Accessibility'],
  array['Figma Ambassador', 'Design System Guru'],
  4.95,
  42,
  'available',
  true
),
(
  '44444444-4444-4444-4444-444444444444',
  'Tariq Mansoor',
  'Senior DevOps & Cloud Infrastructure Engineer',
  'Kubernetes, Terraform, AWS/GCP multi-cloud reliability & GitOps',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  'Infrastructure engineer obsessed with 99.99% uptime, automated canary deployments, and cost optimization. Experienced in migrating monolithic setups to Kubernetes clusters, setting up Datadog telemetry, and hardening SOC2 compliance.',
  3200.00,
  7,
  'Austin, TX (Remote)',
  'devops',
  array['Kubernetes', 'Docker', 'Terraform', 'AWS', 'CI/CD', 'Prometheus', 'Golang', 'Linux'],
  array['AWS Certified Solutions Architect', 'Kubernetes CKA'],
  4.92,
  22,
  'busy',
  true
);

-- 2. SEED FEATURED PROJECTS
insert into public.projects (
  profile_id, title, description, tags, live_url, github_url, image_url
) values
(
  '11111111-1111-1111-1111-111111111111',
  'OmniScale Event Bus',
  'A distributed real-time publish-subscribe event routing engine processing 250k msgs/sec with Redis Streams and WebSockets.',
  array['Go', 'Redis', 'Next.js', 'WebSockets'],
  'https://example.com/demo',
  'https://github.com',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80'
),
(
  '22222222-2222-2222-2222-222222222222',
  'CognitiveAgents Copilot',
  'Autonomous multi-agent research assistant that analyzes 50-page financial 10-K reports with vector citation grounding.',
  array['Python', 'LangChain', 'pgvector', 'FastAPI', 'React'],
  'https://example.com/ai-demo',
  'https://github.com',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'
),
(
  '33333333-3333-3333-3333-333333333333',
  'Aura Component Library',
  'A cross-platform tokenized design system with WCAG AAA accessibility, dark/light themes, and 120+ interactive states.',
  array['Figma', 'Design Tokens', 'React', 'Tailwind'],
  'https://example.com/aura',
  null,
  'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80'
);

-- 3. SEED REVIEWS
insert into public.reviews (
  talent_id, author, role, company, rating, comment
) values
(
  '11111111-1111-1111-1111-111111111111',
  'Sarah Jenkins',
  'VP of Engineering',
  'HyperGrowth Labs',
  5,
  'Alex delivered our core transactional platform 2 weeks ahead of schedule. Incredible attention to edge cases and database indexing.'
),
(
  '22222222-2222-2222-2222-222222222222',
  'Marcus Vance',
  'CTO',
  'Synthetix AI',
  5,
  'Elena''s RAG architecture cut our LLM hallucination rate by 80% while reducing latency from 4.2s to 680ms.'
);
