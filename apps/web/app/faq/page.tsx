import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CalendlyButton } from "@/components/calendly-button"
import { RiArrowRightLine, RiQuestionAnswerLine } from "@remixicon/react"

const siteUrl = "https://technestsolutions.in"

export const metadata: Metadata = {
  title: "FAQ | TechNest",
  description:
    "Answers to common questions about TechNest projects, pricing, timelines, ownership, N8n automation, AI agents, and remote collaboration.",
  alternates: { canonical: `${siteUrl}/faq` },
}

const faqs = [
  {
    q: "What types of businesses do you typically work with?",
    a: "We work with startups, scale-ups, and mid-market companies across SaaS, fintech, operations, healthcare, and e-commerce. Our clients are usually at the point where manual processes are visibly slowing down growth.",
  },
  {
    q: "How is TechNest different from hiring a freelancer or using Upwork?",
    a: "Freelancers optimize for task completion; we optimize for business outcomes. We own architecture decisions, push back on scope that will not move the needle, and stay accountable through launch.",
  },
  {
    q: "Why N8n instead of Zapier or Make for automation workflows?",
    a: "N8n runs self-hosted, which means no per-task pricing, stronger data privacy, and no vendor lock-in. For high-volume automations, N8n can be dramatically cheaper at scale.",
  },
  {
    q: "Do you work remotely, and which time zones do you cover?",
    a: "Yes. We are remote and async-first. Our team covers UTC+0 through UTC+5:30, with overlap for North America, the Gulf region, and South Asia.",
  },
  {
    q: "What does a typical project engagement look like?",
    a: "Discovery call, architecture design, two-week build sprints with Friday demos, production launch, then a 30-day support window. Most projects run 6-10 weeks depending on scope.",
  },
  {
    q: "Who owns the code and infrastructure after the project ends?",
    a: "You do. We transfer repositories, environment credentials, deployment configuration, and documentation to your accounts at handoff.",
  },
  {
    q: "How do you price projects?",
    a: "Fixed-scope engagements only. We define deliverables upfront and price against outcomes, not hours. Project minimums start at $1,000 USD.",
  },
  {
    q: "Can you integrate AI agents with HubSpot, Salesforce, Notion, or internal tools?",
    a: "Yes. Integration is usually the core of the work. We connect AI agents to CRMs, databases, Slack, email, storage systems, custom APIs, and webhook-based tools.",
  },
]

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh pt-24 pb-24">
        <div className="max-w-350 mx-auto px-6 md:px-10">
          <nav aria-label="Breadcrumb" className="pt-10 pb-8 flex items-center gap-2 text-xs text-muted-foreground">
            <a href="/" className="hover:text-foreground transition-colors duration-150">Home</a>
            <span className="text-border">/</span>
            <span className="text-foreground font-medium">FAQ</span>
          </nav>

          <header className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10 lg:gap-16 pb-14 border-b border-border/60">
            <div>
              <p className="text-xs font-medium text-primary tracking-widest uppercase mb-3">FAQ</p>
              <h1 className="text-3xl md:text-4xl lg:text-[48px] font-semibold tracking-[-0.03em] leading-[1.04] text-foreground mb-5">
                Common questions.
              </h1>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Straight answers on scope, timelines, ownership, automation platforms, and how working with TechNest feels day to day.
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-6 md:p-8" style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}>
              <div className="w-11 h-11 rounded-xl bg-primary/8 border border-primary/20 flex items-center justify-center text-primary mb-5">
                <RiQuestionAnswerLine size={19} />
              </div>
              <p className="text-lg font-semibold text-foreground mb-2">Need a direct answer?</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Book a 30-minute call and bring the exact workflow or product question you are trying to solve.
              </p>
              <CalendlyButton
                label="Book Free Call"
                variant="primary"
                trackAs="faq_page_top_cta"
                icon={<RiArrowRightLine size={14} />}
                className="flex-row-reverse"
              />
            </div>
          </header>

          <section className="py-10 md:py-14">
            <div className="flex flex-col divide-y divide-border/60">
              {faqs.map((faq, i) => (
                <details key={i} className="group py-6 [&[open]>summary>span:last-child]:rotate-45">
                  <summary className="flex items-start justify-between gap-5 cursor-pointer list-none">
                    <span className="text-base md:text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-150 pr-2">
                      {faq.q}
                    </span>
                    <span className="shrink-0 w-7 h-7 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground mt-0.5 transition-transform duration-200">
                      <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                  </summary>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed pt-4 pr-10 max-w-[78ch]">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
