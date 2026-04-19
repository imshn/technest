"use client"

import { useState } from "react"
import { RiArrowRightLine, RiCheckLine, RiLoaderLine } from "@remixicon/react"

type Status = "idle" | "loading" | "success" | "error"

const projectTypes = [
  "AI / Multi-Agent System",
  "Workflow Automation (N8n)",
  "SaaS Development",
  "Web / Mobile App",
  "Digital Marketing",
  "Something else",
]

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setError("")

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      projectType: (form.elements.namedItem("projectType") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Failed")
      setStatus("success")
    } catch {
      setStatus("error")
      setError("Something went wrong. Email shaan@technestsolutions.in directly.")
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 flex flex-col items-center gap-4 text-center">
        <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center text-primary">
          <RiCheckLine size={22} />
        </div>
        <div>
          <p className="text-base font-semibold text-white mb-1">Message received</p>
          <p className="text-sm text-zinc-400">I&apos;ll reply within 24 hours.</p>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 flex flex-col gap-5"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
    >
      <div className="flex flex-col gap-2">
        <p className="text-base font-semibold text-white">Tell us about your project</p>
        <p className="text-sm text-zinc-400">No commitment — just a conversation.</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-name" className="text-xs font-medium text-zinc-400">Name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-email" className="text-xs font-medium text-zinc-400">Work email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              placeholder="you@company.com"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-type" className="text-xs font-medium text-zinc-400">What do you need?</label>
          <select
            id="contact-type"
            name="projectType"
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors appearance-none"
          >
            <option value="" disabled selected>Select a project type</option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-message" className="text-xs font-medium text-zinc-400">Brief description</label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={3}
            placeholder="What are you trying to automate or build?"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors resize-none"
          />
        </div>
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-60 transition-colors"
      >
        {status === "loading" ? (
          <RiLoaderLine size={16} className="animate-spin" />
        ) : (
          <>Send message <RiArrowRightLine size={15} /></>
        )}
      </button>

      <p className="text-xs text-zinc-500 text-center">Typically reply within 24 hours · No spam</p>
    </form>
  )
}
