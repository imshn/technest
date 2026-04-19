import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { name, email, projectType, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const apiBase = process.env.API_BASE_URL
    const apiKey = process.env.BLOG_API_KEY

    if (apiBase && apiKey) {
      await fetch(`${apiBase}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({ name, email, project_type: projectType, message }),
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[contact] failed:", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
