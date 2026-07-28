import { NextRequest, NextResponse } from "next/server"
import { isAuthorized } from "@/lib/auth"
import {
  getJarvisInbound,
  isJarvisConfigured,
  parseContactContent,
  parseSubscriberEmail,
} from "@/lib/jarvis-client"
import {
  inboundStats as dbInboundStats,
  isInboundDbConfigured,
  listContacts,
  listSubscribers,
} from "@/lib/inbound-store"

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const limit = Number(req.nextUrl.searchParams.get("limit")) || 50

  if (isJarvisConfigured()) {
    try {
      const data = await getJarvisInbound(limit)

      const contacts = data.contacts
        .filter((c) => c.content?.includes("Type: website_contact"))
        .map((c) => {
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

      const subscribers = data.subscriptions
        .filter((s) => s.title?.startsWith("subscription:"))
        .map((s) => ({
          id: s.id,
          email: parseSubscriberEmail(s.summary, s.title),
          source: "technest_newsletter",
          created_at: new Date(s.created_at).toISOString(),
        }))

      return NextResponse.json({
        configured: true,
        source: "jarvis",
        stats: {
          contacts: contacts.length,
          subscribers: subscribers.length,
        },
        contacts,
        subscribers,
      })
    } catch (err) {
      console.error("[admin/inbound] JARVIS fetch failed:", err)
      if (!isInboundDbConfigured()) {
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
  }

  if (!isInboundDbConfigured()) {
    return NextResponse.json({
      configured: false,
      source: "none",
      stats: { contacts: 0, subscribers: 0 },
      contacts: [],
      subscribers: [],
    })
  }

  const [contacts, subscribers, stats] = await Promise.all([
    listContacts(limit),
    listSubscribers(limit),
    dbInboundStats(),
  ])

  return NextResponse.json({
    configured: true,
    source: "mysql",
    stats,
    contacts: contacts.map((c) => ({
      id: String(c.id),
      name: c.name,
      email: c.email,
      company: c.company,
      project_type: c.project_type,
      budget: c.budget,
      message: c.message,
      created_at: new Date(c.created_at).toISOString(),
    })),
    subscribers: subscribers.map((s) => ({
      id: String(s.id),
      email: s.email,
      source: s.source,
      created_at: new Date(s.created_at).toISOString(),
    })),
  })
}