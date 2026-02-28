'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { LinkButton } from '@/src/app/_components/link-button'
import { Markdown } from '@/src/app/_components/markdown'

type TeamIntroCardProps = {
  teamName: string
  displayName: string
  description: string
  imagePath: string
  activities: string[]
  index: number
}

export const TeamIntroCard = ({
  teamName,
  displayName,
  description,
  imagePath,
  activities,
  index,
}: TeamIntroCardProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const isEven = index % 2 === 0

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

  return (
    <div
      id={teamName}
      ref={ref}
      className={`group relative overflow-hidden rounded-3xl transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="absolute inset-0">
        <Image
          src={imagePath}
          alt={displayName}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-${isEven ? 'r' : 'l'} from-black/95 via-black/60 to-transparent`}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20" />
      </div>

      <div
        className={`relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} min-h-[400px] md:min-h-[450px]`}
      >
        <div
          className={`flex-1 flex flex-col justify-center p-6 md:p-12 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <span
                className="text-5xl md:text-7xl font-bold text-white/40"
                style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            <h3
              className="text-2xl md:text-4xl font-bold text-white mb-4"
              style={{
                textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.5)',
              }}
            >
              {displayName}
            </h3>
            <div
              className="text-base md:text-lg leading-relaxed text-white/95 mb-6 max-w-xl **:text-white/95 [&_a]:text-mint [&_a]:underline"
              style={{
                textShadow: '0 1px 8px rgba(0,0,0,0.7), 0 2px 15px rgba(0,0,0,0.4)',
              }}
            >
              <Markdown content={description} />
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {activities.map((activity) => (
                <span
                  key={activity}
                  className="px-3 py-1.5 text-xs md:text-sm bg-black/50 backdrop-blur-md text-white rounded-full shadow-lg"
                  style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
                >
                  {activity}
                </span>
              ))}
            </div>
            <div>
              <LinkButton href={`/team/${teamName}`} text="もっと見る" color="black" />
            </div>
          </div>
        </div>
        <div className="hidden md:flex flex-1" />
      </div>
    </div>
  )
}
