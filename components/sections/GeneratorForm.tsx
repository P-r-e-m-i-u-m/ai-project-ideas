"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, Loader2, ChevronDown } from "lucide-react"
import { useIdeasStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import type { Difficulty, Category } from "@/types"

const DIFFICULTIES: (Difficulty | "All")[] = [
  "All", "Beginner", "Intermediate", "Advanced",
]

const CATEGORIES: (Category | "All")[] = [
  "All", "Web App", "Mobile App", "AI/ML", "CLI Tool",
  "API", "Browser Extension", "Game", "Data Visualization", "DevTool", "SaaS",
]

const POPULAR_TOPICS = [
  "productivity", "AI tools", "social media", "finance",
  "health & fitness", "education", "e-commerce", "developer tools",
]

export function GeneratorForm() {
  const [topic, setTopic] = useState("")
  const [difficulty, setDifficulty] = useState<Difficulty | "All">("All")
  const [category, setCategory] = useState<Category | "All">("All")
  const [count, setCount] = useState(6)

  const { setIdeas, setLoading, setError, isLoading, clearIdeas } = useIdeasStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!topic.trim() || isLoading) return

    clearIdeas()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/generate-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim(), difficulty, category, count }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Something went wrong")
        return
      }

      setIdeas(data.ideas)
    } catch {
      setError("Network error. Please check your connection.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass rounded-2xl p-6 md:p-8"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Topic input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            What do you want to build around?
          </label>
          <div className="relative">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder='e.g. "AI productivity", "social media analytics", "dev tools"'
              className={cn(
                "w-full px-4 py-3.5 rounded-xl text-sm",
                "bg-white/5 border border-white/10",
                "text-foreground placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
                "transition-all duration-200"
              )}
              disabled={isLoading}
            />
          </div>

          {/* Quick topic chips */}
          <div className="flex flex-wrap gap-2 pt-1">
            {POPULAR_TOPICS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTopic(t)}
                className={cn(
                  "text-xs px-3 py-1 rounded-full border transition-all duration-200",
                  topic === t
                    ? "bg-primary/20 border-primary/40 text-primary"
                    : "bg-white/5 border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/10"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Filters row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Difficulty */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Difficulty
            </label>
            <div className="relative">
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty | "All")}
                className={cn(
                  "w-full px-4 py-2.5 rounded-xl text-sm appearance-none cursor-pointer",
                  "bg-white/5 border border-white/10",
                  "text-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50",
                  "transition-all duration-200"
                )}
                disabled={isLoading}
              >
                {DIFFICULTIES.map((d) => (
                  <option key={d} value={d} className="bg-[#1a1f35]">{d}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category | "All")}
                className={cn(
                  "w-full px-4 py-2.5 rounded-xl text-sm appearance-none cursor-pointer",
                  "bg-white/5 border border-white/10",
                  "text-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50",
                  "transition-all duration-200"
                )}
                disabled={isLoading}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-[#1a1f35]">{c}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Count */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Number of ideas: {count}
            </label>
            <input
              type="range"
              min={1}
              max={10}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
              disabled={isLoading}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1</span>
              <span>10</span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!topic.trim() || isLoading}
          className={cn(
            "w-full py-3.5 rounded-xl text-sm font-semibold",
            "flex items-center justify-center gap-2",
            "btn-primary glow-primary",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none",
            "transition-all duration-300"
          )}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating ideas...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate {count} Ideas
            </>
          )}
        </button>
      </form>
    </motion.div>
  )
}
