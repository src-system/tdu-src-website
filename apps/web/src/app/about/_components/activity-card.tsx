'use client'

import type { LucideIcon } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Markdown } from '@/src/app/_components/markdown'

type ActivityCardProps = {
  number: string
  title: string
  description: string
  image: string
  icon: LucideIcon
  variant?: 'left' | 'right' | 'full'
}

export const ActivityCard = ({
  number,
  title,
  description,
  image,
  icon: Icon,
  variant = 'left',
}: ActivityCardProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.15 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  if (variant === 'full') {
    return (
      <div
        ref={ref}
        className={`relative overflow-hidden rounded-3xl transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="relative h-64 md:h-80">
          <Image src={image} alt={title} fill className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-mint text-white">
              <Icon className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <span className="text-mint font-bold text-lg md:text-xl">{number}</span>
          </div>
          <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">{title}</h3>
          <div className="text-base md:text-lg text-white/90 leading-relaxed max-w-2xl **:text-white/90 [&_p]:my-0">
            <Markdown content={description} />
          </div>
        </div>
      </div>
    )
  }

  const isRight = variant === 'right'

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className={`flex flex-col ${isRight ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
        {/* 画像部分 */}
        <div className="relative w-full md:w-1/2 h-48 md:h-72 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-${isRight ? 'l' : 'r'} from-transparent to-forest/20`}
          />
          {/* 番号バッジ */}
          <div className="absolute top-4 left-4 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-forest text-white shadow-lg">
            <span className="font-bold text-2xl md:text-3xl">{number}</span>
          </div>
        </div>

        {/* テキスト部分 */}
        <div className="relative w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
          {/* 装飾的な背景円 */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-mint/10 rounded-full blur-2xl" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-mint/20 text-forest">
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-xl md:text-3xl font-bold text-forest mb-3">{title}</h3>
            <div className="text-base md:text-lg text-gray-600 leading-relaxed [&_p]:my-0">
              <Markdown content={description} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
