const inter = Inter({ subsets: ["latin"] })
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "AI Project Ideas Generator | Build Portfolio-Worthy Projects",
  description:
    "Generate unique, buildable AI-powered project ideas for your portfolio. Filter by difficulty, category, and tech stack.",
  keywords: ["AI", "project ideas", "developer portfolio", "Next.js", "TypeScript"],
  openGraph: {
    title: "AI Project Ideas Generator",
    description: "Generate unique, buildable project ideas powered by AI",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased">
        <div className="mesh-bg">
          <div className="mesh-orb" />
        </div>
        {children}
      </body>
    </html>
  )
}
