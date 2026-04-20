"use client"

import { useScrollDepthTracking, useEngagementTracking } from "@/components/analytics"

export function EngagementTracker() {
  useScrollDepthTracking()
  useEngagementTracking()
  return null
}
