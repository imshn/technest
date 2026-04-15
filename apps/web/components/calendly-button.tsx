"use client"

import { useEffect } from "react"
import { trackEvent } from "@/components/analytics"
import { cn } from "@workspace/ui/lib/utils"

const CALENDLY_URL = "https://calendly.com/shahnawaz28april/30min"

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void
    }
  }
}

interface CalendlyButtonProps {
  label?: string
  variant?: "primary" | "secondary" | "ghost" | "dark"
  className?: string
  trackAs?: string
  icon?: React.ReactNode
  rightSlot?: React.ReactNode
}

export function CalendlyButton({
  label = "Book a Free Call",
  variant = "primary",
  className,
  trackAs = "calendly_cta_clicked",
  icon,
  rightSlot,
}: CalendlyButtonProps) {
  useEffect(() => {
    if (document.getElementById("calendly-script")) return
    const script = document.createElement("script")
    script.id = "calendly-script"
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    document.head.appendChild(script)

    if (!document.getElementById("calendly-css")) {
      const link = document.createElement("link")
      link.id = "calendly-css"
      link.rel = "stylesheet"
      link.href = "https://assets.calendly.com/assets/external/widget.css"
      document.head.appendChild(link)
    }
  }, [])

  const handleClick = () => {
    trackEvent(trackAs, { location: label })
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL })
    } else {
      window.open(CALENDLY_URL, "_blank", "noopener,noreferrer")
    }
  }

  const base =
    "inline-flex items-center gap-3 font-medium text-sm transition-all duration-150 active:scale-[0.98] active:-translate-y-px cursor-pointer border-0 bg-transparent p-0 text-left"

  const variants: Record<string, string> = {
    primary: "px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 justify-center",
    secondary: "px-6 py-3 border border-border text-foreground rounded-md hover:bg-muted/60 justify-center",
    ghost: "px-0 py-0 text-muted-foreground hover:text-foreground",
    dark: "px-6 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 justify-between",
  }

  return (
    <button
      onClick={handleClick}
      className={cn(base, variants[variant], className)}
      aria-label={`${label} — opens scheduling calendar`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{label}</span>
      {rightSlot && <span className="shrink-0">{rightSlot}</span>}
    </button>
  )
}
