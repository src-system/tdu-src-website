import config from '@payload-config'
import { generatePageMetadata, RootPage } from '@payloadcms/next/views'
import type { Metadata } from 'next'

import { importMap } from '../importMap.js'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config: Promise.resolve(config), params, searchParams })

const Page = ({ params, searchParams }: Args) =>
  RootPage({ config: Promise.resolve(config), params, searchParams, importMap })

export default Page
