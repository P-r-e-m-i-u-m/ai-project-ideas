"use client"

import { motion } from "framer-motion"
import { Sparkles, Zap, Star, Users } from "lucide-react"

const stats = [
  { icon: Zap, label: "Ideas generated", value: "50K+" },
  { icon: Star, label: "GitHub stars", value: "2.1K" },
  { icon: Users, label: "Developers", value: "8K+" },
]

export function HeroSection() {
  return (
    <div className="text-center space-y-8 pt-8">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-muted-foreground border border-white/10"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        Powered by GPT-4o, Claude 3.5 & Gemini 1.5
      </motion.div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
          Generate{" "}
          <span className="gradient-text">Portfolio-Worthy</span>
          <br />
          Project Ideas with AI
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Stop staring at a blank page. Get unique, buildable project ideas tailored to
          your skill level — complete with tech stack, features, and time estimates.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-center gap-8 flex-wrap"
      >
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon className="w-4 h-4 text-primary" />
            <span className="font-semibold text-foreground">{value}</span>
            <span>{label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
