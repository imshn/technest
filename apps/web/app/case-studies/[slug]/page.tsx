import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CalendlyButton } from "@/components/calendly-button"
import { caseStudies } from "@/components/case-studies-preview"
import { RelatedContent, getRelatedContent } from "@/components/related-content"
import { RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react"
import Link from "next/link"

type CaseStudyContent = {
  challenge: React.ReactNode
  solution: React.ReactNode
  results: React.ReactNode
  approach: React.ReactNode
}

// Add your case study content here
const caseStudyContent: Record<string, CaseStudyContent> = {
  "case-study-1": {
    challenge: (
      <p className="text-muted-foreground">
        Add detailed case study content here. This is a placeholder — you'll fill in the specific challenge, solution, results, and approach for this case study.
      </p>
    ),
    solution: (
      <p className="text-muted-foreground">
        Add solution details here.
      </p>
    ),
    results: (
      <p className="text-muted-foreground">
        Add results details here.
      </p>
    ),
    approach: (
      <p className="text-muted-foreground">
        Add approach details here.
      </p>
    ),
  },
  "case-study-2": {
    challenge: (
      <p className="text-muted-foreground">
        Add detailed case study content here. This is a placeholder — you'll fill in the specific challenge, solution, results, and approach for this case study.
      </p>
    ),
    solution: (
      <p className="text-muted-foreground">
        Add solution details here.
      </p>
    ),
    results: (
      <p className="text-muted-foreground">
        Add results details here.
      </p>
    ),
    approach: (
      <p className="text-muted-foreground">
        Add approach details here.
      </p>
    ),
  },
  "case-study-3": {
    challenge: (
      <p className="text-muted-foreground">
        Add detailed case study content here. This is a placeholder — you'll fill in the specific challenge, solution, results, and approach for this case study.
      </p>
    ),
    solution: (
      <p className="text-muted-foreground">
        Add solution details here.
      </p>
    ),
    results: (
      <p className="text-muted-foreground">
        Add results details here.
      </p>
    ),
    approach: (
      <p className="text-muted-foreground">
        Add approach details here.
      </p>
    ),
  },
}

const siteUrl = "https://technest.dev"

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await props.params
  const study = caseStudies.find((cs) => cs.slug === slug)
  if (!study) return {}

  const canonical = `${siteUrl}/case-studies/${slug}`

  return {
    title: `${study.title} | TechNest Case Study`,
    description: study.result,
    keywords: [
      study.company,
      ...study.services,
      "case study",
      "results",
    ],
    authors: [{ name: "TechNest", url: siteUrl }],
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: study.title,
      description: study.result,
      siteName: "TechNest",
    },
  }
}

export default async function CaseStudyPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const study = caseStudies.find((cs) => cs.slug === slug)
  const content = caseStudyContent[slug]

  if (!study || !content) notFound()

  const canonical = `${siteUrl}/case-studies/${slug}`
  const studyIndex = caseStudies.findIndex((cs) => cs.slug === slug)
  const nextStudy = caseStudies[(studyIndex + 1) % caseStudies.length]!
  const prevStudy = caseStudies[(studyIndex - 1 + caseStudies.length) % caseStudies.length]!

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": study.title,
            "description": study.result,
            "author": {
              "@type": "Organization",
              "name": "TechNest",
              "url": siteUrl,
            },
            "publisher": {
              "@type": "Organization",
              "name": "TechNest",
              "url": siteUrl,
            },
            "url": canonical,
            "image": `${siteUrl}/og-image.png`,
            "mentions": study.services.map((svc) => ({
              "@type": "Thing",
              "name": svc,
              "url": `${siteUrl}/services/${svc.toLowerCase().replace(/\s+/g, "-")}`,
            })),
            "relatedLink": getRelatedContent(slug, caseStudies, "case-study")
              .filter((item) => item.type !== "case-study")
              .map((item) => ({
                "@type": "WebPage",
                "url": `${siteUrl}${item.href}`,
                "name": item.title,
              })),
          }),
        }}
      />
      <Navbar />
      <main className="min-h-dvh pt-24 pb-24">
        <div className="max-w-350 mx-auto px-6 md:px-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="pt-10 pb-8 flex items-center gap-2 text-xs text-muted-foreground"
          >
            <a href="/" className="hover:text-foreground transition-colors duration-150">Home</a>
            <span className="text-border">/</span>
            <a href="/case-studies" className="hover:text-foreground transition-colors duration-150">Case Studies</a>
            <span className="text-border">/</span>
            <span className="text-foreground font-medium truncate max-w-[32ch]">{study.title}</span>
          </nav>

          {/* Hero */}
          <div className="max-w-[750px] py-12 mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="px-3 py-1.5 rounded-full bg-primary/8 text-primary border border-primary/10 text-xs font-medium">
                {study.company}
              </div>
              <span className="text-xs text-muted-foreground/60">{study.industry}</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-semibold tracking-[-0.04em] text-foreground mb-6 leading-tight">
              {study.title}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-[65ch]">
              {study.result}
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-20 items-start">
            {/* Main content */}
            <article className="flex flex-col gap-12">
              {/* Challenge */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">The Challenge</h2>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  {content.challenge}
                </div>
              </section>

              {/* Solution */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Our Solution</h2>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  {content.solution}
                </div>
              </section>

              {/* Approach */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Our Approach</h2>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  {content.approach}
                </div>
              </section>

              {/* Results */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Results</h2>
                <div className="py-6 px-6 rounded-2xl border border-primary/20 bg-primary/5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                        {study.metricValue}
                      </p>
                      <p className="text-sm text-muted-foreground font-medium">{study.metric}</p>
                    </div>
                    <div className="text-muted-foreground leading-relaxed space-y-4">
                      {content.results}
                    </div>
                  </div>
                </div>
              </section>

              {/* Services used */}
              <section>
                <h3 className="text-xl font-semibold text-foreground mb-4">Services</h3>
                <div className="flex flex-wrap gap-2">
                  {study.services.map((svc) => {
                    const serviceSlug = svc.toLowerCase().replace(/\s+/g, "-")
                    return (
                      <Link
                        key={svc}
                        href={`/services/${serviceSlug}`}
                        className="px-4 py-2 rounded-full bg-primary/8 text-primary border border-primary/10 text-sm font-medium hover:bg-primary/12 transition-colors duration-200"
                      >
                        {svc}
                      </Link>
                    )
                  })}
                </div>
              </section>

              {/* Related content */}
              <RelatedContent
                items={getRelatedContent(slug, caseStudies satisfies typeof caseStudies, "case-study").slice(0, 2)}
                title="Explore More Case Studies"
              />
            </article>

            {/* Sidebar */}
            <div>
              <div
                className="sticky top-24 rounded-2xl border border-border/60 bg-card p-7 flex flex-col gap-6"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
              >
                <div>
                  <p className="text-base font-semibold text-foreground mb-1">Similar Results?</p>
                  <p className="text-sm text-muted-foreground">Let's talk about your project and see what's possible.</p>
                </div>

                <CalendlyButton
                  label="Schedule a Call"
                  variant="primary"
                  trackAs={`case_study_${slug}`}
                  className="w-full justify-center"
                />
              </div>
            </div>
          </div>

          {/* Navigation to next/prev studies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20 pt-12 border-t border-border/60">
            <Link
              href={`/case-studies/${prevStudy.slug}`}
              className="group flex items-start gap-4 p-6 rounded-xl border border-border/40 hover:border-primary/40 transition-colors duration-200"
            >
              <div className="w-10 h-10 rounded-full bg-primary/8 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/15 transition-colors">
                <RiArrowLeftLine size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground/70 font-medium mb-1">Previous</p>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  {prevStudy.title}
                </p>
              </div>
            </Link>

            <Link
              href={`/case-studies/${nextStudy.slug}`}
              className="group flex items-start gap-4 p-6 rounded-xl border border-border/40 hover:border-primary/40 transition-colors duration-200 text-right md:text-left md:col-start-2"
            >
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground/70 font-medium mb-1">Next</p>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  {nextStudy.title}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/8 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/15 transition-colors">
                <RiArrowRightLine size={18} />
              </div>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
