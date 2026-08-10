import { ImageResponse } from "next/og"

// Generated wordmark for the Organization/LocalBusiness schema `logo` field —
// white background so it renders correctly in Google's Knowledge Panel and
// other white-card contexts, unlike the dark og-image.
export const revalidate = 86400

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          background: "#ffffff",
        }}
      >
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#838ce5", display: "flex" }} />
        <span style={{ fontSize: 26, fontWeight: 700, color: "#0f1117", letterSpacing: "-0.02em" }}>
          TechNest
        </span>
      </div>
    ),
    { width: 180, height: 60 }
  )
}
