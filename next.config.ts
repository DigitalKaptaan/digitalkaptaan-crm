import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname, // ensures this directory is treated as the root
  },
  images: {
    // Example: allow images from specific domains
    domains: ["https://res.cloudinary.com"],

    // Example: enable remote patterns
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
