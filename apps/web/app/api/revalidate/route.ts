import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { isAuthorized } from "@/lib/auth"

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  revalidatePath("/blog", "layout")
  revalidatePath("/", "layout")

  return NextResponse.json({ revalidated: true })
}
