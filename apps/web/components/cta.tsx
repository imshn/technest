import { RiArrowRightLine, RiCalendarLine, RiMailSendLine } from "@remixicon/react"
import { CalendlyButton } from "@/components/calendly-button"
import { ContactForm } from "@/components/contact-form"

export function CTA() {
  return (
    <section id="contact" className="py-24 md:py-32 border-t border-border/60 bg-zinc-950 dark:bg-zinc-950">
      <div className="max-w-350 mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="max-w-[600px] mb-14">
          <p className="text-xs font-medium text-primary tracking-widest uppercase mb-4">Work With Us</p>
          <h2 className="text-4xl md:text-5xl xl:text-[52px] font-semibold tracking-[-0.03em] leading-[1.05] text-white mb-5">
            Let&apos;s build something<br />worth shipping.
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed max-w-[48ch]">
            Pick the option that fits you. Either way, you&apos;ll hear back within one business day.
          </p>
        </div>

        {/* Two equal cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Card 1 — Strategy call */}
          <div
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 flex flex-col gap-6"
            style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
          >
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary">
              <RiCalendarLine size={20} />
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <p className="text-lg font-semibold text-white">Book a Free Strategy Call</p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                30 minutes. We map your highest-ROI automation opportunity and give you a concrete scope — no pitch, no pressure.
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {[
                "We map your workflow bottlenecks",
                "Concrete automation plan included",
                "Scope + timeline estimate",
                "No obligation to proceed",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3">
              <CalendlyButton
                label="Schedule the Call"
                variant="dark"
                trackAs="cta_section_primary"
                icon={<RiCalendarLine size={16} />}
                rightSlot={<RiArrowRightLine size={16} />}
                className="w-full"
              />
              <p className="text-xs text-zinc-500 text-center">
                2 project slots remaining in Q2
              </p>
            </div>
          </div>

          {/* Card 2 — Contact form */}
          <div
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 flex flex-col gap-6"
            style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
          >
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary">
              <RiMailSendLine size={20} />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold text-white">Send a Project Brief</p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Prefer async? Describe what you need and we&apos;ll come back with questions, ideas, or a rough estimate.
              </p>
            </div>

            <div className="flex-1">
              <ContactForm embedded />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
