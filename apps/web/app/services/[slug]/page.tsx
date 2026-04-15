import { notFound } from "next/navigation"
import type { Metadata } from "next"
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
} from "@remixicon/react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CalendlyButton } from "@/components/calendly-button"
import { RelatedContent, getRelatedContent } from "@/components/related-content"
import { caseStudies } from "@/components/case-studies-preview"
import { blogPosts } from "@/components/blog-preview"
import { RiArrowRightLine } from "@remixicon/react"

type ServiceData = {
  icon: React.ElementType
  title: string
  tagline: string
  description: string
  benefits: string[]
  deliverables: string[]
  process: { step: string; detail: string }[]
  faq: { q: string; a: string }[]
  metaTitle: string
  metaDescription: string
}

const services: Record<string, ServiceData> = {
  "multi-agent-ai-systems": {
    icon: RiRobotLine,
    title: "Multi-Agent AI Systems",
    tagline: "Autonomous AI pipelines that replace manual decision-making at scale",
    description:
      "We design, build, and deploy multi-agent AI systems that handle complex, multi-step business workflows end-to-end. From data ingestion to decision-making to output delivery, your agents work continuously without human intervention.",
    benefits: [
      "Replace 10–40 hours of manual work per week",
      "Agents that reason, retry, and handle edge cases autonomously",
      "Built on battle-tested frameworks: LangChain, OpenAI, Claude API",
      "Fully observable with logging and audit trails",
      "Deployable on your infrastructure — no vendor lock-in",
    ],
    deliverables: [
      "Multi-agent architecture blueprint",
      "Production-ready agent codebase",
      "Monitoring and observability setup",
      "Documentation and runbook",
      "30-day post-launch support",
    ],
    process: [
      { step: "Discovery", detail: "Map the workflow, identify decision points, define agent boundaries" },
      { step: "Architecture", detail: "Design agent topology, tool registry, memory strategy, and evaluation framework" },
      { step: "Build", detail: "Iterative development with weekly demos and continuous feedback" },
      { step: "Deploy", detail: "Production launch, monitoring, and team handoff with full IP transfer" },
    ],
    faq: [
      { q: "What frameworks do you use for multi-agent systems?", a: "We use LangChain and LangGraph for orchestration, OpenAI and Claude for reasoning, and custom tool wrappers for your existing systems. We select the stack based on your specific requirements." },
      { q: "How long does a multi-agent project take?", a: "Most multi-agent systems take 6–10 weeks from discovery to production launch, depending on the number of agents and the complexity of integrations." },
      { q: "Can agents be integrated with our existing software?", a: "Yes. We connect agents to your CRM, databases, communication tools, and APIs. If it has a webhook or API, we can integrate it." },
    ],
    metaTitle: "Multi-Agent AI Systems Development | TechNest",
    metaDescription:
      "Build autonomous multi-agent AI pipelines that replace manual workflows. LangChain, OpenAI, Claude API — deployed on your infrastructure. Free strategy call.",
  },
  "agentic-workflows": {
    icon: RiFlowChart,
    title: "Agentic Workflows",
    tagline: "Intelligent automation that observes, reasons, and acts on your data",
    description:
      "Agentic workflows go beyond simple if-then automations. They use LLM reasoning to handle ambiguity, make decisions in context, and adapt to new inputs — replacing entire job functions, not just tasks.",
    benefits: [
      "Handle complex, conditional decision trees without hardcoding logic",
      "Use RAG to ground decisions in your proprietary data",
      "Function calling for real-time tool use and API interactions",
      "Memory persistence across workflow runs",
      "Full audit trail for compliance",
    ],
    deliverables: [
      "Workflow design document",
      "Production agentic pipeline",
      "RAG system (if applicable)",
      "Integration test suite",
      "Runbook and handoff documentation",
    ],
    process: [
      { step: "Discovery", detail: "Identify the highest-ROI workflow to automate first" },
      { step: "Design", detail: "Map decision logic, tool use, and data flow" },
      { step: "Build", detail: "Iterative agent development with real data testing" },
      { step: "Deploy", detail: "Staging validation, production launch, monitoring" },
    ],
    faq: [
      { q: "What is the difference between agentic workflows and RPA?", a: "RPA follows rigid scripts. Agentic workflows use LLM reasoning to handle unstructured data, ambiguity, and edge cases that break traditional automation." },
      { q: "How do you handle sensitive or proprietary data?", a: "We sign NDA before engagement starts. Data stays in your infrastructure. We can deploy models that run fully on-premise if needed." },
    ],
    metaTitle: "Agentic Workflow Development | TechNest",
    metaDescription:
      "Replace repetitive decisions with intelligent AI agents. RAG, function calling, memory — agentic workflows built for your business data. Free strategy call.",
  },
  "n8n-workflow-automation": {
    icon: RiLoopLeftLine,
    title: "N8n Workflow Automation",
    tagline: "Self-hosted automation that replaces Zapier at a fraction of the cost",
    description:
      "N8n gives you Zapier-level connectivity with none of the per-task pricing, data privacy concerns, or logic limitations. We design, deploy, and maintain N8n workflows that connect your entire SaaS stack on your own infrastructure.",
    benefits: [
      "80–90% cost reduction vs Zapier at high automation volume",
      "Full data privacy — runs on your servers, not a third-party cloud",
      "Complex conditional logic and custom code execution",
      "Connects 400+ apps and services natively",
      "Error handling, retry logic, and alerting built-in",
    ],
    deliverables: [
      "Self-hosted N8n setup (Docker/VPS)",
      "Workflow architecture document",
      "Production N8n workflows",
      "Monitoring and alerting",
      "Admin credentials and handoff",
    ],
    process: [
      { step: "Audit", detail: "Map your existing tools and manual handoffs" },
      { step: "Deploy", detail: "Spin up self-hosted N8n on your infrastructure" },
      { step: "Build", detail: "Workflow-by-workflow development and testing" },
      { step: "Handoff", detail: "Full credential and admin transfer to your team" },
    ],
    faq: [
      { q: "Why N8n instead of Zapier or Make?", a: "N8n is self-hosted, which means no per-task billing, complete data privacy, and unlimited workflow complexity. For businesses running 10,000+ tasks per month, the cost savings are significant." },
      { q: "Do we need to manage the server ourselves?", a: "We handle the initial setup and configuration. We can also provide ongoing maintenance, or hand off full control to your team with documentation." },
    ],
    metaTitle: "N8n Workflow Automation Development | TechNest",
    metaDescription:
      "Self-hosted N8n automation to replace Zapier. Connect your entire SaaS stack with zero per-task fees. Built and deployed by TechNest. Free strategy call.",
  },
  "saas-platform-development": {
    icon: RiCodeSSlashLine,
    title: "SaaS Platform Development",
    tagline: "Production-ready SaaS from MVP to scale",
    description:
      "We build full-stack SaaS platforms with multi-tenancy, authentication, billing, and analytics built in from day one. Using Next.js, Supabase, and Stripe, we ship production-ready products in 6–10 weeks.",
    benefits: [
      "Multi-tenant architecture from the start",
      "Stripe billing with subscription management",
      "Supabase auth with Row-Level Security",
      "Server-side rendering for SEO and performance",
      "Built to scale from 100 to 100,000 users",
    ],
    deliverables: [
      "Full-stack Next.js + Supabase codebase",
      "Stripe integration with billing portal",
      "Admin dashboard",
      "Deployment to Vercel or your infrastructure",
      "Full IP and credential transfer",
    ],
    process: [
      { step: "Discovery", detail: "Define core feature set and go-to-market requirements" },
      { step: "Architecture", detail: "Database schema, auth strategy, billing model design" },
      { step: "Build", detail: "Sprint-based development with working builds every 2 weeks" },
      { step: "Launch", detail: "Production deploy, DNS, monitoring, and handoff" },
    ],
    faq: [
      { q: "How long does a SaaS MVP take to build?", a: "A focused MVP with auth, billing, and core features typically takes 6–8 weeks. Scope drives timeline — we always start by cutting features to what's essential for first customers." },
      { q: "Do you handle design as well as development?", a: "Yes. We deliver Figma designs before development starts. UI is included in SaaS engagements." },
    ],
    metaTitle: "SaaS Platform Development Agency | TechNest",
    metaDescription:
      "Full-stack SaaS development with Next.js, Supabase, and Stripe. Multi-tenant, production-ready, and shipped in weeks. Free strategy call.",
  },
  "web-app-development": {
    icon: RiWindowLine,
    title: "Web App Development",
    tagline: "Fast, scalable web applications built for real traffic",
    description:
      "Custom web applications built on React, Next.js, and Postgres. Server-side rendering, optimized databases, and clean TypeScript codebases — built to perform under load and easy to maintain.",
    benefits: [
      "Server components and edge rendering for sub-100ms load times",
      "TypeScript throughout for maintainability",
      "Optimized Postgres queries with proper indexing",
      "Mobile-responsive by default",
      "Accessible, WCAG-compliant interfaces",
    ],
    deliverables: [
      "React/Next.js web application",
      "Database schema and migrations",
      "Deployment configuration",
      "Performance audit report",
      "Full codebase transfer",
    ],
    process: [
      { step: "Requirements", detail: "Define user flows, performance targets, and integration needs" },
      { step: "Design", detail: "Figma wireframes and component design" },
      { step: "Build", detail: "Iterative development with staging deploys" },
      { step: "Launch", detail: "Production deployment and handoff" },
    ],
    faq: [
      { q: "What stack do you use for web app development?", a: "Next.js App Router, TypeScript, Tailwind CSS, Postgres (via Supabase or Railway), and Vercel or AWS for deployment. We adjust based on your constraints." },
    ],
    metaTitle: "Web App Development Agency | TechNest",
    metaDescription:
      "Custom web app development with Next.js, React, and Postgres. Fast, scalable, TypeScript-first. Built by TechNest. Free strategy call.",
  },
  "mobile-app-development": {
    icon: RiSmartphoneLine,
    title: "Mobile App Development",
    tagline: "iOS and Android apps from a single React Native codebase",
    description:
      "Cross-platform mobile applications built with React Native and Expo. Native-feel UX, real-time data, push notifications, and full App Store and Google Play deployment handled end-to-end.",
    benefits: [
      "Single codebase for iOS and Android",
      "Native performance with React Native",
      "Push notifications and background sync",
      "App Store and Google Play submission included",
      "Expo for faster iteration and OTA updates",
    ],
    deliverables: [
      "React Native codebase",
      "App Store and Google Play submissions",
      "Push notification configuration",
      "OTA update pipeline",
      "Full IP transfer",
    ],
    process: [
      { step: "Discovery", detail: "Define core screens, user flows, and platform requirements" },
      { step: "Design", detail: "Mobile-first Figma designs with interactive prototype" },
      { step: "Build", detail: "Feature-by-feature development with TestFlight/internal testing" },
      { step: "Launch", detail: "Store submissions, review, and post-launch support" },
    ],
    faq: [
      { q: "Do you build native Swift/Kotlin apps or cross-platform?", a: "We build with React Native and Expo for most projects. This gives 95% of the native experience at a fraction of the cost and timeline. We recommend native only when the app requires deep OS-level integrations." },
    ],
    metaTitle: "Mobile App Development Agency | TechNest",
    metaDescription:
      "iOS and Android mobile app development with React Native and Expo. App Store launch included. Built by TechNest. Free strategy call.",
  },
  "desktop-app-development": {
    icon: RiComputerLine,
    title: "Desktop App Development",
    tagline: "Cross-platform desktop applications for Windows, macOS, and Linux",
    description:
      "Tauri and Electron-based desktop applications for internal tools, AI-powered local apps, or distributable software. Fully packaged installers for all major platforms with auto-update support.",
    benefits: [
      "Tauri for lightweight, secure apps with minimal bundle size",
      "Electron for maximum ecosystem compatibility",
      "Local AI inference for privacy-sensitive applications",
      "Auto-update pipelines via GitHub Releases",
      "Code signing for Windows and macOS",
    ],
    deliverables: [
      "Desktop application codebase",
      "Packaged installers for Windows, macOS, Linux",
      "Code signing setup",
      "Auto-update configuration",
      "Full IP transfer",
    ],
    process: [
      { step: "Scoping", detail: "Define target platforms, offline requirements, and distribution model" },
      { step: "Architecture", detail: "Decide on Tauri vs Electron based on constraints" },
      { step: "Build", detail: "Iterative builds tested on all target platforms" },
      { step: "Package", detail: "Installers, code signing, and distribution setup" },
    ],
    faq: [
      { q: "When would you choose Tauri over Electron?", a: "Tauri produces significantly smaller binaries (2–10MB vs 100MB+) and uses the OS webview instead of bundling Chromium. We recommend Tauri unless you need maximum browser API compatibility or have existing Electron code." },
    ],
    metaTitle: "Desktop App Development Agency | TechNest",
    metaDescription:
      "Cross-platform desktop app development with Tauri and Electron. Windows, macOS, Linux. Code-signed installers. Built by TechNest. Free strategy call.",
  },
  "graphic-designing": {
    icon: RiPenNibLine,
    title: "Graphic Designing",
    tagline: "Brand identity and product design built to convert",
    description:
      "Logo systems, UI kits, pitch decks, and digital brand assets designed in Figma with product thinking at the core. Every visual decision is made to support the business goal — not just to look good.",
    benefits: [
      "Logo and visual identity system",
      "Figma-based UI component library",
      "Pitch decks that communicate, not just impress",
      "Social media and marketing templates",
      "Brand guidelines document",
    ],
    deliverables: [
      "Logo files in all formats (SVG, PNG, PDF)",
      "Brand guidelines PDF",
      "Figma source files",
      "UI component library (if applicable)",
      "Social media asset pack",
    ],
    process: [
      { step: "Brief", detail: "Understand brand positioning, target audience, and existing assets" },
      { step: "Concepts", detail: "Three initial directions with rationale for each" },
      { step: "Refine", detail: "Two rounds of revisions on selected direction" },
      { step: "Deliver", detail: "Final files in all required formats with brand guidelines" },
    ],
    faq: [
      { q: "Do you work on design-only projects without development?", a: "Yes. Graphic design and brand identity are standalone services. We also offer UI/UX design handoffs ready for any development team." },
    ],
    metaTitle: "Graphic Design Services | TechNest",
    metaDescription:
      "Logo design, brand identity, UI kits, and pitch decks. Figma-based, product-thinking approach. Delivered by TechNest. Free strategy call.",
  },
  "digital-marketing": {
    icon: RiMegaphoneLine,
    title: "Digital Marketing",
    tagline: "Organic growth that compounds — not ad spend you can't turn off",
    description:
      "Technical SEO audits, programmatic content strategy, keyword clustering, and conversion-optimized landing pages. We build acquisition channels that scale over time without proportional budget increases.",
    benefits: [
      "Technical SEO audit with prioritized action list",
      "Keyword research and content cluster strategy",
      "Programmatic SEO for long-tail keyword capture",
      "CRO analysis with A/B test recommendations",
      "Monthly reporting on organic traffic and conversions",
    ],
    deliverables: [
      "SEO audit report",
      "Keyword strategy document",
      "Content calendar and briefs",
      "Landing page optimization recommendations",
      "Monthly performance report",
    ],
    process: [
      { step: "Audit", detail: "Technical SEO crawl, Core Web Vitals, and competitor gap analysis" },
      { step: "Strategy", detail: "Keyword clustering, content pillars, and programmatic page planning" },
      { step: "Execute", detail: "On-page optimization, content production, and link-building outreach" },
      { step: "Measure", detail: "GA4 dashboards, rank tracking, and monthly strategy review" },
    ],
    faq: [
      { q: "How long before we see results from SEO?", a: "Technical fixes can show results in 4–8 weeks. Content and authority-building typically shows meaningful organic growth at 3–6 months. We give you leading indicators (rankings, crawl health) before traffic moves." },
      { q: "Do you manage paid ads as well?", a: "We focus exclusively on organic channels — SEO, content, and CRO. For paid media, we can recommend specialists who complement an organic-first strategy." },
    ],
    metaTitle: "Digital Marketing & SEO Agency | TechNest",
    metaDescription:
      "Technical SEO, programmatic content, and CRO for sustainable organic growth. No ad spend dependencies. Built by TechNest. Free strategy call.",
  },
}

export async function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params
  const svc = services[slug]
  if (!svc) return {}
  return {
    title: svc.metaTitle,
    description: svc.metaDescription,
    alternates: { canonical: `https://technest.dev/services/${slug}` },
  }
}

export default async function ServicePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const svc = services[slug]
  if (!svc) notFound()

  const Icon = svc.icon

  return (
    <>
      <Navbar />
      <main className="min-h-dvh pt-24 pb-24">
        <div className="max-w-350 mx-auto px-6 md:px-10">
          {/* Header */}
          <div className="max-w-[640px] py-16">
            <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center text-primary mb-6">
              <Icon size={20} />
            </div>
            <p className="text-xs font-medium text-primary tracking-widest uppercase mb-3">Service</p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-foreground mb-4">
              {svc.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">{svc.tagline}</p>
            <p className="text-base text-muted-foreground leading-relaxed">{svc.description}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-20">
            <div className="flex flex-col gap-12">
              {/* Benefits */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-5">What you get</h2>
                <ul className="flex flex-col gap-3">
                  {svc.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-5">How it works</h2>
                <div className="flex flex-col gap-4">
                  {svc.process.map((p, i) => (
                    <div key={p.step} className="flex gap-4 items-start">
                      <div className="w-7 h-7 rounded-full border border-border/60 flex items-center justify-center text-xs font-mono text-muted-foreground shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{p.step}</p>
                        <p className="text-sm text-muted-foreground mt-0.5">{p.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-5">Common questions</h2>
                <div className="flex flex-col gap-6">
                  {svc.faq.map((f) => (
                    <div key={f.q}>
                      <p className="text-sm font-semibold text-foreground mb-2">{f.q}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related content */}
              <RelatedContent
                items={
                  caseStudies
                    .filter((cs) => cs.services.includes(svc.title))
                    .slice(0, 1)
                    .map((cs) => ({
                      title: cs.title,
                      href: `/case-studies/${cs.slug}`,
                      type: "case-study" as const,
                      description: cs.result,
                    }))
                }
                title="Proven Case Studies"
              />
            </div>

            {/* Sidebar */}
            <div>
              <div
                className="sticky top-24 rounded-2xl border border-border/60 bg-card p-7 flex flex-col gap-6"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
              >
                <div>
                  <p className="text-base font-semibold text-foreground mb-1">Start with a free call</p>
                  <p className="text-sm text-muted-foreground">30 minutes · No commitment · Just clarity on your project</p>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Deliverables</p>
                  <ul className="flex flex-col gap-2">
                    {svc.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1 h-1 rounded-full bg-border mt-1.5 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <CalendlyButton
                  label="Book Free Strategy Call"
                  variant="primary"
                  trackAs={`service_page_${slug}`}
                  icon={<RiArrowRightLine size={15} />}
                  className="w-full justify-center flex-row-reverse"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
