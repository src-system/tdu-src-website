import { Calendar, Tag } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ContentCard } from '@/src/app/_components/content-card'
import { LinkButton } from '@/src/app/_components/link-button'
import { Markdown } from '@/src/app/_components/markdown'
import { PatternBackground } from '@/src/app/_components/pattern-background'
import { NEWS_DATA } from '@/src/app/_lib/api'

export function generateStaticParams() {
  return NEWS_DATA.map((news) => ({
    newsId: news.id,
  }))
}

type Props = {
  params: Promise<{ newsId: string }>
}

const NewsDetailPage = async ({ params }: Props) => {
  const { newsId } = await params

  const news = NEWS_DATA.find((n) => n.id === newsId)

  if (!news) {
    notFound()
  }

  // 将来的にはMarkdownファイルから読み込む
  // タイトルをMarkdownのh1として含める
  const markdownContent = `# ${news.title}\n\n${news.content}`

  return (
    <PatternBackground>
      <main className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl 2xl:max-w-7xl px-6 md:px-8">
          <ContentCard>
            <article>
              {/* 記事画像 */}
              <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
                <Image
                  src={news.imagePath}
                  alt={news.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* メタ情報 */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <span className="inline-flex items-center gap-2 bg-forest text-white px-5 py-2.5 rounded-full text-base md:text-lg font-semibold">
                  <Tag className="w-5 h-5" />
                  {news.category}
                </span>
                <span className="inline-flex items-center gap-2 text-gray-700 text-base md:text-lg font-medium">
                  <Calendar className="w-5 h-5" />
                  {news.date}
                </span>
              </div>

              {/* 本文（Markdownコンポーネント使用、タイトルはh1として含まれる） */}
              <Markdown content={markdownContent} />

              {/* 一覧に戻るボタン */}
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
