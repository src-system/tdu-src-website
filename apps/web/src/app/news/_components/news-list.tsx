'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import { NewsCard } from '@/src/app/_components/news-card'
import { NEWS_CATEGORIES, NEWS_DATA } from '@/src/app/_lib/api'

const ITEMS_PER_PAGE = 10

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            type="button"
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
              currentPage === page
                ? 'bg-forest text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}

export const NewsList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredNews = useMemo(() => {
    if (selectedCategory === 'all') {
      return NEWS_DATA
    }
    return NEWS_DATA.filter((news) => news.category === selectedCategory)
  }, [selectedCategory])

  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE)

  const paginatedNews = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredNews.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredNews, currentPage])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* カテゴリーフィルター */}
      <div className="flex flex-wrap gap-2">
        {NEWS_CATEGORIES.map((category) => (
          <button
            type="button"
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-forest text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* 結果件数 */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <p className="text-sm text-gray-600">
          {filteredNews.length}件の記事
          {selectedCategory !== 'all' && `（${selectedCategory}）`}
        </p>
        {/* 上部ページネーション */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* ニュースリスト */}
      <div className="flex flex-col gap-4">
        {paginatedNews.map((news) => (
          <NewsCard key={news.id} {...news} variant="full" />
        ))}
      </div>

      {/* 下部ページネーション */}
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}
