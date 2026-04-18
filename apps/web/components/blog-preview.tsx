import { RiArrowRightLine } from "@remixicon/react"
import { getPosts } from "@/lib/blog-store"
import type { BlogPost } from "@/lib/blog-store"

export type { BlogPost }

export async function BlogPreview() {
  const posts = await getPosts("published")
  const featured = posts.slice(0, 3)

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
          {featured.map((post) => (
            <article
              key={post.slug}
              className="group rounded-2xl border border-border/60 bg-card flex flex-col overflow-hidden hover:border-border transition-colors duration-150"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
            >
              <div className="h-44 border-b border-border/60 overflow-hidden relative">
                {post.imageUrl ? (
                  <img
                    src={post.imageUrl}
                    alt={post.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-muted/40 flex items-center justify-center">
                    <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-primary/8 text-primary border border-primary/20">
                      {post.tag}
                    </span>
                  </div>
                )}
                {post.imageUrl && (
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-sm text-foreground border border-border/60">
                      {post.tag}
                    </span>
                  </div>
                )}
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
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{post.excerpt}</p>
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
          <a href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150">
            All posts <RiArrowRightLine size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
