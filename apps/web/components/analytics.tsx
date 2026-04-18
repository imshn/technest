"use client"

import Script from "next/script"

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

export function Analytics() {
  const hasGTM = !!GTM_ID
  const hasGA = !!GA_ID && !hasGTM

  return (
    <>
      {hasGTM && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      )}

      {hasGA && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
            gtag('js',new Date());gtag('config','${GA_ID}',{page_path:window.location.pathname,send_page_view:true});`}
          </Script>
        </>
      )}
    </>
  )
}

export function GTMNoScript() {
  if (!GTM_ID) return null
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
