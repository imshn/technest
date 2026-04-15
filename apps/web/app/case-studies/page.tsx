import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { caseStudies } from "@/components/case-studies-preview"
import Link from "next/link"
import { RiArrowRightLine } from "@remixicon/react"

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh pt-24 pb-24">
        <div className="max-w-350 mx-auto px-6 md:px-10">
          {/* Header */}
          <div className="max-w-187.5 py-16">
            <p className="text-xs font-medium text-primary tracking-widest uppercase mb-3">Case Studies</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.04em] text-foreground mb-6 leading-tight">
              Results that speak for themselves.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-[65ch]">
              See how teams across fintech, SaaS, and e-commerce accelerated delivery and cut operational costs with our services.
            </p>
          </div>

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-16">
            {caseStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-border/40 bg-linear-to-br from-background to-muted/20 p-8 md:p-10 flex flex-col gap-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="relative z-10 flex flex-col gap-6 h-full">
                  {/* Company Info */}
                  <div>
                    <p className="text-xs font-medium text-primary/70 uppercase tracking-widest mb-2">
                      {study.company}
                    </p>
                    <p className="text-xs text-muted-foreground/60 font-medium">{study.industry}</p>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-300">
                    {study.title}
                  </h2>

                  {/* Challenge + Result */}
                  <div className="flex-1 flex flex-col gap-5">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground/70 mb-2 uppercase tracking-wide">
                        Challenge
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {study.challenge}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-muted-foreground/70 mb-2 uppercase tracking-wide">
                        Solution
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {study.result}
                      </p>
                    </div>
                  </div>

                  {/* Metric */}
                  <div className="py-5 px-4 rounded-xl bg-primary/5 border border-primary/10 text-center">
                    <p className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                      {study.metricValue}
                    </p>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      {study.metric}
                    </p>
                  </div>

                  {/* Services */}
                  <div className="flex flex-wrap gap-2">
                    {study.services.map((svc) => (
                      <span
                        key={svc}
                        className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-primary/8 text-primary/80 border border-primary/10"
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Arrow */}
                <div className="absolute bottom-8 right-8 w-8 h-8 rounded-full bg-primary/8 flex items-center justify-center text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-background group-hover:translate-x-0.5">
                  <RiArrowRightLine size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
