'use client'

import { useEffect } from 'react'

export const HashScroll = () => {
  useEffect(() => {
    // URLにハッシュがある場合、該当要素にスクロール
    const hash = window.location.hash
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        // 少し遅延させてDOMが完全に描画されるのを待つ
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [])

  return null
}
