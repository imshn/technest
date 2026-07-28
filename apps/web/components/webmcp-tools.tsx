"use client"

import { useEffect } from "react"
import { trackEvent } from "@/components/analytics"

const CALENDLY_URL = "https://calendly.com/shahnawaz28april/30min"

const SERVICES = [
  { slug: "multi-agent-ai-systems", title: "Multi-Agent AI Systems", tagline: "Autonomous pipelines that replace manual decision-making" },
  { slug: "agentic-workflows", title: "Agentic Workflows", tagline: "LLM-powered automation that handles ambiguity" },
  { slug: "n8n-workflow-automation", title: "N8n Workflow Automation", tagline: "Replace Zapier at 80–90% lower cost" },
  { slug: "saas-platform-development", title: "SaaS Platform Development", tagline: "Production SaaS from MVP to scale" },
  { slug: "web-app-development", title: "Web App Development", tagline: "Fast, scalable web applications" },
  { slug: "mobile-app-development", title: "Mobile App Development", tagline: "iOS and Android from one codebase" },
  { slug: "desktop-app-development", title: "Desktop App Development", tagline: "Cross-platform desktop with Tauri or Electron" },
  { slug: "digital-marketing", title: "Digital Marketing & SEO", tagline: "Organic-first growth — no paid ads" },
]

function loadCalendly() {
  if (!document.getElementById("calendly-script")) {
    const script = document.createElement("script")
    script.id = "calendly-script"
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    document.head.appendChild(script)
  }
  if (!document.getElementById("calendly-css")) {
    const link = document.createElement("link")
    link.id = "calendly-css"
    link.rel = "stylesheet"
    link.href = "https://assets.calendly.com/assets/external/widget.css"
    document.head.appendChild(link)
  }
}

// WebMCP is an experimental browser API (Chrome origin trial) that lets a page
// expose callable tools to an in-browser AI agent. Feature-detected — a no-op
// everywhere else. https://webmachinelearning.github.io/webmcp/
export function WebMCPTools() {
  useEffect(() => {
    const modelContext = (navigator as unknown as { modelContext?: { provideContext: (ctx: unknown) => void } }).modelContext
    if (!modelContext) return

    modelContext.provideContext({
      tools: [
        {
          name: "list_technest_services",
          description: "List TechNest's AI automation and software development services with a short description of each.",
          inputSchema: { type: "object", properties: {} },
          async execute() {
            return {
              services: SERVICES.map((s) => ({
                title: s.title,
                tagline: s.tagline,
                url: `https://technestsolutions.in/services/${s.slug}`,
              })),
            }
          },
        },
        {
          name: "book_technest_strategy_call",
          description: "Open TechNest's scheduling widget so the user can book a free 30-minute strategy call.",
          inputSchema: { type: "object", properties: {} },
          async execute() {
            trackEvent("webmcp_book_call", { source: "webmcp_tool" })
            loadCalendly()
            const w = window as unknown as { Calendly?: { initPopupWidget: (o: { url: string }) => void } }
            if (w.Calendly) {
              w.Calendly.initPopupWidget({ url: CALENDLY_URL })
            } else {
              window.open(CALENDLY_URL, "_blank", "noopener,noreferrer")
            }
            return { status: "opened", bookingUrl: CALENDLY_URL }
          },
        },
      ],
    })
  }, [])

  return null
}
