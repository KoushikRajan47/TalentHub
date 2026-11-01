import { NextResponse } from "next/server";
import { INITIAL_TALENTS } from "@/data/mockTalents";
import { computeAIMatches } from "@/lib/aiMatcher";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, maxBudget, category } = body;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "A descriptive prompt or project requirement is required." },
        { status: 400 }
      );
    }

    const matches = computeAIMatches(INITIAL_TALENTS, {
      prompt,
      maxBudget: maxBudget ? Number(maxBudget) : undefined,
      category,
    });

    return NextResponse.json({
      success: true,
      query: prompt,
      totalEvaluated: INITIAL_TALENTS.length,
      matches,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process AI candidate matching." },
      { status: 500 }
    );
  }
}
