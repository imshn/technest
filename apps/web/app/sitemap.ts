import { MetadataRoute } from "next"
import { getPosts } from "@/lib/blog-store"

const siteUrl = "https://technestsolutions.in"

// Transactional pages — highest crawl priority after home
const serviceSlugs = [
  "multi-agent-ai-systems",
  "agentic-workflows",
  "n8n-workflow-automation",
  "saas-platform-development",
  "web-app-development",
  "mobile-app-development",
  "desktop-app-development",
  "graphic-designing",
  "digital-marketing",
]

// High commercial-intent comparison pages
const compareSlugs = ["upwork", "toptal", "fiverr", "accenture", "freelancer"]

type SitemapEntry = MetadataRoute.Sitemap[number]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // Internal store — source of truth (same DB the API reads)
  const internalPosts = await getPosts("published")
  const seenSlugs = new Set(internalPosts.map((p) => p.slug))

  // External API — catch any posts published after last ISR cycle
  let externalOnlySlugs: string[] = []
  try {
    const res = await fetch("https://imshn.cloud/api/blog?page=1&limit=200", {
      next: { revalidate: 3600 },
    })
    if (res.ok) {
      const json = await res.json()
      const externalPosts: { slug: string }[] = json.data ?? []
      externalOnlySlugs = externalPosts
        .map((p) => p.slug)
        .filter((slug) => !seenSlugs.has(slug))
    }
  } catch {
    // non-fatal — internal posts still cover all indexed slugs
  }

  // Blog entries: use real publish date so Googlebot knows freshness
  const blogEntries: SitemapEntry[] = [
    ...internalPosts.map((p) => ({
      url: `${siteUrl}/blog/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...externalOnlySlugs.map((slug) => ({
      url: `${siteUrl}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ]

  return [
    // ── Tier 1: Home ────────────────────────────────────────────────────────
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },

    // ── Tier 2: Core landing pages ──────────────────────────────────────────
    {
      url: `${siteUrl}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/compare`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // ── Tier 3: Individual service pages (money pages — highest intent) ──────
    ...serviceSlugs.map((slug) => ({
      url: `${siteUrl}/services/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),

    // ── Tier 4: Competitor comparison pages (commercial intent) ─────────────
    ...compareSlugs.map((slug) => ({
      url: `${siteUrl}/compare/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),

    // ── Tier 5: Authority / informational content ───────────────────────────
    {
      url: `${siteUrl}/ai-automation-statistics`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    // ── Tier 6: Blog posts (E-E-A-T authority builders) ─────────────────────
    ...blogEntries,

    // ── Tier 7: Legal (needed for Google trust signals) ─────────────────────
    {
      url: `${siteUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]
}
