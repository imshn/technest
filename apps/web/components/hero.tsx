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
      {/* Spline 3D background */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Suspense fallback={<div className="bg-slate-900 w-full h-full" />}>
          <SplineScene
            scene="https://prod.spline.design/NDUC8hY13R2TOxGa/scene.splinecode"
          />
        </Suspense>
      </div>
      {/* Thin wash so text stays readable */}
      <div className="absolute inset-0 bg-background/30 pointer-events-none z-1" />
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] z-2"
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
          <div className="flex flex-col gap-8" style={{ animation: "slide-up-fade 0.7s cubic-bezier(0.16,1,0.3,1) both" }}>
            <div className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full border border-primary/25 bg-primary/6 text-primary text-xs font-medium tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
              2 client spots open in Q2 · AI-Native Agency
            </div>

            <h1 className="text-5xl md:text-6xl xl:text-[72px] font-semibold tracking-[-0.03em] leading-[1.02] text-foreground">
              Stop Losing Hours<br />
              to Work <span className="text-primary">AI Should</span><br />
              Be Doing.
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-[52ch]">
              We build multi-agent AI systems, custom automations, and full-stack products
              that replace manual workflows — so your team ships faster and your business
              scales without proportionally growing headcount.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <CalendlyButton
                label="Book a Free Strategy Call"
                variant="primary"
                trackAs="hero_primary_cta"
                icon={<RiArrowRightLine size={15} />}
                className="flex-row-reverse"
              />
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-foreground rounded-md border border-border hover:bg-muted/60 transition-all duration-150 active:scale-[0.98]"
              >
                See What We Build
              </a>
            </div>

            <p className="text-xs text-muted-foreground">
              Free 30-min call · No pitch deck · Just clarity on your use case
            </p>

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

          {/* RIGHT — terminal */}
          <div
            className="relative hidden lg:flex flex-col gap-4"
            style={{ animation: "scale-in 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s both" }}
          >
            <div
              className="relative rounded-2xl border border-border/70 bg-card overflow-hidden"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 60px -20px rgba(0,0,0,0.12)" }}
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
                <div key={m.label} className="rounded-xl border border-border/60 bg-card/80 backdrop-blur p-3.5 text-center" style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }}>
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
