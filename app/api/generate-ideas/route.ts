import { NextRequest, NextResponse } from "next/server"
import { generateIdeas } from "@/lib/ai"
import { type GenerateIdeasRequest } from "@/types"

export const runtime = "nodejs"
export const maxDuration = 30

export async function POST(req: NextRequest) {
  try {
    const body: GenerateIdeasRequest = await req.json()

    const provider = process.env.AI_PROVIDER || "openai"

    const hasKey =
      (provider === "openai" && process.env.OPENAI_API_KEY) ||
      (provider === "anthropic" && process.env.ANTHROPIC_API_KEY) ||
      (provider === "google" && process.env.GOOGLE_API_KEY)

    if (!hasKey) {
      return NextResponse.json(
        {
          error: `No API key found for provider "${provider}"`,
          debug: {
            provider,
            openai: process.env.OPENAI_API_KEY,
          },
        },
        { status: 500 }
      )
    }

    let ideas

try {
  ideas = await generateIdeas(body)
} catch (err) {
  console.error("AI GENERATION ERROR:", err)

  return NextResponse.json(
    { error: "AI generation failed (check API / model / baseURL)" },
    { status: 500 }
  )
}

    return NextResponse.json({
      ideas,
      provider,
      generatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[generate-ideas] Error:", error)

    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return NextResponse.json(
          { error: "Invalid API key. Please check your .env.local file." },
          { status: 401 }
        )
      }

      if (
        error.message.includes("rate limit") ||
        error.message.includes("429")
      ) {
        return NextResponse.json(
          { error: "Rate limit hit. Please wait a moment and try again." },
          { status: 429 }
        )
      }
    }

    return NextResponse.json(
      { error: "Failed to generate ideas. Please try again." },
      { status: 500 }
    )
  }
}