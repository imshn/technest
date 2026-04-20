import { UrgencyBar } from "@/components/urgency-bar"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Marquee } from "@/components/marquee"
import { TrustBar } from "@/components/trust-bar"
import { Stats } from "@/components/stats"
import { Services } from "@/components/services"
import { Process } from "@/components/process"
import { BlogPreview } from "@/components/blog-preview"
import { NewsletterCTA } from "@/components/newsletter-cta"
import { FAQ } from "@/components/faq"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="min-h-dvh overflow-x-hidden">
      <UrgencyBar />
      <Navbar />
      <Hero />
      <Marquee />
      <TrustBar />
      <Stats />
      <Services />
      <Process />
      {/* Testimonials paused for now. */}
      <BlogPreview />
      <NewsletterCTA />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
