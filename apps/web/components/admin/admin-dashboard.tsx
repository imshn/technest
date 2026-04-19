"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { BlogPost } from "@/lib/blog-store"
import { RiAddLine, RiEditLine, RiDeleteBinLine, RiExternalLinkLine, RiLogoutBoxLine } from "@remixicon/react"

export function AdminDashboard({ posts }: { posts: BlogPost[] }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState<string | null>(null)

  const published = posts.filter((p) => p.status === "published").length
  const drafts = posts.filter((p) => p.status === "draft").length

  async function handleDelete(slug: string) {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return
    setDeleting(slug)
    await fetch(`/api/blog/${slug}`, {
      method: "DELETE",
      headers: { "x-api-key": "" }, // server reads from env
    })
    router.refresh()
    setDeleting(null)
  }

  async function handleTogglePublish(post: BlogPost) {
    const newStatus = post.status === "published" ? "draft" : "published"
    await fetch(`/api/blog/${post.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-api-key": "" },
      body: JSON.stringify({ status: newStatus }),
    })
    router.refresh()
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
  }

  return (
    <div className="min-h-dvh bg-background">
      {/* Top bar */}
      <header className="border-b border-border/60 bg-card">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-primary tracking-widest uppercase">TechNest</span>
            <span className="text-border">·</span>
            <span className="text-sm font-medium text-foreground">Blog Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/blog"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              View blog <RiExternalLinkLine size={12} />
            </a>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <RiLogoutBoxLine size={13} /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: "Total posts", value: posts.length },
            { label: "Published", value: published },
            { label: "Drafts", value: drafts },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-xl border border-border/60 bg-card p-5">
              <p className="text-2xl font-semibold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Header + New Post button */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-semibold text-foreground">All Posts</h1>
          <a
            href="/admin/posts/new"
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
          >
            <RiAddLine size={14} /> New Post
          </a>
        </div>

        {/* Posts table */}
        {posts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-sm text-muted-foreground">No posts yet.</p>
            <a href="/admin/posts/new" className="mt-3 text-xs font-medium text-primary">
              Create your first post →
            </a>
          </div>
        ) : (
          <div className="rounded-xl border border-border/60 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60 bg-muted/30">
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Title</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 w-28">Tag</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 w-28">Date</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 w-24">Status</th>
                  <th className="text-right text-xs font-medium text-muted-foreground px-5 py-3 w-32">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.slug} className="border-b border-border/40 last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-medium text-foreground leading-snug line-clamp-1">{post.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">/blog/{post.slug}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/8 text-primary border border-primary/20">
                        {post.tag}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs text-muted-foreground whitespace-nowrap">{post.date}</td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => handleTogglePublish(post)}
                        className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-colors ${
                          post.status === "published"
                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20"
                            : "bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/20"
                        }`}
                      >
                        {post.status}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/admin/posts/${post.slug}`}
                          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <RiEditLine size={13} /> Edit
                        </a>
                        <button
                          onClick={() => handleDelete(post.slug)}
                          disabled={deleting === post.slug}
                          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-red-500 transition-colors disabled:opacity-50"
                        >
                          <RiDeleteBinLine size={13} />
                        </button>
                        {post.status === "published" && (
                          <a
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <RiExternalLinkLine size={12} />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* API hint */}
        <div className="mt-10 rounded-xl border border-border/60 bg-muted/20 p-5">
          <p className="text-xs font-medium text-foreground mb-2">OpenClaw API Access</p>
          <p className="text-xs text-muted-foreground mb-3">
            Point OpenClaw at VPS API. Full schema at:
          </p>
          <code className="text-xs bg-muted px-3 py-1.5 rounded-lg text-foreground select-all block">
            GET https://imshn.cloud/api/blog?schema=1
          </code>
          <p className="text-xs text-muted-foreground mt-3">
            Authenticate write requests with <code className="bg-muted px-1 rounded text-xs">x-api-key: BLOG_API_KEY</code>
          </p>
        </div>
      </main>
    </div>
  )
}
