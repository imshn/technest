import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CalendlyButton } from "@/components/calendly-button"
import {
  RiRobotLine,
  RiFlowChart,
  RiLoopLeftLine,
  RiCodeSSlashLine,
  RiWindowLine,
  RiSmartphoneLine,
  RiComputerLine,
  RiMegaphoneLine,
  RiArrowRightLine,
} from "@remixicon/react"

const siteUrl = "https://technestsolutions.in"

export const metadata: Metadata = {
  title: "AI Automation & Software Development Services | TechNest",
  description:
    "Multi-agent AI, N8n automation, SaaS development, web and mobile apps, and organic SEO. Fixed-scope, fully remote, 100% IP transfer.",
  alternates: { canonical: `${siteUrl}/services` },
  openGraph: {
    type: "website",
    url: `${siteUrl}/services`,
    title: "AI Automation & Software Development Services | TechNest",
    description:
      "Multi-agent AI, N8n automation, SaaS development, web and mobile apps, and organic SEO. Fixed-scope, fully remote, 100% IP transfer.",
    siteName: "TechNest",
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: "TechNest Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation & Software Development Services | TechNest",
    description:
      "Multi-agent AI, N8n automation, SaaS development, web and mobile apps, and organic SEO. Fixed-scope, fully remote, 100% IP transfer.",
    site: "@technestdev",
    images: [`${siteUrl}/og-image.png`],
  },
}

const services = [
  {
    slug: "multi-agent-ai-systems",
    icon: RiRobotLine,
    title: "Multi-Agent AI Systems",
    tagline: "Autonomous pipelines that replace manual decision-making",
    description: "Design, build, and deploy multi-agent AI that handles complex workflows end-to-end — 10–40 hours of manual work saved per week.",
    badge: "Most popular",
  },
  {
    slug: "agentic-workflows",
    icon: RiFlowChart,
    title: "Agentic Workflows",
    tagline: "LLM-powered automation that handles ambiguity",
    description: "Beyond if-then rules. Agents that reason over your data, call tools in real-time, and adapt to new inputs without code changes.",
    badge: null,
  },
  {
    slug: "n8n-workflow-automation",
    icon: RiLoopLeftLine,
    title: "N8n Workflow Automation",
    tagline: "Replace Zapier at 80–90% lower cost",
    description: "Self-hosted N8n on your infrastructure — full data privacy, no per-task pricing, unlimited automation complexity.",
    badge: null,
  },
  {
    slug: "saas-platform-development",
    icon: RiCodeSSlashLine,
    title: "SaaS Platform Development",
    tagline: "Production SaaS from MVP to scale",
    description: "Next.js, Supabase, and Stripe. Multi-tenant, production-ready, shipped in 6 weeks. Popular with India and Gulf B2B SaaS founders.",
    badge: null,
  },
  {
    slug: "web-app-development",
    icon: RiWindowLine,
    title: "Web App Development",
    tagline: "Fast, scalable web applications",
    description: "React, Next.js, and Postgres — TypeScript-first, server-side rendered, accessible, and optimized for real traffic.",
    badge: null,
  },
  {
    slug: "mobile-app-development",
    icon: RiSmartphoneLine,
    title: "Mobile App Development",
    tagline: "iOS and Android from one codebase",
    description: "React Native + Expo with App Store and Play Store launch included. One codebase, two platforms, no compromise.",
    badge: null,
  },
  {
    slug: "desktop-app-development",
    icon: RiComputerLine,
    title: "Desktop App Development",
    tagline: "Cross-platform desktop with Tauri or Electron",
    description: "Windows, macOS, and Linux from a single codebase. Ship professional desktop software without building three separate apps.",
    badge: null,
  },
  {
    slug: "digital-marketing",
    icon: RiMegaphoneLine,
    title: "Digital Marketing & SEO",
    tagline: "Organic-first growth — no paid ads",
    description: "Technical SEO, GEO (AI search optimization), programmatic content, and CRO. Compound organic traffic that scales without ad spend.",
    badge: null,
  },
]

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh pt-24 pb-24">
        <div className="max-w-350 mx-auto px-6 md:px-10">
          <nav aria-label="Breadcrumb" className="pt-10 pb-8 flex items-center gap-2 text-xs text-muted-foreground">
            <a href="/" className="hover:text-foreground transition-colors duration-150">Home</a>
            <span className="text-border">/</span>
            <span className="text-foreground font-medium">Services</span>
          </nav>

          <header className="mb-14">
            <h1 className="text-3xl md:text-4xl lg:text-[42px] font-semibold tracking-[-0.03em] leading-[1.08] text-foreground mb-4">
              Services
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-[60ch]">
              Fixed-scope, fully remote engagements with weekly milestones. 100% IP transfer on completion. Projects from $1,000 — enterprise systems from $5,000.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((svc) => {
              const Icon = svc.icon
              return (
                <a
                  key={svc.slug}
                  href={`/services/${svc.slug}`}
                  className="group relative rounded-2xl border border-border/60 bg-card p-6 flex flex-col gap-4 hover:border-primary/40 transition-all duration-200"
                  style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
                >
                  {svc.badge && (
                    <span className="absolute top-4 right-4 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-primary text-primary-foreground">
                      {svc.badge}
                    </span>
                  )}
                  <div className="w-10 h-10 rounded-xl bg-primary/8 border border-primary/20 flex items-center justify-center text-primary">
                    <Icon size={18} />
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-150">
                      {svc.title}
                    </p>
                    <p className="text-xs text-muted-foreground font-medium">{svc.tagline}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1">{svc.description}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-primary">
                    Learn more <RiArrowRightLine size={12} />
                  </div>
                </a>
              )
            })}
          </div>

          <div className="mt-16 rounded-2xl border border-primary/20 bg-primary/4 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-base font-semibold text-foreground mb-1">Not sure which service fits?</p>
              <p className="text-sm text-muted-foreground max-w-[50ch]">
                Book a free 30-minute call. We'll map your problem to the right solution — no pitch, just clarity.
              </p>
            </div>
            <CalendlyButton
              label="Book Free Call"
              variant="primary"
              trackAs="services_index_cta"
              icon={<RiArrowRightLine size={14} />}
              className="flex-row-reverse shrink-0"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
