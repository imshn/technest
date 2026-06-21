import { getPool, type RowDataPacket } from "@/lib/db"

export function isInboundDbConfigured(): boolean {
  return Boolean(process.env.DB_HOST?.trim())
}

export interface ContactRow extends RowDataPacket {
  id: number
  name: string
  email: string
  company: string
  project_type: string
  budget: string
  message: string
  created_at: Date
}

export interface SubscriberRow extends RowDataPacket {
  id: number
  email: string
  source: string
  created_at: Date
}

export async function storeContact(data: {
  name: string
  email: string
  message: string
  company?: string
  projectType?: string
  budget?: string
}): Promise<number | null> {
  if (!isInboundDbConfigured()) return null

  const pool = getPool()
  const [result] = await pool.execute(
    `INSERT INTO contacts (name, email, company, project_type, budget, message)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      data.name,
      data.email,
      data.company ?? "",
      data.projectType ?? "",
      data.budget ?? "",
      data.message,
    ],
  )

  return (result as { insertId?: number }).insertId ?? null
}

export async function storeSubscriber(email: string, source = "technest_newsletter"): Promise<boolean> {
  if (!isInboundDbConfigured()) return false

  const pool = getPool()
  const [result] = await pool.execute(
    `INSERT IGNORE INTO subscribers (email, source) VALUES (?, ?)`,
    [email.trim().toLowerCase(), source],
  )

  return ((result as { affectedRows?: number }).affectedRows ?? 0) > 0
}

export async function listContacts(limit = 50): Promise<ContactRow[]> {
  if (!isInboundDbConfigured()) return []
  const pool = getPool()
  const [rows] = await pool.query<ContactRow[]>(
    `SELECT id, name, email, company, project_type, budget, message, created_at
     FROM contacts ORDER BY created_at DESC LIMIT ?`,
    [limit],
  )
  return rows
}

export async function listSubscribers(limit = 100): Promise<SubscriberRow[]> {
  if (!isInboundDbConfigured()) return []
  const pool = getPool()
  const [rows] = await pool.query<SubscriberRow[]>(
    `SELECT id, email, source, created_at FROM subscribers ORDER BY created_at DESC LIMIT ?`,
    [limit],
  )
  return rows
}

export async function inboundStats(): Promise<{ contacts: number; subscribers: number }> {
  if (!isInboundDbConfigured()) return { contacts: 0, subscribers: 0 }
  const pool = getPool()
  const [contactRows] = await pool.query<RowDataPacket[]>("SELECT COUNT(*) AS c FROM contacts")
  const [subRows] = await pool.query<RowDataPacket[]>("SELECT COUNT(*) AS c FROM subscribers")
  return {
    contacts: Number(contactRows[0]?.c ?? 0),
    subscribers: Number(subRows[0]?.c ?? 0),
  }
}