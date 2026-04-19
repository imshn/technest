export function estimateReadTime(content: string): string {
  const words = content.replace(/<[^>]+>/g, "").split(/\s+/).length
  return `${Math.max(1, Math.round(words / 200))} min read`
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80)
}

export function formatDate(d = new Date()): string {
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
}
