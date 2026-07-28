/**
 * EmailJS — last-resort fallback if JARVIS and SMTP both fail.
 * Server-side calls require "Allow EmailJS API for non-browser applications"
 * enabled in the EmailJS account's Security settings.
 */
const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send"

export function isEmailJsConfigured(): boolean {
  return Boolean(
    process.env.EMAILJS_SERVICE_ID?.trim() &&
    process.env.EMAILJS_CONTACT_TEMPLATE_ID?.trim() &&
    process.env.EMAILJS_PUBLIC_KEY?.trim(),
  )
}

async function send(templateId: string, templateParams: Record<string, string>): Promise<void> {
  const res = await fetch(EMAILJS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: templateId,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      ...(process.env.EMAILJS_PRIVATE_KEY?.trim() ? { accessToken: process.env.EMAILJS_PRIVATE_KEY } : {}),
      template_params: templateParams,
    }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => "")
    throw new Error(`EmailJS send failed (${res.status}): ${body}`)
  }
}

export interface EmailJsContactData {
  name: string
  email: string
  message: string
  phone?: string
  title?: string
}

/** Notifies the team — uses the "Contact Us" template. */
export async function sendContactNotificationViaEmailJS(data: EmailJsContactData): Promise<void> {
  const templateId = process.env.EMAILJS_CONTACT_TEMPLATE_ID
  if (!templateId) throw new Error("EMAILJS_CONTACT_TEMPLATE_ID is not set")

  await send(templateId, {
    name: data.name,
    email: data.email,
    phone: data.phone ?? "",
    message: data.message,
    title: data.title ?? "New project brief",
    time: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
  })
}

/** Confirms receipt to the person who submitted the form — uses the "Auto-Reply" template. */
export async function sendAutoReplyViaEmailJS(data: EmailJsContactData): Promise<void> {
  const templateId = process.env.EMAILJS_AUTOREPLY_TEMPLATE_ID
  if (!templateId) return // optional — skip silently if not configured

  await send(templateId, {
    name: data.name,
    email: data.email,
    title: data.title ?? "your project brief",
  })
}
