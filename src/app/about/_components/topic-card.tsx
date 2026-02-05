"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type TopicCardProps = {
  title: string;
  description: string;
  image: string;
};

export const TopicCard = ({ title, description, image }: TopicCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex border-2 shadow-sm bg-white border-gray-300 rounded-2xl overflow-hidden py-4 md:py-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {/* 左側の緑のアクセントライン */}
      <div className="w-3 md:w-5 bg-forest shrink-0" />

      {/* コンテンツエリア */}
      <div className="flex flex-1 flex-col md:flex-row gap-4 md:gap-8 p-4 md:p-8">
        {/* 左側：タイトルと説明文 */}
        <div className="flex-1 flex flex-col justify-start">
          <h3 className="text-xl md:text-3xl font-bold">{title}</h3>
          <p className="text-lg font-medium md:text-xl leading-relaxed mt-2 md:mt-4">
            {description}
          </p>
        </div>

        {/* 右側：画像 */}
        <div className="flex-1 flex items-center">
          <div className="relative w-full aspect-video">
            <Image src={image} alt={title} fill className="object-cover rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};
