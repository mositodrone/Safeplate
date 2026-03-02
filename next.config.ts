import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.openfoodfacts.org',
        port: ''
      }
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

// remotePatterns: [new URL('https://images.openfoodfacts.org/images/')]

export default nextConfig;
