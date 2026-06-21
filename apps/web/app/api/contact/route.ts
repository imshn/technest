import { NextRequest, NextResponse } from "next/server"
import { sendContactMail } from "@/lib/mail-client"

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, projectType, budget, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await sendContactMail({ name, email, company, projectType, budget, message })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[contact] failed:", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}