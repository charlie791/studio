import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'igscountertops.b-cdn.net',
        port: '',
        pathname: '/**',
      }
    ],
  },
  experimental: {
    allowedDevOrigins: [
      'https://6000-firebase-studio-1747966501500.cluster-f4iwdviaqvc2ct6pgytzw4xqy4.cloudworkstations.dev',
      'https://9000-firebase-studio-1747966501500.cluster-f4iwdviaqvc2ct6pgytzw4xqy4.cloudworkstations.dev'
    ]
  }
};

export default nextConfig;