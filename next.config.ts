import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },

  // ✅ Explicitly define Webpack config
  // If this exists, Next.js 15 will switch to Webpack automatically
  webpack: (config, { isServer }) => {
    console.log("🧱 Using Webpack for build...");
    return config;
  },

  // ✅ DO NOT include any turbopack property
  // Leaving it out completely forces Webpack fallback
};

export default nextConfig;
