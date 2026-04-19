import { RiGithubLine, RiLinkedinBoxLine, RiInstagramLine } from "@remixicon/react"

const serviceLinks = [
  { label: "Multi-Agent AI Systems", href: "/services/multi-agent-ai-systems" },
  { label: "Agentic Workflows", href: "/services/agentic-workflows" },
  { label: "N8n Automation", href: "/services/n8n-workflow-automation" },
  { label: "SaaS Development", href: "/services/saas-platform-development" },
  { label: "Web App Development", href: "/services/web-app-development" },
  { label: "Mobile App Development", href: "/services/mobile-app-development" },
]

const compareLinks = [
  { label: "TechNest vs Upwork", href: "/compare/upwork" },
  { label: "TechNest vs Toptal", href: "/compare/toptal" },
  { label: "TechNest vs Fiverr", href: "/compare/fiverr" },
  { label: "TechNest vs Accenture", href: "/compare/accenture" },
  { label: "TechNest vs Freelancer", href: "/compare/freelancer" },
]

const companyLinks = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Results", href: "/#testimonials" },
  { label: "FAQ", href: "/#faq" },
  { label: "Blog", href: "/blog" },
  { label: "AI Automation Statistics", href: "/ai-automation-statistics" },
]

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="max-w-350 mx-auto px-6 md:px-10">
        <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[220px_1fr_1fr_1fr] gap-10">
          <div className="flex flex-col gap-4">
            <a href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7L5.5 3.5L9 7L12 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 10.5L5.5 7L9 10.5L12 7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
                </svg>
              </div>
              <span className="font-semibold text-[15px] tracking-tight text-foreground">TechNest</span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[28ch]">
              AI automation and software development for businesses that need to move faster.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                aria-label="GitHub"
              >
                <RiGithubLine size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                aria-label="LinkedIn"
              >
                <RiLinkedinBoxLine size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                aria-label="Instagram"
              >
                <RiInstagramLine size={18} />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold text-foreground tracking-wide uppercase">Services</p>
            <ul className="flex flex-col gap-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold text-foreground tracking-wide uppercase">Compare</p>
            <ul className="flex flex-col gap-2.5">
              {compareLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold text-foreground tracking-wide uppercase">Company</p>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} TechNest. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-150">Privacy Policy</a>
            <a href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-150">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
