import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/superpowers-claude",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
