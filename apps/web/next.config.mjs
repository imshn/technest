/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
  transpilePackages: ["@workspace/ui", "@splinetool/react-spline", "@splinetool/runtime"],

  // Compress responses
  compress: true,

  // Security + performance headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Clickjacking protection
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Prevent MIME sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // XSS filter (legacy browsers)
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // Referrer for analytics while protecting privacy
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Restrict browser features
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
          },
          // HTTPS enforcement (1 year, include subdomains)
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          // DNS prefetch for third-party origins
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
      // Long-cache for static assets
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache public assets (images, fonts, etc.)
      {
        source: "/(.*)\\.(ico|png|jpg|jpeg|svg|webp|woff|woff2|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ]
  },

  // Redirect www → naked domain (Vercel also handles this but belt-and-suspenders)
  async redirects() {
    return [
      {
        source: "/(.*)",
        has: [{ type: "host", value: "www.technestsolutions.in" }],
        destination: "https://technestsolutions.in/:path*",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
