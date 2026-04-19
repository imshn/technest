"use client"

import { useState } from "react"
import { RiArrowRightLine, RiCheckLine, RiLoaderLine } from "@remixicon/react"

type Status = "idle" | "loading" | "success" | "error"

const projectTypes = [
  "AI / Multi-Agent System",
  "Workflow Automation (N8n / Make)",
  "SaaS / Web App Development",
  "Mobile App Development",
  "Digital Marketing & SEO",
  "Something else",
]

const budgets = [
  "Under $5k",
  "$5k – $15k",
  "$15k – $50k",
  "$50k+",
  "Not sure yet",
]

export function ContactPageForm() {
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
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      projectType: (form.elements.namedItem("projectType") as HTMLSelectElement).value,
      budget: (form.elements.namedItem("budget") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus("success")
    } catch {
      setStatus("error")
      setError("Something went wrong. Please try again.")
    }
  }

  const inputBase = "w-full rounded-xl border border-zinc-700/70 bg-zinc-800/50 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/15 transition-all duration-200"

  if (status === "success") {
    return (
      <div
        className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 flex flex-col items-start gap-6 min-h-[520px] justify-center"
        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 1px rgba(0,0,0,0.2)" }}
      >
        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
          <RiCheckLine size={26} />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-semibold tracking-tight text-white">Brief received.</p>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-[38ch]">
            We&apos;ll read through it and reply within 24 hours with follow-up questions or a rough scope.
          </p>
        </div>
        <div className="flex flex-col gap-2.5 text-sm text-zinc-500">
          <p>In the meantime:</p>
          <a href="/blog" className="text-zinc-300 hover:text-white transition-colors underline underline-offset-4 decoration-zinc-700">
            Read how we approach AI automation projects
          </a>
          <a href="/services" className="text-zinc-300 hover:text-white transition-colors underline underline-offset-4 decoration-zinc-700">
            Browse our full list of services
          </a>
        </div>
      </div>
    )
  }

  return (
    <div
      className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 md:p-10"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 1px rgba(0,0,0,0.2)" }}
    >
      <div className="flex flex-col gap-1.5 mb-8">
        <p className="text-lg font-semibold text-white tracking-tight">Send a project brief</p>
        <p className="text-sm text-zinc-500">The more detail you share, the faster we can scope it.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* Name + Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="cpf-name" className="text-xs font-medium text-zinc-400">Full name <span className="text-primary">*</span></label>
            <input id="cpf-name" name="name" type="text" required placeholder="Shaan Khan" className={inputBase} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="cpf-company" className="text-xs font-medium text-zinc-400">Company <span className="text-zinc-600">(optional)</span></label>
            <input id="cpf-company" name="company" type="text" placeholder="Acme Corp" className={inputBase} />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cpf-email" className="text-xs font-medium text-zinc-400">Work email <span className="text-primary">*</span></label>
          <input id="cpf-email" name="email" type="email" required placeholder="you@company.com" className={inputBase} />
        </div>

        {/* Type + Budget */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="cpf-type" className="text-xs font-medium text-zinc-400">Project type <span className="text-primary">*</span></label>
            <select
              id="cpf-type"
              name="projectType"
              required
              defaultValue=""
              className={`${inputBase} appearance-none`}
            >
              <option value="" disabled>Select one</option>
              {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="cpf-budget" className="text-xs font-medium text-zinc-400">Budget range</label>
            <select
              id="cpf-budget"
              name="budget"
              defaultValue=""
              className={`${inputBase} appearance-none`}
            >
              <option value="" disabled>Select range</option>
              {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cpf-message" className="text-xs font-medium text-zinc-400">
            Describe what you need <span className="text-primary">*</span>
          </label>
          <textarea
            id="cpf-message"
            name="message"
            required
            rows={4}
            placeholder="What manual process are you trying to automate? What's the current pain? What does success look like?"
            className={`${inputBase} resize-none leading-relaxed`}
          />
          <p className="text-xs text-zinc-600">The more context, the better our first reply.</p>
        </div>

        {error && (
          <p className="text-xs text-red-400 rounded-lg border border-red-900/40 bg-red-950/30 px-4 py-2.5">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-white hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50 transition-all duration-150"
          style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.1) inset, 0 4px 16px -4px rgba(255,48,79,0.35)" }}
        >
          {status === "loading"
            ? <><RiLoaderLine size={16} className="animate-spin" /> Sending…</>
            : <><span>Send project brief</span><RiArrowRightLine size={15} /></>
          }
        </button>

        <p className="text-xs text-zinc-600 text-center">No spam · No commitment · Reply within 24 hours</p>
      </form>
    </div>
  )
}
