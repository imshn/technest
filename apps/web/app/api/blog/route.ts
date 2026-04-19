import { NextRequest, NextResponse } from "next/server"
import { getPosts, createPost, slugExists, generateSlug, estimateReadTime, formatDate } from "@/lib/blog-store"
import { isAuthorized } from "@/lib/auth"
import { handleOptions, withCors } from "@/lib/cors"
import type { BlogPost } from "@/lib/blog-store"

export async function OPTIONS(req: NextRequest) {
  return handleOptions(req)
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  if (searchParams.get("schema") === "1") {
    return withCors(NextResponse.json({
      description: "TechNest Blog API schema from VPS imshn.cloud",
      baseUrl: "https://imshn.cloud/api",
      auth: "Pass BLOG_API_KEY as x-api-key header on all write requests",
      endpoints: {
        "GET /blog": "List published posts",
        "GET /blog?status=all": "List all posts (requires x-api-key)",
        "GET /blog/[slug]": "Get full post by slug",
        "POST /blog": "Create post",
        "PUT /blog/[slug]": "Update post status",
        "DELETE /blog/[slug]": "Delete post",
      },
      schema: {
        create_post: {
          title: "string (required)",
          content: "markdown required",
          tag: "AI Automation|N8n|SaaS|Web Development|Automation|AI Strategy (required)",
          seoExcerpt: "string 150-160 chars",
          excerpt: "string ~100 chars for cards",
          author: "Shaan",
          status: "draft|published",
          date: "Month Date, Year",
          featuredImage: {
            url: "https://...",
            alt: "description",
          },
        },
        update_post: {
          status: "published",
        },
      },
      examplePayload: {
        title: "How AI Agents Are Replacing Manual Data Entry in 2025",
        seoExcerpt: "AI agents are automating manual data entry that costs businesses thousands per month. Here's how to implement the same system in under a week.",
        excerpt: "AI agents are automating manual data entry — architecture and ROI from real deployments.",
        tag: "AI Automation",
        author: "Shaan",
        date: "April 18, 2025",
        status: "draft",
        featuredImage: {
          url: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80",
          alt: "AI data entry automation workflow",
        },
        content: "Opening hook...\n\n## The Problem\n\nBody text...\n\n## The Solution\n\n...",
      },
    }), req)
  }

  const statusFilter = searchParams.get("status")
  if (statusFilter && statusFilter !== "published") {
    if (!isAuthorized(req)) {
      return withCors(NextResponse.json({ error: "Unauthorized" }, { status: 401 }), req)
    }
    const posts = await getPosts("all")
    const filtered = statusFilter === "all" ? posts : posts.filter((p) => p.status === statusFilter as "draft" | "published")
    return withCors(NextResponse.json({ posts: filtered }), req)
  }

  const posts = await getPosts("published")
  return withCors(NextResponse.json({ posts }), req)
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return withCors(
      NextResponse.json({ error: "Unauthorized. Pass BLOG_API_KEY as x-api-key header." }, { status: 401 }),
      req
    )
  }

  const body = await req.json()
  const {
    title, seoExcerpt, excerpt, tag, content,
    featuredImage, author = "Shaan", status = "draft",
    date, readTime, slug: customSlug,
  } = body

  if (!title || !content || !tag) {
    return withCors(
      NextResponse.json({ error: "Required: title, content, tag. See GET /api/blog?schema=1" }, { status: 400 }),
      req
    )
  }

  const slug = customSlug || generateSlug(title)
  if (await slugExists(slug)) {
    return withCors(
      NextResponse.json({ error: `Slug "${slug}" already exists. Pass a custom slug to override.` }, { status: 409 }),
      req
    )
  }

  const post: BlogPost = {
    slug,
    title,
    seoExcerpt: seoExcerpt || excerpt || "",
    excerpt: excerpt || seoExcerpt?.slice(0, 120) || "",
    tag,
    content,
    author,
    featuredImage: featuredImage || null,
    imageUrl: featuredImage?.url || null,
    imageAlt: featuredImage?.alt || title,
    status,
    date: date || formatDate(),
    readTime: readTime || estimateReadTime(content),
  }

  await createPost(post)

  return withCors(NextResponse.json(
    {
      success: true,
      post: { slug, title, status, date: post.date },
      urls: {
        view: `https://technestsolutions.in/blog/${slug}`,
        edit: `https://technestsolutions.in/admin/posts/${slug}`,
        api: `https://technestsolutions.in/api/blog/${slug}`,
      },
      next: status === "draft" ? `Call PUT /api/blog/${slug} with {"status":"published"} to go live.` : "Post is live.",
    },
    { status: 201 }
  ), req)
}
