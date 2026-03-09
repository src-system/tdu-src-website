'use client'

import { ChevronLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export const BackToListLink = () => {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push('/sofchara')
    // ページ遷移後にスクロール
    setTimeout(() => {
      const element = document.getElementById('characters')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  return (
    <Link
      href="/sofchara#characters"
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 text-base md:text-2xl font-semibold text-forest"
    >
      <ChevronLeftIcon className="size-8" />
      キャラクター一覧に戻る
    </Link>
  )
}
