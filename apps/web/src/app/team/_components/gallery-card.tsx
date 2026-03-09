'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export type GalleryItem = {
  type: 'image' | 'video' | 'sound'
  mediaPath: string
  alt: string
  thumbnailPath?: string
  title?: string
  description?: string
  relatedLinks?: { linkName: string; link: string }[]
}

type GalleryCardProps = {
  item: GalleryItem
}

// Hoisted static JSX (rendering-hoist-jsx)
const mediaErrorIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-16 w-16 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
    />
  </svg>
)

const imageTypeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10 text-leaf drop-shadow-md"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
  </svg>
)

const videoTypeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10 text-leaf drop-shadow-md"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
  </svg>
)

const soundTypeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10 text-leaf drop-shadow-md"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
  </svg>
)

const typeIconMap = {
  image: imageTypeIcon,
  video: videoTypeIcon,
  sound: soundTypeIcon,
} as const

const closeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)

type CardThumbnailProps = {
  item: GalleryItem
  onError: () => void
}

function CardThumbnail({ item, onError }: CardThumbnailProps) {
  if (item.type === 'image') {
    return (
      <Image
        src={item.mediaPath}
        alt={item.alt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        onError={onError}
      />
    )
  }
  if (item.type === 'video') {
    return item.thumbnailPath ? (
      <Image
        src={item.thumbnailPath}
        alt={item.alt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    ) : (
      <div className="absolute inset-0">
        <video
          src={item.mediaPath}
          preload="metadata"
          muted
          playsInline
          tabIndex={-1}
          className="w-full h-full object-cover"
        />
      </div>
    )
  }
  if (item.thumbnailPath) {
    return (
      <Image
        src={item.thumbnailPath}
        alt={item.alt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    )
  }
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 gap-2">
      {mediaErrorIcon}
      {item.title && (
        <p className="text-sm font-medium text-charcoal text-center px-4 line-clamp-2">
          {item.title}
        </p>
      )}
    </div>
  )
}

export function GalleryCard({ item }: GalleryCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasError, setHasError] = useState(false)

  const hasDetails =
    item.title || item.description || (item.relatedLinks && item.relatedLinks.length > 0)

  return (
    <>
      <button
        type="button"
        className="relative aspect-video w-full rounded-lg overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
        onClick={() => !hasError && setIsOpen(true)}
      >
        {hasError ? (
          <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 text-gray-500">
            {mediaErrorIcon}
            <p className="mt-2 text-sm text-center px-4">{item.alt}</p>
          </div>
        ) : (
          <CardThumbnail item={item} onError={() => setHasError(true)} />
        )}
        <div className="absolute top-2 right-2 z-10 bg-white rounded p-1">
          {typeIconMap[item.type]}
        </div>
      </button>

      {isOpen && !hasError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 animate-fade-in p-4">
          <button
            type="button"
            className="absolute inset-0 w-full h-full cursor-default"
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
            aria-label="モーダルを閉じる"
          />
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-xl animate-scale-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby={item.title ? 'gallery-modal-title' : undefined}
          >
            <button
              type="button"
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-charcoal transition-colors hover:bg-gray-200"
              onClick={() => setIsOpen(false)}
              aria-label="閉じる"
            >
              {closeIcon}
            </button>

            <div className="p-6 space-y-4">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                {item.type === 'image' && (
                  <Image
                    src={item.mediaPath}
                    alt={item.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 672px"
                  />
                )}
                {item.type === 'video' && (
                  <video
                    src={item.mediaPath}
                    controls
                    className="w-full h-full object-contain"
                    poster={item.thumbnailPath}
                  >
                    <track kind="captions" />
                    お使いのブラウザは動画タグをサポートしていません。
                  </video>
                )}
                {item.type === 'sound' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 gap-4">
                    {item.thumbnailPath ? (
                      <div className="relative w-full flex-1 min-h-0">
                        <Image
                          src={item.thumbnailPath}
                          alt={item.alt}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 672px"
                        />
                      </div>
                    ) : (
                      mediaErrorIcon
                    )}
                    <audio src={item.mediaPath} controls className="w-full max-w-md shrink-0">
                      <track kind="captions" />
                      お使いのブラウザは音声タグをサポートしていません。
                    </audio>
                  </div>
                )}
              </div>

              {hasDetails && (
                <div className="space-y-4 pt-3 border-t-2 border-forest/30">
                  {item.title && (
                    <h2
                      id="gallery-modal-title"
                      className="text-xl font-semibold text-forest pb-2 border-b border-forest/20"
                    >
                      {item.title}
                    </h2>
                  )}
                  {item.description && (
                    <p className="text-base text-gray-600 whitespace-pre-wrap leading-relaxed">
                      {item.description}
                    </p>
                  )}
                  {item.relatedLinks && item.relatedLinks.length > 0 && (
                    <div className="pt-1">
                      <h3 className="text-base font-semibold text-forest mb-2 pb-1 border-b border-forest/20">
                        関連リンク
                      </h3>
                      <ul className="space-y-1.5">
                        {item.relatedLinks.map((r) => (
                          <li key={`${r.linkName}-${r.link}`} className="flex items-center gap-2">
                            <span className="text-forest text-lg font-bold leading-none">›</span>
                            <Link
                              href={r.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-base text-forest hover:opacity-70 transition-opacity"
                            >
                              {r.linkName}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
