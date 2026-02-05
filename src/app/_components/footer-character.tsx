"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CHARACTER_IMAGES } from "../_lib/api";

export const FooterCharacter = () => {
  const [characterImage, setCharacterImage] = useState<string | null>(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * CHARACTER_IMAGES.length);
    setCharacterImage(CHARACTER_IMAGES[randomIndex]);
  }, []);

  return (
    <div className="h-[16rem] md:h-[24rem] bg-white">
      <div className="mx-auto max-w-6xl relative h-full">
        {characterImage && (
          <div className="absolute bottom-0 right-0 w-[18rem] md:w-[28rem] h-[24rem] md:h-[32rem] pointer-events-none">
            <Image
              src={characterImage}
              alt="ソフきゃら"
              fill
              className="object-contain object-bottom"
            />
          </div>
        )}
      </div>
    </div>
  );
};
