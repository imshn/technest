'use client'

import Link from "next/link"
import {
  RiRobotLine,
  RiFlowChart,
  RiLoopLeftLine,
  RiCodeSSlashLine,
  RiWindowLine,
  RiSmartphoneLine,
  RiComputerLine,
  RiPenNibLine,
  RiMegaphoneLine,
  RiArrowRightLine,
} from "@remixicon/react"

type Service = {
  icon: React.ElementType
  title: string
  tagline: string
  primary_tech: string
  slug: string
  span?: string
}

const services: Service[] = [
  {
    icon: RiRobotLine,
    title: "Multi-Agent AI Systems",
    tagline: "Deploy autonomous AI pipelines that handle complex workflows",
    primary_tech: "LangChain, OpenAI, Claude",
    slug: "multi-agent-ai-systems",
    span: "lg:col-span-2",
  },
  {
    icon: RiFlowChart,
    title: "Agentic Workflows",
    tagline: "LLM-powered automation using RAG and function calling",
    primary_tech: "LangGraph",
    slug: "agentic-workflows",
  },
  {
    icon: RiLoopLeftLine,
    title: "N8n Workflow Automation",
    tagline: "Self-hosted alternative to Zapier at fraction of cost",
    primary_tech: "N8n",
    slug: "n8n-workflow-automation",
  },
  {
    icon: RiCodeSSlashLine,
    title: "SaaS Platform Development",
    tagline: "Multi-tenant SaaS with auth, billing, and analytics",
    primary_tech: "Next.js, Supabase, Stripe",
    slug: "saas-platform-development",
    span: "lg:col-span-2",
  },
  {
    icon: RiWindowLine,
    title: "Web App Development",
    tagline: "High-performance React and Next.js applications",
    primary_tech: "TypeScript, Postgres",
    slug: "web-app-development",
  },
  {
    icon: RiSmartphoneLine,
    title: "Mobile App Development",
    tagline: "iOS and Android apps from single React Native codebase",
    primary_tech: "React Native, Expo",
    slug: "mobile-app-development",
  },
  {
    icon: RiComputerLine,
    title: "Desktop App Development",
    tagline: "Cross-platform desktop apps for Windows, macOS, Linux",
    primary_tech: "Tauri, Electron",
    slug: "desktop-app-development",
  },
  {
    icon: RiPenNibLine,
    title: "Graphic Designing",
    tagline: "Logo systems, UI kits, and pitch decks in Figma",
    primary_tech: "Figma",
    slug: "graphic-designing",
  },
  {
    icon: RiMegaphoneLine,
    title: "Digital Marketing",
    tagline: "SEO, technical audits, and conversion optimization",
    primary_tech: "SEO, CRO",
    slug: "digital-marketing",
    span: "lg:col-span-2",
  },
]

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 relative">
      <div className="max-w-350 mx-auto px-6 md:px-10">
        {/* Header with SEO optimization */}
        <div className="mb-16">
          <p className="text-xs font-medium text-primary tracking-widest uppercase mb-3">Our Services</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] text-foreground max-w-[22ch] mb-5">
            Nine capabilities.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">One focused team.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-[60ch] leading-relaxed">
            We build AI agents, platforms, and digital products. From intelligent automation to full-stack SaaS, we engineer solutions that scale.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[280px] lg:auto-rows-[240px]">
          {services.map((svc) => {
            const Icon = svc.icon
            return (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className={`group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-background to-muted/20 p-5 md:p-6 flex flex-col gap-4 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 ${svc.span || ""}`}
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Icon Container */}
                <div className="relative z-10 w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center text-primary transition-all duration-300 group-hover:bg-primary/15 group-hover:scale-110">
                  <Icon size={18} strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col gap-1.5 flex-1 justify-between">
                  <div>
                    <h3 className="text-sm md:text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300 leading-snug">
                      {svc.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-snug mt-1.5">{svc.tagline}</p>
                  </div>
                  <p className="text-xs text-primary/70 font-medium">{svc.primary_tech}</p>
                </div>

                {/* CTA Arrow */}
                <div className="absolute bottom-4 md:bottom-5 right-4 md:right-5 w-7 h-7 rounded-full bg-primary/8 flex items-center justify-center text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-background group-hover:translate-x-0.5">
                  <RiArrowRightLine size={14} />
                </div>
              </Link>
            )
          })}
        </div>

        {/* SEO: Schema markup for AI search engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": services.map((svc, idx) => ({
                "@type": "ListItem",
                "position": idx + 1,
                "name": `${svc.title}: ${svc.tagline}`,
                "item": `https://technest.dev/services/${svc.slug}`,
              })),
            }),
          }}
        />
      </div>
    </section>
  )
}
