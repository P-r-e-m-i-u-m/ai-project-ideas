"use client"

import { motion } from "framer-motion"
import { Github, Sparkles, Code2, Zap, Shield } from "lucide-react"
import { Navbar } from "@/components/layout/Navbar"

const features = [
  {
    icon: Sparkles,
    title: "Multi-Provider AI",
    description:
      "Supports OpenAI GPT-4o, Anthropic Claude 3.5, and Google Gemini 1.5. Swap providers with a single env variable.",
  },
  {
    icon: Code2,
    title: "Full Tech Stack",
    description:
      "Every idea includes a curated tech stack, time estimate, key features, and star potential rating.",
  },
  {
    icon: Zap,
    title: "Export Anywhere",
    description:
      "Export your ideas as Markdown or JSON. Save your favourites and come back to them anytime.",
  },
  {
    icon: Shield,
    title: "Open Source",
    description:
      "Fully open source under MIT license. Self-host it, fork it, or contribute your own improvements.",
  },
]

const stack = [
  "Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion",
  "Zustand", "OpenAI SDK", "Anthropic SDK", "Vercel",
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 md:px-8 pt-28 pb-20 space-y-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            About <span className="gradient-text">IdeaGen</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A free, open-source tool that helps developers stop overthinking and
            start building. Built by{" "}
            <a
              href="https://github.com/P-r-e-m-i-u-m"
              target="_blank"
              className="text-primary hover:underline"
            >
              @P-r-e-m-i-u-m
            </a>
            .
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="glass glass-hover rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl btn-primary flex items-center justify-center">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-8 space-y-4"
        >
          <h2 className="text-xl font-semibold text-foreground">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {stack.map((tech) => (
              <span
                key={tech}
                className="text-sm px-3 py-1.5 rounded-lg bg-primary/10 text-primary/80 border border-primary/10 font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center space-y-4"
        >
          <h2 className="text-2xl font-bold text-foreground">
            Want to contribute?
          </h2>
          <p className="text-muted-foreground">
            PRs are welcome. Star the repo if this helped you.
          </p>
          <a
            href="https://github.com/P-r-e-m-i-u-m/ai-project-ideas"
            target="_blank"
            className="inline-flex items-center gap-2 btn-primary px-6 py-3 rounded-xl text-sm font-medium text-white"
          >
            <Github className="w-4 h-4" />
            View on GitHub
          </a>
        </motion.div>
      </main>
    </div>
  )
}
