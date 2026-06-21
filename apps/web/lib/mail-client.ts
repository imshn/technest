/**
 * TechNest mail — SMTP for delivery, JARVIS LanceDB for storage.
 * Server-side only.
 */
import { sendContactDirect, sendNewsletterDirect } from "./mail-send"
import { isJarvisConfigured, jarvisFetch } from "./jarvis-client"

function canUseSmtp(): boolean {
  return Boolean(process.env.SMTP_PASS?.trim())
}

export interface ContactPayload {
  name: string
  email: string
  message: string
  company?: string
  projectType?: string
  budget?: string
}

async function storeContactInJarvis(data: ContactPayload): Promise<void> {
  if (!isJarvisConfigured()) return
  try {
    await jarvisFetch("/technest/contacts/store", {
      body: {
        name: data.name,
        email: data.email,
        message: data.message,
        company: data.company,
        projectType: data.projectType,
        budget: data.budget,
      },
    })
  } catch (err) {
    console.error("[mail] JARVIS contact store failed:", err)
  }
}

async function storeNewsletterInJarvis(email: string): Promise<void> {
  if (!isJarvisConfigured()) return
  try {
    await jarvisFetch("/technest/subscriptions/store", {
      body: { email, source: "technest_newsletter" },
    })
  } catch (err) {
    console.error("[mail] JARVIS newsletter store failed:", err)
  }
}

export async function sendContactMail(data: ContactPayload): Promise<void> {
  // LanceDB via JARVIS (local Mac — source of truth)
  if (isJarvisConfigured()) {
    try {
      await jarvisFetch<{ ok: boolean }>("/contact", {
        body: {
          name: data.name,
          email: data.email,
          message: data.message,
          company: data.company,
          projectType: data.projectType,
          budget: data.budget,
        },
      })
      return
    } catch (err) {
      console.error("[mail] JARVIS contact+mail failed, falling back to SMTP:", err)
      await storeContactInJarvis(data)
    }
  }

  if (!canUseSmtp()) {
    throw new Error("Set JARVIS_API_URL + TECHNEST_API_KEY, or SMTP_PASS for mail.")
  }

  await sendContactDirect(data)
  await storeContactInJarvis(data)
}

export async function sendNewsletterMail(email: string): Promise<void> {
  if (isJarvisConfigured()) {
    try {
      await jarvisFetch<{ success: boolean }>("/newsletter", {
        body: { email, source: "technest_newsletter" },
      })
      return
    } catch (err) {
      console.error("[mail] JARVIS newsletter failed, falling back to SMTP:", err)
      await storeNewsletterInJarvis(email)
    }
  }

  if (!canUseSmtp()) {
    throw new Error("Set JARVIS_API_URL + TECHNEST_API_KEY, or SMTP_PASS for mail.")
  }

  await sendNewsletterDirect(email)
  await storeNewsletterInJarvis(email)
}