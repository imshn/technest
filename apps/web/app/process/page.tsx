import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CalendlyButton } from "@/components/calendly-button"
import {
  RiArrowRightLine,
  RiCheckboxCircleLine,
  RiFlowChart,
  RiRocketLine,
  RiSearchEyeLine,
  RiStackLine,
} from "@remixicon/react"

const siteUrl = "https://technestsolutions.in"

export const metadata: Metadata = {
  title: "Our Process | TechNest",
  description:
    "See how TechNest takes AI automation and software projects from discovery to launch with fixed scope, weekly demos, and full handoff.",
  alternates: { canonical: `${siteUrl}/process` },
}

const steps = [
  {
    number: "01",
    title: "Discovery Call",
    duration: "Week 1",
    icon: RiSearchEyeLine,
    description:
      "We map your current workflow, identify the highest-leverage automation targets, and define measurable success criteria before writing code.",
    deliverable: "Scope doc + ROI estimate",
  },
  {
    number: "02",
    title: "Architecture Design",
    duration: "Week 1-2",
    icon: RiFlowChart,
    description:
      "System design, tech stack selection, data flow diagrams, and agent topology are reviewed with you before build starts.",
    deliverable: "Architecture blueprint",
  },
  {
    number: "03",
    title: "Build & Iterate",
    duration: "Week 2-6",
    icon: RiStackLine,
    description:
      "Two-week sprints with live demos every Friday. You see working software continuously, so decisions stay grounded in real progress.",
    deliverable: "Staged working builds",
  },
  {
    number: "04",
    title: "Launch & Handoff",
    duration: "Week 6-8",
    icon: RiRocketLine,
    description:
      "Production deployment, monitoring setup, team training, and 30-day post-launch support. You own all code and infrastructure.",
    deliverable: "Full IP transfer + runbook",
  },
]

const principles = [
  "Fixed-scope pricing before build starts",
  "Weekly demos with working software",
  "Async-first communication with clear decisions",
  "Full ownership transfer at handoff",
]

export default function ProcessPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh pt-24 pb-24">
        <div className="max-w-350 mx-auto px-6 md:px-10">
          <nav aria-label="Breadcrumb" className="pt-10 pb-8 flex items-center gap-2 text-xs text-muted-foreground">
            <a href="/" className="hover:text-foreground transition-colors duration-150">Home</a>
            <span className="text-border">/</span>
            <span className="text-foreground font-medium">Process</span>
          </nav>

          <header className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-end pb-14  ">
            <div>
              <p className="text-xs font-medium text-primary tracking-widest uppercase mb-3">How It Works</p>
              <h1 className="text-3xl md:text-4xl lg:text-[52px] font-semibold tracking-[-0.03em] leading-[1.02] text-foreground mb-5">
                From first call to production in 8 weeks.
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-[62ch]">
                A clear operating rhythm for AI automation and software builds: define the business outcome, design the system, ship in visible increments, then hand over everything cleanly.
              </p>
            </div>
           
            <div className="rounded-2xl border border-border/60 bg-card p-6" style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}>
              <p className="text-xs font-semibold text-foreground tracking-widest uppercase mb-4">Engagement Rules</p>
              <ul className="flex flex-col gap-3">
                {principles.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                    <RiCheckboxCircleLine size={16} className="mt-0.5 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </header>
            <div className="border-b border/border-60 mt-10" />
          <section className="py-14 pt-10 md:py-18 md:pt-10">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
              {steps.map((step) => {
                const Icon = step.icon
                return (
                  <article key={step.number} className="rounded-2xl border border-border/60 bg-card p-6 flex flex-col gap-5 min-h-80 hover:border-primary/40 transition-colors duration-200">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs font-mono font-semibold text-muted-foreground">{step.number}</span>
                      <span className="text-[11px] font-medium text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full border border-border/60">
                        {step.duration}
                      </span>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-primary/8 border border-primary/20 flex items-center justify-center text-primary">
                      <Icon size={19} />
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <h2 className="text-lg font-semibold text-foreground">{step.title}</h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                    <div className="pt-4 border-t border-border/50 flex items-center gap-2 text-xs font-medium text-primary">
                      <span className="w-1 h-1 rounded-full bg-primary" />
                      {step.deliverable}
                    </div>
                  </article>
                )
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-primary/20 bg-primary/4 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-lg font-semibold text-foreground mb-2">Want to pressure-test your project idea?</p>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[58ch]">
                Bring the messy workflow, rough scope, or half-formed automation idea. We will help you identify the first useful build.
              </p>
            </div>
            <CalendlyButton
              label="Book Free Call"
              variant="primary"
              trackAs="process_page_cta"
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
