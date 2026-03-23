'use client'

import { EmbeddedTweet, TweetNotFound, TweetSkeleton, useTweet } from 'react-tweet'

type TweetEmbedProps = {
  tweetId: string
}

export const TweetEmbed = ({ tweetId }: TweetEmbedProps) => {
  const { data, error, isLoading } = useTweet(tweetId)

  if (isLoading) return <TweetSkeleton />
  if (error || !data) return <TweetNotFound />
  return (
    <div className="flex justify-center my-4">
      <EmbeddedTweet tweet={data} />
    </div>
  )
}
