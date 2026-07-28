/**
 * TechNest mail — SMTP for delivery, JARVIS LanceDB for storage.
 * Server-side only.
 */
import { sendContactDirect, sendNewsletterDirect } from "./mail-send"
import { isJarvisConfigured, jarvisFetch } from "./jarvis-client"
import { storeContact as storeContactDb, storeSubscriber as storeSubscriberDb } from "./inbound-store"
import { isEmailJsConfigured, sendContactNotificationViaEmailJS, sendAutoReplyViaEmailJS } from "./emailjs"

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
  phone?: string
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

async function persistContactEverywhere(data: ContactPayload): Promise<void> {
  await storeContactDb(data).catch((err) => {
    console.error("[mail] MySQL contact store failed:", err)
  })
}

export async function sendContactMail(data: ContactPayload): Promise<void> {
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
      await persistContactEverywhere(data)
      return
    } catch (err) {
      console.error("[mail] JARVIS contact+mail failed, falling back to SMTP:", err)
      await storeContactInJarvis(data)
    }
  }

  if (canUseSmtp()) {
    try {
      await sendContactDirect(data)
      await storeContactInJarvis(data)
      await persistContactEverywhere(data)
      return
    } catch (err) {
      console.error("[mail] SMTP failed, falling back to EmailJS:", err)
    }
  }

  if (!isEmailJsConfigured()) {
    throw new Error("Set JARVIS_API_URL + TECHNEST_API_KEY, SMTP_PASS, or EMAILJS_* for mail.")
  }

  const emailJsData = { name: data.name, email: data.email, message: data.message, phone: data.phone, title: data.projectType }
  await sendContactNotificationViaEmailJS(emailJsData)
  await sendAutoReplyViaEmailJS(emailJsData).catch((err) => {
    console.error("[mail] EmailJS auto-reply failed (notification still sent):", err)
  })
  await storeContactInJarvis(data)
  await persistContactEverywhere(data)
}

export async function sendNewsletterMail(email: string): Promise<void> {
  if (isJarvisConfigured()) {
    try {
      await jarvisFetch<{ success: boolean }>("/newsletter", {
        body: { email, source: "technest_newsletter" },
      })
      await storeSubscriberDb(email).catch((err) => {
        console.error("[mail] MySQL subscriber store failed:", err)
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
  await storeSubscriberDb(email).catch((err) => {
    console.error("[mail] MySQL subscriber store failed:", err)
  })
}