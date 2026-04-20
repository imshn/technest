import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow everything public, block admin + raw API internals
      {
        userAgent: "*",
        allow: [
          "/",
          "/blog/",
          "/services/",
          "/compare/",
          "/contact",
          "/ai-automation-statistics",
          "/privacy",
          "/terms",
          // Public blog API — lets crawlers verify content exists
          "/api/blog",
          "/api/blog/",
        ],
        disallow: [
          "/admin/",
          "/api/admin/",
          "/api/db-test/",
          "/api/revalidate/",
        ],
      },

      // ── Google ────────────────────────────────────────────────────────────
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Googlebot-Image", allow: "/" },
      { userAgent: "Googlebot-News", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },         // Gemini training
      { userAgent: "GoogleOther", allow: "/" },

      // ── Bing / Microsoft ──────────────────────────────────────────────────
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "msnbot", allow: "/" },

      // ── OpenAI ────────────────────────────────────────────────────────────
      { userAgent: "GPTBot", allow: "/" },                  // ChatGPT training
      { userAgent: "OAI-SearchBot", allow: "/" },           // ChatGPT search
      { userAgent: "ChatGPT-User", allow: "/" },

      // ── Anthropic ─────────────────────────────────────────────────────────
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },

      // ── Perplexity ────────────────────────────────────────────────────────
      { userAgent: "PerplexityBot", allow: "/" },

      // ── Meta / Apple / Others ─────────────────────────────────────────────
      { userAgent: "meta-externalagent", allow: "/" },
      { userAgent: "Applebot", allow: "/" },
      { userAgent: "YouBot", allow: "/" },
      { userAgent: "DuckDuckBot", allow: "/" },
      { userAgent: "Slurp", allow: "/" },                   // Yahoo
      { userAgent: "ia_archiver", allow: "/" },             // Wayback Machine
    ],
    sitemap: `https://technestsolutions.in/sitemap.xml`,
  }
}
