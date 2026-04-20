"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import CharacterCount from "@tiptap/extension-character-count"
import { marked } from "marked"
import { useState, useCallback, useEffect } from "react"

function markdownToHtml(md: string): string {
  if (!md) return ""
  if (md.trimStart().startsWith("<")) return md
  const result = marked.parse(md)
  return typeof result === "string" ? result : md
}
import { useRouter } from "next/navigation"
import type { BlogPost } from "@/lib/blog-store"
import {
  RiBold, RiItalic, RiH2, RiH3, RiListUnordered, RiListOrdered,
  RiCodeLine, RiCodeBlock, RiLink, RiImageLine, RiSeparator,
  RiArrowGoBackLine, RiArrowGoForwardLine, RiSave2Line, RiGlobalLine,
} from "@remixicon/react"

const TAGS = ["AI Automation", "N8n", "SaaS", "Web Development", "Automation", "AI Strategy"]

type RichTextMark = {
  type: string
  attrs?: Record<string, unknown>
}

type RichTextNode = {
  type?: string
  text?: string
  attrs?: Record<string, unknown>
  marks?: RichTextMark[]
  content?: RichTextNode[]
}

function escapeMarkdown(text: string) {
  return text.replace(new RegExp("[\\\\`*_{}\\[\\]()+#!>]", "g"), "\\$&")
}

function inlineMarkdown(nodes: RichTextNode[] = []): string {
  return nodes.map((node) => {
    if (node.type === "text") {
      let text = escapeMarkdown(node.text ?? "")
      for (const mark of node.marks ?? []) {
        if (mark.type === "code") text = `\`${text.replace(/`/g, "\\`")}\``
        if (mark.type === "bold") text = `**${text}**`
        if (mark.type === "italic") text = `*${text}*`
        if (mark.type === "link" && typeof mark.attrs?.href === "string") text = `[${text}](${mark.attrs.href})`
      }
      return text
    }
    if (node.type === "hardBreak") return "\n"
    if (node.type === "image" && typeof node.attrs?.src === "string") {
      const alt = typeof node.attrs.alt === "string" ? node.attrs.alt : ""
      return `![${escapeMarkdown(alt)}](${node.attrs.src})`
    }
    return inlineMarkdown(node.content)
  }).join("")
}

function blockMarkdown(node: RichTextNode, index = 0, listType?: "bullet" | "ordered"): string {
  const content = node.content ?? []

  switch (node.type) {
    case "heading": {
      const level = Number(node.attrs?.level ?? 2)
      return `${"#".repeat(Math.min(Math.max(level, 1), 6))} ${inlineMarkdown(content)}\n\n`
    }
    case "paragraph": {
      const text = inlineMarkdown(content).trim()
      return text ? `${text}\n\n` : ""
    }
    case "blockquote": {
      const quote = content.map((child) => blockMarkdown(child).trim()).filter(Boolean).join("\n\n")
      return `${quote.split("\n").map((line) => `> ${line}`).join("\n")}\n\n`
    }
    case "bulletList":
      return `${content.map((child, i) => blockMarkdown(child, i, "bullet").trim()).filter(Boolean).join("\n")}\n\n`
    case "orderedList":
      return `${content.map((child, i) => blockMarkdown(child, i, "ordered").trim()).filter(Boolean).join("\n")}\n\n`
    case "listItem": {
      const marker = listType === "ordered" ? `${index + 1}.` : "-"
      const text = content.map((child) => blockMarkdown(child).trim()).filter(Boolean).join("\n  ")
      return `${marker} ${text}`
    }
    case "codeBlock": {
      const language = typeof node.attrs?.language === "string" ? node.attrs.language : ""
      const code = content.map((child) => child.text ?? "").join("")
      return `\`\`\`${language}\n${code}\n\`\`\`\n\n`
    }
    case "horizontalRule":
      return "---\n\n"
    default:
      return inlineMarkdown(content)
  }
}

function editorJsonToMarkdown(doc: RichTextNode) {
  return (doc.content ?? []).map((node) => blockMarkdown(node)).join("").trim()
}

type Props = {
  post?: BlogPost | null
  mode: "new" | "edit"
}

export function PostEditor({ post, mode }: Props) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  const [title, setTitle] = useState(post?.title ?? "")
  const [seoExcerpt, setSeoExcerpt] = useState(post?.seoExcerpt ?? "")
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "")
  const [tag, setTag] = useState(post?.tag ?? TAGS[0]!)
  const [date, setDate] = useState(
    post?.date ?? new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
  )
  const [featuredImageUrl, setFeaturedImageUrl] = useState(post?.featuredImage?.url ?? post?.imageUrl ?? "")
  const [featuredImageAlt, setFeaturedImageAlt] = useState(post?.featuredImage?.alt ?? post?.imageAlt ?? "")
  const [imageSearch, setImageSearch] = useState("")

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer" } }),
      Placeholder.configure({ placeholder: "Start writing your post…" }),
      CharacterCount,
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "prose prose-sm md:prose-base prose-neutral dark:prose-invert max-w-none min-h-[400px] focus:outline-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-border/60 prose-img:rounded-xl",
      },
    },
  })

  // Load markdown content once editor is ready — setContent is reliable vs constructor prop
  useEffect(() => {
    if (editor && post?.content) {
      editor.commands.setContent(markdownToHtml(post.content))
    }
  }, [editor])

  // Insert image into editor content
  const insertImage = useCallback(() => {
    const url = prompt("Image URL:")
    const alt = prompt("Alt text (for SEO + accessibility):") ?? ""
    if (url) editor?.chain().focus().setImage({ src: url, alt }).run()
  }, [editor])

  // Insert link
  const setLink = useCallback(() => {
    const url = prompt("URL:")
    if (!url) { editor?.chain().focus().unsetLink().run(); return }
    editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }, [editor])

  async function handleSave(publish = false) {
    if (!title || !editor) return
    if (publish) {
      setPublishing(true)
    } else {
      setSaving(true)
    }
    setError("")

    const content = editorJsonToMarkdown(editor.getJSON() as RichTextNode)
    const slug = post?.slug
    if (!content) {
      setError("Content required")
      setSaving(false)
      setPublishing(false)
      return
    }

    const payload = {
      title,
      seoExcerpt,
      excerpt: excerpt || seoExcerpt.slice(0, 120),
      tag,
      author: "Shaan",
      date,
      content,
      status: publish ? "published" : "draft",
      ...(featuredImageUrl ? { featuredImage: { url: featuredImageUrl, alt: featuredImageAlt || title } } : {}),
    }

    const url = mode === "edit" && slug ? `/api/blog/${slug}` : "/api/blog"
    const method = mode === "edit" ? "PUT" : "POST"

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", "x-api-key": "" },
      body: JSON.stringify(payload),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || "Save failed")
      setSaving(false)
      setPublishing(false)
      return
    }

    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    setSaving(false)
    setPublishing(false)

    if (mode === "new" && data.post?.slug) {
      router.replace(`/admin/posts/${data.post.slug}`)
    }
    if (publish) {
      router.refresh()
    }
  }

  const wordCount = editor?.storage.characterCount.words() ?? 0

  return (
    <div className="min-h-dvh bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-border/60 bg-card/95 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <a href="/admin" className="text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0">
              ← Posts
            </a>
            <span className="text-border">·</span>
            <p className="text-sm font-medium text-foreground truncate">
              {mode === "new" ? "New post" : title || "Edit post"}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {saved && <span className="text-xs text-emerald-500">Saved</span>}
            {error && <span className="text-xs text-red-500">{error}</span>}
            <button
              onClick={() => handleSave(false)}
              disabled={saving || !title}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border border-border/70 bg-card text-xs font-medium text-foreground hover:bg-muted/50 disabled:opacity-50 transition-colors"
            >
              <RiSave2Line size={13} />
              {saving ? "Saving…" : "Save draft"}
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={publishing || !title}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              <RiGlobalLine size={13} />
              {publishing ? "Publishing…" : "Publish"}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">

        {/* Main editor column */}
        <div className="flex flex-col gap-6">

          {/* Title */}
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title (50–70 chars for SEO)"
              className="w-full text-2xl md:text-3xl font-semibold tracking-tight text-foreground bg-transparent border-0 outline-none placeholder:text-muted-foreground/50 py-2 border-b border-border/40 focus:border-primary/40 transition-colors"
            />
            <p className="text-xs text-muted-foreground mt-1.5">{title.length} chars{title.length > 70 ? " — too long for SEO" : title.length > 50 ? " — good" : " — aim for 50–70"}</p>
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap gap-1 p-2 rounded-xl border border-border/60 bg-card sticky top-[57px] z-10">
            <ToolbarBtn
              onClick={() => editor?.chain().focus().toggleBold().run()}
              active={editor?.isActive("bold")}
              title="Bold"
            ><RiBold size={14} /></ToolbarBtn>
            <ToolbarBtn
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              active={editor?.isActive("italic")}
              title="Italic"
            ><RiItalic size={14} /></ToolbarBtn>

            <div className="w-px h-6 bg-border/60 mx-0.5 self-center" />

            <ToolbarBtn
              onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
              active={editor?.isActive("heading", { level: 2 })}
              title="Heading 2"
            ><RiH2 size={14} /></ToolbarBtn>
            <ToolbarBtn
              onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
              active={editor?.isActive("heading", { level: 3 })}
              title="Heading 3"
            ><RiH3 size={14} /></ToolbarBtn>

            <div className="w-px h-6 bg-border/60 mx-0.5 self-center" />

            <ToolbarBtn
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              active={editor?.isActive("bulletList")}
              title="Bullet list"
            ><RiListUnordered size={14} /></ToolbarBtn>
            <ToolbarBtn
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              active={editor?.isActive("orderedList")}
              title="Numbered list"
            ><RiListOrdered size={14} /></ToolbarBtn>

            <div className="w-px h-6 bg-border/60 mx-0.5 self-center" />

            <ToolbarBtn onClick={() => editor?.chain().focus().toggleCode().run()} active={editor?.isActive("code")} title="Inline code">
              <RiCodeLine size={14} />
            </ToolbarBtn>
            <ToolbarBtn onClick={() => editor?.chain().focus().toggleCodeBlock().run()} active={editor?.isActive("codeBlock")} title="Code block">
              <RiCodeBlock size={14} />
            </ToolbarBtn>
            <ToolbarBtn onClick={setLink} active={editor?.isActive("link")} title="Link">
              <RiLink size={14} />
            </ToolbarBtn>
            <ToolbarBtn onClick={insertImage} title="Insert image">
              <RiImageLine size={14} />
            </ToolbarBtn>
            <ToolbarBtn onClick={() => editor?.chain().focus().setHorizontalRule().run()} title="Divider">
              <RiSeparator size={14} />
            </ToolbarBtn>

            <div className="w-px h-6 bg-border/60 mx-0.5 self-center" />

            <ToolbarBtn onClick={() => editor?.chain().focus().undo().run()} title="Undo">
              <RiArrowGoBackLine size={14} />
            </ToolbarBtn>
            <ToolbarBtn onClick={() => editor?.chain().focus().redo().run()} title="Redo">
              <RiArrowGoForwardLine size={14} />
            </ToolbarBtn>

            <div className="ml-auto flex items-center text-xs text-muted-foreground pr-1">
              {wordCount} words
            </div>
          </div>

          {/* Rich text editor */}
          <div className="rounded-xl border border-border/60 bg-card p-6 min-h-[500px]">
            <EditorContent editor={editor} />
          </div>
        </div>

        {/* Sidebar fields */}
        <div className="flex flex-col gap-5">

          {/* Status badge */}
          {post && (
            <div className={`text-xs px-3 py-2 rounded-lg font-medium text-center ${
              post.status === "published"
                ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
            }`}>
              {post.status === "published" ? "Live on site" : "Draft — not published"}
            </div>
          )}

          {/* Tag */}
          <SidebarField label="Category Tag">
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full h-9 px-3 rounded-lg border border-border/70 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
            >
              {TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </SidebarField>

          {/* Date */}
          <SidebarField label="Publish Date">
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Apr 18, 2025"
              className="w-full h-9 px-3 rounded-lg border border-border/70 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
            />
          </SidebarField>

          {/* Author (always Shaan) */}
          <SidebarField label="Author">
            <div className="flex items-center gap-2.5 h-9 px-3 rounded-lg border border-border/40 bg-muted/30">
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] font-semibold text-primary-foreground shrink-0">S</div>
              <span className="text-sm text-foreground">Shaan</span>
            </div>
          </SidebarField>

          {/* SEO Excerpt */}
          <SidebarField label="SEO Meta Description" hint="150–160 chars • shown in Google results">
            <textarea
              value={seoExcerpt}
              onChange={(e) => setSeoExcerpt(e.target.value)}
              placeholder="Describe this post for search engines and AI…"
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-border/70 bg-card text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
            />
            <p className={`text-xs mt-1 ${seoExcerpt.length > 160 ? "text-red-500" : seoExcerpt.length >= 140 ? "text-emerald-500" : "text-muted-foreground"}`}>
              {seoExcerpt.length} / 160
            </p>
          </SidebarField>

          {/* Card Excerpt */}
          <SidebarField label="Card Excerpt" hint="Shown on blog index cards (~100 chars)">
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Short summary for blog index cards…"
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-border/70 bg-card text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
            />
          </SidebarField>

          {/* Featured image */}
          <SidebarField label="Featured Image" hint="Shows at top of post and in social share cards">
            {featuredImageUrl && (
              <div className="rounded-lg overflow-hidden border border-border/60 mb-2 h-32">
                <img src={featuredImageUrl} alt={featuredImageAlt} className="w-full h-full object-cover" />
              </div>
            )}
            <input
              type="url"
              value={featuredImageUrl}
              onChange={(e) => setFeaturedImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/…"
              className="w-full h-9 px-3 rounded-lg border border-border/70 bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
            />
            <input
              type="text"
              value={featuredImageAlt}
              onChange={(e) => setFeaturedImageAlt(e.target.value)}
              placeholder="Alt text for SEO + accessibility"
              className="mt-2 w-full h-9 px-3 rounded-lg border border-border/70 bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
            />
          </SidebarField>

          {/* Unsplash quick search */}
          <SidebarField label="Find Free Images (Unsplash)">
            <div className="flex gap-2">
              <input
                type="text"
                value={imageSearch}
                onChange={(e) => setImageSearch(e.target.value)}
                placeholder="e.g. AI automation"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && imageSearch) {
                    window.open(`https://unsplash.com/s/photos/${encodeURIComponent(imageSearch)}`, "_blank")
                  }
                }}
                className="flex-1 h-9 px-3 rounded-lg border border-border/70 bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
              <a
                href={`https://unsplash.com/s/photos/${encodeURIComponent(imageSearch || "technology")}`}
                target="_blank"
                rel="noreferrer"
                className="h-9 px-3 rounded-lg border border-border/70 bg-card text-xs font-medium text-foreground hover:bg-muted/50 transition-colors flex items-center"
              >
                Search
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">
              Copy URL from Unsplash → paste in Featured Image above. Free commercial use.
            </p>
          </SidebarField>

          {/* Live URL */}
          {post?.status === "published" && post.slug && (
            <a
              href={`/blog/${post.slug}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-primary hover:text-primary/80 transition-colors"
            >
              View live post →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function ToolbarBtn({
  onClick,
  active,
  title,
  children,
}: {
  onClick?: () => void
  active?: boolean
  title?: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded-md transition-colors ${
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
      }`}
    >
      {children}
    </button>
  )
}

function SidebarField({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div>
        <p className="text-xs font-medium text-foreground">{label}</p>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
      {children}
    </div>
  )
}
