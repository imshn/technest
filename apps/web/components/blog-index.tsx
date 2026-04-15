"use client"

import { useState, useMemo } from "react"
import { RiSearchLine, RiArrowRightLine, RiCloseLine } from "@remixicon/react"
import type { BlogPost } from "@/components/blog-preview"

function normalize(str: string) {
  return str.toLowerCase()
}

export function BlogIndex({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = normalize(query)
    if (!q) return posts
    return posts.filter(
      (p) =>
        normalize(p.title).includes(q) ||
        normalize(p.excerpt).includes(q) ||
        normalize(p.tag).includes(q)
    )
  }, [posts, query])

  const clearFilters = () => setQuery("")

  const hasFilter = query.length > 0

  return (
    <div className="max-w-350 mx-auto px-6 md:px-10">
      {/* Page header */}
      <div className="pt-12 pb-10 border-b border-border/60">
        <p className="text-xs font-medium text-primary tracking-widest uppercase mb-3">TechNest Blog</p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-foreground mb-8">
          Insights on AI,<br className="hidden sm:block" /> automation, and software.
        </h1>

        {/* Search bar */}
        <div className="relative max-w-[540px]">
          <RiSearchLine
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles by title, topic, or keyword..."
            className="w-full h-11 pl-10 pr-10 rounded-xl border border-border/70 bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-150"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <RiCloseLine size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Body: full-width post grid */}
      <div className="pt-10">
        {hasFilter && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              {filtered.length === 0
                ? "No articles matched"
                : `${filtered.length} article${filtered.length === 1 ? "" : "s"} found`}
              {query && (
                <span className="ml-1">
                  for <span className="font-medium text-foreground">&ldquo;{query}&rdquo;</span>
                </span>
              )}
            </p>
            <button
              onClick={clearFilters}
              className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Clear
            </button>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="py-20 flex flex-col items-center gap-3 text-center">
            <p className="text-sm font-medium text-foreground">No articles found</p>
            <p className="text-sm text-muted-foreground max-w-[36ch]">
              Try a different keyword or browse by topic.
            </p>
            <button
              onClick={clearFilters}
              className="mt-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Show all articles
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((post, i) => (
              <PostCard key={post.slug} post={post} featured={i === 0 && !hasFilter} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function PostCard({ post, featured }: { post: BlogPost; featured: boolean }) {
  return (
    <article
      className={`group rounded-2xl border border-border/60 bg-card flex flex-col overflow-hidden hover:border-border transition-colors duration-150 ${
        featured ? "sm:col-span-2" : ""
      }`}
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
    >
      {/* Cover placeholder */}
      <div
        className={`bg-muted/40 border-b border-border/60 flex items-center justify-center ${
          featured ? "h-52" : "h-40"
        }`}
      >
        <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-primary/8 text-primary border border-primary/20">
          {post.tag}
        </span>
      </div>

      <div className={`flex flex-col gap-3 flex-1 ${featured ? "p-7" : "p-6"}`}>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{post.date}</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span>{post.readTime}</span>
        </div>

        <h2
          className={`font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-150 ${
            featured ? "text-base" : "text-sm"
          }`}
        >
          {post.title}
        </h2>

        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {post.excerpt}
        </p>

        <a
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:gap-2.5 transition-all duration-150 mt-1"
        >
          Read more <RiArrowRightLine size={13} />
        </a>
      </div>
    </article>
  )
}
