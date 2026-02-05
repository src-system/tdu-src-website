import Image from "next/image";
import Link from "next/link";
import { LinkButton } from "@/src/app/_components/link-button";

type NewsItem = {
  id: string;
  date: string;
  title: string;
  imagePath: string;
  category: string;
};

type NewsCardProps = NewsItem;

const NewsCard = ({ id, date, title, imagePath, category }: NewsCardProps) => {
  return (
    <Link
      href={`/news/${id}`}
      className="flex flex-col md:flex-row gap-4 p-5 rounded-lg border border-gray-200 hover:border-forest hover:shadow-md transition-all duration-200 group"
    >
      <div className="relative w-full md:w-40 aspect-video flex-shrink-0 rounded-lg overflow-hidden">
        <Image
          src={imagePath}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center gap-2.5">
        <h3 className="font-bold text-base md:text-lg line-clamp-2 break-all group-hover:text-forest transition-colors [word-break:auto-phrase]">
          {title}
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600">{date}</span>
          <span className="px-3 py-1 bg-forest text-white text-xs font-medium rounded">
            {category}
          </span>
        </div>
      </div>
    </Link>
  );
};

type NewsListProps = {
  items: NewsItem[];
};

export const NewsList = ({ items }: NewsListProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {items.slice(0, 3).map((item) => (
          <NewsCard key={item.id} {...item} />
        ))}
      </div>
      <div className="flex justify-end">
        <LinkButton href="/news" text="もっとみる" />
      </div>
    </div>
  );
};

// 後方互換性のため残す
export const NewsCarousel = NewsList;
