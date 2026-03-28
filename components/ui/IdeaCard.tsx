"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Bookmark,
  BookmarkCheck,
  Clock,
  Star,
  ChevronDown,
  ChevronUp,
  Zap,
} from "lucide-react"
import { type ProjectIdea } from "@/types"
import { useIdeasStore } from "@/lib/store"
import {
  cn,
  getDifficultyColor,
  getCategoryIcon,
  getStarLabel,
} from "@/lib/utils"

interface IdeaCardProps {
  idea: ProjectIdea
  index: number
}

export function IdeaCard({ idea, index }: IdeaCardProps) {
  const [expanded, setExpanded] = useState(false)
  const { saveIdea, unsaveIdea, isSaved } = useIdeasStore()
  const saved = isSaved(idea.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="glass glass-hover rounded-2xl p-6 flex flex-col gap-4 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{getCategoryIcon(idea.category)}</span>
            <h3 className="font-semibold text-foreground text-base leading-snug truncate">
              {idea.title}
            </h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
            {idea.tagline}
          </p>
        </div>

        <button
          onClick={() => (saved ? unsaveIdea(idea.id) : saveIdea(idea))}
          className={cn(
            "flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200",
            saved
              ? "bg-primary/20 text-primary"
              : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
          )}
          title={saved ? "Remove from saved" : "Save idea"}
        >
          {saved ? (
            <BookmarkCheck className="w-4 h-4" />
          ) : (
            <Bookmark className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <span
          className={cn(
            "text-xs px-2.5 py-1 rounded-full border font-medium",
            getDifficultyColor(idea.difficulty)
          )}
        >
          {idea.difficulty}
        </span>
        <span className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground border border-white/5">
          {idea.category}
        </span>
        <span className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground border border-white/5 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {idea.timeEstimate}
        </span>
      </div>

      {/* Star potential */}
      <div className="flex items-center gap-1.5">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-3.5 h-3.5",
                i < idea.starPotential
                  ? "text-amber-400 fill-amber-400"
                  : "text-white/10"
              )}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          {getStarLabel(idea.starPotential)}
        </span>
      </div>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5">
        {idea.techStack.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="text-xs px-2 py-0.5 rounded-md bg-primary/10 text-primary/80 border border-primary/10 font-mono"
          >
            {tech}
          </span>
        ))}
        {idea.techStack.length > 5 && (
          <span className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-muted-foreground">
            +{idea.techStack.length - 5} more
          </span>
        )}
      </div>

      {/* Expandable section */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          expanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="pt-3 border-t border-white/5 space-y-4">
          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Description
            </h4>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {idea.description}
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Key Features
            </h4>
            <ul className="space-y-1.5">
              {idea.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-foreground/80">
                  <Zap className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Why build this */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Why Build This?
            </h4>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {idea.whyBuildThis}
            </p>
          </div>

          {/* APIs needed */}
          {idea.apiNeeded && idea.apis && idea.apis.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                APIs / Services
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {idea.apis.map((api) => (
                  <span
                    key={api}
                    className="text-xs px-2 py-0.5 rounded-md bg-accent/10 text-accent border border-accent/10"
                  >
                    {api}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <span className="text-xs text-muted-foreground">
          {idea.apiNeeded ? "🔌 Needs APIs" : "🔓 No API needed"}
        </span>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 glass px-3 py-1.5 rounded-lg"
        >
          {expanded ? (
            <>Less <ChevronUp className="w-3.5 h-3.5" /></>
          ) : (
            <>Details <ChevronDown className="w-3.5 h-3.5" /></>
          )}
        </button>
      </div>
    </motion.div>
  )
}
