/**
 * TechNest mail — EmailJS for the contact form and newsletter notifications,
 * MySQL for storage. Server-side only.
 */
import { storeContact as storeContactDb, storeSubscriber as storeSubscriberDb } from "./inbound-store"
import { isEmailJsConfigured, sendContactNotificationViaEmailJS, sendAutoReplyViaEmailJS } from "./emailjs"

export interface ContactPayload {
  name: string
  email: string
  message: string
  company?: string
  projectType?: string
  budget?: string
  phone?: string
}

async function persistContactEverywhere(data: ContactPayload): Promise<void> {
  await storeContactDb(data).catch((err) => {
    console.error("[mail] MySQL contact store failed:", err)
  })
}

export async function sendContactMail(data: ContactPayload): Promise<void> {
  if (!isEmailJsConfigured()) {
    throw new Error("Set EMAILJS_SERVICE_ID, EMAILJS_CONTACT_TEMPLATE_ID, and EMAILJS_PUBLIC_KEY for mail.")
  }

  const emailJsData = { name: data.name, email: data.email, message: data.message, phone: data.phone, title: data.projectType }
  await sendContactNotificationViaEmailJS(emailJsData)
  await sendAutoReplyViaEmailJS(emailJsData).catch((err) => {
    console.error("[mail] EmailJS auto-reply failed (notification still sent):", err)
  })
  await persistContactEverywhere(data)
}

export async function sendNewsletterMail(email: string): Promise<void> {
  if (!isEmailJsConfigured()) {
    throw new Error("Set EMAILJS_SERVICE_ID, EMAILJS_CONTACT_TEMPLATE_ID, and EMAILJS_PUBLIC_KEY for mail.")
  }

  await sendContactNotificationViaEmailJS({
    name: "Newsletter signup",
    email,
    message: `New newsletter subscriber: ${email}`,
    title: "Newsletter signup",
  })
  await storeSubscriberDb(email).catch((err) => {
    console.error("[mail] MySQL subscriber store failed:", err)
  })
}