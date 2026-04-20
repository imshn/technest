"use client"

import Script from "next/script"
import { useEffect } from "react"

const GA_ID = process.env.NEXT_PUBLIC_GA_ID
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

export function trackEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined" || !window.gtag) return
  window.gtag("event", eventName, params)
}

export function pushDataLayer(data: Record<string, unknown>) {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(data)
}

export function trackCTAClick(ctaName: string) {
  trackEvent("cta_click", { cta_name: ctaName })
  pushDataLayer({ event: "cta_click", cta_name: ctaName })
}

export function trackPageView(path: string) {
  if (typeof window === "undefined" || !window.gtag || !GA_ID) return
  window.gtag("event", "page_view", { page_path: path, send_to: GA_ID })
}

export function useScrollDepthTracking() {
  useEffect(() => {
    const thresholds = [25, 50, 75, 90]
    const fired = new Set<number>()

    function onScroll() {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      const pct = Math.round((scrollTop / docHeight) * 100)

      for (const t of thresholds) {
        if (pct >= t && !fired.has(t)) {
          fired.add(t)
          trackEvent("scroll_depth", { depth_percent: t, page_path: window.location.pathname })
          pushDataLayer({ event: "scroll_depth", depth_percent: t })
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
}

export function useEngagementTracking() {
  useEffect(() => {
    const start = Date.now()
    const milestones = [15, 30, 60, 120]
    const fired = new Set<number>()
    let timer: ReturnType<typeof setInterval>

    timer = setInterval(() => {
      const elapsed = Math.round((Date.now() - start) / 1000)
      for (const m of milestones) {
        if (elapsed >= m && !fired.has(m)) {
          fired.add(m)
          trackEvent("time_on_page", { seconds: m, page_path: window.location.pathname })
        }
      }
    }, 5000)

    return () => clearInterval(timer)
  }, [])
}

// GTM containers use GTM-XXXXXXX prefix. GT-XXXXXXX is a Google Tag — different loader.
const isRealGTM = !!GTM_ID && GTM_ID.startsWith("GTM-")

export function Analytics() {
  return (
    <>
      {/* GA4 — always load directly so Google can detect the tag */}
      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
            gtag('js',new Date());gtag('config','${GA_ID}',{page_path:window.location.pathname,send_page_view:true});`}
          </Script>
        </>
      )}

      {/* GTM — only when a real GTM-XXXXXXX container ID is set */}
      {isRealGTM && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      )}
    </>
  )
}

export function GTMNoScript() {
  if (!isRealGTM) return null
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="GTM"
      />
    </noscript>
  )
}
