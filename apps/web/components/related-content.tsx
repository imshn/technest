import Link from "next/link"
import { RiArrowRightLine } from "@remixicon/react"

type RelatedItem = {
  title: string
  href: string
  type: "service" | "blog" | "case-study"
  description?: string
}

interface RelatedContentProps {
  items: RelatedItem[]
  title?: string
}

export function RelatedContent({ items, title = "Related Resources" }: RelatedContentProps) {
  if (!items || items.length === 0) return null

  return (
    <section className="mt-16 pt-12 border-t border-border/60">
      <h2 className="text-2xl font-semibold text-foreground mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group relative overflow-hidden rounded-xl border border-border/40 p-5 flex flex-col gap-2 transition-all duration-200 hover:border-primary/40 hover:bg-primary/5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-primary/70 uppercase tracking-widest mb-1.5">
                  {item.type === "service"
                    ? "Service"
                    : item.type === "blog"
                      ? "Blog Post"
                      : "Case Study"}
                </p>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
                  {item.title}
                </h3>
              </div>
              <RiArrowRightLine
                size={16}
                className="text-primary/50 group-hover:text-primary transition-colors duration-200 shrink-0 mt-1"
              />
            </div>
            {item.description && (
              <p className="text-xs text-muted-foreground/80 line-clamp-2">{item.description}</p>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}

// Helper function to get related services for a blog post or case study
export function getRelatedServices(tags: string[]): RelatedItem[] {
  const serviceMap: Record<string, { title: string; href: string }> = {
    "AI Automation": {
      title: "Multi-Agent AI Systems",
      href: "/services/multi-agent-ai-systems",
    },
    "Automation": {
      title: "Agentic Workflows",
      href: "/services/agentic-workflows",
    },
    "N8n": {
      title: "N8n Workflow Automation",
      href: "/services/n8n-workflow-automation",
    },
    "SaaS": {
      title: "SaaS Platform Development",
      href: "/services/saas-platform-development",
    },
    "Web Development": {
      title: "Web App Development",
      href: "/services/web-app-development",
    },
    "Mobile": {
      title: "Mobile App Development",
      href: "/services/mobile-app-development",
    },
    "Desktop": {
      title: "Desktop App Development",
      href: "/services/desktop-app-development",
    },
    "Design": {
      title: "Graphic Designing",
      href: "/services/graphic-designing",
    },
    "Marketing": {
      title: "Digital Marketing",
      href: "/services/digital-marketing",
    },
    "SEO": {
      title: "Digital Marketing",
      href: "/services/digital-marketing",
    },
    "CRO": {
      title: "Digital Marketing",
      href: "/services/digital-marketing",
    },
  }

  const related = new Set<RelatedItem>()
  tags.forEach((tag) => {
    const service = serviceMap[tag]
    if (service) {
      related.add({ ...service, type: "service" })
    }
  })

  return Array.from(related)
}

// Helper function to get related case studies or blog posts
export function getRelatedContent(
  currentSlug: string,
  allItems: Array<{ slug: string; title: string; tag?: string }>,
  type: "blog" | "case-study"
): RelatedItem[] {
  return allItems
    .filter((item) => item.slug !== currentSlug)
    .slice(0, 3)
    .map((item) => ({
      title: item.title,
      href: `/${type === "blog" ? "blog" : "case-studies"}/${item.slug}`,
      type,
    }))
}
