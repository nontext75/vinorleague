import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/shop",
        destination: "/characters",
        permanent: true,
      },
      {
        source: "/shop/:path*",
        destination: "/characters",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
