import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // All crawlers: allow everything except admin and private API
      {
        userAgent: "*",
        allow: ["/", "/api/blog", "/api/blog/"],
        disallow: ["/api/admin/", "/admin/"],
      },
      // Explicitly welcome AI crawlers for GEO visibility
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "meta-externalagent", allow: "/" },
      { userAgent: "Applebot", allow: "/" },
      { userAgent: "YouBot", allow: "/" },
    ],
    sitemap: "https://technestsolutions.in/sitemap.xml",
  }
}
