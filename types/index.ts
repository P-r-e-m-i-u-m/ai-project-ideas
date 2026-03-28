export type Difficulty = "Beginner" | "Intermediate" | "Advanced"
export type Category =
  | "Web App"
  | "Mobile App"
  | "AI/ML"
  | "CLI Tool"
  | "API"
  | "Browser Extension"
  | "Game"
  | "Data Visualization"
  | "DevTool"
  | "SaaS"

export type AIProvider = "openai" | "anthropic" | "google"

export interface ProjectIdea {
  id: string
  title: string
  tagline: string
  description: string
  difficulty: Difficulty
  category: Category
  techStack: string[]
  features: string[]
  timeEstimate: string
  whyBuildThis: string
  apiNeeded: boolean
  apis?: string[]
  starPotential: 1 | 2 | 3 | 4 | 5
}

export interface GenerateIdeasRequest {
  topic: string
  difficulty: Difficulty | "All"
  category: Category | "All"
  count: number
  provider?: AIProvider
}

export interface GenerateIdeasResponse {
  ideas: ProjectIdea[]
  provider: AIProvider
  generatedAt: string
}

export interface FilterState {
  difficulty: Difficulty | "All"
  category: Category | "All"
  apiNeeded: boolean | "All"
  minStars: number
}
