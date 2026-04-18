import { NextRequest, NextResponse } from "next/server"
import { subscribeEmail } from "@/lib/api-client"

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 })
  }

  try {
    await subscribeEmail(email)
  } catch (err) {
    console.error("[Newsletter] Subscription failed:", err)
    // Don't expose internal errors to the client
  }

  return NextResponse.json({ success: true })
}
