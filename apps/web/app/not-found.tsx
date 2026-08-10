import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { RiArrowRightLine, RiCompass3Line } from "@remixicon/react"

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
}

const links = [
  { label: "Services", href: "/services", description: "Multi-agent AI, N8n automation, SaaS & app development" },
  { label: "Blog", href: "/blog", description: "Guides on AI automation, N8n, and SaaS builds" },
  { label: "Case Studies", href: "/case-studies", description: "Real results from recent client projects" },
  { label: "Contact", href: "/contact", description: "Book a free strategy call" },
]

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh pt-24 pb-24">
        <div className="max-w-350 mx-auto px-6 md:px-10">
          <div className="max-w-180 pt-16 pb-14">
            <div className="w-11 h-11 rounded-xl bg-primary/8 border border-primary/20 flex items-center justify-center text-primary mb-6">
              <RiCompass3Line size={20} />
            </div>
            <p className="text-xs font-medium text-primary tracking-widest uppercase mb-3">404</p>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] leading-[1.04] text-foreground mb-4">
              This page doesn&apos;t exist.
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              The link might be broken, or the page may have moved. Here&apos;s where you probably meant to go.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-180">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group rounded-2xl border border-border/60 bg-card p-5 flex flex-col gap-1.5 hover:border-primary/40 transition-colors duration-150"
              >
                <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-150 flex items-center gap-1.5">
                  {l.label}
                  <RiArrowRightLine size={13} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-150" />
                </span>
                <span className="text-xs text-muted-foreground leading-relaxed">{l.description}</span>
              </Link>
            ))}
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 mt-10 text-sm font-medium text-primary hover:underline underline-offset-4"
          >
            Or go back to the homepage
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
