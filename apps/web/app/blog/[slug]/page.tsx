import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CalendlyButton } from "@/components/calendly-button"
import { bloghareButtons } from "@/components/blog-share-buttons"
import { RelatedContent, getRelatedServices, getRelatedContent } from "@/components/related-content"
import { RiArrowLeftLine, RiArrowRightLine, RiCalendarLine, RiTimeLine } from "@remixicon/react"
import { getPosts, getPost } from "@/lib/blog-store"

const siteUrl = "https://technestsolutions.in"

export async function generateStaticParams() {
  const posts = await getPosts("published")
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await props.params
  const meta = await getPost(slug)
  if (!meta) return {}

  const canonical = `${siteUrl}/blog/${slug}`

  return {
    title: `${meta.title} | TechNest Blog`,
    description: meta.seoExcerpt || meta.excerpt,
    keywords: [meta.tag, "AI automation", "workflow automation", "TechNest", "agentic AI", "n8n automation"],
    authors: [{ name: "TechNest", url: siteUrl }],
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: meta.title,
      description: meta.seoExcerpt || meta.excerpt,
      siteName: "TechNest",
      tags: [meta.tag],
      ...(meta.imageUrl ? { images: [{ url: meta.imageUrl, alt: meta.imageAlt }] } : {}),
    },
    twitter: {
      card: meta.imageUrl ? "summary_large_image" : "summary",
      title: meta.title,
      description: meta.seoExcerpt || meta.excerpt,
      site: "@technest",
      creator: "@technest",
      ...(meta.imageUrl ? { images: [meta.imageUrl] } : {}),
    },
  }
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const meta = await getPost(slug)
  if (!meta) notFound()

  const canonical = `${siteUrl}/blog/${slug}`
  const allPosts = await getPosts("published")
  const allTags = Array.from(new Set(allPosts.map((p) => p.tag)))
  const recentPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 2)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.seoExcerpt || meta.excerpt,
    keywords: [meta.tag, "AI automation", "TechNest"],
    url: canonical,
    datePublished: meta.date,
    dateModified: meta.date,
    inLanguage: "en",
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    ...(meta.featuredImage?.url || meta.imageUrl ? {
      image: { "@type": "ImageObject", url: meta.featuredImage?.url || meta.imageUrl, description: meta.featuredImage?.alt || meta.imageAlt }
    } : {}),
    author: {
      "@type": "Person",
      "@id": `${siteUrl}/#shaan`,
      name: "Shaan",
      url: siteUrl,
      jobTitle: "Founder & AI Engineer",
      worksFor: { "@type": "Organization", name: "TechNest", url: siteUrl },
    },
    publisher: {
      "@type": "Organization",
      name: "TechNest",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
        { "@type": "ListItem", position: 3, name: meta.title, item: canonical },
      ],
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="min-h-dvh pt-24 pb-24">
        <div className="max-w-350 mx-auto px-6 md:px-10">

          <nav aria-label="Breadcrumb" className="pt-10 pb-8 flex items-center gap-2 text-xs text-muted-foreground">
            <a href="/" className="hover:text-foreground transition-colors duration-150">Home</a>
            <span className="text-border">/</span>
            <a href="/blog" className="hover:text-foreground transition-colors duration-150">Blog</a>
            <span className="text-border">/</span>
            <span className="text-foreground font-medium truncate max-w-[32ch]">{meta.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-16 items-start">

            <article>
              <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-border/60 mb-8">
                {(meta.featuredImage?.url || meta.imageUrl) ? (
                  <img
                    src={meta.featuredImage?.url || meta.imageUrl!}
                    alt={meta.featuredImage?.alt || meta.imageAlt}
                    className="w-full h-full object-cover"
                    fetchPriority="high"
                  />
                ) : (
                  <div className="w-full h-full bg-muted/40 flex items-center justify-center">
                    <span className="text-sm font-medium px-4 py-2 rounded-full bg-primary/8 text-primary border border-primary/20">
                      {meta.tag}
                    </span>
                  </div>
                )}
              </div>

              <header className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-primary/8 text-primary border border-primary/20">
                    {meta.tag}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-[42px] font-semibold tracking-[-0.03em] leading-[1.08] text-foreground mb-4">
                  {meta.title}
                </h1>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                  {meta.excerpt}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-border/60">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5"><RiCalendarLine size={13} />{meta.date}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className="flex items-center gap-1.5"><RiTimeLine size={13} />{meta.readTime}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className="font-medium text-foreground">TechNest</span>
                  </div>
                  <bloghareButtons title={meta.title} slug={slug} />
                </div>
              </header>

              <div
                className="prose prose-lg md:prose-xl prose-neutral dark:prose-invert max-w-none
                  prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
                  prose-h1:text-3xl prose-h1:leading-tight
                  prose-h2:text-2xl prose-h2:mt-14 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border/30
                  prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-3
                  prose-h4:text-lg prose-h4:mt-8 prose-h4:mb-2
                  prose-p:leading-[1.78] prose-p:text-foreground/80 prose-p:my-6
                  prose-li:leading-[1.78] prose-li:text-foreground/80 prose-li:my-1.5
                  prose-ol:my-6 prose-ul:my-6 prose-ol:pl-6 prose-ul:pl-6
                  prose-a:text-primary prose-a:no-underline prose-a:font-medium prose-a:border-b prose-a:border-primary/40 hover:prose-a:border-primary hover:prose-a:text-primary
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-em:text-foreground/75
                  prose-code:bg-muted/70 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-[0.875em] prose-code:font-normal prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-border/60 prose-pre:rounded-xl prose-pre:my-8
                  prose-blockquote:border-l-[3px] prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:px-6 prose-blockquote:py-5 prose-blockquote:rounded-r-xl prose-blockquote:my-10 prose-blockquote:not-italic prose-blockquote:text-foreground/85 prose-blockquote:font-medium
                  prose-hr:border-border/30 prose-hr:my-12
                  prose-img:rounded-2xl prose-img:border prose-img:border-border/60 prose-img:shadow-md prose-img:my-10
                  prose-figure:my-10 prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:text-muted-foreground prose-figcaption:mt-3"
                dangerouslySetInnerHTML={{ __html: meta.content ?? "" }}
              />

              <div className="mt-12 pt-8 border-t border-border/60 flex items-center justify-between gap-4 flex-wrap">
                <a href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150">
                  <RiArrowLeftLine size={14} />Back to all articles
                </a>
                <bloghareButtons title={meta.title} slug={slug} />
              </div>

              <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/4 p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Building something like this?</p>
                  <p className="text-sm text-muted-foreground max-w-[48ch]">
                    Book a free 30-minute call and we&apos;ll map out your highest-leverage automation opportunities.
                  </p>
                </div>
                <CalendlyButton label="Book Free Call" variant="primary" trackAs={`blog_post_cta_${slug}`} icon={<RiArrowRightLine size={14} />} className="flex-row-reverse shrink-0" />
              </div>

              <RelatedContent
                items={[
                  ...getRelatedServices([meta.tag]),
                  ...getRelatedContent(slug, allPosts, "blog").slice(0, 1),
                ]}
                title="Related Resources"
              />
            </article>

            <aside className="flex flex-col gap-6 lg:sticky lg:top-24">
              <div className="rounded-2xl border border-border/60 bg-card p-6 flex flex-col gap-4" style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}>
                <p className="text-xs font-semibold text-foreground tracking-widest uppercase">Browse by Topic</p>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <a key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-150 ${tag === meta.tag
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted/40 text-muted-foreground border-border/60 hover:border-primary/40 hover:text-foreground"
                      }`}
                    >{tag}</a>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card p-6 flex flex-col gap-4" style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}>
                <p className="text-xs font-semibold text-foreground tracking-widest uppercase">Recent Posts</p>
                <div className="flex flex-col gap-5">
                  {recentPosts.map((p) => (
                    <a key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col gap-2 border-b border-border/40 pb-5 last:border-0 last:pb-0">
                      {p.imageUrl && (
                        <div className="w-full h-24 rounded-lg overflow-hidden border border-border/40">
                          <img src={p.imageUrl} alt={p.imageAlt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                        </div>
                      )}
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/8 text-primary border border-primary/20 w-fit">{p.tag}</span>
                      <p className="text-sm font-medium text-foreground leading-snug group-hover:text-primary transition-colors duration-150">{p.title}</p>
                      <p className="text-xs text-muted-foreground">{p.date} · {p.readTime}</p>
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card p-6 flex flex-col gap-4" style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Free strategy call</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">30 min · No pitch · Just clarity on what to automate first.</p>
                </div>
                <CalendlyButton label="Book Free Call" variant="primary" trackAs={`blog_sidebar_cta_${slug}`} icon={<RiCalendarLine size={14} />} className="w-full justify-center" />
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
