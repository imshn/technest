import { NextRequest } from "next/server"

/**
 * Returns true if the request is authorized to write.
 * Accepts either:
 *   1. x-api-key header matching BLOG_API_KEY (for OpenClaw / external agents)
 *   2. admin_session cookie matching ADMIN_SESSION_TOKEN (for admin UI)
 */
export function isAuthorized(req: NextRequest): boolean {
  const apiKey = req.headers.get("x-api-key")
  if (apiKey && apiKey === process.env.BLOG_API_KEY) return true

  const session = req.cookies.get("admin_session")?.value
  if (session && session === process.env.ADMIN_SESSION_TOKEN) return true

  return false
}
