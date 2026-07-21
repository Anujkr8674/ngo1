import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    },
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "live4help.org",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "live4help.org",
        pathname: "/wp-content/cache/**",
      }
    ],
  },
};

export default nextConfig;
