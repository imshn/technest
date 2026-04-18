import {
  getPosts as apiGetPosts,
  getPostBySlug,
  createPost as apiCreatePost,
  updatePost as apiUpdatePost,
  deletePost as apiDeletePost,
} from "./api-client"
import type { Post, PostData } from "./api-client"
export { estimateReadTime, generateSlug, formatDate } from "./blog-store-utils"

export type BlogPost = Post
export type { PostData }

// ── Read ──────────────────────────────────────────────────────────────────────

export async function getPosts(status?: "published" | "all"): Promise<BlogPost[]> {
  try {
    return await apiGetPosts(status)
  } catch (err) {
    console.error("[blog-store] getPosts failed:", err)
    return []
  }
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    return await getPostBySlug(slug)
  } catch (err) {
    console.error("[blog-store] getPost failed:", err)
    return null
  }
}

// ── Write ─────────────────────────────────────────────────────────────────────

export async function createPost(post: BlogPost): Promise<void> {
  await apiCreatePost(post as PostData)
}

export async function updatePost(slug: string, fields: Partial<BlogPost>): Promise<void> {
  await apiUpdatePost(slug, fields as Partial<PostData>)
}

export async function deletePost(slug: string): Promise<boolean> {
  return apiDeletePost(slug)
}

export async function slugExists(slug: string): Promise<boolean> {
  const post = await getPostBySlug(slug)
  return post !== null
}
