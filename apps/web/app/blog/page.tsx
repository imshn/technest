import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BlogIndex } from "@/components/blog-index"
import { getPosts } from "@/lib/blog-store"

export const metadata: Metadata = {
  title: "Blog — AI Automation & Software Development Insights | TechNest",
  description:
    "Practical articles on multi-agent AI systems, N8n automation, SaaS development, and scaling businesses with software. Written by the TechNest team.",
  alternates: { canonical: "https://technestsolutions.in/blog" },
}

export default async function BlogPage() {
  const posts = await getPosts("published")
  return (
    <>
      <Navbar />
      <main className="min-h-dvh pt-24 pb-24">
        <BlogIndex posts={posts} />
      </main>
      <Footer />
    </>
  )
}
