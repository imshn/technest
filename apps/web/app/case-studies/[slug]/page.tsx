import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CalendlyButton } from "@/components/calendly-button"
import { caseStudies } from "@/components/case-studies-preview"
import { RiArrowRightLine, RiCheckLine } from "@remixicon/react"

const siteUrl = "https://technestsolutions.in"

const serviceLinks: Record<string, string> = {
  "Multi-Agent AI Systems": "/services/multi-agent-ai-systems",
  "Agentic Workflows": "/services/agentic-workflows",
  "N8n Workflow Automation": "/services/n8n-workflow-automation",
  "SaaS Platform Development": "/services/saas-platform-development",
  "Web App Development": "/services/web-app-development",
  "Mobile App Development": "/services/mobile-app-development",
}

// Process phases are the same ones described on /process — kept generic here
// rather than inventing per-project specifics we can't verify.
const engagementPhases = [
  "Discovery call to map the current process and define success metrics",
  "Architecture design for the specific workflow or system",
  "Two-week build sprints with Friday demos",
  "Production launch, then a 30-day support window",
]

export async function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params
  const data = caseStudies.find((s) => s.slug === slug)
  if (!data) return {}
  const canonical = `${siteUrl}/case-studies/${slug}`
  const description = `${data.challenge} ${data.result}`.slice(0, 155)
  return {
    title: data.title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: `${data.title} | TechNest Case Study`,
      description,
      siteName: "TechNest",
      images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: data.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.title} | TechNest Case Study`,
      description,
      images: [`${siteUrl}/og-image.png`],
    },
  }
}

export default async function CaseStudyPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const data = caseStudies.find((s) => s.slug === slug)
  if (!data) notFound()

  const canonical = `${siteUrl}/case-studies/${slug}`
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": canonical,
    name: data.title,
    url: canonical,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Case Studies", item: `${siteUrl}/case-studies` },
        { "@type": "ListItem", position: 3, name: data.title, item: canonical },
      ],
    },
  }

  return (
    <>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-dvh pt-24 pb-24">
        <div className="max-w-350 mx-auto px-6 md:px-10">
          <nav aria-label="Breadcrumb" className="pt-10 pb-8 flex items-center gap-2 text-xs text-muted-foreground">
            <a href="/" className="hover:text-foreground transition-colors duration-150">Home</a>
            <span className="text-border">/</span>
            <a href="/case-studies" className="hover:text-foreground transition-colors duration-150">Case Studies</a>
            <span className="text-border">/</span>
            <span className="text-foreground font-medium">{data.company}</span>
          </nav>

          <header className="max-w-180 pb-14 border-b border-border/60">
            <p className="text-xs font-medium text-primary tracking-widest uppercase mb-3">{data.industry}</p>
            <h1 className="text-3xl md:text-4xl lg:text-[48px] font-semibold tracking-[-0.03em] leading-[1.04] text-foreground mb-6">
              {data.title}
            </h1>
            <div className="inline-flex items-baseline gap-2 rounded-xl border border-primary/20 bg-primary/4 px-5 py-3">
              <span className="text-2xl font-semibold text-primary">{data.metricValue}</span>
              <span className="text-sm text-muted-foreground">{data.metric}</span>
            </div>
          </header>

          <section className="py-14 grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-border/60">
            <div>
              <p className="text-xs font-semibold text-foreground tracking-widest uppercase mb-3">The problem</p>
              <p className="text-base text-muted-foreground leading-relaxed">{data.challenge}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground tracking-widest uppercase mb-3">What we built</p>
              <p className="text-base text-muted-foreground leading-relaxed">{data.result}</p>
            </div>
          </section>

          <section className="py-14 border-b border-border/60">
            <p className="text-xs font-semibold text-foreground tracking-widest uppercase mb-6">How the engagement ran</p>
            <div className="flex flex-col gap-4 max-w-160">
              {engagementPhases.map((phase, i) => (
                <div key={phase} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary/8 border border-primary/20 flex items-center justify-center text-primary text-xs font-semibold shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pt-0.5">{phase}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="py-14 border-b border-border/60">
            <p className="text-xs font-semibold text-foreground tracking-widest uppercase mb-5">Services used</p>
            <div className="flex flex-wrap gap-3">
              {data.services.map((s) => (
                <Link
                  key={s}
                  href={serviceLinks[s] ?? "/services"}
                  className="inline-flex items-center gap-2 text-sm text-foreground border border-border/50 rounded-lg px-4 py-2 transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <RiCheckLine size={14} className="text-primary" />
                  {s}
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-14 rounded-2xl border border-primary/20 bg-primary/4 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-[520px]">
              <p className="text-lg font-semibold text-foreground mb-2">Want a result like this?</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                30 minutes. We&apos;ll map your highest-ROI automation opportunity and give you a direct scope and timeline — no pitch deck.
              </p>
            </div>
            <CalendlyButton
              label="Book Free Call"
              variant="primary"
              trackAs={`case_study_${slug}_cta`}
              icon={<RiArrowRightLine size={14} />}
              className="flex-row-reverse shrink-0"
            />
          </section>

          <div className="mt-16 pt-10 border-t border-border/40">
            <Link href="/case-studies" className="text-sm font-medium text-primary hover:underline underline-offset-4">
              &larr; Back to all case studies
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
