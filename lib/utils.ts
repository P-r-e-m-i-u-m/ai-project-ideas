import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { type ProjectIdea } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 11)
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "Beginner":
      return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
    case "Intermediate":
      return "text-amber-400 bg-amber-400/10 border-amber-400/20"
    case "Advanced":
      return "text-rose-400 bg-rose-400/10 border-rose-400/20"
    default:
      return "text-slate-400 bg-slate-400/10 border-slate-400/20"
  }
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    "Web App": "🌐",
    "Mobile App": "📱",
    "AI/ML": "🤖",
    "CLI Tool": "⌨️",
    API: "🔌",
    "Browser Extension": "🧩",
    Game: "🎮",
    "Data Visualization": "📊",
    DevTool: "🛠️",
    SaaS: "☁️",
  }
  return icons[category] || "💡"
}

export function getStarLabel(stars: number): string {
  if (stars >= 5) return "🔥 Viral Potential"
  if (stars >= 4) return "⭐ High Impact"
  if (stars >= 3) return "✨ Good Project"
  if (stars >= 2) return "📦 Solid Build"
  return "🌱 Good Start"
}

export function exportIdeasAsMarkdown(ideas: ProjectIdea[]): string {
  return ideas
    .map(
      (idea) => `## ${idea.title}

> ${idea.tagline}

**Difficulty:** ${idea.difficulty} | **Category:** ${idea.category} | **Time:** ${idea.timeEstimate}

### Description
${idea.description}

### Why Build This?
${idea.whyBuildThis}

### Tech Stack
${idea.techStack.map((t) => `- ${t}`).join("\n")}

### Key Features
${idea.features.map((f) => `- ${f}`).join("\n")}

${idea.apiNeeded ? `### APIs Needed\n${idea.apis?.map((a) => `- ${a}`).join("\n")}` : ""}

---`
    )
    .join("\n\n")
}

export function exportIdeasAsJSON(ideas: ProjectIdea[]): string {
  return JSON.stringify(ideas, null, 2)
}
