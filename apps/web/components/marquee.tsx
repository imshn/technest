const techStack = [
  "Next.js", "React", "TypeScript", "Python", "n8n",
  "LangChain", "OpenAI", "Claude API", "Supabase", "Postgres",
  "Tailwind CSS", "Node.js", "FastAPI", "Docker", "AWS",
  "Figma", "Framer", "Stripe", "Vercel", "Turborepo",
]

export function Marquee() {
  const doubled = [...techStack, ...techStack]

  return (
    <section className="border-y border-border/60 bg-muted/30 py-4 overflow-hidden select-none">
      <div className="flex gap-8 w-max" style={{ animation: "marquee-x 32s linear infinite" }}>
        {doubled.map((tech, i) => (
          <div key={i} className="flex items-center gap-8 shrink-0">
            <span className="text-sm font-medium text-muted-foreground tracking-wide whitespace-nowrap hover:text-foreground transition-colors duration-150">
              {tech}
            </span>
            <span className="w-1 h-1 rounded-full bg-border shrink-0" />
          </div>
        ))}
      </div>
    </section>
  )
}
