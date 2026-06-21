import { NextRequest, NextResponse } from "next/server"
import { sendNewsletterMail } from "@/lib/mail-client"

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 })
  }

  try {
    await sendNewsletterMail(email)
  } catch (err) {
    console.error("[Newsletter] Subscription failed:", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}