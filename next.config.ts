import type { NextConfig } from "next";

const isPagesEnv = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isPagesEnv ? "/worknote-app" : "",
  assetPrefix: isPagesEnv ? "/worknote-app/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
