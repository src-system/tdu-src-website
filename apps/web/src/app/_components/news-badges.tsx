import type { ReactNode } from 'react'

/** 班（サブカテゴリー）ごとのバッジ色 */
const TEAM_BADGE_CLASSES: Record<string, string> = {
  ゲームプログラミング: 'bg-blue-500 text-white border-0',
  Webアプリ: 'bg-lime-500 text-white border-0',
  サウンド: 'bg-purple-500 text-white border-0',
  '2D': 'bg-yellow-400 text-charcoal border-0',
  '3D': 'bg-orange-500 text-white border-0',
  デザイン: 'bg-pink-500 text-white border-0',
}

type NewsBadgesProps = {
  category: string
  subcategory?: string
  size?: 'sm' | 'md' | 'lg'
  /** 詳細ページ用の大きめスタイル */
  detail?: boolean
  /** カテゴリーを旧デザイン（bg-forest 丸型）にする（詳細ページ用） */
  categoryLegacy?: boolean
  /** カテゴリーバッジ内に表示するアイコン（categoryLegacy 時） */
  categoryIcon?: ReactNode
  /** 班バッジを右側に寄せる（詳細ページ用） */
  teamOnRight?: boolean
  /** カテゴリーの隣に表示する要素（日付など） */
  afterCategory?: ReactNode
}

export const NewsBadges = ({
  category,
  subcategory,
  size = 'md',
  detail = false,
  categoryLegacy = false,
  categoryIcon,
  teamOnRight = false,
  afterCategory,
}: NewsBadgesProps) => {
  const teamClasses = subcategory ? TEAM_BADGE_CLASSES[subcategory] : undefined
  const sizeClass = detail
    ? 'px-5 py-2.5 text-base md:text-lg font-semibold'
    : size === 'sm'
      ? 'px-2 py-0.5 text-xs'
      : size === 'lg'
        ? 'px-4 py-1.5 text-sm'
        : 'px-3 py-1 text-xs'

  const categoryClass = categoryLegacy
    ? 'bg-forest text-white rounded-full'
    : 'bg-forest/10 text-forest rounded'

  return (
    <div
      className={`flex flex-wrap items-center gap-2 ${teamOnRight && subcategory ? 'w-full justify-between' : ''}`}
    >
      <div className="inline-flex items-center gap-4 flex-wrap">
        <span
          className={`inline-flex items-center gap-2 font-medium ${categoryClass} ${sizeClass}`}
        >
          {categoryLegacy && categoryIcon}
          {category}
        </span>
        {afterCategory}
      </div>
      {subcategory && (
        <span
          className={`inline-flex items-center font-medium rounded ${sizeClass} ${
            teamClasses ?? 'bg-gray-100 text-gray-700'
          }`}
        >
          {subcategory}
        </span>
      )}
    </div>
  )
}
