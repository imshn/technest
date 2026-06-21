import nodemailer from "nodemailer"

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function row(label: string, value: string): string {
  if (!value.trim()) return ""
  return `<tr><td style="padding:8px 12px;color:#71717a;font-size:13px;vertical-align:top;width:140px">${esc(label)}</td><td style="padding:8px 12px;color:#fafafa;font-size:14px">${esc(value)}</td></tr>`
}

function wrap(title: string, body: string): string {
  return `<!DOCTYPE html><html><body style="margin:0;background:#09090b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#09090b;padding:32px 16px">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#18181b;border:1px solid #27272a;border-radius:12px;overflow:hidden">
<tr><td style="padding:24px 28px;border-bottom:1px solid #27272a">
<p style="margin:0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#ff304f">TechNest</p>
<h1 style="margin:8px 0 0;font-size:20px;color:#fafafa;font-weight:600">${esc(title)}</h1>
</td></tr>
<tr><td style="padding:24px 28px">${body}</td></tr>
</table></td></tr></table></body></html>`
}

function getTransport() {
  const pass = process.env.SMTP_PASS?.trim()
  if (!pass) throw new Error("SMTP_PASS is not set")

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.hostinger.com",
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: process.env.SMTP_SECURE !== "false",
    auth: {
      user: process.env.SMTP_USER ?? "shaan@technestsolutions.in",
      pass,
    },
  })
}

function mailFrom() {
  return process.env.MAIL_FROM ?? "shaan@technestsolutions.in"
}

function mailTo() {
  return process.env.MAIL_NOTIFY_TO ?? "shahnawaz28april@gmail.com"
}

export async function sendContactDirect(data: {
  name: string
  email: string
  message: string
  company?: string
  projectType?: string
  budget?: string
}): Promise<void> {
  const subject = `New contact: ${data.name}${data.company ? ` · ${data.company}` : ""}`
  const rows = [
    row("Name", data.name),
    row("Email", data.email),
    row("Company", data.company ?? ""),
    row("Project type", data.projectType ?? ""),
    row("Budget", data.budget ?? ""),
  ]
    .filter(Boolean)
    .join("")

  const html = wrap(
    "New project brief",
    `<table width="100%" cellpadding="0" cellspacing="0">${rows}</table>
<p style="margin:20px 0 8px;font-size:12px;color:#71717a;text-transform:uppercase;letter-spacing:0.06em">Message</p>
<p style="margin:0;padding:16px;background:#27272a;border-radius:8px;color:#e4e4e7;font-size:14px;line-height:1.6;white-space:pre-wrap">${esc(data.message)}</p>`,
  )

  await getTransport().sendMail({
    from: `"TechNest" <${mailFrom()}>`,
    to: mailTo(),
    replyTo: data.email,
    subject,
    html,
    text: [subject, "", `Name: ${data.name}`, `Email: ${data.email}`, data.message].join("\n"),
  })
}

export async function sendNewsletterDirect(email: string): Promise<void> {
  const subject = `Newsletter signup: ${email}`
  const html = wrap(
    "New newsletter subscriber",
    `<table width="100%" cellpadding="0" cellspacing="0">${row("Email", email)}${row("Source", "technest_newsletter")}</table>`,
  )

  await getTransport().sendMail({
    from: `"TechNest" <${mailFrom()}>`,
    to: mailTo(),
    subject,
    html,
    text: `${subject}\n\nEmail: ${email}`,
  })
}