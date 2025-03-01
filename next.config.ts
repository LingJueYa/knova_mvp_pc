import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.mos.cms.futurecdn.net',
      },
      {
        protocol: 'https',
        hostname: 'www.marketinghouse.ge',
      },
      {
        protocol: 'https',
        hostname: 'n.sinaimg.cn',
      },
      {
        protocol: 'https',
        hostname: 'mp.ofweek.com',
      },
      {
        protocol: 'https',
        hostname: 'external-preview.redd.it',
      },
    ],
  },
};

export default nextConfig;
