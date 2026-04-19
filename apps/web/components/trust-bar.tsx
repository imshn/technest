import { RiTeamLine, RiCalendarCheckLine, RiTimeLine, RiLightbulbLine } from "@remixicon/react"

const signals = [
  {
    icon: RiLightbulbLine,
    title: "Free Strategy Call",
    body: "30 minutes to map your highest-ROI automation opportunity. No pitch, no pressure — just a concrete plan.",
  },
  {
    icon: RiTimeLine,
    title: "First Build in 2 Weeks",
    body: "Most clients have a working prototype in their hands within 14 days of kickoff. We move fast.",
  },
  {
    icon: RiTeamLine,
    title: "Dedicated Team",
    body: "A senior engineer and project lead on your project — not shared across 12 clients.",
  },
  {
    icon: RiCalendarCheckLine,
    title: "Weekly Syncs",
    body: "Live 30-min calls every Friday with a written update. You always know exactly where things stand.",
  },
]

export function TrustBar() {
  return (
    <section className="border-y border-border/60 bg-muted/20">
      <div className="max-w-350 mx-auto px-6 md:px-10 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {signals.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.title} className="flex flex-col gap-3">
              <div className="w-8 h-8 rounded-md bg-primary/8 flex items-center justify-center text-primary">
                <Icon size={16} />
              </div>
              <p className="text-sm font-semibold text-foreground">{s.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
