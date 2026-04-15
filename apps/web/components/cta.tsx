import { RiArrowRightLine, RiCalendarLine } from "@remixicon/react"
import { CalendlyButton } from "@/components/calendly-button"

const industries = [
  "SaaS", "Fintech", "E-commerce", "Healthcare", "Legal Tech",
  "EdTech", "Real Estate", "Logistics", "Marketing Agencies", "Operations",
]

export function CTA() {
  return (
    <section className="py-24 md:py-32 border-t border-border/60 bg-zinc-950 dark:bg-zinc-950">
      <div className="max-w-350 mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-20 items-start">
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-xs font-medium text-primary tracking-widest uppercase mb-4">Get Started</p>
              <h2 className="text-4xl md:text-5xl xl:text-[56px] font-semibold tracking-[-0.03em] leading-[1.05] text-white">
                Ready to stop doing<br />what AI should handle?
              </h2>
            </div>
            <p className="text-base text-zinc-400 leading-relaxed max-w-[52ch]">
              Book a free 30-minute strategy call. We&apos;ll map your highest-leverage automation
              opportunities and give you a clear scope — no pitch deck, no sales pressure.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {industries.map((ind) => (
                <span
                  key={ind}
                  className="text-xs font-medium px-3 py-1.5 rounded-full border border-zinc-700/60 text-zinc-400 bg-zinc-900/50"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 flex flex-col gap-6"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
            >
              <div className="flex flex-col gap-2">
                <p className="text-base font-semibold text-white">Book a Free Strategy Call</p>
                <p className="text-sm text-zinc-400">30 minutes · No commitment · Just clarity</p>
              </div>

              <ul className="flex flex-col gap-3">
                {[
                  "We map your workflow bottlenecks",
                  "You get a concrete automation plan",
                  "Scope + timeline estimate included",
                  "No obligation to proceed",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <CalendlyButton
                label="Schedule the Call"
                variant="dark"
                trackAs="cta_section_primary"
                icon={<RiCalendarLine size={16} />}
                rightSlot={<RiArrowRightLine size={16} />}
                className="w-full"
              />

              <p className="text-xs text-zinc-500 text-center">
                Spots are limited — 2 project slots remaining in Q2
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 flex items-start gap-4">
              <div className="w-8 h-8 rounded-md bg-primary/15 flex items-center justify-center text-primary shrink-0">
                <RiArrowRightLine size={15} />
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-1">Prefer async?</p>
                <p className="text-xs text-zinc-400">
                  Email{" "}
                  <a
                    href="mailto:shahnawaz28april@gmail.com"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    shahnawaz28april@gmail.com
                  </a>{" "}
                  with a brief description of your project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
