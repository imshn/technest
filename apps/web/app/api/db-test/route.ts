import { NextResponse } from "next/server"
import { getPool } from "@/lib/db"
import type { RowDataPacket } from "@/lib/db"

interface PingRow extends RowDataPacket {
  result: number
}

export async function GET() {
  try {
    const pool = getPool()
    const [rows] = await pool.query<PingRow[]>("SELECT 1+1 AS result")
    const result = rows[0]?.result

    return NextResponse.json({ status: "success", result })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ status: "error", message }, { status: 500 })
  }
}
