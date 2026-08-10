import { ImageResponse } from "next/og"

// Generated, not a static asset — avoids a second source of truth for brand art.
// ponytail: default OG image for pages that don't override it; per-page images can
// follow this same folder-as-route pattern later if a page needs a unique one.
export const revalidate = 86400

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: "#0f1117",
          backgroundImage:
            "radial-gradient(circle at 88% 20%, rgba(131,140,229,0.35), transparent 55%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 40 }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#838ce5", display: "flex" }} />
          <span style={{ fontSize: 32, fontWeight: 700, color: "#f5f5f7", letterSpacing: "-0.02em" }}>
            TechNest
          </span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 58,
            fontWeight: 700,
            color: "#f5f5f7",
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
            maxWidth: 980,
          }}
        >
          AI Automation & Software Development Agency
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#9a9aa5", marginTop: 30 }}>
          Multi-Agent AI · N8n Automation · SaaS Development — Bengaluru, India
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
