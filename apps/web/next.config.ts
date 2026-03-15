import type { NextConfig } from 'next'

function buildRemotePatterns(urlStr: string) {
  const { protocol, hostname, port } = new URL(urlStr)
  const proto = protocol.replace(':', '') as 'http' | 'https'
  return [
    { protocol: proto, hostname, port: port || '', pathname: '/api/media/**' },
    { protocol: proto, hostname, port: port || '', pathname: '/media/**' },
  ]
}

const publicUrl = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001'
const internalUrl = process.env.CMS_INTERNAL_URL || publicUrl

const seenHosts = new Set<string>()
const uniquePatterns = [...buildRemotePatterns(publicUrl), ...buildRemotePatterns(internalUrl)]
  .filter(({ hostname }) => {
    if (seenHosts.has(hostname)) return false
    seenHosts.add(hostname)
    return true
  })

// Payload CMSのserverURLに基づき保存される本番URLも常に許可する
const PRODUCTION_CMS_PATTERNS = buildRemotePatterns('https://cms.tdu-src.com')

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      ...uniquePatterns,
      ...PRODUCTION_CMS_PATTERNS.filter(
        (p) => !seenHosts.has(p.hostname),
      ),
    ],
  },
}

export default nextConfig
