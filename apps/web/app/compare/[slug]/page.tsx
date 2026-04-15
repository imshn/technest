import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CalendlyButton } from "@/components/calendly-button"
import { RiArrowRightLine, RiCheckLine, RiCloseLine } from "@remixicon/react"

type CompareRow = {
  feature: string
  technest: string | boolean
  competitor: string | boolean
}

type CompareData = {
  competitor: string
  headline: string
  subheadline: string
  intro: string
  rows: CompareRow[]
  verdict: string
  metaTitle: string
  metaDescription: string
}

const comparisons: Record<string, CompareData> = {
  upwork: {
    competitor: "Upwork",
    headline: "TechNest vs Upwork",
    subheadline: "Dedicated agency vs. freelancer marketplace",
    intro:
      "Upwork connects you with individual freelancers. TechNest is a focused agency that owns the architecture, accountability, and outcome. Here's what that difference looks like in practice.",
    rows: [
      { feature: "Dedicated team", technest: true, competitor: "Single freelancer per contract" },
      { feature: "Architecture ownership", technest: "Senior-led system design", competitor: "You coordinate across multiple freelancers" },
      { feature: "Project continuity", technest: "Same team throughout", competitor: "Freelancers drop mid-project" },
      { feature: "IP ownership", technest: "100% transferred to you", competitor: "Varies by freelancer contract" },
      { feature: "NDA on day one", technest: true, competitor: "Optional, varies" },
      { feature: "Fixed-scope pricing", technest: true, competitor: "Hourly billing, no ceiling" },
      { feature: "Post-launch support", technest: "30-day support included", competitor: "New contract required" },
      { feature: "AI/automation expertise", technest: "Core specialization", competitor: "Depends on individual hired" },
    ],
    verdict:
      "Upwork is best for simple, isolated tasks with clear specs. TechNest is the right choice when you need a team that owns the outcome — not just the hours.",
    metaTitle: "TechNest vs Upwork — AI Agency vs Freelance Marketplace",
    metaDescription:
      "Comparing TechNest vs Upwork for AI automation and software development. See why a dedicated agency beats a freelancer marketplace for complex projects.",
  },
  toptal: {
    competitor: "Toptal",
    headline: "TechNest vs Toptal",
    subheadline: "Outcome-focused agency vs. elite contractor network",
    intro:
      "Toptal provides vetted senior developers on a contract basis. TechNest provides a complete project team that owns delivery from architecture to launch. Different models for different needs.",
    rows: [
      { feature: "Minimum engagement cost", technest: "From $5,000 (project-based)", competitor: "$10,000+ (160 hours minimum)" },
      { feature: "Team structure", technest: "Dedicated engineer + PM", competitor: "Individual contractors" },
      { feature: "Architecture ownership", technest: "Agency-owned, full accountability", competitor: "You direct the engagement" },
      { feature: "AI/automation specialists", technest: "Core focus", competitor: "General software engineers" },
      { feature: "Fixed-price delivery", technest: true, competitor: "Hourly only" },
      { feature: "NDA and IP transfer", technest: "Included from day one", competitor: "Negotiated per engagement" },
      { feature: "Onboarding speed", technest: "Call within 48 hours", competitor: "1–2 week matching process" },
    ],
    verdict:
      "Toptal is best when you need to extend an in-house engineering team with a vetted senior hire. TechNest is better when you need a complete delivery team that owns the project outcome.",
    metaTitle: "TechNest vs Toptal — Agency vs Elite Freelance Network",
    metaDescription:
      "Comparing TechNest vs Toptal for software development and AI automation. See which model fits your project requirements and budget.",
  },
  fiverr: {
    competitor: "Fiverr",
    headline: "TechNest vs Fiverr",
    subheadline: "Dedicated agency vs. task marketplace",
    intro:
      "Fiverr is optimized for transactional, low-cost tasks with fixed deliverables. TechNest builds complex systems with architectural thinking, accountability, and post-launch ownership.",
    rows: [
      { feature: "Project complexity", technest: "Complex, multi-system builds", competitor: "Best for isolated, simple tasks" },
      { feature: "Team accountability", technest: "Contractual delivery commitment", competitor: "Individual seller, limited recourse" },
      { feature: "Architecture and system design", technest: "Included in every project", competitor: "Not offered" },
      { feature: "NDA and IP protection", technest: true, competitor: "Rarely offered" },
      { feature: "Post-delivery support", technest: "30-day support window", competitor: "Not standard" },
      { feature: "Quality consistency", technest: "Senior-led, reviewed code", competitor: "Highly variable" },
      { feature: "AI agent development", technest: "Core specialization", competitor: "Rare, unverified expertise" },
    ],
    verdict:
      "Fiverr is for simple, clearly-defined tasks. TechNest is for businesses that need a reliable partner to build and own complex systems.",
    metaTitle: "TechNest vs Fiverr — Agency vs Task Marketplace",
    metaDescription:
      "Comparing TechNest vs Fiverr for AI development and automation. See why a dedicated agency beats a task marketplace for production systems.",
  },
  accenture: {
    competitor: "Accenture",
    headline: "TechNest vs Accenture",
    subheadline: "Focused boutique agency vs. enterprise consultancy",
    intro:
      "Accenture serves Fortune 500 companies with large teams and long timelines. TechNest moves faster, costs less, and ships production-grade AI systems and software for growth-stage companies.",
    rows: [
      { feature: "Minimum project budget", technest: "From $5,000", competitor: "$50,000–$500,000+" },
      { feature: "Time to first deliverable", technest: "2 weeks", competitor: "3–6 months" },
      { feature: "Team size and overhead", technest: "Lean, dedicated team", competitor: "Large team with significant overhead" },
      { feature: "AI automation focus", technest: "Core specialization", competitor: "One of hundreds of practice areas" },
      { feature: "Decision-making speed", technest: "Direct access to senior engineers", competitor: "Multiple stakeholder layers" },
      { feature: "Fixed-scope delivery", technest: true, competitor: "T&M or large fixed-fee projects" },
      { feature: "SMB and startup-friendly", technest: true, competitor: false },
    ],
    verdict:
      "Accenture is the right choice for enterprise-scale transformation programs with large budgets and long timelines. TechNest is faster, more focused, and built for companies that need to ship now.",
    metaTitle: "TechNest vs Accenture — Boutique Agency vs Enterprise Consultancy",
    metaDescription:
      "Comparing TechNest vs Accenture for AI and software development. Why a focused boutique agency delivers faster results for growth-stage companies.",
  },
  freelancer: {
    competitor: "Freelancer.com",
    headline: "TechNest vs Freelancer.com",
    subheadline: "Dedicated agency vs. bid-based marketplace",
    intro:
      "Freelancer.com uses a competitive bidding model where the lowest price wins. TechNest charges based on scope and delivers production-grade systems with a team accountable to the outcome.",
    rows: [
      { feature: "Vetting process", technest: "Curated team, senior-led", competitor: "Open marketplace, unvetted" },
      { feature: "Pricing model", technest: "Fixed scope, no surprises", competitor: "Bid-based, scope creep common" },
      { feature: "Architecture ownership", technest: "Full system design included", competitor: "Individual freelancers, no coordination" },
      { feature: "IP ownership", technest: "100% transferred", competitor: "Varies by contract" },
      { feature: "Dispute resolution", technest: "Direct relationship, contractual SLAs", competitor: "Platform arbitration" },
      { feature: "AI and automation expertise", technest: "Core focus", competitor: "Unpredictable" },
      { feature: "Code quality standards", technest: "TypeScript, tested, documented", competitor: "Highly variable" },
    ],
    verdict:
      "Freelancer.com works when price is the only variable and the task is isolated and well-defined. TechNest is the choice when quality, accountability, and a working system are what matter.",
    metaTitle: "TechNest vs Freelancer.com — Agency vs Bid Marketplace",
    metaDescription:
      "Comparing TechNest vs Freelancer.com for AI and software projects. See why outcome-focused agencies beat bid marketplaces for complex builds.",
  },
}

export async function generateStaticParams() {
  return Object.keys(comparisons).map((slug) => ({ slug }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params
  const data = comparisons[slug]
  if (!data) return {}
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: `https://technest.dev/compare/${slug}` },
  }
}

export default async function ComparePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const data = comparisons[slug]
  if (!data) notFound()

  return (
    <>
      <Navbar />
      <main className="min-h-dvh pt-24 pb-24">
        <div className="max-w-350 mx-auto px-6 md:px-10">
          {/* Header */}
          <div className="max-w-[640px] py-16">
            <p className="text-xs font-medium text-primary tracking-widest uppercase mb-3">Comparison</p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-foreground mb-3">
              {data.headline}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">{data.subheadline}</p>
            <p className="text-base text-muted-foreground leading-relaxed">{data.intro}</p>
          </div>

          {/* Comparison table */}
          <div className="mb-16 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="text-left py-4 pr-8 text-sm font-medium text-muted-foreground w-2/5">Feature</th>
                  <th className="text-left py-4 pr-8 text-sm font-semibold text-primary">TechNest</th>
                  <th className="text-left py-4 text-sm font-medium text-muted-foreground">{data.competitor}</th>
                </tr>
              </thead>
              <tbody>
                {data.rows.map((row) => (
                  <tr key={row.feature} className="border-b border-border/40 hover:bg-muted/20 transition-colors">
                    <td className="py-4 pr-8 text-sm text-foreground font-medium">{row.feature}</td>
                    <td className="py-4 pr-8 text-sm text-foreground">
                      {typeof row.technest === "boolean" ? (
                        row.technest ? (
                          <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400">
                            <RiCheckLine size={14} /> Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-red-500">
                            <RiCloseLine size={14} /> No
                          </span>
                        )
                      ) : (
                        row.technest
                      )}
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">
                      {typeof row.competitor === "boolean" ? (
                        row.competitor ? (
                          <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400">
                            <RiCheckLine size={14} /> Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-red-500">
                            <RiCloseLine size={14} /> No
                          </span>
                        )
                      ) : (
                        row.competitor
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Verdict */}
          <div className="rounded-2xl border border-border/60 bg-muted/20 p-8 mb-16 max-w-[720px]">
            <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-3">Verdict</p>
            <p className="text-base text-foreground leading-relaxed">{data.verdict}</p>
          </div>

          {/* CTA */}
          <div className="max-w-[480px]">
            <h2 className="text-2xl font-semibold text-foreground mb-3">
              See if TechNest is the right fit
            </h2>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Book a free 30-minute strategy call. We&apos;ll map your project requirements and give you
              a direct scope and timeline estimate — no pitch deck, no sales pressure.
            </p>
            <CalendlyButton
              label="Book Free Strategy Call"
              variant="primary"
              trackAs={`compare_page_${slug}`}
              icon={<RiArrowRightLine size={15} />}
              className="flex-row-reverse"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
