import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CalendlyButton } from "@/components/calendly-button"
import {
  RiArrowRightLine,
  RiMapPin2Line,
  RiTeamLine,
  RiShieldCheckLine,
  RiCodeSSlashLine,
} from "@remixicon/react"

const siteUrl = "https://technestsolutions.in"

export const metadata: Metadata = {
  title: "About",
  description:
    "TechNest is a remote-first AI automation and software development agency founded in 2023 by Shaan, headquartered in Bengaluru, India, and working with clients across India, the USA, the Gulf, and worldwide.",
  alternates: { canonical: `${siteUrl}/about` },
}

export const facts = [
  { icon: RiTeamLine, label: "Founded", value: "2023, by Shaan (Founder & AI Engineer)" },
  { icon: RiMapPin2Line, label: "Based in", value: "Bengaluru, India — remote-first, working with clients across India, the USA, and the Gulf" },
  { icon: RiCodeSSlashLine, label: "What we build", value: "Multi-agent AI systems, N8n automation, SaaS platforms, and web/mobile apps" },
  { icon: RiShieldCheckLine, label: "How we work", value: "Fixed-scope engagements, weekly demos, 100% IP transfer at handoff" },
]

export const stack = [
  "LangChain", "LangGraph", "AutoGen", "CrewAI", "OpenAI API", "Claude API",
  "N8n", "Next.js", "React", "React Native", "Supabase", "PostgreSQL", "Stripe",
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh pt-24 pb-24">
        <div className="max-w-350 mx-auto px-6 md:px-10">
          <nav aria-label="Breadcrumb" className="pt-10 pb-8 flex items-center gap-2 text-xs text-muted-foreground">
            <a href="/" className="hover:text-foreground transition-colors duration-150">Home</a>
            <span className="text-border">/</span>
            <span className="text-foreground font-medium">About</span>
          </nav>

          <header className="pb-14 border-b border-border/60">
            <p className="text-xs font-medium text-primary tracking-widest uppercase mb-3">About TechNest</p>
            <h1 className="text-3xl md:text-4xl lg:text-[48px] font-semibold tracking-[-0.03em] leading-[1.04] text-foreground mb-5 max-w-[20ch]">
              An AI-native agency, built to replace manual work with working software.
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-[68ch]">
              TechNest was founded in 2023 by Shaan, an AI engineer and full-stack developer, on a simple premise: most businesses are losing hours every week to manual, decision-heavy workflows that AI agents and automation can now handle reliably. We design, build, and hand off systems that do exactly that — multi-agent AI pipelines, self-hosted N8n automation, and production SaaS and web platforms.
            </p>
          </header>

          <section className="py-14 grid grid-cols-1 md:grid-cols-2 gap-5">
            {facts.map((fact) => {
              const Icon = fact.icon
              return (
                <div key={fact.label} className="rounded-2xl border border-border/60 bg-card p-6 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/8 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Icon size={19} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">{fact.label}</p>
                    <p className="text-sm text-foreground leading-relaxed">{fact.value}</p>
                  </div>
                </div>
              )
            })}
          </section>

          <section className="py-10 border-t border-border/60">
            <p className="text-xs font-semibold text-foreground tracking-widest uppercase mb-5">Stack we work in</p>
            <div className="flex flex-wrap gap-2">
              {stack.map((t) => (
                <span
                  key={t}
                  className="text-xs font-medium px-3 py-1.5 rounded-full bg-primary/8 text-primary/80 border border-primary/15"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>

          <section className="py-10 border-t border-border/60">
            <p className="text-xs font-semibold text-foreground tracking-widest uppercase mb-5">Where we work</p>
            <div className="flex flex-wrap gap-3">
              <a href="/locations/india" className="text-sm text-muted-foreground hover:text-foreground border border-border/50 rounded-lg px-4 py-2 transition-colors hover:border-border">
                TechNest in India
              </a>
              <a href="/locations/usa" className="text-sm text-muted-foreground hover:text-foreground border border-border/50 rounded-lg px-4 py-2 transition-colors hover:border-border">
                TechNest in the USA
              </a>
              <a href="/locations/gulf" className="text-sm text-muted-foreground hover:text-foreground border border-border/50 rounded-lg px-4 py-2 transition-colors hover:border-border">
                TechNest in the Gulf
              </a>
            </div>
          </section>

          <section className="mt-10 rounded-2xl border border-primary/20 bg-primary/4 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-[520px]">
              <p className="text-lg font-semibold text-foreground mb-2">Want to talk through your project?</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Book a free 30-minute call. We&apos;ll map your highest-ROI automation opportunity before you commit to anything.
              </p>
            </div>
            <CalendlyButton
              label="Book Free Call"
              variant="primary"
              trackAs="about_page_cta"
              icon={<RiArrowRightLine size={14} />}
              className="flex-row-reverse shrink-0"
            />
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
