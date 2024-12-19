import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/old-route',
        destination: '/new-route',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/custom-route',
        destination: '/another-route',
      },
    ];
  },
  images: {
    domains: ['i.pinimg.com','wallpaperaccess.com','ak.picdn.net','s3.amazonaws.com'],
  },
};

export default nextConfig;
