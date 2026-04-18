import { NextRequest, NextResponse } from "next/server"
import { getPost, updatePost, deletePost, estimateReadTime } from "@/lib/blog-store"
import { isAuthorized } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { handleOptions, withCors } from "@/lib/cors"

export async function OPTIONS(req: NextRequest) {
  return handleOptions(req)
}

export async function GET(req: NextRequest, props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const post = await getPost(slug)
  if (!post) return withCors(NextResponse.json({ error: "Not found" }, { status: 404 }), req)
  return withCors(NextResponse.json({ post }), req)
}

export async function PUT(req: NextRequest, props: { params: Promise<{ slug: string }> }) {
  if (!isAuthorized(req)) {
    return withCors(NextResponse.json({ error: "Unauthorized" }, { status: 401 }), req)
  }

  const { slug } = await props.params
  const body = await req.json()

  const existing = await getPost(slug)
  if (!existing) return withCors(NextResponse.json({ error: "Not found" }, { status: 404 }), req)

  const fields: Parameters<typeof updatePost>[1] = { ...body, slug: undefined }
  if (body.content && !body.readTime) {
    fields.readTime = estimateReadTime(body.content as string)
  }

  await updatePost(slug, fields)
  revalidatePath("/blog", "layout")
  revalidatePath("/", "layout")

  return withCors(NextResponse.json({
    success: true,
    post: { slug, title: body.title ?? existing.title, status: body.status ?? existing.status },
    url: `https://technestsolutions.in/blog/${slug}`,
  }), req)
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ slug: string }> }) {
  if (!isAuthorized(req)) {
    return withCors(NextResponse.json({ error: "Unauthorized" }, { status: 401 }), req)
  }

  const { slug } = await props.params
  const deleted = await deletePost(slug)
  if (!deleted) return withCors(NextResponse.json({ error: "Not found" }, { status: 404 }), req)
  revalidatePath("/blog", "layout")

  return withCors(NextResponse.json({ success: true, deleted: slug }), req)
}
