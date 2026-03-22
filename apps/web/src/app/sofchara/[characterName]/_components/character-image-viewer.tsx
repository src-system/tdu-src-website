'use client'

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useRef, useState } from 'react'

type Outfit = {
  name: string
  fullbodyImagePath: string
  portraitImagePath: string
  label: string
  author: string
}

type CharacterImageViewerProps = {
  characterName: string
  outfits: Outfit[]
}

export const CharacterImageViewer = ({ characterName, outfits }: CharacterImageViewerProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedOutfit = outfits[selectedIndex]
  const startX = useRef<number | null>(null)
  const isDragging = useRef(false)

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : outfits.length - 1))
  }, [outfits.length])

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev < outfits.length - 1 ? prev + 1 : 0))
  }, [outfits.length])

  // タッチイベント
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX
  }, [])

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (startX.current === null) return
      const diff = startX.current - e.touches[0].clientX
      if (Math.abs(diff) > 50) {
        if (diff > 0) handleNext()
        else handlePrev()
        startX.current = null
      }
    },
    [handleNext, handlePrev],
  )

  const handleTouchEnd = useCallback(() => {
    startX.current = null
  }, [])

  // マウスドラッグイベント
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    startX.current = e.clientX
    isDragging.current = true
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging.current || startX.current === null) return
      const diff = startX.current - e.clientX
      if (Math.abs(diff) > 50) {
        if (diff > 0) handleNext()
        else handlePrev()
        startX.current = null
        isDragging.current = false
      }
    },
    [handleNext, handlePrev],
  )

  const handleMouseUp = useCallback(() => {
    startX.current = null
    isDragging.current = false
  }, [])

  const handleMouseLeave = useCallback(() => {
    startX.current = null
    isDragging.current = false
  }, [])

  const showNavigation = outfits.length > 1

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-3 md:gap-10 items-start">
        {/* 左側: 衣装サムネイル（丸型・縦並び） */}
        <div className="flex flex-col gap-2">
          {outfits.map((outfit, index) => (
            <button
              key={outfit.name}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`w-14 h-14 md:w-24 md:h-24 rounded-full overflow-hidden border-3 ${
                index === selectedIndex
                  ? 'border-forest ring-2 ring-forest/30'
                  : 'border-gray-200 hover:border-gray-400'
              } bg-gray-100 cursor-pointer transition-all duration-200`}
            >
              <Image
                src={outfit.portraitImagePath || outfit.fullbodyImagePath}
                alt={outfit.name}
                width={112}
                height={112}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>

        {/* 右側: メインキャラ画像（スワイプ・ドラッグ対応） */}
        <div className="relative">
          {/* 左矢印 */}
          {showNavigation && (
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110"
              aria-label="前の衣装"
            >
              <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
            </button>
          )}

          <div
            role="img"
            aria-label={`${characterName} - ${selectedOutfit.name}`}
            className="relative w-60 h-[320px] md:w-[360px] md:h-[480px] cursor-grab active:cursor-grabbing select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              src={selectedOutfit.fullbodyImagePath}
              alt={`${characterName} - ${selectedOutfit.name}`}
              fill
              className="object-contain pointer-events-none"
              priority
            />
          </div>

          {/* 右矢印 */}
          {showNavigation && (
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110"
              aria-label="次の衣装"
            >
              <ChevronRightIcon className="w-6 h-6 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* 衣装情報 */}
      <div className="mt-4 flex flex-col items-center">
        <p className="text-lg md:text-xl font-medium text-gray-700">{selectedOutfit.name}</p>
        {selectedOutfit.author && (
          <p className="text-base md:text-lg text-gray-500">作成者： {selectedOutfit.author}</p>
        )}
      </div>

      {/* ドットインジケーター */}
      {showNavigation && (
        <div className="mt-3 flex gap-2">
          {outfits.map((outfit, index) => (
            <button
              key={outfit.name}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === selectedIndex ? 'bg-forest w-4' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`衣装 ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
