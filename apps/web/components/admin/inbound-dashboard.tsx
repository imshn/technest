"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { RiArrowLeftLine, RiLogoutBoxLine, RiMailLine, RiUserLine } from "@remixicon/react"

type Contact = {
  id: number
  name: string
  email: string
  company: string
  project_type: string
  budget: string
  message: string
  created_at: string
}

type Subscriber = {
  id: number
  email: string
  source: string
  created_at: string
}

export function InboundDashboard() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [configured, setConfigured] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/inbound")
      .then((r) => r.json())
      .then((data) => {
        setConfigured(data.configured !== false)
        setContacts(data.contacts ?? [])
        setSubscribers(data.subscribers ?? [])
      })
      .finally(() => setLoading(false))
  }, [])

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" })
    window.location.href = "/admin/login"
  }

  return (
    <div className="min-h-dvh bg-background">
      <header className="border-b border-border/60 bg-card">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              <RiArrowLeftLine size={14} /> Blog
            </Link>
            <span className="text-border">·</span>
            <span className="text-sm font-medium text-foreground">Inbound Leads</span>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <RiLogoutBoxLine size={13} /> Sign out
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {!configured && (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-5 mb-8 text-sm text-amber-200">
            Database not configured. Add <code className="text-xs">DB_HOST</code>, <code className="text-xs">DB_USER</code>, etc. to Vercel env vars and run <code className="text-xs">schema.sql</code> on your Hostinger MySQL.
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="rounded-xl border border-border/60 bg-card p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <RiUserLine size={18} />
            </div>
            <div>
              <p className="text-2xl font-semibold">{contacts.length}</p>
              <p className="text-xs text-muted-foreground">Contact briefs</p>
            </div>
          </div>
          <div className="rounded-xl border border-border/60 bg-card p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <RiMailLine size={18} />
            </div>
            <div>
              <p className="text-2xl font-semibold">{subscribers.length}</p>
              <p className="text-xs text-muted-foreground">Newsletter subscribers</p>
            </div>
          </div>
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : (
          <div className="flex flex-col gap-10">
            <section>
              <h2 className="text-sm font-semibold text-foreground mb-4">Recent contacts</h2>
              {contacts.length === 0 ? (
                <p className="text-sm text-muted-foreground">No contacts yet.</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {contacts.map((c) => (
                    <div key={c.id} className="rounded-xl border border-border/60 bg-card p-5">
                      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                        <p className="font-medium text-foreground">{c.name}</p>
                        <time className="text-xs text-muted-foreground">
                          {new Date(c.created_at).toLocaleString()}
                        </time>
                      </div>
                      <p className="text-sm text-primary mb-1">
                        <a href={`mailto:${c.email}`}>{c.email}</a>
                      </p>
                      {(c.company || c.project_type || c.budget) && (
                        <p className="text-xs text-muted-foreground mb-2">
                          {[c.company, c.project_type, c.budget].filter(Boolean).join(" · ")}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">{c.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="text-sm font-semibold text-foreground mb-4">Newsletter subscribers</h2>
              {subscribers.length === 0 ? (
                <p className="text-sm text-muted-foreground">No subscribers yet.</p>
              ) : (
                <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/60 text-left text-xs text-muted-foreground">
                        <th className="px-5 py-3 font-medium">Email</th>
                        <th className="px-5 py-3 font-medium">Source</th>
                        <th className="px-5 py-3 font-medium">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribers.map((s) => (
                        <tr key={s.id} className="border-b border-border/40 last:border-0">
                          <td className="px-5 py-3">
                            <a href={`mailto:${s.email}`} className="text-primary hover:underline">{s.email}</a>
                          </td>
                          <td className="px-5 py-3 text-muted-foreground">{s.source}</td>
                          <td className="px-5 py-3 text-muted-foreground">
                            {new Date(s.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  )
}