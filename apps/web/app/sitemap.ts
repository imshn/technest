import { MetadataRoute } from "next"
import { blogPosts } from "@/components/blog-preview"
import { caseStudies } from "@/components/case-studies-preview"

const siteUrl = "https://technest.dev"

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

const compareSlugs = [
  "upwork",
  "toptal",
  "fiverr",
  "accenture",
  "freelancer",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Homepage
  const homepage = {
    url: siteUrl,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 1.0,
  }

  // Blog index
  const blogIndex = {
    url: `${siteUrl}/blog`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }

  // Individual blog posts
  const blogPages = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // Case studies index
  const caseStudiesIndex = {
    url: `${siteUrl}/case-studies`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }

  // Individual case studies
  const caseStudyPages = caseStudies.map((study) => ({
    url: `${siteUrl}/case-studies/${study.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  // Service pages
  const servicePages = serviceSlugs.map((slug) => ({
    url: `${siteUrl}/services/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  // Comparison pages
  const comparePages = compareSlugs.map((slug) => ({
    url: `${siteUrl}/compare/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // Standalone high-value pages (link-bait / resources)
  const resourcePages = [
    {
      url: `${siteUrl}/ai-automation-statistics`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ]

  return [
    homepage,
    blogIndex,
    ...blogPages,
    caseStudiesIndex,
    ...caseStudyPages,
    ...servicePages,
    ...comparePages,
    ...resourcePages,
  ]
}
