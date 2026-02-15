'use client'

import Image from 'next/image'
import { useState } from 'react'

type ImageCardProps = {
  imagePath: string
  alt: string
}

export const ImageCard = ({ imagePath, alt }: ImageCardProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hasError, setHasError] = useState(false)

  return (
    <>
      <button
        type="button"
        className="relative aspect-4/3 w-full h-full rounded-xl overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105"
        onClick={() => !hasError && setIsOpen(true)}
      >
        {hasError ? (
          <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-label="画像が読み込めませんでした"
            >
              <title>画像が読み込めませんでした</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm text-center px-4">{alt}</p>
          </div>
        ) : (
          <Image
            src={imagePath}
            alt={alt}
            fill
            className="object-cover"
            priority
            onError={() => setHasError(true)}
          />
        )}
      </button>

      {isOpen && !hasError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 animate-fade-in">
          <button
            type="button"
            className="absolute inset-0 w-full h-full cursor-default"
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
            aria-label="Close modal"
          />
          <div className="max-w-[70vw] max-h-[70vh] gap-2 flex flex-col items-center justify-center animate-scale-in">
            <div className="relative">
              <button
                type="button"
                className="absolute -top-4 -right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-800 shadow-lg transition-colors duration-200 hover:bg-gray-200"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 transition-transform duration-200 hover:scale-110"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <Image
                src={imagePath}
                alt={alt}
                width={0}
                height={0}
                sizes="100vw"
                className="max-h-[60vh] w-auto h-auto rounded-lg"
                onError={() => setHasError(true)}
              />
            </div>
            <p className="mt-3 text-center text-white md:text-2xl text-sm font-noto">{alt}</p>
          </div>
        </div>
      )}
    </>
  )
}
