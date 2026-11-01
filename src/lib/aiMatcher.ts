import { Talent, AIMatchResult } from "@/types";

interface MatchParams {
  prompt: string;
  maxBudget?: number;
  category?: string;
}

// Technical keyword dictionary with related synonyms
const KEYWORD_MAP: Record<string, string[]> = {
  "ai": ["ai", "machine learning", "ml", "llm", "llms", "rag", "pytorch", "deep learning", "langchain", "prompt engineering", "nlp"],
  "frontend": ["frontend", "front-end", "react", "next.js", "nextjs", "vue", "tailwind", "ui", "ux", "typescript", "javascript", "css"],
  "backend": ["backend", "back-end", "node", "node.js", "go", "golang", "python", "fastapi", "postgresql", "postgres", "sql", "redis", "database", "api", "microservices"],
  "design": ["design", "ui/ux", "figma", "wireframe", "prototype", "design system", "design tokens", "interaction", "visual design"],
  "devops": ["devops", "cloud", "aws", "gcp", "kubernetes", "k8s", "docker", "terraform", "ci/cd", "infrastructure", "gitops", "prometheus"],
  "mobile": ["mobile", "ios", "android", "react native", "swift", "flutter", "expo"],
  "web3": ["web3", "crypto", "solidity", "smart contract", "blockchain", "defi", "viem", "ethers", "ethereum"],
};

export function computeAIMatches(
  talents: Talent[],
  params: MatchParams
): AIMatchResult[] {
  const query = params.prompt.toLowerCase();
  
  // Extract detected keywords from query
  const extractedWords = query
    .replace(/[^\w\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);

  return talents.map((talent) => {
    let score = 30; // base score
    const matchedSkills: string[] = [];
    const missingSkills: string[] = [];

    const talentSkillsLower = talent.skills.map((s) => s.toLowerCase());
    const talentTitleLower = talent.title.toLowerCase();
    const talentBioLower = talent.bio.toLowerCase();

    // 1. Check direct skill hits
    talent.skills.forEach((skill) => {
      const sLower = skill.toLowerCase();
      const isDirectHit = query.includes(sLower) || extractedWords.some((w) => sLower.includes(w) || w.includes(sLower));
      if (isDirectHit) {
        score += 15;
        matchedSkills.push(skill);
      }
    });

    // 2. Check category / domain affinity
    if (params.category && params.category !== "all") {
      if (talent.category === params.category) {
        score += 15;
      } else {
        score -= 20;
      }
    } else {
      // Automatic category inference from keywords
      for (const [cat, synonyms] of Object.entries(KEYWORD_MAP)) {
        if (synonyms.some((syn) => query.includes(syn))) {
          if (talent.category === cat) {
            score += 12;
          }
        }
      }
    }

    // 3. Project portfolio relevance
    talent.featuredProjects.forEach((proj) => {
      const projText = (proj.title + " " + proj.description + " " + proj.tags.join(" ")).toLowerCase();
      if (extractedWords.some((w) => w.length > 3 && projText.includes(w))) {
        score += 8;
      }
    });

    // 4. Budget fit penalty / bonus
    if (params.maxBudget && params.maxBudget > 0) {
      if (talent.hourlyRate <= params.maxBudget) {
        score += 10;
      } else {
        const overage = talent.hourlyRate - params.maxBudget;
        score -= Math.min(25, Math.round(overage / 5));
      }
    }

    // 5. Rating bonus
    if (talent.rating >= 4.9) {
      score += 6;
    }

    // Clamp score between 20 and 99
    const finalScore = Math.min(99, Math.max(25, Math.round(score)));

    let fitLabel: AIMatchResult["fitLabel"] = "Good Potential";
    if (finalScore >= 85) fitLabel = "Perfect Match";
    else if (finalScore >= 70) fitLabel = "Strong Match";

    // Generate smart rationale sentence
    let rationale = "";
    if (matchedSkills.length > 0) {
      rationale = `Exceptional alignment on ${matchedSkills.slice(0, 3).join(", ")}. Strong track record with ${talent.experienceYears}y experience and a ${talent.rating} client rating.`;
    } else {
      rationale = `General domain fit in ${talent.title}. High verified quality score (${talent.rating}/5.0).`;
    }

    return {
      talentId: talent.id,
      matchScore: finalScore,
      fitLabel,
      rationale,
      matchedSkills,
      recommendedRoles: [talent.title],
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
}
