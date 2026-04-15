import { RiArrowRightLine } from "@remixicon/react"

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tag: string
}

// Add your posts here — they will appear on the homepage and be linked to /blog/[slug]
export const blogPosts: BlogPost[] = [
  {
    slug: "post-1",
    title: "How to Build a Multi-Agent AI System That Actually Works in Production",
    excerpt: "Most multi-agent demos fall apart in production. Here's the architecture — orchestration, memory, tool routing, and failure handling — that makes them reliable.",
    date: "Apr 10, 2025",
    readTime: "8 min read",
    tag: "AI Automation",
  },
  {
    slug: "post-2",
    title: "N8n vs Zapier vs Make: The Honest Comparison for 2025",
    excerpt: "We've run all three at scale. This breakdown covers pricing, limits, self-hosting, and the specific cases where each tool wins — and where it breaks.",
    date: "Apr 3, 2025",
    readTime: "6 min read",
    tag: "N8n",
  },
  {
    slug: "post-3",
    title: "SaaS MVP in 6 Weeks: The Tech Stack and Process We Use Every Time",
    excerpt: "Next.js, Supabase, Stripe, and a deployment pipeline you can hand off. This is the exact stack and week-by-week process we use to ship production SaaS from zero.",
    date: "Mar 25, 2025",
    readTime: "7 min read",
    tag: "SaaS",
  },
]

export function BlogPreview() {
  return (
    <section className="py-24 md:py-32 border-t border-border/60">
      <div className="max-w-350 mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-medium text-primary tracking-widest uppercase mb-3">From the Blog</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-foreground">
              Insights on AI<br />and automation.
            </h2>
          </div>
          <a
            href="/blog"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150 shrink-0 mb-1"
          >
            All posts <RiArrowRightLine size={14} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group rounded-2xl border border-border/60 bg-card flex flex-col overflow-hidden hover:border-border transition-colors duration-150"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
            >
              {/* Placeholder cover area */}
              <div className="h-44 bg-muted/40 border-b border-border/60 flex items-center justify-center">
                <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-primary/8 text-primary border border-primary/20">
                  {post.tag}
                </span>
              </div>

              <div className="p-6 flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-150">
                  {post.title}
                </h3>

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
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            All posts <RiArrowRightLine size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
