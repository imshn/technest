import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { RiCheckLine } from "@remixicon/react"

export const metadata: Metadata = {
  title: "Thank You",
  // Conversion-only page — not useful to searchers, and duplicate of nothing
  // worth indexing. Keep it out of search results and the sitemap.
  robots: { index: false, follow: true },
}

export default function ThankYouPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh pt-24 pb-24 flex items-center">
        <div className="max-w-350 mx-auto px-6 md:px-10 w-full">
          <div className="max-w-140 mx-auto text-center flex flex-col items-center gap-6 py-16">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <RiCheckLine size={26} />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-foreground">
                Brief received.
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed max-w-100">
                We&apos;ll read through it and reply within 24 hours with follow-up questions or a rough scope.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Link
                href="/case-studies"
                className="text-sm font-medium text-foreground border border-border/60 rounded-lg px-5 py-2.5 hover:border-primary/40 hover:text-primary transition-colors"
              >
                See what we&apos;ve shipped
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium text-foreground border border-border/60 rounded-lg px-5 py-2.5 hover:border-primary/40 hover:text-primary transition-colors"
              >
                Read the blog
              </Link>
              <Link
                href="/"
                className="text-sm font-medium text-primary px-5 py-2.5 hover:underline underline-offset-4"
              >
                Back to homepage
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
