# User Prompt Templates — AI Project Ideas Generator

These are the prompt templates used in `lib/ai.ts` when calling AI providers.

---

## Template 1 — Standard Generation

Used for most requests.

```
Generate exactly {count} project ideas about "{topic}".
{difficulty !== "All" ? `Difficulty level: {difficulty}` : "Mix of difficulty levels"}
{category !== "All" ? `Category: {category}` : "Variety of categories"}

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

Make ideas original, modern, and portfolio-worthy. Focus on real problems.
```

---

## Template 2 — Beginner Focused

Use when difficulty is explicitly "Beginner".

```
Generate {count} beginner-friendly project ideas about "{topic}".

Requirements:
- Completable in 1-3 weeks by someone new to the stack
- Uses standard, well-documented libraries only
- Avoids complex authentication, payments, or real-time features
- Each idea should teach a specific core concept (e.g. state management, API calls, routing)

{JSON schema same as Template 1}
```

---

## Template 3 — High Star Potential

Use when user wants ideas likely to trend on GitHub.

```
Generate {count} project ideas about "{topic}" with HIGH GitHub star potential.

Requirements:
- Must solve a pain point felt by many developers
- Should be something people would bookmark or share
- Open-source friendly (can be used as a library or tool)
- Ideally has a "show HN" or "Product Hunt" angle
- Star potential rating must be 4 or 5

{JSON schema same as Template 1}
```

---

## Template 4 — AI/ML Specific

Use when category is "AI/ML".

```
Generate {count} AI/ML project ideas about "{topic}".

Requirements:
- Uses at least one AI API (OpenAI, Anthropic, Google Gemini, Hugging Face, etc.)
- Demonstrates a clear AI capability (generation, classification, summarization, etc.)
- Not just a wrapper — should add real value on top of the AI API
- Include the specific AI model or API in the tech stack

{JSON schema same as Template 1}
```

---

## Customising Prompts

To modify the prompts, edit `lib/ai.ts`:

1. Find the `prompt` constant in the `generateIdeas` function
2. Edit the template string
3. The response must still match the JSON schema in `types/index.ts`

To add a new provider:
1. Add a new function `generateWith{Provider}` in `lib/ai.ts`
2. Add a new `case` in the switch statement
3. Add the env variables to `.env.example`
