import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'image.tmdb.org' },
      { protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '/**', }
    ]
  }
};

export default nextConfig;
