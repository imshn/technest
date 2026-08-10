import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Marquee } from "@/components/marquee"
import { TrustBar } from "@/components/trust-bar"
import { Stats } from "@/components/stats"
import { Services } from "@/components/services"
import { Process } from "@/components/process"
import { CaseStudiesPreview } from "@/components/case-studies-preview"
import { BlogPreview } from "@/components/blog-preview"
import { NewsletterCTA } from "@/components/newsletter-cta"
import { FAQ, faqs } from "@/components/faq"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
}

export default function Page() {
  return (
    <main className="min-h-dvh overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Navbar />
      <Hero />
      <Marquee />
      <TrustBar />
      <Stats />
      <Services />
      <Process />
      <CaseStudiesPreview />
      {/* Testimonials paused for now. */}
      <BlogPreview />
      <NewsletterCTA />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
