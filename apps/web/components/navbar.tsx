"use client"

import { useState, useEffect } from "react"
import { RiMenuLine, RiCloseLine } from "@remixicon/react"
import { CalendlyButton } from "@/components/calendly-button"
import { cn } from "@workspace/ui/lib/utils"

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Results", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "top-0 bg-background/80 backdrop-blur-md border-b border-border/60 shadow-[0_1px_0_rgba(0,0,0,0.04)]"
          : "top-9.5 bg-transparent border-b border-t"
      )}
    >
      <div className="max-w-350 mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7L5.5 3.5L9 7L12 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 10.5L5.5 7L9 10.5L12 7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
            </svg>
          </div>
          <span className="font-semibold text-[15px] tracking-tight text-foreground">TechNest</span>
        </a>

        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 rounded-md hover:bg-muted/60"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">
            View Services
          </a>
          <CalendlyButton label="Book Free Call" variant="primary" trackAs="navbar_cta" className="py-2 px-4" />
        </div>

        <button
          className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <RiCloseLine size={20} /> : <RiMenuLine size={20} />}
        </button>
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 bg-background/95 backdrop-blur-md border-b border-border/60",
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="max-w-350 mx-auto px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/60"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 mt-2 border-t border-border/60">
            <CalendlyButton label="Book a Free 30-min Call" variant="primary" trackAs="navbar_mobile_cta" className="w-full justify-center" />
          </div>
        </nav>
      </div>
    </header>
  )
}
