# 💡 AI Project Ideas Generator

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/P-r-e-m-i-u-m/ai-project-ideas)

> Stop staring at a blank page. Generate unique, portfolio-worthy project ideas powered by GPT-4o, Claude 3.5, or Gemini 1.5 — with tech stack, features, and time estimates included.

---

## ✨ Features

- 🤖 **Multi-provider AI** — OpenAI, Anthropic Claude, Google Gemini (swap with one env var)
- 🎯 **Smart filtering** — by difficulty, category, and API requirements
- 💾 **Save & export** — bookmark ideas, export as Markdown or JSON
- ⚡ **Instant results** — streaming-ready API with loading skeletons
- 🎨 **Premium UI** — mesh gradients, glassmorphism, smooth animations
- 📱 **Fully responsive** — works on all screen sizes
- 🔓 **Open source** — MIT licensed, self-hostable

---

## 🖥️ Preview

```
┌─────────────────────────────────────────────┐
│  💡 IdeaGen                    Home Saved About │
├─────────────────────────────────────────────┤
│                                             │
│   Generate Portfolio-Worthy                 │
│   Project Ideas with AI                     │
│                                             │
│   ┌─────────────────────────────────────┐   │
│   │ Topic: "AI productivity tools"      │   │
│   │ Difficulty: All  Category: All      │   │
│   │ Count: ████████░░ 6                 │   │
│   │      [✨ Generate 6 Ideas]          │   │
│   └─────────────────────────────────────┘   │
│                                             │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│   │ Idea 1   │ │ Idea 2   │ │ Idea 3   │   │
│   └──────────┘ └──────────┘ └──────────┘   │
└─────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/P-r-e-m-i-u-m/ai-project-ideas.git
cd ai-project-ideas
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and add your API key:

```env
# Choose one provider:
OPENAI_API_KEY=sk-...
AI_PROVIDER=openai

# Or use Anthropic:
# ANTHROPIC_API_KEY=sk-ant-...
# AI_PROVIDER=anthropic

# Or use Google:
# GOOGLE_API_KEY=AIza...
# AI_PROVIDER=google
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Folder Structure

```
ai-project-ideas/
├── app/
│   ├── api/
│   │   └── generate-ideas/
│   │       └── route.ts          ← AI API route
│   ├── ideas/
│   │   └── page.tsx              ← Saved ideas page
│   ├── about/
│   │   └── page.tsx              ← About page
│   ├── globals.css               ← Design tokens + animations
│   ├── layout.tsx                ← Root layout
│   └── page.tsx                  ← Home page
│
├── components/
│   ├── layout/
│   │   └── Navbar.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── GeneratorForm.tsx     ← Main form with filters
│   │   └── IdeasGrid.tsx         ← Results grid + export
│   └── ui/
│       ├── IdeaCard.tsx          ← Individual idea card
│       └── Skeleton.tsx          ← Loading skeletons
│
├── lib/
│   ├── ai.ts                     ← Multi-provider AI abstraction
│   ├── store.ts                  ← Zustand global state
│   └── utils.ts                  ← Helper functions
│
├── prompts/
│   ├── system-prompt.md          ← AI system prompt
│   └── user-prompt-templates.md  ← Prompt templates
│
├── types/
│   └── index.ts                  ← TypeScript types
│
├── .env.example                  ← Environment variable template
└── README.md
```

---

## 🔌 API Reference

### `POST /api/generate-ideas`

Generate project ideas.

**Request body:**
```json
{
  "topic": "AI productivity tools",
  "difficulty": "Intermediate",
  "category": "Web App",
  "count": 6
}
```

**Response:**
```json
{
  "ideas": [
    {
      "id": "abc123",
      "title": "Smart Meeting Summarizer",
      "tagline": "Turn your messy meeting notes into action items automatically",
      "description": "...",
      "difficulty": "Intermediate",
      "category": "Web App",
      "techStack": ["Next.js", "OpenAI Whisper", "TypeScript", "Prisma"],
      "features": ["Audio upload", "Auto transcription", "Action item extraction"],
      "timeEstimate": "2-3 weeks",
      "whyBuildThis": "...",
      "apiNeeded": true,
      "apis": ["OpenAI Whisper API", "OpenAI GPT-4o"],
      "starPotential": 4
    }
  ],
  "provider": "openai",
  "generatedAt": "2026-03-26T10:00:00Z"
}
```

---

## 🌍 Deploy to Vercel

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/P-r-e-m-i-u-m/ai-project-ideas)

### Manual deploy

```bash
npm install -g vercel
vercel
```

Add your environment variables in the Vercel dashboard:
- Go to **Project → Settings → Environment Variables**
- Add `OPENAI_API_KEY`, `AI_PROVIDER`, etc.

---

## 🔑 Getting API Keys

| Provider | Link | Free tier |
|---|---|---|
| OpenAI | [platform.openai.com](https://platform.openai.com/api-keys) | $5 credit on signup |
| Anthropic | [console.anthropic.com](https://console.anthropic.com) | $5 credit on signup |
| Google Gemini | [aistudio.google.com](https://aistudio.google.com/app/apikey) | Free tier available |

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feat/your-feature`
3. Make your changes
4. Commit: `git commit -S -s -m "feat: your feature"`
5. Push: `git push origin feat/your-feature`
6. Open a Pull Request

---

## 📄 License

MIT — free to use, modify, and deploy.

---

Made with ❤️ by [@P-r-e-m-i-u-m](https://github.com/P-r-e-m-i-u-m)
