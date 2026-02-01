import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type NewsItem = {
  id: string;
  date: string;
  title: string;
  imagePath: string;
};

type NewsCardProps = NewsItem;

const NewsCard = ({ id, date, title, imagePath }: NewsCardProps) => {
  return (
    <Link
      href={`/news/${id}`}
      className="relative block aspect-video w-full overflow-hidden rounded-lg border-4 border-forest transition-all duration-200 hover:scale-105"
    >
      <Image src={imagePath} alt={title} fill className="object-cover" />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
      <div className="absolute top-2 left-2 rounded bg-forest px-1.5 py-0.5">
        <span className="text-xs font-bold text-white">{date}</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-2">
        <h3 className="text-sm font-bold text-white line-clamp-2">{title}</h3>
      </div>
    </Link>
  );
};

type NewsListProps = {
  items: NewsItem[];
};

export const NewsList = ({ items }: NewsListProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
        {items.slice(0, 3).map((item) => (
          <NewsCard key={item.id} {...item} />
        ))}
      </div>
      <Link
        href="/news"
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-forest bg-white text-forest shadow-[0_3px_0_0_var(--color-forest)] transition-all duration-200 hover:translate-y-0.5 hover:shadow-[0_1px_0_0_var(--color-forest)]"
        aria-label="もっと見る"
      >
        <ChevronRightIcon className="size-6" />
      </Link>
    </div>
  );
};

// 後方互換性のため残す
export const NewsCarousel = NewsList;
