import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: "Refund and cancellation policy for TechNest project engagements.",
  alternates: { canonical: "https://technestsolutions.in/refund-policy" },
  robots: { index: false, follow: false },
}

const LAST_UPDATED = "September 6, 2026"
const CONTACT_EMAIL = "hello@technestsolutions.in"

export default function RefundPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh pt-24 pb-24">
        <div className="max-w-[720px] mx-auto px-6 md:px-10">
          <nav aria-label="Breadcrumb" className="pt-10 pb-8 flex items-center gap-2 text-xs text-muted-foreground">
            <a href="/" className="hover:text-foreground transition-colors duration-150">Home</a>
            <span className="text-border">/</span>
            <span className="text-foreground font-medium">Refund & Cancellation Policy</span>
          </nav>

          <div className="pb-16">
            <p className="text-xs font-medium text-primary tracking-widest uppercase mb-3">Legal</p>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-foreground mb-3">
              Refund & Cancellation Policy
            </h1>
            <p className="text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>
          </div>

          <div className="prose prose-sm md:prose-base prose-neutral dark:prose-invert max-w-none
            prose-headings:font-semibold prose-headings:tracking-tight
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline">

            <p>
              TechNest runs fixed-scope engagements, not subscriptions or off-the-shelf products. This
              policy explains how deposits, milestone payments, and cancellations work.
            </p>

            <h2>1. How Payment Works</h2>
            <p>
              Every engagement starts with a free scoping call. Once scope, timeline, and price are
              agreed in writing, projects are typically billed against milestones (for example: a
              deposit to begin, a payment at a mid-project milestone, and a final payment on delivery)
              rather than as a single upfront charge.
            </p>

            <h2>2. Before Work Begins</h2>
            <p>
              If you cancel after paying a deposit but before any work has started, the deposit is
              refunded in full, less any payment processing fees already incurred.
            </p>

            <h2>3. After Work Has Started</h2>
            <p>
              Once work begins, payments already made for completed milestones are non-refundable, since
              they cover work already delivered. If you cancel mid-engagement, you are billed only for
              milestones completed or in progress at the time of cancellation — not for work that
              hasn't started.
            </p>

            <h2>4. Our Responsibility</h2>
            <p>
              If we are unable to deliver an agreed milestone and the engagement is terminated as a
              result, any amount paid for that undelivered milestone is refunded in full.
            </p>

            <h2>5. How to Request a Refund or Cancellation</h2>
            <p>
              Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with your project details.
              We acknowledge requests within 2 business days and process approved refunds to the original
              payment method within 7–10 business days.
            </p>

            <h2>6. Disputes</h2>
            <p>
              If we disagree on whether a milestone was delivered as scoped, we'll first try to resolve
              it directly. Unresolved disputes are governed by the Governing Law clause in our{" "}
              <a href="/terms">Terms of Service</a>.
            </p>

            <h2>7. Contact</h2>
            <p>
              Questions about this policy? Email us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
