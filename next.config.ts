import type { NextConfig } from 'next';
const config: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/images/**' }],
  },
};
export default config;
