import { RiArrowRightSLine } from "@remixicon/react"
import { CalendlyButton } from "@/components/calendly-button"

export function UrgencyBar() {
  return (
    <div className="w-full bg-primary/8 border-b border-primary/15 py-2.5 px-4 flex items-center justify-center gap-3">
      <span
        className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"
        style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
      />
      <p className="text-xs text-foreground/80 text-center">
        <span className="font-semibold text-foreground">Only 2 project spots remaining</span>
        {" "}in Q2 2025 — waitlist closes when full.
      </p>
      <CalendlyButton
        label="Reserve yours"
        variant="ghost"
        trackAs="urgency_bar_cta"
        rightSlot={<RiArrowRightSLine size={14} />}
        className="text-primary hover:text-primary/80 text-xs font-medium shrink-0 gap-0.5"
      />
    </div>
  )
}
