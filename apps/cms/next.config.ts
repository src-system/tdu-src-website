import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: false,
  // Payload admin の DndContext/useId による hydration mismatch を回避
  reactStrictMode: false,
}

export default withPayload(nextConfig)
