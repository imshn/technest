import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ContactPageForm } from "@/components/contact-page-form"
import {
  RiMapPin2Line,
  RiTimeLine,
  RiArrowRightUpLine,
  RiCheckDoubleLine,
} from "@remixicon/react"

export const metadata: Metadata = {
  title: "Contact | TechNest",
  description: "Tell us what you're building. We'll map your highest-ROI automation opportunity in a free 30-minute strategy call.",
  alternates: { canonical: "https://technestsolutions.in/contact" },
}

const steps = [
  { n: "01", title: "We read your brief", body: "Within a few hours, a real person reviews what you sent — not a bot, not a template reply." },
  { n: "02", title: "We ask the right questions", body: "We follow up with targeted questions to scope the work accurately before suggesting anything." },
  { n: "03", title: "You get a clear plan", body: "A concrete scope, timeline, and indicative budget — no vague estimates, no surprises later." },
]

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh bg-zinc-950">

        {/* ── Hero split ── */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px] xl:grid-cols-[1fr_560px] gap-0 lg:gap-20 min-h-dvh items-center pt-24 pb-16">

            {/* LEFT */}
            <div
              className="flex flex-col gap-10 py-12 lg:py-20"
              style={{ animation: "slide-up-fade 0.6s cubic-bezier(0.16,1,0.3,1) both" }}
            >
              {/* Label */}
              <p className="text-xs font-semibold text-primary tracking-[0.2em] uppercase">
                Get in touch
              </p>

              {/* Headline */}
              <div className="flex flex-col gap-5">
                <h1 className="text-[52px] md:text-[64px] xl:text-[72px] font-semibold tracking-[-0.04em] leading-[0.95] text-white">
                  Tell us what<br />
                  you&apos;re trying<br />
                  <span className="text-zinc-500">to build.</span>
                </h1>
                <p className="text-[15px] text-zinc-400 leading-[1.75] max-w-[44ch]">
                  We work with founders, ops teams, and product teams across India, the US, and the Gulf. If there&apos;s a manual process that shouldn&apos;t be — we want to hear about it.
                </p>
              </div>

              {/* Meta row */}
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 shrink-0">
                    <RiTimeLine size={15} />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-0.5">Response time</p>
                    <p className="text-sm font-medium text-white">Within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 shrink-0">
                    <RiMapPin2Line size={15} />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-0.5">Based in</p>
                    <p className="text-sm font-medium text-white">Bengaluru, India · Remote-first</p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-zinc-800" />

              {/* What happens next */}
              <div className="flex flex-col gap-6">
                <p className="text-xs font-semibold text-zinc-500 tracking-[0.15em] uppercase">What happens after you send</p>
                <div className="flex flex-col gap-5">
                  {steps.map((s, i) => (
                    <div
                      key={s.n}
                      className="flex gap-5"
                      style={{ animation: `slide-up-fade 0.6s cubic-bezier(0.16,1,0.3,1) ${(i + 1) * 100}ms both` }}
                    >
                      <div className="flex flex-col items-center gap-1 shrink-0">
                        <span className="text-[11px] font-mono text-primary/60 font-semibold">{s.n}</span>
                        {i < steps.length - 1 && <div className="w-px flex-1 bg-zinc-800 mt-1" />}
                      </div>
                      <div className="pb-5">
                        <p className="text-sm font-semibold text-white mb-1">{s.title}</p>
                        <p className="text-sm text-zinc-500 leading-relaxed">{s.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Proof note */}
              <div className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900/60 px-5 py-4">
                <RiCheckDoubleLine size={15} className="text-primary mt-0.5 shrink-0" />
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Every project starts with a <span className="text-white font-medium">free strategy call</span> — no retainer until you see a concrete plan and agree with the scope.
                </p>
              </div>
            </div>

            {/* RIGHT — form */}
            <div
              className="lg:py-20"
              style={{ animation: "slide-up-fade 0.7s cubic-bezier(0.16,1,0.3,1) 100ms both" }}
            >
              <ContactPageForm />
            </div>

          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-zinc-800/60">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-zinc-600">
              Prefer email? <a href="mailto:shaan@technestsolutions.in" className="text-zinc-400 hover:text-white transition-colors">shaan@technestsolutions.in</a>
            </p>
            <a
              href="https://cal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              Or book a call directly <RiArrowRightUpLine size={13} />
            </a>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
