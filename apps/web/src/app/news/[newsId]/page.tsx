export const revalidate = 300 // 5分

import { Calendar, Tag } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ContentCard } from '@/src/app/_components/content-card'
import { LinkButton } from '@/src/app/_components/link-button'
import { NewsBadges } from '@/src/app/_components/news-badges'
import { PatternBackground } from '@/src/app/_components/pattern-background'
import type { LexicalContent } from '@/src/app/_components/rich-text'
import { RichText } from '@/src/app/_components/rich-text'
import { getNewsData, getNewsItemFromApi } from '@/src/app/_lib/api'

export async function generateStaticParams() {
  const newsData = await getNewsData()
  return newsData.map((news) => ({
    newsId: news.id,
  }))
}

type Props = {
  params: Promise<{ newsId: string }>
}

const NewsDetailPage = async ({ params }: Props) => {
  const { newsId } = await params

  const news = await getNewsItemFromApi(newsId)

  if (!news) {
    notFound()
  }

  return (
    <PatternBackground className="min-h-screen">
      <main className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl 2xl:max-w-7xl px-6 md:px-8">
          <ContentCard>
            <article>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
                <Image
                  src={news.imagePath}
                  alt={news.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-wrap items-center gap-2 mb-8">
                <NewsBadges
                  category={news.category}
                  subcategory={news.subcategory}
                  detail
                  categoryLegacy
                  categoryIcon={<Tag className="w-5 h-5 shrink-0" />}
                  teamOnRight
                  afterCategory={
                    <span className="inline-flex items-center gap-2 text-gray-700 text-base md:text-lg font-medium">
                      <Calendar className="w-5 h-5" />
                      {news.date}
                    </span>
                  }
                />
              </div>
              {news.content ? (
                <RichText
                  content={news.content as LexicalContent}
                  className="prose-headings:mt-8 prose-headings:mb-4 first:prose-headings:mt-0"
                />
              ) : (
                <p className="text-gray-600">本文はありません。</p>
              )}
              <div className="mt-12 pt-8 border-t border-gray-200 flex justify-center">
                <LinkButton href="/news" text="ニュース一覧に戻る" />
              </div>
            </article>
          </ContentCard>
        </div>
      </main>
    </PatternBackground>
  )
}

export default NewsDetailPage
