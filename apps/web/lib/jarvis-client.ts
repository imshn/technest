/**
 * JARVIS API client — LanceDB storage for contacts & subscribers.
 * Server-side only.
 */

export function jarvisApiBase(): string | null {
  const url = process.env.JARVIS_API_URL?.trim() || process.env.MAIL_API_URL?.trim()
  if (!url) return null
  return url.replace(/\/$/, "")
}

export function jarvisApiKey(): string | null {
  return process.env.TECHNEST_API_KEY?.trim() ?? null
}

export function isJarvisConfigured(): boolean {
  return Boolean(jarvisApiBase() && jarvisApiKey())
}

export async function jarvisFetch<T>(
  path: string,
  options: { method?: string; body?: Record<string, unknown> } = {},
): Promise<T> {
  const base = jarvisApiBase()
  const key = jarvisApiKey()
  if (!base || !key) throw new Error("JARVIS_API_URL and TECHNEST_API_KEY must be set")

  const res = await fetch(`${base}${path}`, {
    method: options.method ?? (options.body ? "POST" : "GET"),
    headers: {
      "Content-Type": "application/json",
      "x-api-key": key,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`JARVIS ${options.method ?? "GET"} ${path} failed (${res.status}): ${text}`)
  }

  return res.json() as Promise<T>
}

export interface JarvisContact {
  id: string
  title: string
  summary: string
  content: string
  created_at: number
}

export interface JarvisSubscriber {
  id: string
  title: string
  summary: string
  created_at: number
}

export async function getJarvisInbound(limit = 50) {
  return jarvisFetch<{
    stats: { contacts: number; subscriptions: number; total: number }
    contacts: JarvisContact[]
    subscriptions: JarvisSubscriber[]
    configured?: boolean
  }>(`/technest/inbound?contacts=${limit}&subscriptions=${limit}`)
}

/** Parse contact fields from LanceDB memory content */
export function parseContactContent(content: string): {
  name: string
  email: string
  company: string
  project_type: string
  budget: string
  message: string
} {
  const line = (key: string) => {
    const m = content.match(new RegExp(`^${key}:\\s*(.*)$`, "m"))
    return m?.[1]?.trim() ?? ""
  }
  const msgIdx = content.indexOf("Message:")
  const message = msgIdx >= 0
    ? content.slice(msgIdx + 8).split("\nFollow-up:")[0].trim()
    : ""

  return {
    name: line("Name"),
    email: line("Email"),
    company: line("Company"),
    project_type: line("Project"),
    budget: line("Budget"),
    message,
  }
}

export function parseSubscriberEmail(summary: string, title: string): string {
  const fromSummary = summary.match(/[\w.+-]+@[\w.-]+\.\w+/)?.[0]
  if (fromSummary) return fromSummary
  const fromTitle = title.replace(/^subscription:/, "")
  return fromTitle
}