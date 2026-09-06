import { NextRequest, NextResponse } from "next/server"
import { isAuthorized } from "@/lib/auth"
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