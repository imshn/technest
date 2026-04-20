const faqs = [
  {
    q: "What types of businesses do you typically work with?",
    a: "We work with startups, scale-ups, and mid-market companies across SaaS, fintech, operations, healthcare, and e-commerce. Our clients are usually at the point where manual processes are visibly slowing down growth — that's when automation yields the highest return.",
  },
  {
    q: "How is TechNest different from hiring a freelancer or using a platform like Upwork?",
    a: "Freelancers optimize for task completion; we optimize for business outcomes. We own the architecture decisions, push back on scope that won't move the needle, and stay accountable through launch and beyond. You also get a team — not a single point of failure.",
  },
  {
    q: "Why N8n instead of Zapier or Make for automation workflows?",
    a: "N8n runs self-hosted, which means no per-task pricing, full data privacy, and no vendor lock-in. For businesses running high-volume automations, N8n typically costs 80–90% less than Zapier at scale. It also supports far more complex logic and custom code execution.",
  },
  {
    q: "Do you work with clients remotely, and which time zones do you cover?",
    a: "Entirely remote and async-first. Our team covers UTC+0 through UTC+5:30, which gives strong overlap with North America (EST/PST mornings), UK and Europe (GMT/CET), the Gulf region (UAE, Kuwait, Saudi Arabia), and Turkey (TRT). Weekly syncs can be scheduled across all these zones.",
  },
  {
    q: "What does a typical project engagement look like from start to finish?",
    a: "Discovery call → architecture design → 2-week build sprints with Friday demos → production launch → 30-day support window. Most projects run 6–10 weeks depending on scope. You get a working build to review continuously — no big-bang reveals.",
  },
  {
    q: "Who owns the code and infrastructure after the project ends?",
    a: "You do. 100%. We transfer all repositories, environment credentials, and deployment configurations to your accounts at handoff. There are no ongoing licensing fees, no proprietary frameworks, and no dependency on us to keep the system running.",
  },
  {
    q: "How do you price projects — fixed cost or hourly?",
    a: "Fixed-scope engagements only. We define deliverables upfront and price against outcomes, not hours. This means no invoice surprises and no incentive to pad timelines. Project minimums start at $1000 USD.",
  },
  {
    q: "Can you integrate AI agents with our existing tools like HubSpot, Salesforce, or Notion?",
    a: "Yes — integration is usually the core of the work. We connect AI agents to CRMs, databases, communication tools (Slack, email), storage systems, and custom APIs. If it has a webhook or API, we can wire it into an intelligent workflow.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32 border-t border-border/60">
      <div className="max-w-350 mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20">
          <div className="lg:pt-1">
            <p className="text-xs font-medium text-primary tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-foreground">
              Common questions
            </h2>
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
              Still have questions? Book a free 30-minute call and get direct answers.
            </p>
          </div>

          <div className="flex flex-col divide-y divide-border/60">
            {faqs.map((faq, i) => (
              <details key={i} className="group py-5 [&[open]>summary>span:last-child]:rotate-45">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-150 pr-2">
                    {faq.q}
                  </span>
                  <span className="shrink-0 w-5 h-5 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground mt-0.5 transition-transform duration-200">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="text-sm text-muted-foreground leading-relaxed pt-4 pr-8">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
