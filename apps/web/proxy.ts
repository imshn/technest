import { NextRequest, NextResponse } from "next/server"

// Paths with a markdown counterpart under app/md/[[...slug]]/route.ts
const MARKDOWN_ROOTS = ["about", "faq", "process", "contact", "services", "locations", "compare", "ai-automation-statistics", "blog"]

function hasMarkdownVersion(pathname: string) {
  if (pathname === "/") return true
  const [, root] = pathname.split("/")
  return !!root && MARKDOWN_ROOTS.includes(root)
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Only protect /admin routes (not /admin/login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const session = req.cookies.get("admin_session")?.value
    const expected = process.env.ADMIN_SESSION_TOKEN

    if (!expected || session !== expected) {
      const loginUrl = new URL("/admin/login", req.url)
      loginUrl.searchParams.set("from", pathname)
      return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
  }

  // Markdown-for-Agents: Accept: text/markdown gets a markdown response,
  // HTML stays the default for browsers.
  const accept = req.headers.get("accept") ?? ""
  if (/text\/markdown/i.test(accept) && !pathname.startsWith("/md") && hasMarkdownVersion(pathname)) {
    const url = req.nextUrl.clone()
    url.pathname = `/md${pathname === "/" ? "" : pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/((?!_next|api|md|favicon.ico|.*\\..*).*)"],
}
