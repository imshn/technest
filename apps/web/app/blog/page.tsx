import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BlogIndex } from "@/components/blog-index"
import type { ApiPost, Pagination } from "@/components/blog-index"

const BLOG_API = "https://imshn.cloud/api/blog"

export const metadata: Metadata = {
  title: "Blog — AI Automation & Software Development Insights",
  description:
    "Practical articles on multi-agent AI systems, N8n automation, SaaS development, and scaling businesses with software. Written by the TechNest team.",
  alternates: { canonical: "https://technestsolutions.in/blog" },
}

export default async function BlogPage() {
  let initialPosts: ApiPost[] = []
  let initialPagination: Pagination = { total: 0, page: 1, limit: 6, totalPages: 1 }

  try {
    const res = await fetch(`${BLOG_API}?page=1&limit=6`, {
      next: { revalidate: 60 },
    })
    if (res.ok) {
      const json = await res.json()
      initialPosts = json.data ?? []
      initialPagination = json.pagination ?? initialPagination
    }
  } catch {
    // render empty state client-side
  }

  return (
    <>
      <Navbar />
      <main className="min-h-dvh pt-24 pb-24">
        <div className="max-w-350 mx-auto px-6 md:px-10">
          <nav aria-label="Breadcrumb" className="pt-10 pb-2 flex items-center gap-2 text-xs text-muted-foreground">
            <a href="/" className="hover:text-foreground transition-colors duration-150">Home</a>
            <span className="text-border">/</span>
            <span className="text-foreground font-medium">Blog</span>
          </nav>
        </div>
        <BlogIndex initialPosts={initialPosts} initialPagination={initialPagination} />
      </main>
      <Footer />
    </>
  )
}
