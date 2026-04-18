'use client'

import { useState } from 'react'
import { RiArrowRightLine, RiCheckLine, RiMailLine, RiShieldCheckLine, RiTimeLine } from '@remixicon/react'

const BENEFITS = [
  { icon: <RiTimeLine size={13} />, text: '1 pattern + 1 case study + 1 tool — under 5 min read' },
  { icon: <RiCheckLine size={13} />, text: 'Production-ready code you can ship the same day' },
  { icon: <RiShieldCheckLine size={13} />, text: 'Early access to tools we build and use ourselves' },
]

const AVATARS = ['3d4e5f', '6e7f8a', '9f0a1b', '2c3d4e', 'a1b2c3']

export function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) { setStatus('error'); setMessage('Email is required'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setStatus('error'); setMessage('Please enter a valid email'); return }

    setStatus('loading')
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!response.ok) throw new Error()
      setStatus('success')
      setMessage("You're in. First issue lands Tuesday.")
      setEmail('')
      setTimeout(() => { setStatus('idle'); setMessage('') }, 6000)
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Try again.')
    }
  }

  return (
    <section className="py-14 md:py-20 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-border/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-border/60 to-transparent" />
      </div>

      <div className="max-w-350 mx-auto px-6 md:px-10 relative z-10">
        {/* Centered premium card */}
        <div
          className="relative max-w-190 mx-auto rounded-3xl border border-border/60 bg-background/70 backdrop-blur-xl overflow-hidden"
          style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.04), 0 32px 80px -24px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.12)" }}
        >
          {/* Inner glow top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-primary/10 blur-xl rounded-full" />

          <div className="px-8 md:px-14 py-8 md:py-10 flex flex-col items-center text-center gap-5">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-primary text-xs font-medium tracking-wide">
              <RiMailLine size={12} />
              Every Tuesday · Free · 2,400+ engineers
            </div>

            {/* Headline — identity + FOMO */}
            <div className="flex flex-col gap-2">
              <h2 className="text-4xl md:text-[48px] font-semibold tracking-[-0.04em] leading-[0.97] text-foreground">
                The AI newsletter<br />
                <span
                  className="text-primary"
                  style={{ textShadow: "0 0 40px color-mix(in srgb, var(--color-primary) 35%, transparent)" }}
                >
                  engineers forward.
                </span>
              </h2>
              {/* Specificity = credibility */}
              <p className="text-[15px] text-muted-foreground max-w-[42ch] mx-auto leading-[1.7]">
                One pattern, one case study, one tool — every week. The teams shipping AI products faster aren't smarter. They just read this first.
              </p>
            </div>

            {/* Benefits — concrete + scannable */}
            <ul className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-xs text-muted-foreground">
              {BENEFITS.map((b) => (
                <li key={b.text} className="flex items-center gap-1.5">
                  <span className="text-primary shrink-0">{b.icon}</span>
                  {b.text}
                </li>
              ))}
            </ul>

            {/* Form — frictionless, CTA near social proof */}
            <div className="w-full max-w-md flex flex-col gap-3">
              <form onSubmit={handleSubmit} className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full pl-5 pr-36 py-4 rounded-xl border border-border/70 bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ boxShadow: "inset 0 1px 3px rgba(0,0,0,0.04)" }}
                />
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-lg bg-primary text-background text-sm font-semibold flex items-center gap-2 hover:bg-primary/90 active:scale-[0.97] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.15) inset, 0 4px 12px -2px color-mix(in srgb, var(--color-primary) 40%, transparent)" }}
                >
                  {status === 'loading' && (
                    <span className="w-3.5 h-3.5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                  )}
                  {status === 'success' ? (
                    <><RiCheckLine size={15} /> Done</>
                  ) : (
                    <><span>Get Free Access</span><RiArrowRightLine size={15} /></>
                  )}
                </button>
              </form>

              {message && (
                <p className={`text-xs font-medium ${status === 'error' ? 'text-red-500' : 'text-emerald-600'}`}>
                  {message}
                </p>
              )}
            </div>

            {/* Social proof — directly below CTA (proximity = trust transfer) */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {AVATARS.map((seed, i) => (
                    <img
                      key={seed}
                      src={`https://picsum.photos/seed/${seed}/32/32`}
                      alt=""
                      width={28}
                      height={28}
                      className="w-7 h-7 rounded-full border-2 border-background object-cover"
                      style={{ zIndex: 5 - i }}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">2,400+ engineers</span> already subscribed
                </p>
              </div>

              {/* Friction removers */}
              <div className="flex items-center gap-4 text-[11px] text-muted-foreground/60 divide-x divide-border/40">
                <span>No spam</span>
                <span className="pl-4">Unsubscribe anytime</span>
                <span className="pl-4">Free forever</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsletterSignup',
            name: 'TechNest Weekly Newsletter',
            description: 'AI agents and SaaS insights delivered every Tuesday — patterns, case studies, and tools.',
            url: 'https://technestsolutions.in/',
            contactPoint: { '@type': 'ContactPoint', contactType: 'Newsletter', areaServed: 'Worldwide' },
          }),
        }}
      />
    </section>
  )
}
