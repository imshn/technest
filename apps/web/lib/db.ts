import mysql from "mysql2/promise"
import type { Pool, RowDataPacket, OkPacket, ResultSetHeader } from "mysql2/promise"

// Re-export mysql2 types so callers don't need to import mysql2 directly
export type { RowDataPacket, OkPacket, ResultSetHeader }

// ── TypeScript interfaces for DB result shapes ────────────────────────────────

export interface PostRow extends RowDataPacket {
  slug: string
  title: string
  seo_excerpt: string
  excerpt: string
  content: string
  tag: string
  author: string
  status: "draft" | "published"
  featured_image_url: string | null
  featured_image_alt: string
  image_url: string | null
  image_alt: string
  read_time: string
  date: string
  created_at: Date
  updated_at: Date
}

export interface SubscriberRow extends RowDataPacket {
  id: number
  email: string
  created_at: Date
}

// ── Singleton pool ────────────────────────────────────────────────────────────
// In Next.js dev mode, hot-reload re-executes module code which would create a
// new pool on every save and exhaust the MariaDB connection limit.
// Storing on globalThis survives hot-reload — the pool is reused across reloads.

declare global {
  // eslint-disable-next-line no-var
  var __mysqlPool: Pool | undefined
}

function createPool(): Pool {
  if (!process.env.DB_HOST) {
    throw new Error(
      "MariaDB env vars not set. Add DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD to .env.local"
    )
  }

  return mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 3306),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,       // max concurrent connections
    queueLimit: 0,             // unlimited queue
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    timezone: "+00:00",        // always UTC
    charset: "utf8mb4",
  })
}

export function getPool(): Pool {
  // Server-side guard — this module must never run on the client
  if (typeof window !== "undefined") {
    throw new Error("getPool() must only be called server-side.")
  }

  if (!global.__mysqlPool) {
    global.__mysqlPool = createPool()
  }

  return global.__mysqlPool
}
