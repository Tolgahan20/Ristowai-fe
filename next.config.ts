import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Temporarily ignore ESLint during builds
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;
