"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Filter, Download, RefreshCw, AlertCircle } from "lucide-react"
import { useIdeasStore } from "@/lib/store"
import { IdeaCard } from "@/components/ui/IdeaCard"
import { SkeletonGrid } from "@/components/ui/Skeleton"
import { exportIdeasAsMarkdown, exportIdeasAsJSON, cn } from "@/lib/utils"
import type { Difficulty, Category } from "@/types"

const DIFFICULTIES: (Difficulty | "All")[] = ["All", "Beginner", "Intermediate", "Advanced"]
const CATEGORIES: (Category | "All")[] = [
  "All", "Web App", "Mobile App", "AI/ML", "CLI Tool",
  "API", "Browser Extension", "Game", "Data Visualization", "DevTool", "SaaS",
]

export function IdeasGrid() {
  const {
    isLoading,
    error,
    ideas,
    filters,
    setFilters,
    clearIdeas,
    filteredIdeas,
  } = useIdeasStore()

  const filtered = filteredIdeas()

  function downloadFile(content: string, filename: string, type: string) {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <RefreshCw className="w-4 h-4 animate-spin" />
          Generating your ideas with AI...
        </div>
        <SkeletonGrid count={6} />
      </motion.div>
    )
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-8 flex flex-col items-center gap-4 text-center"
      >
        <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center">
          <AlertCircle className="w-6 h-6 text-rose-400" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground mb-1">Something went wrong</h3>
          <p className="text-sm text-muted-foreground max-w-md">{error}</p>
        </div>
        <button
          onClick={clearIdeas}
          className="text-sm glass px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
        >
          Try again
        </button>
      </motion.div>
    )
  }

  if (ideas.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Showing <span className="text-foreground font-medium">{filtered.length}</span> of{" "}
            {ideas.length} ideas
          </span>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2">
          {DIFFICULTIES.filter((d) => d !== "All").map((d) => (
            <button
              key={d}
              onClick={() =>
                setFilters({ difficulty: filters.difficulty === d ? "All" : d })
              }
              className={cn(
                "text-xs px-3 py-1 rounded-full border transition-all duration-200",
                filters.difficulty === d
                  ? "bg-primary/20 border-primary/40 text-primary"
                  : "bg-white/5 border-white/10 text-muted-foreground hover:text-foreground"
              )}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Export buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              downloadFile(
                exportIdeasAsMarkdown(filtered),
                "project-ideas.md",
                "text/markdown"
              )
            }
            className="flex items-center gap-1.5 text-xs glass px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            MD
          </button>
          <button
            onClick={() =>
              downloadFile(
                exportIdeasAsJSON(filtered),
                "project-ideas.json",
                "application/json"
              )
            }
            className="flex items-center gap-1.5 text-xs glass px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            JSON
          </button>
        </div>
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-2xl p-10 text-center"
          >
            <p className="text-muted-foreground text-sm">
              No ideas match your filters. Try adjusting them.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((idea, i) => (
              <IdeaCard key={idea.id} idea={idea} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
