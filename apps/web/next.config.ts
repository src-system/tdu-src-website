import type { NextConfig } from 'next'

const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001'
const { protocol, hostname, port } = new URL(cmsUrl)

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: protocol.replace(':', '') as 'http' | 'https',
        hostname,
        port: port || '',
        pathname: '/api/media/**',
      },
      {
        protocol: protocol.replace(':', '') as 'http' | 'https',
        hostname,
        port: port || '',
        pathname: '/media/**',
      },
    ],
  },
}

export default nextConfig
