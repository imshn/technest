import { notFound } from "next/navigation"
import { getPost } from "@/lib/blog-store"
import { PostEditor } from "@/components/admin/post-editor"

export default async function EditPostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const post = await getPost(slug)
  if (!post) notFound()
  return <PostEditor mode="edit" post={post} />
}
