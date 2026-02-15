import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    remotePatterns: [new URL('https://images.openfoodfacts.org/images/products/615/400/005/4151/front_en.9.400.jpg')],
  },
};

export default nextConfig;
