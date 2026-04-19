"use client"

import { useState } from "react"
import { RiTwitterXLine, RiLinkedinBoxLine, RiLinksLine, RiCheckLine } from "@remixicon/react"

export function BlogShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false)

  const url = `https://technestsolutions.in/blog/${slug}`
  const encoded = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const copyLink = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground mr-1">Share</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-lg border border-border/60 bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border transition-all duration-150"
        aria-label="Share on X (Twitter)"
      >
        <RiTwitterXLine size={14} />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-lg border border-border/60 bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border transition-all duration-150"
        aria-label="Share on LinkedIn"
      >
        <RiLinkedinBoxLine size={14} />
      </a>
      <button
        onClick={copyLink}
        className="w-8 h-8 rounded-lg border border-border/60 bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border transition-all duration-150"
        aria-label="Copy link"
      >
        {copied ? <RiCheckLine size={14} className="text-primary" /> : <RiLinksLine size={14} />}
      </button>
    </div>
  )
}
