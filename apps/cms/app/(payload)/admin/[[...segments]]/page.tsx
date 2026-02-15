import { getPayloadHMR } from '@payloadcms/next/utilities'
import { generatePageMetadata, RootPage } from '@payloadcms/next/views'
import type { Metadata } from 'next'
import configPromise from '@/payload.config'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config: configPromise, params, searchParams })

const Page = async ({ params, searchParams }: Args) => {
  const payload = await getPayloadHMR({ config: configPromise })

  return RootPage({
    config: configPromise,
    params,
    searchParams,
    importMap: payload.importMap,
  })
}

export default Page
