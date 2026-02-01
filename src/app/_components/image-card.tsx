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
        className="relative aspect-4/3 w-full h-full border-4 border-forest rounded-xl overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105"
        onClick={() => setIsOpen(true)}
      >
        <Image src={imagePath} alt={alt} fill className="object-cover" priority />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80">
          <button
            type="button"
            className="absolute inset-0 w-full h-full cursor-default"
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
            aria-label="Close modal"
          />
          <div className="relative max-w-[70vw] max-h-[70vh]">
            <button
              type="button"
              className="absolute -top-3 -right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-800 shadow-lg transition-all duration-200 hover:bg-gray-200 hover:scale-110"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
            <Image
              src={imagePath}
              alt={alt}
              width={1280}
              height={720}
              className="max-w-full max-h-[60vh] object-contain rounded-lg"
            />
            <p className="mt-3 text-center text-white text-sm">{alt}</p>
          </div>
        </div>
      )}
    </>
  );
};
