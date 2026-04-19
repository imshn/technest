"use client";
import { RiArrowRightLine, RiFlowChart, RiRobotLine } from "@remixicon/react"
import { CalendlyButton } from "@/components/calendly-button"
// import SplineViewer from "@/components/spline-viewer"
// import Spline from '@splinetool/react-spline/next';
import dynamic from 'next/dynamic';
import { Suspense } from "react";

const SplineScene = dynamic(() => import('./SplineScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black/10" />, // Adds a placeholder
});

export function Hero() {
  return (
    <section className="min-h-dvh w-full relative overflow-hidden flex items-center">
      {/* Bottom vignette — grounds the section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-1"
        style={{ background: "linear-gradient(to top, var(--color-background), transparent)" }}
      />

      {/* Subtle grid — left side only */}
      <div
        className="absolute inset-0 opacity-[0.022] dark:opacity-[0.035] z-2 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="absolute top-1/4 right-0 w-150 h-150 rounded-full bg-primary/6 blur-[120px] pointer-events-none z-2" />

      <div className="relative z-10 w-full max-w-350 mx-auto px-6 md:px-10 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_540px] gap-12 xl:gap-20 items-center min-h-[calc(100dvh-160px)]">

          {/* LEFT */}
          <div className="flex flex-col gap-7" style={{ animation: "slide-up-fade 0.7s cubic-bezier(0.16,1,0.3,1) both" }}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-primary text-xs font-medium tracking-wide"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-primary" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
              2 client spots open in Q2 &middot; AI-Native Agency
            </div>

            {/* Headline */}
            <h1 className="text-[52px] md:text-[64px] xl:text-[76px] font-semibold tracking-[-0.04em] leading-[0.97] text-foreground">
              Stop Losing Hours<br />
              to Work{" "}
              <span
                className="text-primary"
                style={{ textShadow: "0 0 40px color-mix(in srgb, var(--color-primary) 35%, transparent)" }}
              >
                AI Should
              </span>
              <br />
              Be Doing.
            </h1>

            {/* Body */}
            <p className="text-[15px] md:text-base text-muted-foreground leading-[1.7] max-w-[46ch]">
              We build multi-agent AI systems, custom automations, and full-stack
              products that replace manual workflows — so your team ships faster
              and your business scales without proportionally growing headcount.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <CalendlyButton
                label="Book a Free Strategy Call"
                variant="primary"
                trackAs="hero_primary_cta"
                icon={<RiArrowRightLine size={15} />}
                className="flex-row-reverse"
              />
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-foreground rounded-md border border-border/80 bg-background/60 backdrop-blur-sm hover:bg-muted/60 transition-all duration-150 active:scale-[0.98]"
              >
                Send Us a Brief
              </a>
            </div>

            <p className="text-xs text-muted-foreground/70 tracking-wide">
              Free 30-min call &nbsp;&middot;&nbsp; No pitch deck &nbsp;&middot;&nbsp; Just clarity on your use case
            </p>

            {/* Social proof */}
            <div className="flex items-center gap-4 pt-1">
              <div className="flex -space-x-2">
                {["3d4e5f", "6e7f8a", "9f0a1b", "2c3d4e"].map((seed, i) => (
                  <img
                    key={seed}
                    src={`https://picsum.photos/seed/${seed}/32/32`}
                    alt=""
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full border-2 border-background object-cover"
                    style={{ zIndex: 4 - i }}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">31+</span> businesses automated with TechNest
              </p>
            </div>
          </div>

          {/* RIGHT — spline + terminal */}
          <div
            className="relative hidden lg:flex flex-col gap-4"
            style={{ animation: "scale-in 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s both" }}
          >
            {/* Spline 3D model — dark contained card */}
            <div
              className="pointer-events-none"
            >
              <Suspense fallback={<div className="w-full h-full bg-zinc-950" />}>
                <SplineScene
                  scene="https://prod.spline.design/NDUC8hY13R2TOxGa/scene.splinecode"
                />
              </Suspense>
            </div>

            <div
              className="relative rounded-2xl border border-border/50 bg-card/85 backdrop-blur-md overflow-hidden"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 64px -16px rgba(0,0,0,0.18)" }}
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/60 bg-muted/30">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                <span className="ml-2 text-xs text-muted-foreground font-mono">agent-orchestrator.ts</span>
              </div>
              <div className="p-5 font-mono text-xs space-y-2.5 bg-zinc-950">
                <TerminalLine delay={0} color="text-zinc-500" content="// TechNest Agent Runtime v2.4" />
                <TerminalLine delay={0.3} color="text-blue-400" content="→ Initializing multi-agent pipeline..." />
                <TerminalLine delay={0.8} color="text-zinc-400" content="  ✓ Agent[0]: Data Ingestion  (47ms)" />
                <TerminalLine delay={1.1} color="text-zinc-400" content="  ✓ Agent[1]: NLP Processing  (91ms)" />
                <TerminalLine delay={1.4} color="text-zinc-400" content="  ✓ Agent[2]: Decision Engine (63ms)" />
                <TerminalLine delay={1.7} color="text-green-400" content="  ✓ Agent[3]: Output & Notify  (28ms)" />
                <TerminalLine delay={2.0} color="text-blue-400" content="→ Workflow complete in 229ms" />
                <TerminalLine delay={2.3} color="text-zinc-500" content="  ↳ Replaced 14 hrs of manual work" />
                <div className="flex items-center gap-1 pt-1">
                  <span className="text-green-400">$</span>
                  <span className="text-zinc-300 ml-1">_</span>
                  <span className="w-1.75 h-3.5 bg-zinc-300 ml-0.5" style={{ animation: "type-cursor 1s step-end infinite" }} />
                </div>
              </div>
            </div>

            <div className="absolute -left-10 top-1/3" style={{ animation: "float-y 4s ease-in-out infinite" }}>
              <StatChip icon={<RiRobotLine size={14} />} label="AI Agents Active" value="143" color="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" />
            </div>
            <div className="absolute -right-6 bottom-1/4" style={{ animation: "float-y 5s ease-in-out 1s infinite" }}>
              <StatChip icon={<RiFlowChart size={14} />} label="Automations/mo" value="3.7k" color="bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Projects", value: "143+" },
                { label: "Uptime", value: "99.7%" },
                { label: "Clients", value: "31" },
              ].map((m) => (
                <div key={m.label} className="rounded-xl border border-border/50 bg-card/80 backdrop-blur-md p-3.5 text-center" style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)" }}>
                  <p className="text-lg font-semibold tracking-tight text-foreground">{m.value}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TerminalLine({ delay, color, content }: { delay: number; color: string; content: string }) {
  return (
    <div className={`${color} leading-relaxed`} style={{ animation: `slide-up-fade 0.4s cubic-bezier(0.16,1,0.3,1) ${delay}s both` }}>
      {content}
    </div>
  )
}

function StatChip({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${color} bg-background/90 backdrop-blur shadow-sm text-xs font-medium whitespace-nowrap`}>
      {icon}
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  )
}
