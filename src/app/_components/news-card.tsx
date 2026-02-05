import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/src/app/_components/badge";

export type NewsCardData = {
  id: string;
  date: string;
  title: string;
  imagePath: string;
  category: string;
  content?: string;
};

type NewsCardProps = NewsCardData & {
  variant?: "compact" | "full";
};

export const NewsCard = ({
  id,
  date,
  title,
  imagePath,
  category,
  content,
  variant = "compact",
}: NewsCardProps) => {
  if (variant === "full") {
    return (
      <Link
        href={`/news/${id}`}
        className="group flex flex-col md:flex-row gap-4 md:gap-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-forest/30"
      >
        <div className="relative aspect-video md:aspect-4/3 w-full md:w-48 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={imagePath}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-center gap-2">
          <div className="flex items-center gap-3">
            <Badge variant="secondary">{category}</Badge>
            <span className="text-sm text-gray-500">{date}</span>
          </div>
          <h3 className="text-lg font-bold text-charcoal group-hover:text-forest transition-colors">
            {title}
          </h3>
          {content && <p className="text-sm text-gray-600 line-clamp-2">{content}</p>}
        </div>
      </Link>
    );
  }

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
          <Badge variant="primary" size="md">
            {category}
          </Badge>
        </div>
      </div>
    </Link>
  );
};
