import { NextRequest, NextResponse } from "next/server"
import { isAuthorized } from "@/lib/auth"
import {
  getJarvisInbound,
  isJarvisConfigured,
  parseContactContent,
  parseSubscriberEmail,
} from "@/lib/jarvis-client"

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!isJarvisConfigured()) {
    return NextResponse.json({
      configured: false,
      source: "jarvis",
      stats: { contacts: 0, subscribers: 0 },
      contacts: [],
      subscribers: [],
    })
  }

  const limit = Number(req.nextUrl.searchParams.get("limit")) || 50

  try {
    const data = await getJarvisInbound(limit)

    const contacts = data.contacts.map((c) => {
      const parsed = parseContactContent(c.content)
      return {
        id: c.id,
        name: parsed.name || c.summary.split("<")[0]?.trim() || "Unknown",
        email: parsed.email,
        company: parsed.company,
        project_type: parsed.project_type,
        budget: parsed.budget,
        message: parsed.message,
        created_at: new Date(c.created_at).toISOString(),
      }
    })

    const subscribers = data.subscriptions.map((s) => ({
      id: s.id,
      email: parseSubscriberEmail(s.summary, s.title),
      source: "technest_newsletter",
      created_at: new Date(s.created_at).toISOString(),
    }))

    return NextResponse.json({
      configured: true,
      source: "jarvis",
      stats: {
        contacts: data.stats.contacts,
        subscribers: data.stats.subscriptions,
      },
      contacts,
      subscribers,
    })
  } catch (err) {
    console.error("[admin/inbound] JARVIS fetch failed:", err)
    return NextResponse.json(
      {
        configured: false,
        source: "jarvis",
        error: "JARVIS unreachable — ensure your Mac is on and the tunnel is running.",
        stats: { contacts: 0, subscribers: 0 },
        contacts: [],
        subscribers: [],
      },
      { status: 503 },
    )
  }
}