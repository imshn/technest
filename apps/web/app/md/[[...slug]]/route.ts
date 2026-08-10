import { readFile } from "node:fs/promises"
import path from "node:path"
import { services } from "@/app/services/[slug]/page"
import { markets } from "@/app/locations/[slug]/page"
import { comparisons } from "@/app/compare/[slug]/page"
import { caseStudies } from "@/components/case-studies-preview"
import { faqs } from "@/app/faq/page"
import { steps, principles } from "@/app/process/page"
import { facts, stack } from "@/app/about/page"
import { sections as statSections } from "@/app/ai-automation-statistics/page"
import { getPost, getPosts } from "@/lib/blog-store"

const siteUrl = "https://technestsolutions.in"

function md(body: string) {
  return new Response(body.trim() + "\n", {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}

function notFoundMd() {
  return new Response("# Not found\n\nNo markdown version of this page exists. Try /llms.txt for a site overview.\n", {
    status: 404,
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
}

function faqBlock(items: { q: string; a: string }[]) {
  return items.map((f) => `**${f.q}**\n${f.a}`).join("\n\n")
}

export async function GET(_req: Request, props: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await props.params
  const [section, sub] = slug

  // Homepage — reuse llms.txt, the canonical GEO-optimized summary
  if (slug.length === 0) {
    const file = await readFile(path.join(process.cwd(), "public", "llms.txt"), "utf-8")
    return md(file)
  }

  if (section === "about" && !sub) {
    return md(`# About TechNest

${facts.map((f) => `- **${f.label}:** ${f.value}`).join("\n")}

## Stack
${stack.join(", ")}

[Book a free strategy call](${siteUrl}/contact)`)
  }

  if (section === "faq" && !sub) {
    return md(`# Frequently Asked Questions\n\n${faqBlock(faqs)}`)
  }

  if (section === "process" && !sub) {
    return md(`# Our Process

${steps.map((s) => `## ${s.number}. ${s.title} (${s.duration})\n${s.description}\n*Deliverable: ${s.deliverable}*`).join("\n\n")}

## Engagement principles
${principles.map((p) => `- ${p}`).join("\n")}`)
  }

  if (section === "contact" && !sub) {
    return md(`# Contact TechNest

- Email: hello@technestsolutions.in
- Phone / WhatsApp: +91 96020 35868
- Book a free 30-minute strategy call: https://calendly.com/shahnawaz28april/30min
- Based in Bengaluru, India — remote-first, working across India, USA, and the Gulf`)
  }

  if (section === "services") {
    if (!sub) {
      const list = Object.entries(services)
        .map(([key, s]) => `## [${s.title}](${siteUrl}/services/${key})\n${s.tagline}\n${s.description}`)
        .join("\n\n")
      return md(`# Services\n\n${list}`)
    }
    const s = services[sub]
    if (!s) return notFoundMd()
    return md(`# ${s.title}

${s.tagline}

${s.description}

## Benefits
${s.benefits.map((b) => `- ${b}`).join("\n")}

## Deliverables
${s.deliverables.map((d) => `- ${d}`).join("\n")}

## Process
${s.process.map((p) => `- **${p.step}:** ${p.detail}`).join("\n")}

## FAQ
${faqBlock(s.faq)}

[Book a free strategy call](${siteUrl}/contact)`)
  }

  if (section === "locations" && sub) {
    const m = markets[sub]
    if (!m) return notFoundMd()
    return md(`# ${m.headline}

${m.subheadline}

${m.intro}

## Why TechNest
${m.highlights.map((h) => `- **${h.title}:** ${h.description}`).join("\n")}

## FAQ
${faqBlock(m.faq)}

[Book a free strategy call](${siteUrl}/contact)`)
  }

  if (section === "compare") {
    if (!sub) {
      const list = Object.entries(comparisons)
        .map(([key, c]) => `## [${c.headline}](${siteUrl}/compare/${key})\n${c.subheadline}`)
        .join("\n\n")
      return md(`# TechNest vs Alternatives\n\n${list}`)
    }
    const c = comparisons[sub]
    if (!c) return notFoundMd()
    const rows = c.rows
      .map((r) => `| ${r.feature} | ${typeof r.technest === "boolean" ? (r.technest ? "Yes" : "No") : r.technest} | ${typeof r.competitor === "boolean" ? (r.competitor ? "Yes" : "No") : r.competitor} |`)
      .join("\n")
    return md(`# ${c.headline}

${c.subheadline}

${c.intro}

| Feature | TechNest | ${c.competitor} |
|---|---|---|
${rows}

## Verdict
${c.verdict}`)
  }

  if (section === "case-studies") {
    if (!sub) {
      const list = caseStudies
        .map((s) => `## [${s.title}](${siteUrl}/case-studies/${s.slug})\n${s.industry} — ${s.metricValue} ${s.metric}`)
        .join("\n\n")
      return md(`# TechNest Case Studies\n\n${list}`)
    }
    const s = caseStudies.find((cs) => cs.slug === sub)
    if (!s) return notFoundMd()
    return md(`# ${s.title}

**${s.company}** (${s.industry}) — **${s.metricValue} ${s.metric}**

## The problem
${s.challenge}

## What we built
${s.result}

## Services used
${s.services.join(", ")}

[Book a free strategy call](${siteUrl}/contact)`)
  }

  if (section === "ai-automation-statistics" && !sub) {
    const body = statSections
      .map((sec) => `## ${sec.title}\n\n${sec.stats.map((s) => `- **${s.stat}** — ${s.context} *(${s.source})*`).join("\n")}`)
      .join("\n\n")
    return md(`# AI Automation Statistics 2026\n\n${body}`)
  }

  if (section === "blog") {
    if (!sub) {
      const posts = await getPosts("published")
      if (!posts.length) return md("# TechNest Blog\n\nNo articles published yet. Check back soon.")
      const list = posts.map((p) => `## [${p.title}](${siteUrl}/blog/${p.slug})\n${p.excerpt}`).join("\n\n")
      return md(`# TechNest Blog\n\n${list}`)
    }
    const post = await getPost(sub)
    if (!post) return notFoundMd()
    return md(`# ${post.title}

*${post.date} · ${post.readTime} · by Shaan*

${post.content ?? post.excerpt}`)
  }

  return notFoundMd()
}
