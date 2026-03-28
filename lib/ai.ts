import { type GenerateIdeasRequest, type ProjectIdea } from "@/types"
import { generateId } from "@/lib/utils"

// ── OpenAI ────────────────────────────────────────────────
async function generateWithOpenAI(
  prompt: string,
  systemPrompt: string
): Promise<ProjectIdea[]> {
  const { default: OpenAI } = await import("openai")
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL,
    })

  const response = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
    ],
    temperature: 0.85,
    response_format: { type: "json_object" },
  })

  const content = response.choices[0]?.message?.content || "{}"
  const parsed = JSON.parse(content)
  return parsed.ideas || []
}

// ── Anthropic ─────────────────────────────────────────────
async function generateWithAnthropic(
  prompt: string,
  systemPrompt: string
): Promise<ProjectIdea[]> {
  const Anthropic = (await import("@anthropic-ai/sdk")).default
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const response = await client.messages.create({
    model: process.env.ANTHROPIC_MODEL || "claude-3-5-haiku-20241022",
    max_tokens: 4096,
    system: systemPrompt,
    messages: [{ role: "user", content: prompt }],
  })

  const content = response.content[0]
  if (content.type !== "text") return []

  const jsonMatch = content.text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) return []

  const parsed = JSON.parse(jsonMatch[0])
  return parsed.ideas || []
}

// ── Google Gemini ─────────────────────────────────────────
async function generateWithGoogle(
  prompt: string,
  systemPrompt: string
): Promise<ProjectIdea[]> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${
      process.env.GOOGLE_MODEL || "gemini-1.5-flash"
    }:generateContent?key=${process.env.GOOGLE_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: `${systemPrompt}\n\n${prompt}` }],
          },
        ],
        generationConfig: { temperature: 0.85, responseMimeType: "application/json" },
      }),
    }
  )

  const data = await response.json()
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}"
  const parsed = JSON.parse(text)
  return parsed.ideas || []
}

// ── Main export ───────────────────────────────────────────
export async function generateIdeas(
  request: GenerateIdeasRequest
): Promise<ProjectIdea[]> {
  const systemPrompt = `You are a creative senior developer and startup advisor.
Your job is to generate unique, buildable project ideas that developers can add to their portfolios.
Always respond with valid JSON only — no markdown, no explanation outside the JSON.`

  const prompt = `Generate exactly ${request.count} project ideas about "${request.topic}".
${request.difficulty !== "All" ? `Difficulty level: ${request.difficulty}` : "Mix of difficulty levels"}
${request.category !== "All" ? `Category: ${request.category}` : "Variety of categories"}

Respond with this exact JSON structure:
{
  "ideas": [
    {
      "id": "unique-id",
      "title": "Project Title",
      "tagline": "One punchy sentence",
      "description": "2-3 sentence description of what it does",
      "difficulty": "Beginner|Intermediate|Advanced",
      "category": "Web App|Mobile App|AI/ML|CLI Tool|API|Browser Extension|Game|Data Visualization|DevTool|SaaS",
      "techStack": ["Next.js", "TypeScript", "..."],
      "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
      "timeEstimate": "2-3 weeks",
      "whyBuildThis": "Why this is valuable for a portfolio/career",
      "apiNeeded": true|false,
      "apis": ["OpenAI API", "..."],
      "starPotential": 1-5
    }
  ]
}

Make ideas original, modern, and portfolio-worthy. Focus on real problems.`

  const provider = request.provider || (process.env.AI_PROVIDER as "openai" | "anthropic" | "google") || "openai"

  let ideas: ProjectIdea[] = []

  switch (provider) {
    case "anthropic":
      ideas = await generateWithAnthropic(prompt, systemPrompt)
      break
    case "google":
      ideas = await generateWithGoogle(prompt, systemPrompt)
      break
    default:
      ideas = await generateWithOpenAI(prompt, systemPrompt)
  }

  // Ensure every idea has an id
  return ideas.map((idea) => ({ ...idea, id: idea.id || generateId() }))
}
