import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
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

const siteUrl = "https://technest.dev"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TechNest — AI Automation & Software Development Agency",
    template: "%s | TechNest",
  },
  description:
    "TechNest is an AI-native digital agency that builds multi-agent systems, agentic workflows, N8n automations, SaaS platforms, web & mobile apps, and AI-powered marketing. Serving startups and enterprises globally.",
  keywords: [
    "AI agency",
    "multi AI agents for business",
    "agentic workflow development",
    "n8n workflow automation",
    "AI automation agency",
    "SaaS development company",
    "custom AI agent development",
    "digital transformation agency",
    "AI-powered marketing agency",
    "hire AI development team",
    "enterprise AI solutions",
    "business automation agency",
    "machine learning development agency",
    "AI consulting firm",
    "software development agency",
    "mobile app development agency",
    "web app development agency",
    "AI agency for startups",
    "AI solutions for businesses",
    "remote AI development team",
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
    alternateLocale: ["en_GB", "en_IN", "ar_KW", "ar_AE"],
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
      "en-IN": siteUrl,
      "en-AE": siteUrl,
      "en-KW": siteUrl,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ?? "",
  },
  other: {
    "geo.region": "US",
    "geo.placename": "United States",
    "ICBM": "37.0902, -95.7129",
    "DC.language": "en",
    "DC.coverage": "Worldwide",
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
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
