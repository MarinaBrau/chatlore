import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enhanced security headers for production hardening
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://chatlore.app; connect-src 'self' https://*.anthropic.com https://www.google-analytics.com; font-src 'self' data:;",
          },
        ],
      },
    ];
  },
  // Font optimization: ensure fonts are downloaded and cached
  optimizeFonts: true,
  // Environment-ready fallbacks for CI/Build
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
