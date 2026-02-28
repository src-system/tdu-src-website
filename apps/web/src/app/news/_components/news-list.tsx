'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { NewsCard, type NewsCardData } from '@/src/app/_components/news-card'
import { NEWS_CATEGORIES } from '@/src/app/_lib/api'

/** 班ボタン選択時の色 */
const TEAM_ACTIVE_CLASSES: Record<string, string> = {
  ゲームプログラミング: 'bg-blue-500 text-white border-blue-500 shadow-md',
  Webアプリ: 'bg-lime-500 text-white border-lime-500 shadow-md',
  サウンド: 'bg-purple-500 text-white border-purple-500 shadow-md',
  '2D': 'bg-yellow-400 text-charcoal border-yellow-400 shadow-md',
  '3D': 'bg-orange-500 text-white border-orange-500 shadow-md',
  デザイン: 'bg-pink-500 text-white border-pink-500 shadow-md',
}

function buildNewsUrl(params: { category?: string; subcategory?: string; page?: number }): string {
  const search = new URLSearchParams()
  if (params.category) search.set('category', params.category)
  if (params.subcategory) search.set('subcategory', params.subcategory)
  if (params.page && params.page > 1) search.set('page', String(params.page))
  const q = search.toString()
  return q ? `/news?${q}` : '/news'
}

type NewsListProps = {
  items: NewsCardData[]
  totalDocs: number
  totalPages: number
  currentPage: number
  currentCategory?: string
  currentSubcategory?: string
  filterLabel?: string
}

type PaginationProps = {
  currentPage: number
  totalPages: number
  category?: string
  subcategory?: string
}

const Pagination = ({ currentPage, totalPages, category, subcategory }: PaginationProps) => {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2">
      <Link
        href={buildNewsUrl({
          category,
          subcategory,
          page: currentPage > 1 ? currentPage - 1 : undefined,
        })}
        aria-label="前のページ"
        className={`p-2 rounded-lg border border-gray-300 transition-colors ${
          currentPage === 1 ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100'
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
      </Link>

      <div className="flex gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={buildNewsUrl({
              category,
              subcategory,
              page: page > 1 ? page : undefined,
            })}
            className={`w-10 h-10 rounded-lg text-sm font-medium flex items-center justify-center transition-all duration-200 ${
              currentPage === page
                ? 'bg-forest text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      <Link
        href={buildNewsUrl({
          category,
          subcategory,
          page: currentPage < totalPages ? currentPage + 1 : currentPage,
        })}
        aria-label="次のページ"
        className={`p-2 rounded-lg border border-gray-300 transition-colors ${
          currentPage === totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100'
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </Link>
    </div>
  )
}

export const NewsList = ({
  items,
  totalDocs,
  totalPages,
  currentPage,
  currentCategory,
  currentSubcategory,
  filterLabel,
}: NewsListProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-4">
        <div>
          <p className="text-base font-semibold text-charcoal mb-2.5">カテゴリー</p>
          <div className="flex flex-wrap gap-2">
            {NEWS_CATEGORIES.filter((c) => c.type === 'all' || c.type === 'category').map((cat) => {
              const href = cat.type === 'all' ? '/news' : buildNewsUrl({ category: cat.apiValue })
              const isActive =
                cat.type === 'all'
                  ? !currentCategory && !currentSubcategory
                  : currentCategory === cat.apiValue
              return (
                <Link
                  key={cat.id}
                  href={href}
                  scroll={false}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all duration-200 ${
                    isActive
                      ? 'bg-forest text-white border-forest shadow-md'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-forest/40 hover:text-forest'
                  }`}
                >
                  {cat.label}
                </Link>
              )
            })}
          </div>
        </div>

        <div>
          <p className="text-base font-semibold text-charcoal mb-2.5">班</p>
          <div className="flex flex-wrap gap-2">
            {NEWS_CATEGORIES.filter((c) => c.type === 'subcategory').map((cat) => {
              const isActive = currentSubcategory === cat.apiValue
              const teamClasses = TEAM_ACTIVE_CLASSES[cat.label]
              return (
                <Link
                  key={cat.id}
                  href={buildNewsUrl({ subcategory: cat.apiValue })}
                  scroll={false}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all duration-200 ${
                    isActive && teamClasses
                      ? teamClasses
                      : isActive
                        ? 'bg-forest text-white border-forest shadow-md'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {cat.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <p className="text-base text-charcoal font-semibold">
          <span className="text-forest text-2xl">{totalDocs}</span>件
          {filterLabel && <span className="text-gray-600 font-medium">（{filterLabel}）</span>}
        </p>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          category={currentCategory}
          subcategory={currentSubcategory}
        />
      </div>
      <div className="flex flex-col gap-4">
        {items.map((news) => (
          <NewsCard key={news.id} {...news} variant="full" />
        ))}
      </div>
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          category={currentCategory}
          subcategory={currentSubcategory}
        />
      </div>
    </div>
  )
}
