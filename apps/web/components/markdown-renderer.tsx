"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeSanitize from "rehype-sanitize"
import type { Components } from "react-markdown"
import { CalendlyButton } from "@/components/calendly-button"

const IMSHN_URL_RE = /https?:\/\/(?:www\.)?imshn\.cloud\/?/gi
const AI_ENGINE_BYLINE_RE =
  /Published\s+by\s+the\s+(?:\\?\[)?TechNest\s+Solutions(?:\s+AI\s+Engine)?(?:\\?\])?(?:\\?\(\\?\/?\\?\))?\.?/gi

function sanitizeBlogContent(content: string) {
  return content
    .replace(AI_ENGINE_BYLINE_RE, "Published by the TechNest Solutions.")
    .replace(
      /\\?\[([^\]\n]*?)TechNest\s+Solutions([^\]\n]*?)\\?\]\\?\(\\?\/?\\?\)/gi,
      "$1[TechNest Solutions](/)$2"
    )
    .replace(
      /\[([^\]]*?)TechNest\s+Solutions([^\]]*?)\]\(\s*https?:\/\/(?:www\.)?imshn\.cloud\/?\s*\)/gi,
      "$1[TechNest Solutions](/)$2"
    )
    .replace(/\]\(\s*https?:\/\/(?:www\.)?imshn\.cloud\/?\s*\)/gi, "](/)")
    .replace(IMSHN_URL_RE, "")
}

function textFromChildren(children: React.ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children)
  if (Array.isArray(children)) return children.map(textFromChildren).join("")
  return ""
}

const components: Components = {
  // Headings
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold tracking-tight text-foreground mt-10 mb-4 leading-tight">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold tracking-tight text-foreground mt-14 mb-4 pb-2 border-b border-border/30">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-bold tracking-tight text-foreground mt-10 mb-3">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg font-semibold text-foreground mt-8 mb-2">{children}</h4>
  ),

  // Body
  p: ({ children }) => (
    <p className="text-foreground/80 leading-[1.78] my-6 text-lg">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-foreground/75">{children}</em>
  ),

  // Lists
  ul: ({ children }) => (
    <ul className="my-6 pl-6 space-y-2 list-disc marker:text-primary/60">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-6 pl-6 space-y-2 list-decimal marker:text-primary/60 marker:font-medium">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-foreground/80 leading-[1.78] text-lg pl-1">{children}</li>
  ),

  // Links
  a: ({ href, children }) => {
    const label = textFromChildren(children).trim()
    const shouldBookMeeting = label === "TechNest Solutions" && (!href || href === "/" || IMSHN_URL_RE.test(href))
    IMSHN_URL_RE.lastIndex = 0

    if (shouldBookMeeting) {
      return (
        <CalendlyButton
          label="TechNest Solutions"
          variant="ghost"
          trackAs="blog_technest_solutions_link_clicked"
          className="inline text-lg font-medium text-primary border-b border-primary/40 hover:border-primary"
        />
      )
    }

    return (
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-primary font-medium border-b border-primary/40 hover:border-primary transition-colors duration-150 no-underline"
      >
        {children}
      </a>
    )
  },

  // Blockquote
  blockquote: ({ children }) => (
    <blockquote className="border-l-[3px] border-primary bg-primary/5 px-6 py-5 rounded-r-xl my-10 text-foreground/85 font-medium text-lg leading-[1.78]">
      {children}
    </blockquote>
  ),

  // Code
  code: ({ className, children, ...props }) => {
    const isBlock = className?.includes("language-")
    if (isBlock) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      )
    }
    return (
      <code className="bg-muted/70 text-foreground px-1.5 py-0.5 rounded-md text-[0.875em] font-mono">
        {children}
      </code>
    )
  },
  pre: ({ children }) => (
    <pre className="bg-zinc-950 border border-border/60 rounded-xl my-8 p-5 overflow-x-auto text-sm leading-relaxed">
      {children}
    </pre>
  ),

  // Media
  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt}
      className="rounded-2xl border border-border/60 shadow-md my-10 w-full object-cover"
      loading="lazy"
    />
  ),

  // Divider
  hr: () => <hr className="border-border/30 my-12" />,

  // GFM: tables
  table: ({ children }) => (
    <div className="my-8 overflow-x-auto rounded-xl border border-border/60">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-muted/40 text-foreground font-semibold">{children}</thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-border/40 text-foreground/80">{children}</tbody>
  ),
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children }) => (
    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
      {children}
    </th>
  ),
  td: ({ children }) => <td className="px-4 py-3 leading-relaxed">{children}</td>,
}

type Props = {
  content: string
}

export function MarkdownRenderer({ content }: Props) {
  const sanitizedContent = sanitizeBlogContent(content)

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSanitize]}
      components={components}
    >
      {sanitizedContent}
    </ReactMarkdown>
  )
}
