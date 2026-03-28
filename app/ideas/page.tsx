"use client"

import { motion } from "framer-motion"
import { BookmarkCheck, Trash2, Download } from "lucide-react"
import { Navbar } from "@/components/layout/Navbar"
import { IdeaCard } from "@/components/ui/IdeaCard"
import { useIdeasStore } from "@/lib/store"
import { exportIdeasAsMarkdown, exportIdeasAsJSON } from "@/lib/utils"

export default function SavedIdeasPage() {
  const { savedIdeas, unsaveIdea } = useIdeasStore()

  function downloadFile(content: string, filename: string, type: string) {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 md:px-8 pt-28 pb-20 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl btn-primary flex items-center justify-center">
              <BookmarkCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Saved Ideas</h1>
              <p className="text-sm text-muted-foreground">
                {savedIdeas.length} idea{savedIdeas.length !== 1 ? "s" : ""} saved
              </p>
            </div>
          </div>

          {savedIdeas.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  downloadFile(
                    exportIdeasAsMarkdown(savedIdeas),
                    "saved-ideas.md",
                    "text/markdown"
                  )
                }
                className="flex items-center gap-2 glass px-4 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Download className="w-4 h-4" />
                Export MD
              </button>
              <button
                onClick={() =>
                  downloadFile(
                    exportIdeasAsJSON(savedIdeas),
                    "saved-ideas.json",
                    "application/json"
                  )
                }
                className="flex items-center gap-2 glass px-4 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Download className="w-4 h-4" />
                Export JSON
              </button>
            </div>
          )}
        </motion.div>

        {/* Empty state */}
        {savedIdeas.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass rounded-2xl p-16 text-center space-y-4"
          >
            <div className="text-5xl">🔖</div>
            <h2 className="text-xl font-semibold text-foreground">No saved ideas yet</h2>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
              Generate ideas on the home page and bookmark the ones you love.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 btn-primary px-6 py-2.5 rounded-xl text-sm font-medium text-white mt-2"
            >
              Generate Ideas
            </a>
          </motion.div>
        )}

        {/* Ideas grid */}
        {savedIdeas.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedIdeas.map((idea, i) => (
              <IdeaCard key={idea.id} idea={idea} index={i} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
