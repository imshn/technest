const testimonials = [
  {
    quote:
      "TechNest built a multi-agent lead qualification system that now handles 800+ inbound leads per week without a single human touch. We closed $240k in new contracts in the first 90 days after launch.",
    author: "Marcus Webb",
    role: "VP of Sales",
    company: "GrowthOps",
    location: "San Francisco, CA",
    metric: "$240k closed in 90 days",
    seed: "3d4e5f",
  },
  {
    quote:
      "We were drowning in manual reporting — 14 hours a week just on data collection. The N8n automation TechNest deployed replaced all of it. Reports now generate in 3 minutes and go straight to Slack.",
    author: "Layla Al-Rashid",
    role: "COO",
    company: "Meridian Ventures",
    location: "Dubai, UAE",
    metric: "14 hrs/week saved on reporting",
    seed: "6e7f8a",
  },
  {
    quote:
      "The SaaS platform they built handles 12,000 monthly active users with zero performance issues. What impressed me most was the speed — we went from idea to paying customers in 6 weeks.",
    author: "Arjun Mehta",
    role: "Founder",
    company: "Fintrek",
    location: "Bengaluru, India",
    metric: "12k MAU, live in 6 weeks",
    seed: "9f0a1b",
  },
  {
    quote:
      "TechNest is the rare agency that actually understands both the technical and business side. They pushed back on scope that wouldn't have moved the needle and focused us on what actually mattered.",
    author: "Claire Donovan",
    role: "Director of Operations",
    company: "Pillar Health",
    location: "New York, NY",
    metric: "On-time, under budget",
    seed: "2c3d4e",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 border-t border-border/60">
      <div className="max-w-350 mx-auto px-6 md:px-10">
        <div className="mb-14">
          <p className="text-xs font-medium text-primary tracking-widest uppercase mb-3">Client Results</p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-foreground">
            Real projects.<br />Measurable outcomes.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.author}
              className={`rounded-2xl border border-border/60 bg-card p-8 flex flex-col gap-6 ${i % 2 === 1 ? "lg:mt-8" : ""}`}
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
            >
              <div className="flex items-start gap-3">
                <span className="text-primary/30 text-4xl font-serif leading-none mt-1">&ldquo;</span>
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed -mt-4">{t.quote}</p>
              <div className="pt-2 border-t border-border/60 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://picsum.photos/seed/${t.seed}/40/40`}
                    alt=""
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full border border-border/60 object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.author}</p>
                    <p className="text-xs text-muted-foreground">{t.role}, {t.company} · {t.location}</p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-xs font-semibold text-primary">{t.metric}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
