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
      <>
        <p className="text-muted-foreground leading-relaxed">
          A fast-growing fintech startup was qualifying inbound leads manually. Every morning, a sales rep would open the CRM, review 30–50 new inbound submissions, score each one based on company size, industry, and stated use case, and route them to the right account executive. The process took 8–10 hours per week — time the sales team couldn&apos;t spend selling.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          The bigger problem: the scoring was inconsistent. Different reps applied different criteria. High-value leads occasionally got routed to the wrong account executive or sat untouched over weekends. The company was losing deals it didn&apos;t know it had.
        </p>
      </>
    ),
    approach: (
      <>
        <p className="text-muted-foreground leading-relaxed">
          We designed a two-stage agentic workflow. The first stage enriches each inbound submission: a retrieval agent pulls company data from public sources and cross-references it against the client&apos;s proprietary ICP criteria stored in a vector database. The second stage scores and routes: an LLM reasoning agent evaluates the enriched profile, assigns a confidence-weighted lead score, and writes the result back to the CRM with a routing decision and a one-paragraph rationale.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          The workflow runs via N8n, triggered on every new CRM entry. A human-in-the-loop checkpoint flags leads where the confidence score falls below a threshold — typically 3–5 per day — for manual review. Everything else is handled automatically.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          The entire system was built on the client&apos;s infrastructure, deployed in two weeks, and handed off with full documentation and monitoring dashboards.
        </p>
      </>
    ),
    solution: (
      <>
        <p className="text-muted-foreground leading-relaxed">
          The agentic lead scoring workflow eliminated manual qualification entirely for 94% of inbound leads. The sales team now reviews a prioritized list each morning — high-confidence leads at the top, with the AI&apos;s reasoning visible inline — instead of scoring leads from scratch.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Routing consistency improved immediately. Because the scoring criteria are encoded in the system prompt and vector store, every lead is evaluated against the same ICP definition. There is no variance between reps, no weekend backlog, and no leads that fall through the cracks.
        </p>
      </>
    ),
    results: (
      <>
        <ul className="flex flex-col gap-3">
          <li className="flex items-start gap-3 text-muted-foreground text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
            <span><strong className="text-foreground">8 hours saved per week</strong> — sales reps redirected to outbound prospecting and deal progression</span>
          </li>
          <li className="flex items-start gap-3 text-muted-foreground text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
            <span><strong className="text-foreground">94% of leads scored automatically</strong> — only edge cases reach a human queue</span>
          </li>
          <li className="flex items-start gap-3 text-muted-foreground text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
            <span><strong className="text-foreground">Routing errors eliminated</strong> — consistent ICP scoring applied to every submission regardless of time or rep</span>
          </li>
          <li className="flex items-start gap-3 text-muted-foreground text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
            <span><strong className="text-foreground">2-week build and deployment</strong> — live on the client&apos;s infrastructure with zero third-party data exposure</span>
          </li>
        </ul>
      </>
    ),
  },
  "case-study-2": {
    challenge: (
      <>
        <p className="text-muted-foreground leading-relaxed">
          A B2B SaaS founder came to us with a validated idea, a development timeline from a previous agency of 6–9 months, and a seed round that closed with the expectation of launching in Q2. The math didn&apos;t work.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          The product needed multi-tenancy (organizations with multiple seats), Stripe subscription billing with a free trial, an onboarding flow that got users to first value in under 5 minutes, and a dashboard that surfaced the core metric users cared about. Not a prototype — a production platform that could handle early paying customers from day one.
        </p>
      </>
    ),
    approach: (
      <>
        <p className="text-muted-foreground leading-relaxed">
          We used our standard SaaS stack: Next.js 14 with App Router for the frontend, Supabase for database and auth with row-level security for multi-tenancy, Stripe for subscriptions and the hosted customer portal, and Vercel for deployment with preview environments on every PR.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Week 1 was entirely data model and architecture. We designed the organization → member → role hierarchy, mapped the Stripe subscription lifecycle to database state, and planned the onboarding flow end-to-end before writing a line of product code. This investment paid back every day of the remaining five weeks.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          We shipped a working preview URL by end of week 2 — authentication, billing, and an empty dashboard. The client could click through the actual product, not a Figma prototype. From week 3 onward, we built features against real data and real user feedback.
        </p>
      </>
    ),
    solution: (
      <>
        <p className="text-muted-foreground leading-relaxed">
          The platform launched on schedule in week 6. Multi-tenant architecture with RLS enforced at the database layer — no tenant can access another&apos;s data even if an application bug exists. Stripe subscriptions with a 14-day free trial, automated billing emails, and a self-serve upgrade/downgrade flow.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          The onboarding flow — the component the founder cared most about — got users to their first meaningful action in 4 minutes on average in early testing. The platform scaled to 50,000 users within five months of launch with zero infrastructure incidents.
        </p>
      </>
    ),
    results: (
      <>
        <ul className="flex flex-col gap-3">
          <li className="flex items-start gap-3 text-muted-foreground text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
            <span><strong className="text-foreground">Launched in 6 weeks</strong> — production-ready, not a prototype</span>
          </li>
          <li className="flex items-start gap-3 text-muted-foreground text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
            <span><strong className="text-foreground">Scaled to 50,000 users</strong> in 5 months post-launch with zero infrastructure incidents</span>
          </li>
          <li className="flex items-start gap-3 text-muted-foreground text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
            <span><strong className="text-foreground">4-minute time to first value</strong> in onboarding — measured from sign-up to first meaningful action</span>
          </li>
          <li className="flex items-start gap-3 text-muted-foreground text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
            <span><strong className="text-foreground">Full IP transfer</strong> — 100% of source code, credentials, and documentation handed off at launch</span>
          </li>
        </ul>
      </>
    ),
  },
  "case-study-3": {
    challenge: (
      <>
        <p className="text-muted-foreground leading-relaxed">
          An e-commerce operations team was running their entire automation stack on Zapier: inventory sync between their warehouse system and Shopify, order routing to three different fulfillment partners, post-purchase email sequences, and a daily reporting workflow that aggregated data from five different tools.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          The Zapier bill had grown to $2,400/month — a line item that showed no sign of shrinking as the business scaled. More importantly, several critical workflows were hitting Zapier&apos;s step and execution limits, requiring workarounds that made the automations fragile. The team was spending time maintaining automations instead of building new ones.
        </p>
      </>
    ),
    approach: (
      <>
        <p className="text-muted-foreground leading-relaxed">
          We audited every Zapier workflow and categorized each by complexity, execution volume, and criticality. The migration plan prioritized high-volume, simple workflows first — these delivered the immediate cost savings — and left the most complex workflows for last, allowing time to rebuild them properly in N8n rather than recreating Zapier&apos;s workarounds.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          We deployed self-hosted N8n on a $40/month DigitalOcean droplet, configured with PostgreSQL for workflow history, Nginx for SSL termination, and automated daily backups to S3. The environment was production-ready before a single workflow was migrated.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          The inventory sync and order routing workflows were rebuilt first — these were Zapier&apos;s biggest cost drivers. The new N8n versions used the HTTP Request node to connect directly to the warehouse API with proper error handling, retry logic, and alerting that the Zapier versions never had.
        </p>
      </>
    ),
    solution: (
      <>
        <p className="text-muted-foreground leading-relaxed">
          The full migration — 14 Zapier workflows to N8n — took two weeks. Every workflow was tested in staging before going live, with parallel running for the most critical paths to validate output parity before cutting over.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          The rebuilt workflows were not just cheaper — they were more reliable. N8n&apos;s error handling meant that when the warehouse API returned a 500 error, the workflow retried three times with exponential backoff and then sent a Slack alert instead of silently failing. The team now has visibility into every workflow execution and can debug failures from the N8n dashboard.
        </p>
      </>
    ),
    results: (
      <>
        <ul className="flex flex-col gap-3">
          <li className="flex items-start gap-3 text-muted-foreground text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
            <span><strong className="text-foreground">$2,200/month saved</strong> — from $2,400/month on Zapier to ~$200/month total (server + N8n Cloud backup)</span>
          </li>
          <li className="flex items-start gap-3 text-muted-foreground text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
            <span><strong className="text-foreground">85% cost reduction</strong> — payback on migration cost in under 30 days</span>
          </li>
          <li className="flex items-start gap-3 text-muted-foreground text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
            <span><strong className="text-foreground">14 workflows migrated</strong> in 2 weeks with zero production incidents</span>
          </li>
          <li className="flex items-start gap-3 text-muted-foreground text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
            <span><strong className="text-foreground">Full error visibility</strong> — retry logic, alerting, and execution history that Zapier never provided</span>
          </li>
        </ul>
      </>
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
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}` },
              { "@type": "ListItem", position: 2, name: "Case Studies", item: `${siteUrl}/case-studies` },
              { "@type": "ListItem", position: 3, name: study.title, item: canonical },
            ],
          }),
        }}
      />
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
