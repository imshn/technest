import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics, GTMNoScript } from "@/components/analytics"
import { EngagementTracker } from "@/components/engagement-tracker"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import { SchemaMarkup } from "@/components/schema"
import { cn } from "@workspace/ui/lib/utils"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const siteUrl = "https://technestsolutions.in"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TechNest — AI Automation & Software Development Agency",
    template: "%s | TechNest",
  },
  description:
    "AI-native agency building multi-agent systems, agentic workflows, N8n automation, SaaS, and web apps. Serving startups and enterprises in USA, UK, UAE, Kuwait, Saudi Arabia, Turkey, and Europe.",
  keywords: [
    // Core service terms
    "AI automation agency",
    "multi-agent AI systems",
    "agentic workflow development",
    "n8n workflow automation",
    "SaaS development company",
    "custom AI agent development",
    // Gulf targeting — primary market
    "AI agency Dubai",
    "AI automation UAE",
    "software development agency Dubai",
    "AI solutions Kuwait",
    "tech agency Saudi Arabia",
    "AI development company Riyadh",
    "AI agency Kuwait",
    "AI automation Saudi Arabia",
    "SaaS development UAE",
    "AI agency Turkey",
    "AI development company Istanbul",
    "software agency Qatar",
    "GCC AI automation agency",
    // US targeting — primary market
    "AI development agency USA",
    "AI automation agency United States",
    "hire AI development team USA",
    "enterprise AI solutions America",
    "AI agency New York",
    "AI agency San Francisco",
    "AI automation company US",
    "n8n automation agency USA",
    // UK + Europe targeting
    "AI agency UK",
    "AI automation agency London",
    "software development agency UK",
    "AI development company Germany",
    "AI agency Netherlands",
    "AI automation Europe",
    "SaaS development company UK",
    // India — Bangalore + Chennai only
    "AI agency Bangalore",
    "AI development company Bangalore",
    "software agency Chennai",
    "AI automation Bangalore",
    // Intent-based (high commercial — global)
    "hire AI automation agency",
    "agentic workflow development company",
    "n8n vs zapier",
    "multi agent AI system development",
    "AI workflow automation cost",
    "automate business processes AI",
    "build AI agent for business",
    "AI agency for startups",
    "offshore AI development team",
  ],
  authors: [{ name: "TechNest", url: siteUrl }],
  creator: "TechNest",
  publisher: "TechNest",
  category: "Technology",
  classification: "Software Development / AI Agency",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["en_GB", "ar_KW", "ar_AE", "ar_SA", "tr_TR"],
    url: siteUrl,
    siteName: "TechNest",
    title: "TechNest — AI Automation & Software Development Agency",
    description:
      "Build intelligence into everything you ship. Multi AI Agents, Agentic Workflows, N8n Automation, SaaS & App Development, Graphic Design, and AI-powered Digital Marketing.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "TechNest — AI-Powered Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@technestdev",
    creator: "@technestdev",
    title: "TechNest — AI Automation & Software Development Agency",
    description:
      "Multi AI Agents, Agentic Workflows, SaaS & App Development, and AI-powered Digital Marketing for ambitious businesses.",
    images: [`${siteUrl}/og-image.png`],
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": siteUrl,
      "en-GB": siteUrl,
      "en-AE": siteUrl,
      "en-SA": siteUrl,
      "en-KW": siteUrl,
      "en-QA": siteUrl,
      "en-DE": siteUrl,
      "en-TR": siteUrl,
      "en-NL": siteUrl,
      "en-FR": siteUrl,
      "x-default": siteUrl,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ?? "",
  },
  other: {
    // Multi-region geo targeting — India, US, Gulf, Europe
    "geo.region": "US, GB, AE, SA, KW, QA, TR, DE, NL, FR",
    "DC.language": "en",
    "DC.coverage": "Worldwide",
    "DC.subject": "AI Automation, Software Development, SaaS, Multi-Agent AI",
    // Structured citations for AI search engines
    "citation_author": "Shaan",
    "citation_publisher": "TechNest",
    "citation_public_url": "https://technestsolutions.in",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", geist.variable, geistMono.variable)}
    >
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0f1117" media="(prefers-color-scheme: dark)" />
        <SchemaMarkup />
      </head>
      <body>
        {/* GTM noscript fallback — must be first child of body */}
        <GTMNoScript />
        <ThemeProvider>{children}</ThemeProvider>
        <WhatsAppCTA />
        <EngagementTracker />
        {/* Analytics — Google Tag Manager / GA4 / Google Ads */}
        <Analytics />
        {/* Vercel Analytics + Core Web Vitals */}
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
