/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    appIsrStatus: false, // Disables the "stale" indicator seen in your screenshot
    buildActivity: false,
  },
  turbo: { enabled: false },
  transpilePackages: ["@workspace/ui", "@splinetool/react-spline", "@splinetool/runtime"],
}

export default nextConfig
