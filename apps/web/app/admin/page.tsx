import { getPosts } from "@/lib/blog-store"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default async function AdminPage() {
  const posts = await getPosts("all")
  return <AdminDashboard posts={posts} />
}
