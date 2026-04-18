import { MetadataRoute } from "next"
import { getPosts } from "@/lib/blog-store"
import { caseStudies } from "@/components/case-studies-preview"

const siteUrl = "https://technestsolutions.in"

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

const compareSlugs = ["upwork", "toptal", "fiverr", "accenture", "freelancer"]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const blogPosts = await getPosts("published")

  return [
    { url: siteUrl, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${siteUrl}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    ...blogPosts.map((p) => ({
      url: `${siteUrl}/blog/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    { url: `${siteUrl}/case-studies`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...caseStudies.map((s) => ({
      url: `${siteUrl}/case-studies/${s.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    { url: `${siteUrl}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...serviceSlugs.map((slug) => ({
      url: `${siteUrl}/services/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    { url: `${siteUrl}/compare`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...compareSlugs.map((slug) => ({
      url: `${siteUrl}/compare/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    { url: `${siteUrl}/ai-automation-statistics`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ]
}
