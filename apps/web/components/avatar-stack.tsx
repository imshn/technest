const PALETTE: [string, string][] = [
  ["#6366f1", "#818cf8"],
  ["#8b5cf6", "#a78bfa"],
  ["#ec4899", "#f472b6"],
  ["#14b8a6", "#2dd4bf"],
  ["#f59e0b", "#fbbf24"],
]

function SvgAvatar({ index, size }: { index: number; size: number }) {
  const [from, to] = PALETTE[index % PALETTE.length]
  const id = `ag${index}`
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="16" fill={`url(#${id})`} />
      <circle cx="16" cy="13" r="5" fill="white" fillOpacity="0.85" />
      <ellipse cx="16" cy="27" rx="9" ry="7" fill="white" fillOpacity="0.85" />
    </svg>
  )
}

export function AvatarStack({ count, size = 32, className = "" }: { count: number; size?: number; className?: string }) {
  return (
    <div className={`flex -space-x-2 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="rounded-full border-2 border-background block overflow-hidden"
          style={{ width: size, height: size, zIndex: count - i }}
        >
          <SvgAvatar index={i} size={size} />
        </span>
      ))}
    </div>
  )
}
