import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CalendlyButton } from "@/components/calendly-button"
import { RiArrowRightLine } from "@remixicon/react"

const siteUrl = "https://technestsolutions.in"

export const metadata: Metadata = {
  title: "TechNest vs Alternatives — Agency Comparisons",
  description:
    "How TechNest compares to Upwork, Toptal, Fiverr, Accenture, and Freelancer.com for AI automation and software development projects.",
  alternates: { canonical: `${siteUrl}/compare` },
  openGraph: {
    type: "website",
    url: `${siteUrl}/compare`,
    title: "TechNest vs Alternatives — Agency Comparisons",
    description:
      "How TechNest compares to Upwork, Toptal, Fiverr, Accenture, and Freelancer.com for AI automation and software development projects.",
    siteName: "TechNest",
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: "TechNest Comparisons" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TechNest vs Alternatives — Agency Comparisons",
    description:
      "How TechNest compares to Upwork, Toptal, Fiverr, Accenture, and Freelancer.com for AI automation and software development projects.",
    site: "@technestdev",
    images: [`${siteUrl}/og-image.png`],
  },
}

const comparisons = [
  {
    slug: "upwork",
    competitor: "Upwork",
    subheadline: "Agency vs. freelancer marketplace",
    summary: "Upwork connects you with individuals. TechNest owns the architecture, accountability, and outcome.",
  },
  {
    slug: "toptal",
    competitor: "Toptal",
    subheadline: "Agency vs. elite contractor network",
    summary: "Toptal embeds vetted engineers in your team. TechNest delivers a complete, working system.",
  },
  {
    slug: "fiverr",
    competitor: "Fiverr",
    subheadline: "Agency vs. task marketplace",
    summary: "Fiverr handles isolated gigs. TechNest handles complex, multi-system production builds.",
  },
  {
    slug: "accenture",
    competitor: "Accenture",
    subheadline: "Boutique agency vs. enterprise consultancy",
    summary: "Accenture suits Fortune 500 programs. TechNest moves faster, costs less, and ships production AI now.",
  },
  {
    slug: "freelancer",
    competitor: "Freelancer.com",
    subheadline: "Agency vs. bid-based marketplace",
    summary: "Freelancer.com optimizes for price. TechNest optimizes for a working system you can hand off.",
  },
]

export default function ComparePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh pt-24 pb-24">
        <div className="max-w-350 mx-auto px-6 md:px-10">
          <nav aria-label="Breadcrumb" className="pt-10 pb-8 flex items-center gap-2 text-xs text-muted-foreground">
            <a href="/" className="hover:text-foreground transition-colors duration-150">Home</a>
            <span className="text-border">/</span>
            <span className="text-foreground font-medium">Compare</span>
          </nav>

          <header className="mb-14">
            <h1 className="text-3xl md:text-4xl lg:text-[42px] font-semibold tracking-[-0.03em] leading-[1.08] text-foreground mb-4">
              TechNest vs Alternatives
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-[60ch]">
              Honest side-by-side comparisons — pricing, accountability, IP ownership, and what actually ships.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {comparisons.map((c) => (
              <a
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="group rounded-2xl border border-border/60 bg-card p-6 flex flex-col gap-3 hover:border-primary/40 transition-all duration-200"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-150">
                    TechNest vs {c.competitor}
                  </p>
                  <RiArrowRightLine size={14} className="text-muted-foreground group-hover:text-primary transition-colors duration-150 shrink-0" />
                </div>
                <p className="text-xs text-muted-foreground font-medium">{c.subheadline}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.summary}</p>
              </a>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-primary/20 bg-primary/4 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-base font-semibold text-foreground mb-1">Ready to compare in a real conversation?</p>
              <p className="text-sm text-muted-foreground max-w-[50ch]">
                30-minute free call. Bring your current setup and we'll tell you honestly whether we're the right fit.
              </p>
            </div>
            <CalendlyButton
              label="Book Free Call"
              variant="primary"
              trackAs="compare_index_cta"
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
