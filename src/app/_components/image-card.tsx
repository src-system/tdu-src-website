"use client";

import Image from "next/image";
import { useState } from "react";

type ImageCardProps = {
  imagePath: string;
  alt: string;
};

export const ImageCard = ({ imagePath, alt }: ImageCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="relative aspect-4/3 w-full h-full rounded-xl overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105"
        onClick={() => setIsOpen(true)}
      >
        <Image src={imagePath} alt={alt} fill className="object-cover" priority />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 animate-fade-in">
          <button
            type="button"
            className="absolute inset-0 w-full h-full cursor-default"
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
            aria-label="Close modal"
          />
          <div className="max-w-[70vw] max-h-[70vh] gap-2 flex flex-col items-center justify-center animate-scale-in">
            <div className="relative">
              <button
                type="button"
                className="absolute -top-4 -right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-800 shadow-lg transition-all duration-200 hover:bg-gray-200 hover:scale-110"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
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
              </button>
              <Image
                src={imagePath}
                alt={alt}
                width={0}
                height={0}
                sizes="100vw"
                className="max-h-[60vh] w-auto h-auto rounded-lg"
              />
            </div>
            <p className="mt-3 text-center text-white md:text-2xl text-sm font-noto">{alt}</p>
          </div>
        </div>
      )}
    </>
  );
};
