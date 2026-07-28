const siteUrl = "https://technestsolutions.in"

// Plain route handler (not the typed robots() metadata API) because we need
// a Content-Signal directive (contentsignals.org) — the typed API has no
// field for it. Rule content mirrors the previous app/robots.ts.
export async function GET() {
  const body = `User-agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /
Allow: /blog/
Allow: /services/
Allow: /compare/
Allow: /locations/
Allow: /contact
Allow: /ai-automation-statistics
Allow: /privacy
Allow: /terms
Allow: /api/blog
Allow: /api/blog/
Disallow: /admin/
Disallow: /api/admin/
Disallow: /api/db-test/
Disallow: /api/revalidate/

User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Googlebot-News
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: GoogleOther
Allow: /

User-agent: Bingbot
Allow: /

User-agent: msnbot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: meta-externalagent
Allow: /

User-agent: Applebot
Allow: /

User-agent: YouBot
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Slurp
Allow: /

User-agent: ia_archiver
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
