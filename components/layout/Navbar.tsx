"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sparkles, BookmarkCheck, Github } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIdeasStore } from "@/lib/store"

const navLinks = [
  { href: "/", label: "Generator" },
  { href: "/ideas", label: "Saved Ideas" },
  { href: "/about", label: "About" },
]

export function Navbar() {
  const pathname = usePathname()
  const savedIdeas = useIdeasStore((s) => s.savedIdeas)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="glass border-b border-white/5 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg btn-primary flex items-center justify-center glow-primary transition-all group-hover:scale-110">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-foreground hidden sm:block">
              Idea<span className="gradient-text">Gen</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  pathname === link.href
                    ? "text-foreground bg-white/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                {link.label}
                {link.href === "/ideas" && savedIdeas.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full btn-primary text-[10px] flex items-center justify-center text-white font-bold">
                    {savedIdeas.length}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <Link
              href="https://github.com/P-r-e-m-i-u-m"
              target="_blank"
              className="glass glass-hover w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground"
            >
              <Github className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
