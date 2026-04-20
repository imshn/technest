export function Stats() {
  const metrics = [
    { value: "143+", label: "Projects Delivered", sub: "across 12+ industries" },
    { value: "47.2%", label: "Avg. Efficiency Gain", sub: "measured post-deployment" },
    { value: "31", label: "Active Clients", sub: "US, UK, Gulf, Europe" },
    { value: "98.3%", label: "On-Time Delivery", sub: "since founding" },
  ]

  return (
    <section className="border-y border-border/60 bg-muted/20">
      <div className="max-w-350 mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border/60">
        {metrics.map((m) => (
          <div key={m.label} className="px-8 py-10 flex flex-col gap-1">
            <p className="text-4xl font-semibold tracking-tight text-foreground">{m.value}</p>
            <p className="text-sm font-medium text-foreground/80 mt-1">{m.label}</p>
            <p className="text-xs text-muted-foreground">{m.sub}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
