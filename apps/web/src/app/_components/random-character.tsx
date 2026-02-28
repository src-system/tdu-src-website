'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const FALLBACK_IMAGES = ['/images/sofcharatop/ワカツキ_web.png']

type RandomCharacterProps = {
  images?: string[]
}

export const RandomCharacter = ({ images = [] }: RandomCharacterProps) => {
  const [imagePath, setImagePath] = useState<string | null>(null)
  const imageList = images.length > 0 ? images : FALLBACK_IMAGES

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * imageList.length)
    setImagePath(imageList[randomIndex])
  }, [imageList])

  if (!imagePath) {
    return (
      <div className="aspect-3/4 w-full max-w-xs md:max-w-sm animate-pulse bg-linear-to-br from-gray-100 to-gray-200 rounded-2xl shadow-md" />
    )
  }

  return (
    <div className="relative aspect-3/4 w-full max-w-xs md:max-w-sm">
      <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-purple-50 rounded-2xl opacity-20 blur-xl" />
      <Image
        src={imagePath}
        alt="ソフきゃら"
        fill
        className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300 relative z-10"
        priority
      />
    </div>
  )
}
