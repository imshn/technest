import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CalendlyButton } from "@/components/calendly-button"
import { RiArrowRightLine, RiCheckLine } from "@remixicon/react"

const siteUrl = "https://technestsolutions.in"

type MarketData = {
  region: string
  headline: string
  subheadline: string
  intro: string
  highlights: { title: string; description: string }[]
  faq: { q: string; a: string }[]
  metaTitle: string
  metaDescription: string
  areaServed: { type: string; name: string }[]
}

export const markets: Record<string, MarketData> = {
  india: {
    region: "India",
    headline: "AI Automation Agency in India",
    subheadline: "Multi-agent AI, N8n automation, and SaaS development — built and run from Bengaluru",
    intro:
      "TechNest is headquartered in Bengaluru, India. For Indian startups and product teams, that means same-timezone collaboration, no overnight handoffs, and a team that understands the Indian SaaS and services market directly — not through a reseller or an offshore layer.",
    highlights: [
      { title: "Same timezone, real-time collaboration", description: "No async delay waiting for a US or Europe-based team to wake up — questions get answered same-day, often within the hour." },
      { title: "INR or USD billing", description: "Invoice in Indian Rupees or US Dollars, whichever is simpler for your finance team." },
      { title: "Built for the Indian SaaS and startup stage", description: "Fixed-scope engagements sized for seed-to-Series-B budgets, not enterprise consultancy day rates." },
      { title: "In-person kickoff available", description: "For Bengaluru and Chennai-based teams, an in-person discovery session is possible before the project moves fully remote." },
    ],
    faq: [
      { q: "Do you work with startups outside Bengaluru and Chennai?", a: "Yes — engagements run fully remote, so location in India doesn't limit which teams we can work with. Bengaluru and Chennai just make an in-person kickoff easier to arrange." },
      { q: "Can you invoice in INR?", a: "Yes. We invoice in INR or USD depending on what's simpler for your accounting." },
      { q: "How is this different from hiring an in-house engineer?", a: "You get a full team — AI architecture, engineering, and QA — under one fixed-scope engagement, without the hiring timeline, payroll overhead, or single-point-of-failure risk of one hire." },
    ],
    metaTitle: "AI Automation Agency in India",
    metaDescription:
      "TechNest is an AI automation and software development agency headquartered in Bengaluru, India. Multi-agent AI, N8n automation, and SaaS builds for Indian startups. Free strategy call.",
    areaServed: [
      { type: "Country", name: "India" },
      { type: "AdministrativeArea", name: "Bangalore, India" },
      { type: "AdministrativeArea", name: "Chennai, India" },
    ],
  },
  usa: {
    region: "United States",
    headline: "AI Automation Agency for US Businesses",
    subheadline: "Multi-agent AI, N8n automation, and SaaS development at agency-not-enterprise pricing",
    intro:
      "TechNest works with US startups and mid-market teams as a remote, async-first delivery partner. You get a dedicated engineering and AI team without the overhead of a US-based agency's day rates, or the coordination cost of managing individual offshore freelancers yourself.",
    highlights: [
      { title: "Async-first, with real overlap", description: "Daily written updates plus a live overlap window in the morning US Eastern / evening India time for calls and demos — no waiting a full day for a reply." },
      { title: "USD billing, fixed-scope pricing", description: "Projects are quoted and invoiced in USD, priced against deliverables — not hourly, so there's no incentive to pad hours." },
      { title: "NDA and IP transfer as standard", description: "NDA signed before any work begins; 100% of source code and IP ownership transfers to you at project completion." },
      { title: "Weekly demos, not black-box delivery", description: "You see working software every week during the build — the same cadence we'd run with an in-house team." },
    ],
    faq: [
      { q: "What US time zones do you cover?", a: "We're async-first and cover all US time zones on a rolling basis, with live overlap typically in the morning Eastern / evening India time for calls, demos, and reviews." },
      { q: "How does pricing compare to a US development agency?", a: "Fixed-scope pricing typically runs well below US agency day rates for equivalent senior-engineer-led work, since the team is based in India. Minimum engagement starts at $1,000; typical projects run $3,000–$25,000." },
      { q: "Who owns the code?", a: "You do, 100%. IP and source code transfer to you at project completion — no ongoing license or lock-in." },
    ],
    metaTitle: "AI Automation Agency for US Businesses",
    metaDescription:
      "TechNest builds multi-agent AI systems, N8n automation, and SaaS platforms for US startups and mid-market teams. Fixed-scope pricing, weekly demos, 100% IP transfer. Free strategy call.",
    areaServed: [
      { type: "Country", name: "United States" },
    ],
  },
  gulf: {
    region: "Gulf",
    headline: "AI Automation Agency for the Gulf (UAE, Saudi Arabia, Kuwait, Qatar)",
    subheadline: "Multi-agent AI, N8n automation, and SaaS development for GCC businesses",
    intro:
      "TechNest works with businesses across the UAE, Saudi Arabia, Kuwait, and Qatar. Being based in Bengaluru puts our working hours within 1.5–2.5 hours of Gulf Standard Time — closer real-time overlap than a US or European team, without the cost of a Gulf-based agency.",
    highlights: [
      { title: "Close timezone overlap", description: "India is only 1.5–2.5 hours ahead of Gulf time zones — most of the business day overlaps directly, so calls and reviews don't need to be scheduled around a large time gap." },
      { title: "AED, SAR, KWD, QAR, or USD billing", description: "Invoice in your local currency or USD, whichever is easier for your finance team." },
      { title: "English and Arabic support available", description: "Sales and support contact points are available in English and Arabic." },
      { title: "Fixed-scope, NDA-first engagements", description: "NDA signed before work begins; scope and price fixed upfront — no open-ended hourly billing." },
    ],
    faq: [
      { q: "Which Gulf countries do you work with?", a: "UAE, Saudi Arabia, Kuwait, and Qatar are our primary Gulf markets, with engagements available across the wider GCC." },
      { q: "Can you invoice in AED or SAR?", a: "Yes — we invoice in AED, SAR, KWD, QAR, or USD depending on what's simplest for your business." },
      { q: "Is support available in Arabic?", a: "Yes, our customer support contact point is available in English and Arabic during business hours." },
    ],
    metaTitle: "AI Automation Agency for the Gulf (UAE, KSA, Kuwait, Qatar)",
    metaDescription:
      "TechNest builds multi-agent AI systems, N8n automation, and SaaS platforms for businesses across the UAE, Saudi Arabia, Kuwait, and Qatar. Close timezone overlap, Arabic support. Free strategy call.",
    areaServed: [
      { type: "Country", name: "United Arab Emirates" },
      { type: "Country", name: "Saudi Arabia" },
      { type: "Country", name: "Kuwait" },
      { type: "Country", name: "Qatar" },
    ],
  },
}

const serviceLinks = [
  { label: "Multi-Agent AI Systems", href: "/services/multi-agent-ai-systems" },
  { label: "Agentic Workflows", href: "/services/agentic-workflows" },
  { label: "N8n Workflow Automation", href: "/services/n8n-workflow-automation" },
  { label: "SaaS Platform Development", href: "/services/saas-platform-development" },
  { label: "Web App Development", href: "/services/web-app-development" },
  { label: "Mobile App Development", href: "/services/mobile-app-development" },
]

export async function generateStaticParams() {
  return Object.keys(markets).map((slug) => ({ slug }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params
  const data = markets[slug]
  if (!data) return {}
  const canonical = `${siteUrl}/locations/${slug}`
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: data.metaTitle,
      description: data.metaDescription,
      siteName: "TechNest",
      images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: "TechNest — AI Automation Agency" }],
    },
    twitter: {
      card: "summary_large_image",
      title: data.metaTitle,
      description: data.metaDescription,
      images: [`${siteUrl}/og-image.png`],
    },
  }
}

export default async function LocationPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const data = markets[slug]
  if (!data) notFound()

  const canonical = `${siteUrl}/locations/${slug}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": canonical,
    name: data.headline,
    description: data.metaDescription,
    url: canonical,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: data.region, item: canonical },
      ],
    },
    about: {
      "@type": "ProfessionalService",
      name: "TechNest",
      "@id": `${siteUrl}/#localbusiness`,
      areaServed: data.areaServed.map((a) => ({ "@type": a.type, name: a.name })),
    },
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: data.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
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
            <span className="text-foreground font-medium">{data.region}</span>
          </nav>

          <header className="max-w-180 pb-14 border-b border-border/60">
            <p className="text-xs font-medium text-primary tracking-widest uppercase mb-3">{data.region}</p>
            <h1 className="text-3xl md:text-4xl lg:text-[48px] font-semibold tracking-[-0.03em] leading-[1.04] text-foreground mb-5">
              {data.headline}
            </h1>
            <p className="text-lg text-muted-foreground mb-5 leading-relaxed">{data.subheadline}</p>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{data.intro}</p>
          </header>

          <section className="py-14 grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.highlights.map((h) => (
              <div key={h.title} className="rounded-2xl border border-border/60 bg-card p-6 flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-primary/8 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <RiCheckLine size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1.5">{h.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{h.description}</p>
                </div>
              </div>
            ))}
          </section>

          <section className="py-10 border-t border-border/60">
            <p className="text-xs font-semibold text-foreground tracking-widest uppercase mb-6">Frequently asked</p>
            <div className="flex flex-col divide-y divide-border/60 max-w-180">
              {data.faq.map((faq, i) => (
                <details key={i} className="group py-5 [&[open]>summary>span:last-child]:rotate-45">
                  <summary className="flex items-start justify-between gap-5 cursor-pointer list-none">
                    <span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-150 pr-2">
                      {faq.q}
                    </span>
                    <span className="shrink-0 w-6 h-6 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground mt-0.5 transition-transform duration-200">
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                  </summary>
                  <p className="text-sm text-muted-foreground leading-relaxed pt-3 pr-10 max-w-[70ch]">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-10 rounded-2xl border border-primary/20 bg-primary/4 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-[520px]">
              <p className="text-lg font-semibold text-foreground mb-2">Book a free strategy call</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                30 minutes. We&apos;ll map your highest-ROI automation opportunity and give you a direct scope and timeline — no pitch deck.
              </p>
            </div>
            <CalendlyButton
              label="Book Free Call"
              variant="primary"
              trackAs={`location_page_${slug}_cta`}
              icon={<RiArrowRightLine size={14} />}
              className="flex-row-reverse shrink-0"
            />
          </section>

          <div className="mt-20 pt-10 border-t border-border/40">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-5">Explore Our Services</p>
            <div className="flex flex-wrap gap-3">
              {serviceLinks.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="text-sm text-muted-foreground hover:text-foreground border border-border/50 rounded-lg px-4 py-2 transition-colors hover:border-border"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
