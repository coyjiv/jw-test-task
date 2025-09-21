/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.test.ksfr.tech',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.test.ksfr.tech',
        pathname: '/media/cms/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['@tanstack/react-query'],
  },
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },
}

export default nextConfig