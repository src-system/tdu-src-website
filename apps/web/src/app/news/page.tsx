import { redirect } from 'next/navigation'
import { ContentBlock } from '@/src/app/_components/content-block'
import { ContentCard } from '@/src/app/_components/content-card'
import { HeroLabel } from '@/src/app/_components/hero-label'
import { PageHeader } from '@/src/app/_components/page-header'
import { PatternBackground } from '@/src/app/_components/pattern-background'
import {
  getNewsListPaginatedFromApi,
  getNewsPageDataFromApi,
  NEWS_CATEGORIES,
} from '@/src/app/_lib/api'
import { NewsList } from '@/src/app/news/_components/news-list'

type NewsPageProps = {
  searchParams: Promise<{ category?: string; subcategory?: string; page?: string }>
}

const NewsPage = async ({ searchParams }: NewsPageProps) => {
  const params = await searchParams
  const category = params.category
  const subcategory = params.subcategory
  const page = Number(params.page) || 1

  const [newsPageData, newsResult] = await Promise.all([
    getNewsPageDataFromApi(),
    getNewsListPaginatedFromApi({
      category: category || undefined,
      subcategory: subcategory || undefined,
      page: page >= 1 ? page : 1,
    }),
  ])

  if (!newsPageData || !newsPageData.pageHeader.imagePath) {
    const params = new URLSearchParams({
      type: 'no-content',
      failedItems: 'news-page',
      message:
        'Newsページのトップ画像が設定されていません。\n\nPayload CMS の管理画面で Newsページ のトップ画像を設定してください。',
    })
    redirect(`/error?${params.toString()}`)
  }

  const { pageHeader, newsOverview } = newsPageData

  return (
    <PatternBackground className="min-h-screen">
      <main>
        <PageHeader imagePath={pageHeader.imagePath}>
          <HeroLabel text={pageHeader.title} />
        </PageHeader>
        <div className="py-16 md:py-24">
          <div className="mx-auto max-w-5xl 2xl:max-w-7xl px-6 md:px-8">
            <ContentCard>
              <ContentBlock
                title={newsOverview.title}
                subtitle={newsOverview.subtitle}
                description={newsOverview.description}
              />
              <div className="mt-6">
                <NewsList
                  items={newsResult.docs}
                  totalDocs={newsResult.totalDocs}
                  totalPages={newsResult.totalPages}
                  currentPage={newsResult.page}
                  currentCategory={category}
                  currentSubcategory={subcategory}
                  filterLabel={
                    category
                      ? NEWS_CATEGORIES.find(
                          (c) => c.apiValue === category && c.type === 'category',
                        )?.label
                      : subcategory
                        ? NEWS_CATEGORIES.find(
                            (c) => c.apiValue === subcategory && c.type === 'subcategory',
                          )?.label
                        : undefined
                  }
                />
              </div>
            </ContentCard>
          </div>
        </div>
      </main>
    </PatternBackground>
  )
}

export default NewsPage
