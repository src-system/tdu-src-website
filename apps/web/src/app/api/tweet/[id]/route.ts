import { NextRequest } from 'next/server'
import { getTweet } from 'react-tweet/api'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const tweet = await getTweet(id)
    return Response.json(tweet ?? null, {
      headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' },
    })
  } catch {
    return Response.json(null, { status: 404 })
  }
}
