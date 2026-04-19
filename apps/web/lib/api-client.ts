/**
 * Secure API bridge client — server-side only.
 * Never import this in a Client Component or use NEXT_PUBLIC_ env vars here.
 */
import { estimateReadTime } from "./blog-store-utils"

// ── Types ─────────────────────────────────────────────────────────────────────

export interface FeaturedImage {
  url: string
  alt: string
}

export interface Post {
  slug: string
  title: string
  seoExcerpt: string
  excerpt: string
  content: string
  tag: string
  author: string
  status: "draft" | "published"
  date: string
  readTime: string
  featuredImage: FeaturedImage | null
  imageUrl: string | null
  imageAlt: string
}

// Shape the API actually sends back (snake_case from MariaDB)
interface ApiPostRow {
  id: number
  slug: string
  title: string
  seo_excerpt: string
  excerpt: string
  content: string
  tag: string
  author: string
  status: "draft" | "published"
  date: string
  featured_image_url: string | null
  featured_image_alt: string
  created_at: string
}

// Shape for POST/PUT request body (what the server expects)
export interface PostData {
  title: string
  content: string
  tag: string
  seoExcerpt?: string
  excerpt?: string
  author?: string
  status?: "draft" | "published"
  date?: string
  slug?: string
  featuredImage?: { url: string; alt: string }
}

// ── Row → Post mapper ─────────────────────────────────────────────────────────

function rowToPost(r: ApiPostRow): Post {
  const hasImage = Boolean(r.featured_image_url)
  return {
    slug: r.slug,
    title: r.title,
    seoExcerpt: r.seo_excerpt ?? "",
    excerpt: r.excerpt ?? "",
    content: r.content ?? "",
    tag: r.tag,
    author: r.author,
    status: r.status,
    date: r.date,
    readTime: estimateReadTime(r.content ?? ""),
    featuredImage: hasImage
      ? { url: r.featured_image_url!, alt: r.featured_image_alt ?? "" }
      : null,
    imageUrl: r.featured_image_url || null,
    imageAlt: r.featured_image_alt ?? "",
  }
}

// ── Core fetch wrapper ────────────────────────────────────────────────────────

function baseUrl(): string {
  const url = process.env.API_BASE_URL
  if (!url) throw new Error("API_BASE_URL is not set in environment variables.")
  return url.replace(/\/$/, "")
}

function apiKey(): string {
  const key = process.env.BLOG_API_KEY
  if (!key) throw new Error("BLOG_API_KEY is not set in environment variables.")
  return key
}

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${baseUrl()}${path}`
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey(),
      ...options.headers,
    },
    cache: options.method && options.method !== "GET" ? "no-store" : undefined,
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`API ${options.method ?? "GET"} ${url} failed (${res.status}): ${body}`)
  }

  return res.json() as Promise<T>
}

// Serialize PostData for the API — converts null featuredImage to { url:"", alt:"" }
function serializePost(data: Partial<PostData>): Record<string, unknown> {
  const { featuredImage, ...rest } = data
  return {
    ...rest,
    featuredImage: featuredImage ?? { url: "", alt: "" },
  }
}

// ── Blog methods ──────────────────────────────────────────────────────────────

export async function getPosts(status?: "all" | "published"): Promise<Post[]> {
  const query = status === "all" ? "?status=all" : ""
  const response = await apiFetch<ApiPostRow[] | { data: ApiPostRow[] }>(`/blog${query}`)
  const rows = Array.isArray(response) ? response : (response.data ?? [])
  return rows.map(rowToPost)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const row = await apiFetch<ApiPostRow>(`/blog/${slug}`)
    return rowToPost(row)
  } catch (err) {
    if (err instanceof Error && err.message.includes("(404)")) return null
    throw err
  }
}

export async function createPost(data: PostData): Promise<{ slug: string }> {
  return apiFetch<{ message: string; id: number; slug: string }>("/blog", {
    method: "POST",
    body: JSON.stringify(serializePost(data)),
  })
}

export async function updatePost(slug: string, data: Partial<PostData>): Promise<void> {
  await apiFetch<{ message: string }>(`/blog/${slug}`, {
    method: "PUT",
    body: JSON.stringify(serializePost(data)),
  })
}

export async function deletePost(slug: string): Promise<boolean> {
  await apiFetch<{ message: string }>(`/blog/${slug}`, { method: "DELETE" })
  return true
}

// ── Newsletter ────────────────────────────────────────────────────────────────

export async function subscribeEmail(email: string): Promise<void> {
  await apiFetch<{ success: boolean }>("/newsletter", {
    method: "POST",
    body: JSON.stringify({ email, source: "technest_newsletter" }),
  })
}
