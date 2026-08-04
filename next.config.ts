import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/Portf-lio-novo",
  assetPrefix: "/Portf-lio-novo/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
