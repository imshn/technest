"use client"

import { useState, useMemo, useTransition } from "react"
import {
  RiSearchLine,
  RiArrowRightLine,
  RiCloseLine,
  RiTimeLine,
  RiCalendarLine,
  RiArrowLeftLine,
} from "@remixicon/react"

const BLOG_API = "https://imshn.cloud/api/blog"

export type ApiPost = {
  slug: string
  title: string
  excerpt: string
  imageUrl?: string | null
  imageAlt?: string
  tag?: string
  date?: string
  readTime?: string
}

export type Pagination = {
  total: number
  page: number
  limit: number
  totalPages: number
}

type Props = {
  initialPosts: ApiPost[]
  initialPagination: Pagination
}

function normalize(str: string) {
  return str.toLowerCase()
}

export function BlogIndex({ initialPosts, initialPagination }: Props) {
  const [posts, setPosts] = useState<ApiPost[]>(initialPosts)
  const [pagination, setPagination] = useState<Pagination>(initialPagination)
  const [query, setQuery] = useState("")
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const allTags = useMemo(
    () => [...new Set(posts.map((p) => p.tag).filter(Boolean) as string[])],
    [posts]
  )

  const filtered = useMemo(() => {
    let result = posts
    if (activeTag) result = result.filter((p) => p.tag === activeTag)
    if (query) {
      const q = normalize(query)
      result = result.filter(
        (p) =>
          normalize(p.title).includes(q) ||
          normalize(p.excerpt).includes(q) ||
          normalize(p.tag ?? "").includes(q)
      )
    }
    return result
  }, [posts, query, activeTag])

  const hasFilter = query.length > 0 || !!activeTag

  async function fetchPage(page: number) {
    startTransition(async () => {
      try {
        const res = await fetch(`${BLOG_API}?page=${page}&limit=${pagination.limit}`)
        if (!res.ok) return
        const json = await res.json()
        setPosts(json.data ?? [])
        setPagination(json.pagination)
        setQuery("")
        setActiveTag(null)
        window.scrollTo({ top: 0, behavior: "smooth" })
      } catch {
        // keep existing state on error
      }
    })
  }

  const clearFilters = () => {
    setQuery("")
    setActiveTag(null)
  }

  return (
    <div className="max-w-350 mx-auto px-6 md:px-10">
      {/* Header */}
      <div className="pt-12 pb-10 border-b border-border/60">
        <p className="text-xs font-medium text-primary tracking-widest uppercase mb-3">TechNest Blog</p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-foreground mb-8">
          Insights on AI,<br className="hidden sm:block" /> automation, and software.
        </h1>

        <div className="relative max-w-135 mb-5">
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

        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-150 ${
                !activeTag
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted/40 text-muted-foreground border-border/60 hover:border-primary/40 hover:text-foreground"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-150 ${
                  activeTag === tag
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted/40 text-muted-foreground border-border/60 hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div className={`pt-10 transition-opacity duration-200 ${isPending ? "opacity-50 pointer-events-none" : ""}`}>
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
              Clear filters
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
              <PostCard key={post.slug} post={post} featured={i === 0 && !hasFilter && pagination.page === 1} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!hasFilter && pagination.totalPages > 1 && (
          <div className="mt-12 flex items-center justify-between gap-4">
            <button
              onClick={() => fetchPage(pagination.page - 1)}
              disabled={pagination.page <= 1 || isPending}
              className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl border border-border/60 bg-card text-muted-foreground hover:text-foreground hover:border-border transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <RiArrowLeftLine size={14} />
              Previous
            </button>

            <span className="text-sm text-muted-foreground">
              Page <span className="font-medium text-foreground">{pagination.page}</span> of{" "}
              <span className="font-medium text-foreground">{pagination.totalPages}</span>
            </span>

            <button
              onClick={() => fetchPage(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages || isPending}
              className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl border border-border/60 bg-card text-muted-foreground hover:text-foreground hover:border-border transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next
              <RiArrowRightLine size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function PostCard({ post, featured }: { post: ApiPost; featured: boolean }) {
  return (
    <article
      className={`group rounded-2xl border border-border/60 bg-card flex flex-col overflow-hidden hover:border-border transition-all duration-200 ${
        featured ? "sm:col-span-2" : ""
      }`}
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
    >
      <div className={`overflow-hidden relative border-b border-border/60 ${featured ? "h-64" : "h-44"}`}>
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt={post.imageAlt ?? post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-muted/60 to-muted/20 flex items-center justify-center">
            {post.tag && (
              <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-primary/8 text-primary border border-primary/20">
                {post.tag}
              </span>
            )}
          </div>
        )}
        {post.imageUrl && post.tag && (
          <div className="absolute top-3 left-3">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-background/85 backdrop-blur-sm text-foreground border border-border/60">
              {post.tag}
            </span>
          </div>
        )}
      </div>

      <div className={`flex flex-col gap-3 flex-1 ${featured ? "p-7" : "p-6"}`}>
        {(post.date || post.readTime) && (
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {post.date && (
              <span className="flex items-center gap-1">
                <RiCalendarLine size={11} />
                {post.date}
              </span>
            )}
            {post.date && post.readTime && <span className="w-px h-3 bg-border" />}
            {post.readTime && (
              <span className="flex items-center gap-1">
                <RiTimeLine size={11} />
                {post.readTime}
              </span>
            )}
          </div>
        )}

        <h2
          className={`font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-150 ${
            featured ? "text-base md:text-lg" : "text-sm"
          }`}
        >
          {post.title}
        </h2>

        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{post.excerpt}</p>

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
