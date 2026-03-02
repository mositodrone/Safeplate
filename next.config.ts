import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.openfoodfacts.org',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        port: ''
      }
    ]
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

// remotePatterns: [new URL('https://images.openfoodfacts.org/images/')]

export default nextConfig;
