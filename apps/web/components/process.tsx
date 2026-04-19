const steps = [
  {
    number: "01",
    title: "Discovery Call",
    duration: "Week 1",
    description:
      "We map your current workflow, identify the highest-leverage automation targets, and define measurable success criteria before writing a single line of code.",
    deliverable: "Scope doc + ROI estimate",
  },
  {
    number: "02",
    title: "Architecture Design",
    duration: "Week 1–2",
    description:
      "System design, tech stack selection, data flow diagrams, and agent topology — everything reviewed and signed off before build starts.",
    deliverable: "Architecture blueprint",
  },
  {
    number: "03",
    title: "Build & Iterate",
    duration: "Week 2–6",
    description:
      "Two-week sprints with live demos every Friday. You see working software continuously — no surprises at the end, no black-box development cycles.",
    deliverable: "Staged working builds",
  },
  {
    number: "04",
    title: "Launch & Handoff",
    duration: "Week 6–8",
    description:
      "Production deployment, monitoring setup, team training, and 30-day post-launch support. You own all code, credentials, and infrastructure outright.",
    deliverable: "Full IP transfer + runbook",
  },
]

export function Process() {
  return (
    <section id="process" className="py-24 md:py-32 border-t border-border/60">
      <div className="max-w-350 mx-auto px-6 md:px-10">
        <div className="mb-14">
          <p className="text-xs font-medium text-primary tracking-widest uppercase mb-3">How It Works</p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-foreground">
            From first call to<br />production in 8 weeks.
          </h2>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-[calc(--spacing(14)+1px)] top-0 bottom-0 w-px bg-border/60" />

          <div className="flex flex-col gap-0">
            {steps.map((step, i) => (
              <div key={step.number} className="flex gap-8 md:gap-12 group">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-14 h-14 rounded-full border-2 border-border/60 bg-background flex items-center justify-center text-xs font-mono font-semibold text-muted-foreground group-hover:border-primary/40 group-hover:text-primary transition-colors duration-150 z-10">
                    {step.number}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="md:hidden w-px flex-1 bg-border/60 my-2" />
                  )}
                </div>

                <div className={`pb-12 flex-1 ${i === steps.length - 1 ? "" : "border-b border-border/40"}`}>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                    <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full border border-border/60 shrink-0 mt-0.5">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{step.description}</p>
                  <div className="inline-flex items-center gap-2 text-xs font-medium text-primary">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    {step.deliverable}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
