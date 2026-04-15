import { RiArrowRightLine, RiBarChart2Line, RiCheckDoubleLine } from "@remixicon/react"
import Link from "next/link"

export type CaseStudy = {
  slug: string
  title: string
  company: string
  challenge: string
  result: string
  metric: string
  metricValue: string
  industry: string
  services: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "case-study-1",
    title: "Reduced Manual Lead Scoring by 80%",
    company: "FinTech Startup",
    challenge: "Sales team spent 10 hours weekly manually qualifying leads from inbound sources",
    result: "Deployed agentic workflow to score leads in real-time using proprietary data and LLM reasoning",
    metric: "Time saved weekly",
    metricValue: "8 hrs",
    industry: "Financial Services",
    services: ["Agentic Workflows", "N8n Workflow Automation"],
  },
  {
    slug: "case-study-2",
    title: "Launched MVP in 6 Weeks, Scaled to 50K Users",
    company: "B2B SaaS Platform",
    challenge: "Needed production-ready SaaS with multi-tenancy and Stripe billing within tight timeline",
    result: "Built full-stack platform on Next.js + Supabase with automated onboarding and analytics",
    metric: "Time to market",
    metricValue: "6 wks",
    industry: "Software-as-a-Service",
    services: ["SaaS Platform Development"],
  },
  {
    slug: "case-study-3",
    title: "Cut Automation Costs 85% vs Zapier",
    company: "E-commerce Operations Team",
    challenge: "Zapier bill hit $2,400/month for inventory sync, order routing, and email workflows",
    result: "Migrated to self-hosted N8n with 400+ native integrations and custom logic",
    metric: "Monthly savings",
    metricValue: "$2k",
    industry: "E-commerce",
    services: ["N8n Workflow Automation"],
  },
]

export function CaseStudiesPreview() {
  return (
    <section className="py-24 md:py-32 border-t border-border/60">
      <div className="max-w-350 mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-medium text-primary tracking-widest uppercase mb-3">Real Results</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] text-foreground mb-4 leading-tight max-w-[18ch]">
            How teams moved faster
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-foreground to-primary"> with TechNest</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-[65ch] leading-relaxed">
            From cutting costs to accelerating delivery, these builds delivered measurable impact in weeks, not months.
          </p>
        </div>

        {/* Case Studies Grid - Asymmetric with varied heights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-max">
          {caseStudies.map((study, idx) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className={`group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-background to-muted/20 p-6 md:p-8 flex flex-col gap-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 ${
                idx === 0 ? "lg:row-span-2" : ""
              }`}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Content */}
              <div className="relative z-10 flex flex-col gap-4 h-full">
                {/* Company + Industry */}
                <div>
                  <p className="text-xs font-medium text-primary/70 uppercase tracking-widest mb-1">
                    {study.company}
                  </p>
                  <p className="text-xs text-muted-foreground/60 font-medium">{study.industry}</p>
                </div>

                {/* Main headline */}
                <h3 className="text-lg md:text-xl font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-300">
                  {study.title}
                </h3>

                {/* Challenge */}
                <div className="flex-1">
                  <p className="text-xs font-semibold text-muted-foreground/70 mb-1.5 uppercase tracking-wide">Challenge</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {study.challenge}
                  </p>
                </div>

                {/* Metric highlight */}
                <div className="py-4 px-4 rounded-xl bg-primary/5 border border-primary/10 flex items-baseline gap-3">
                  <div className="flex flex-col">
                    <span className="text-2xl md:text-3xl font-semibold text-foreground">
                      {study.metricValue}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">{study.metric}</span>
                  </div>
                </div>

                {/* Services */}
                <div className="flex flex-wrap gap-2">
                  {study.services.map((svc) => (
                    <span
                      key={svc}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-primary/8 text-primary/80 border border-primary/10"
                    >
                      {svc}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Arrow */}
              <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-primary/8 flex items-center justify-center text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-background group-hover:translate-x-0.5">
                <RiArrowRightLine size={16} />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA to view all */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 transition-all duration-200 font-medium text-sm"
          >
            View all case studies
            <RiArrowRightLine size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
