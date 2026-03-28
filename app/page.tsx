import { Navbar } from "@/components/layout/Navbar"
import { HeroSection } from "@/components/sections/HeroSection"
import { GeneratorForm } from "@/components/sections/GeneratorForm"
import { IdeasGrid } from "@/components/sections/IdeasGrid"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 md:px-8 pt-28 pb-20 space-y-12">
        <HeroSection />
        <GeneratorForm />
        <IdeasGrid />
      </main>

      <footer className="border-t border-white/5 py-8 text-center text-sm text-muted-foreground">
        <p>
          Built by{" "}
          <a
            href="https://github.com/P-r-e-m-i-u-m"
            target="_blank"
            className="text-primary hover:underline"
          >
            @P-r-e-m-i-u-m
          </a>{" "}
          · Open source on{" "}
          <a
            href="https://github.com/P-r-e-m-i-u-m/ai-project-ideas"
            target="_blank"
            className="text-primary hover:underline"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  )
}
