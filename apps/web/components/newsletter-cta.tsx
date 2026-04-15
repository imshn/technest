'use client'

import { useState } from 'react'
import { RiArrowRightLine, RiCheckDoubleLine } from '@remixicon/react'

export function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setStatus('error')
      setMessage('Email is required')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      setMessage('Please enter a valid email')
      return
    }

    setStatus('loading')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) throw new Error('Subscription failed')

      setStatus('success')
      setMessage('Subscribed! Check your email for insights.')
      setEmail('')
      
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong. Try again.')
    }
  }

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-350 mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Copy */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs font-medium text-primary tracking-widest uppercase mb-3">Stay Ahead</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] text-foreground mb-4 leading-tight">
                AI agents and SaaS insights,
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-foreground to-primary"> delivered weekly</span>
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-[55ch] leading-relaxed">
              Get patterns that help teams launch AI products faster. Technical deep-dives, case studies, and tools we ship weekly.
            </p>

            {/* Benefits list */}
            <ul className="flex flex-col gap-3">
              {[
                'Weekly AI & SaaS trends before they trend',
                'Production-ready code patterns and examples',
                'Early access to our open-source tools',
              ].map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="flex shrink-0 items-center justify-center mt-0.5 w-5 h-5 rounded-full bg-primary/10">
                    <RiCheckDoubleLine size={12} className="text-primary" />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            {/* Social proof */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 border-2 border-background flex items-center justify-center text-xs font-bold text-background"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">2,400+</span> engineers subscribed
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="flex flex-col gap-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full px-4 md:px-5 py-3.5 md:py-4 rounded-xl border border-border/60 bg-background/60 backdrop-blur-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg bg-primary text-background font-medium text-sm flex items-center gap-2 hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group-focus-within:opacity-100"
                >
                  {status === 'loading' && (
                    <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                  )}
                  {status === 'success' ? (
                    <>
                      <RiCheckDoubleLine size={16} />
                      <span className="hidden sm:inline">Done</span>
                    </>
                  ) : (
                    <>
                      <RiArrowRightLine size={16} />
                      <span className="hidden sm:inline">Subscribe</span>
                    </>
                  )}
                </button>
              </div>

              {/* Status message */}
              {message && (
                <p className={`text-xs font-medium transition-opacity duration-200 ${
                  status === 'error' ? 'text-red-500' : 'text-emerald-600'
                }`}>
                  {message}
                </p>
              )}
            </form>

            {/* Privacy note */}
            <p className="text-xs text-muted-foreground/70 leading-relaxed">
              We respect your inbox. Unsubscribe anytime. No spam, just insights.
            </p>

            {/* Trust indicators */}
            <div className="flex items-center gap-2 pt-2 text-[11px] text-muted-foreground/60">
              <span className="block w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
              <span>Verified by subscribers</span>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Schema: NewsletterSignup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsletterSignup',
            name: 'TechNest Weekly Newsletter',
            description: 'AI agents and SaaS insights delivered weekly — trends, code patterns, and tools.',
            url: 'https://technest.dev',
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Newsletter',
              areaServed: 'Worldwide',
            },
          }),
        }}
      />
    </section>
  )
}
