import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname, // ensures this directory is treated as the root
  },
};

export default nextConfig;
