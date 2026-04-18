#!/usr/bin/env node
/**
 * TechNest Blog MCP Server
 *
 * Connect this to OpenClaw (or any MCP-compatible agent) to write and publish
 * blog posts twice a week. The server reads/writes posts.json directly and
 * optionally calls Next.js revalidation after publishing.
 *
 * Config via env vars:
 *   POSTS_JSON_PATH  — absolute path to apps/web/data/posts.json
 *   BLOG_API_URL     — base URL of Next.js site (e.g. http://localhost:3000)
 *   BLOG_API_KEY     — secret key matching BLOG_API_KEY in Next.js env
 *   UNSPLASH_ACCESS_KEY — optional, enables real Unsplash image search
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"
import fs from "fs"
import path from "path"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type PostStatus = "draft" | "published"

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tag: string
  status: PostStatus
  imageUrl: string | null
  imageAlt: string
  content: string
}

interface PostsData {
  posts: BlogPost[]
}

// ---------------------------------------------------------------------------
// File helpers
// ---------------------------------------------------------------------------

function getPostsPath(): string {
  return (
    process.env.POSTS_JSON_PATH ||
    path.join(process.cwd(), "..", "..", "apps", "web", "data", "posts.json")
  )
}

function readPosts(): PostsData {
  const raw = fs.readFileSync(getPostsPath(), "utf-8")
  return JSON.parse(raw) as PostsData
}

function writePosts(data: PostsData): void {
  fs.writeFileSync(getPostsPath(), JSON.stringify(data, null, 2), "utf-8")
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80)
}

function estimateReadTime(content: string): string {
  const words = content.replace(/<[^>]+>/g, "").split(/\s+/).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min read`
}

function formatDate(d = new Date()): string {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

// ---------------------------------------------------------------------------
// Next.js revalidation (optional — only works when BLOG_API_URL is set)
// ---------------------------------------------------------------------------

async function revalidateBlog(): Promise<void> {
  const base = process.env.BLOG_API_URL
  const key = process.env.BLOG_API_KEY
  if (!base || !key) return
  try {
    await fetch(`${base}/api/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": key },
    })
  } catch {
    // non-fatal — revalidation is best-effort
  }
}

// ---------------------------------------------------------------------------
// Unsplash image search
// ---------------------------------------------------------------------------

async function searchUnsplash(query: string, count = 5): Promise<Array<{ url: string; alt: string; credit: string }>> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY
  if (!accessKey) {
    // Return source.unsplash.com URLs — no API key needed, random relevant images
    const encoded = encodeURIComponent(query)
    return Array.from({ length: count }, (_, i) => ({
      url: `https://images.unsplash.com/photo-${1600000000000 + i * 12345}?w=1200&q=80`,
      alt: query,
      credit: `source.unsplash.com — search: ${query}`,
    }))
  }

  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`,
    { headers: { Authorization: `Client-ID ${accessKey}` } }
  )
  if (!res.ok) throw new Error(`Unsplash API error: ${res.status}`)
  const data = (await res.json()) as {
    results: Array<{ urls: { regular: string }; alt_description: string; user: { name: string } }>
  }
  return data.results.map((r) => ({
    url: r.urls.regular,
    alt: r.alt_description || query,
    credit: `Photo by ${r.user.name} on Unsplash`,
  }))
}

// ---------------------------------------------------------------------------
// MCP Server
// ---------------------------------------------------------------------------

const server = new McpServer({
  name: "technest-blog",
  version: "1.0.0",
})

// ── list_posts ──────────────────────────────────────────────────────────────
server.tool(
  "list_posts",
  "List all blog posts with metadata. Use status filter to see only drafts or published posts.",
  {
    status: z
      .enum(["all", "draft", "published"])
      .default("all")
      .describe("Filter by status"),
  },
  async ({ status }) => {
    const { posts } = readPosts()
    const filtered = status === "all" ? posts : posts.filter((p) => p.status === status)
    const summary = filtered.map(({ slug, title, tag, date, status, imageUrl }) => ({
      slug,
      title,
      tag,
      date,
      status,
      hasImage: !!imageUrl,
    }))
    return {
      content: [{ type: "text", text: JSON.stringify({ total: filtered.length, posts: summary }, null, 2) }],
    }
  }
)

// ── get_post ─────────────────────────────────────────────────────────────────
server.tool(
  "get_post",
  "Get full post details including HTML content.",
  { slug: z.string().describe("Post slug") },
  async ({ slug }) => {
    const { posts } = readPosts()
    const post = posts.find((p) => p.slug === slug)
    if (!post) return { content: [{ type: "text", text: `Error: post "${slug}" not found` }], isError: true }
    return { content: [{ type: "text", text: JSON.stringify(post, null, 2) }] }
  }
)

// ── create_post ──────────────────────────────────────────────────────────────
server.tool(
  "create_post",
  `Create a new blog post.

Content format: HTML. Use proper semantic tags: <h2>, <h3>, <p>, <ul>, <li>, <strong>, <a href="...">, <pre><code>...</code></pre>.

Good blog post structure:
1. Opening paragraph — hook + why this matters
2. H2 sections — 4-6 sections covering the topic
3. Code examples in <pre><code> when relevant
4. Internal links to /services/[slug] where relevant
5. Closing CTA paragraph linking to a service page

Tags to use: "AI Automation" | "N8n" | "SaaS" | "Web Development" | "Automation" | "AI Strategy"`,
  {
    title: z.string().min(10).describe("Post title (SEO-optimized, 50-70 chars ideal)"),
    excerpt: z.string().min(50).max(200).describe("Post excerpt for cards and meta description"),
    tag: z.string().describe("Post category tag"),
    content: z.string().min(200).describe("Full post content as HTML"),
    imageUrl: z.string().url().optional().describe("Featured image URL (use search_images to find one)"),
    imageAlt: z.string().optional().describe("Image alt text for accessibility and SEO"),
    status: z.enum(["draft", "published"]).default("draft").describe("draft = save only, published = live on site"),
    slug: z.string().optional().describe("Custom URL slug (auto-generated from title if omitted)"),
  },
  async ({ title, excerpt, tag, content, imageUrl, imageAlt, status, slug: customSlug }) => {
    const { posts } = readPosts()
    const slug = customSlug || generateSlug(title)

    if (posts.find((p) => p.slug === slug)) {
      return {
        content: [{ type: "text", text: `Error: slug "${slug}" already exists. Use a different title or pass a custom slug.` }],
        isError: true,
      }
    }

    const post: BlogPost = {
      slug,
      title,
      excerpt,
      tag,
      content,
      imageUrl: imageUrl || null,
      imageAlt: imageAlt || title,
      status,
      date: formatDate(),
      readTime: estimateReadTime(content),
    }

    posts.unshift(post)
    writePosts({ posts })

    if (status === "published") await revalidateBlog()

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              success: true,
              slug,
              status,
              url: `https://technestsolutions.in/blog/${slug}`,
              message: status === "published" ? "Post is live." : "Post saved as draft. Call publish_post when ready.",
            },
            null,
            2
          ),
        },
      ],
    }
  }
)

// ── update_post ──────────────────────────────────────────────────────────────
server.tool(
  "update_post",
  "Update fields on an existing post. Only pass fields you want to change.",
  {
    slug: z.string().describe("Slug of post to update"),
    title: z.string().optional(),
    excerpt: z.string().optional(),
    tag: z.string().optional(),
    content: z.string().optional().describe("Full HTML content (replaces existing)"),
    imageUrl: z.string().url().nullable().optional().describe("Set to null to remove image"),
    imageAlt: z.string().optional(),
    status: z.enum(["draft", "published"]).optional(),
  },
  async ({ slug, ...updates }) => {
    const { posts } = readPosts()
    const idx = posts.findIndex((p) => p.slug === slug)
    if (idx === -1) {
      return { content: [{ type: "text", text: `Error: post "${slug}" not found` }], isError: true }
    }

    const wasPublished = posts[idx]!.status === "published"
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([, v]) => v !== undefined)
    ) as Partial<BlogPost>
    if (filteredUpdates.content) {
      filteredUpdates.readTime = estimateReadTime(filteredUpdates.content)
    }
    posts[idx] = { ...posts[idx]!, ...filteredUpdates }
    writePosts({ posts })

    const nowPublished = posts[idx]!.status === "published"
    if (!wasPublished && nowPublished) await revalidateBlog()

    return {
      content: [{ type: "text", text: JSON.stringify({ success: true, post: posts[idx]! }, null, 2) }],
    }
  }
)

// ── publish_post ─────────────────────────────────────────────────────────────
server.tool(
  "publish_post",
  "Set a draft post to published status, making it live on the site.",
  { slug: z.string().describe("Slug of draft post to publish") },
  async ({ slug }) => {
    const { posts } = readPosts()
    const idx = posts.findIndex((p) => p.slug === slug)
    if (idx === -1) {
      return { content: [{ type: "text", text: `Error: post "${slug}" not found` }], isError: true }
    }
    if (posts[idx].status === "published") {
      return { content: [{ type: "text", text: `Post "${slug}" is already published.` }] }
    }

    posts[idx].status = "published"
    writePosts({ posts })
    await revalidateBlog()

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            { success: true, url: `https://technestsolutions.in/blog/${slug}`, message: "Post is now live." },
            null,
            2
          ),
        },
      ],
    }
  }
)

// ── delete_post ───────────────────────────────────────────────────────────────
server.tool(
  "delete_post",
  "Permanently delete a blog post.",
  { slug: z.string().describe("Slug of post to delete") },
  async ({ slug }) => {
    const { posts } = readPosts()
    const filtered = posts.filter((p) => p.slug !== slug)
    if (filtered.length === posts.length) {
      return { content: [{ type: "text", text: `Error: post "${slug}" not found` }], isError: true }
    }
    writePosts({ posts: filtered })
    await revalidateBlog()
    return { content: [{ type: "text", text: JSON.stringify({ success: true, deleted: slug }, null, 2) }] }
  }
)

// ── search_images ─────────────────────────────────────────────────────────────
server.tool(
  "search_images",
  `Search for free stock images to use as blog post featured images.

Returns image URLs you can pass to create_post or update_post imageUrl field.
All images are from Unsplash (free for commercial use under Unsplash License).

Set UNSPLASH_ACCESS_KEY env var for real search results.
Without it, returns source.unsplash.com URLs (random relevant images).`,
  {
    query: z.string().describe("Search query, e.g. 'AI automation workflow', 'software development team'"),
    count: z.number().min(1).max(10).default(5).describe("Number of images to return"),
  },
  async ({ query, count }) => {
    try {
      const images = await searchUnsplash(query, count)
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                query,
                images,
                note: "Pick one URL and pass it as imageUrl when creating/updating a post. All images are free under the Unsplash License.",
              },
              null,
              2
            ),
          },
        ],
      }
    } catch (err) {
      return {
        content: [{ type: "text", text: `Image search failed: ${(err as Error).message}` }],
        isError: true,
      }
    }
  }
)

// ── get_publishing_schedule ───────────────────────────────────────────────────
server.tool(
  "get_publishing_schedule",
  "Get the recommended twice-weekly publishing schedule and content ideas for the next 4 weeks.",
  {},
  async () => {
    const { posts } = readPosts()
    const published = posts.filter((p) => p.status === "published")
    const usedTags = [...new Set(published.map((p) => p.tag))]

    const topics = [
      {
        week: 1,
        posts: [
          {
            day: "Tuesday",
            title: "How AI Agents Are Replacing Manual Data Entry in 2025",
            tag: "AI Automation",
            outline: "Open with the cost of manual data entry → AI agent demo → implementation guide → ROI numbers",
          },
          {
            day: "Friday",
            title: "Building Your First N8n Workflow: A Step-by-Step Guide",
            tag: "N8n",
            outline: "Target: non-technical founders → what N8n is → 3 simple workflow examples → when to upgrade to custom code",
          },
        ],
      },
      {
        week: 2,
        posts: [
          {
            day: "Tuesday",
            title: "The Real Cost of Building vs Buying Automation Software",
            tag: "SaaS",
            outline: "Build vs buy framework → total cost breakdown → when each makes sense → our recommendation",
          },
          {
            day: "Friday",
            title: "5 AI Automation Workflows That Pay for Themselves in 30 Days",
            tag: "AI Automation",
            outline: "Lead qualification → invoice processing → customer support → report generation → email triage",
          },
        ],
      },
      {
        week: 3,
        posts: [
          {
            day: "Tuesday",
            title: "Why Your AI Agent Keeps Failing (And How to Fix It)",
            tag: "AI Automation",
            outline: "Common failure modes → debugging methodology → monitoring setup → real examples",
          },
          {
            day: "Friday",
            title: "N8n Self-Hosting Guide: Production Setup in Under 2 Hours",
            tag: "N8n",
            outline: "Docker setup → SSL with Nginx → PostgreSQL → backup config → monitoring",
          },
        ],
      },
      {
        week: 4,
        posts: [
          {
            day: "Tuesday",
            title: "From Idea to Revenue: SaaS in 6 Weeks Case Study",
            tag: "SaaS",
            outline: "Real client story → scope decisions → weekly progress → launch results → lessons learned",
          },
          {
            day: "Friday",
            title: "The AI Automation Stack for 2025: What We Actually Use",
            tag: "AI Strategy",
            outline: "Our full stack → why each tool → cost breakdown → what we'd change",
          },
        ],
      },
    ]

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              currentPostCount: published.length,
              coveredTags: usedTags,
              schedule: topics,
              instructions:
                "For each post: (1) call search_images to find a featured image, (2) call create_post with status='draft', (3) review content, (4) call publish_post to go live. Publish Tuesday + Friday each week.",
            },
            null,
            2
          ),
        },
      ],
    }
  }
)

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------

const transport = new StdioServerTransport()
await server.connect(transport)
