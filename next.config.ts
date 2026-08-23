import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/Tisee747/tisee-portfolio-v2/**",
      },
    ],
  },
};

export default nextConfig;
