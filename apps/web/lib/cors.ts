import { NextRequest, NextResponse } from "next/server"

const ALLOWED_ORIGINS = [
  "https://imshn.cloud",
  "https://technestsolutions.in",
  "https://www.technestsolutions.in",
  ...(process.env.NODE_ENV === "development" ? ["http://localhost:3000"] : []),
]

const FALLBACK_ORIGIN = "https://technestsolutions.in"

export function corsHeaders(origin: string | null): Record<string, string> {
  const allowed =
    origin && ALLOWED_ORIGINS.includes(origin) ? origin : FALLBACK_ORIGIN
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-api-key",
    "Access-Control-Max-Age": "86400",
  }
}

export function handleOptions(req: NextRequest): NextResponse {
  const origin = req.headers.get("origin")
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(origin),
  })
}

export function withCors(res: NextResponse, req: NextRequest): NextResponse {
  const origin = req.headers.get("origin")
  const headers = new Headers(res.headers)
  for (const [k, v] of Object.entries(corsHeaders(origin))) {
    headers.set(k, v)
  }
  return new NextResponse(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers,
  })
}
