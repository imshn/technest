import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CalendlyButton } from "@/components/calendly-button"
import { caseStudies } from "@/components/case-studies-preview"
import { RiArrowRightLine, RiBarChart2Line } from "@remixicon/react"

const siteUrl = "https://technestsolutions.in"

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real client results from TechNest: agentic workflow deployments, SaaS launches, and N8n automation migrations, with the metrics that came out of each build.",
  alternates: { canonical: `${siteUrl}/case-studies` },
  openGraph: {
    type: "website",
    url: `${siteUrl}/case-studies`,
    title: "Case Studies | TechNest",
    description:
      "Real client results from TechNest: agentic workflow deployments, SaaS launches, and N8n automation migrations.",
    siteName: "TechNest",
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: "TechNest Case Studies" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | TechNest",
    description: "Real client results from TechNest.",
    images: [`${siteUrl}/og-image.png`],
  },
}

export default function CaseStudiesIndexPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh pt-24 pb-24">
        <div className="max-w-350 mx-auto px-6 md:px-10">
          <nav aria-label="Breadcrumb" className="pt-10 pb-8 flex items-center gap-2 text-xs text-muted-foreground">
            <a href="/" className="hover:text-foreground transition-colors duration-150">Home</a>
            <span className="text-border">/</span>
            <span className="text-foreground font-medium">Case Studies</span>
          </nav>

          <header className="max-w-180 pb-14 border-b border-border/60">
            <p className="text-xs font-medium text-primary tracking-widest uppercase mb-3">Case Studies</p>
            <h1 className="text-3xl md:text-4xl lg:text-[48px] font-semibold tracking-[-0.03em] leading-[1.04] text-foreground mb-5">
              Real results, not case-study theater
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              What each engagement started as a problem, what we built, and the number that changed once it shipped.
            </p>
          </header>

          <div className="py-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((study) => (
              <a
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                className="group rounded-2xl border border-border/60 bg-card p-6 flex flex-col gap-4 hover:border-primary/40 transition-all duration-200"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/8 text-primary border border-primary/20">
                    {study.industry}
                  </span>
                  <RiArrowRightLine size={14} className="text-muted-foreground group-hover:text-primary transition-colors duration-150 shrink-0" />
                </div>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-150 leading-snug">
                  {study.title}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">{study.challenge}</p>
                <div className="flex items-center gap-2 pt-2 mt-auto border-t border-border/40 text-primary">
                  <RiBarChart2Line size={14} />
                  <span className="text-sm font-semibold">{study.metricValue}</span>
                  <span className="text-xs text-muted-foreground">{study.metric}</span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/4 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-[520px]">
              <p className="text-lg font-semibold text-foreground mb-2">Want a result like this?</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                30 minutes. We&apos;ll map your highest-ROI automation opportunity and give you a direct scope and timeline.
              </p>
            </div>
            <CalendlyButton
              label="Book Free Call"
              variant="primary"
              trackAs="case_studies_index_cta"
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
