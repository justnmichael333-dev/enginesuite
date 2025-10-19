import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Completely disable ESLint during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Skip type-checking during build (Vercel-friendly)
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
