import { LinkButton } from "@/src/app/_components/link-button";
import { NewsCard, type NewsCardData } from "@/src/app/_components/news-card";

type NewsListProps = {
  items: NewsCardData[];
  maxItems?: number;
  showMoreButton?: boolean;
};

export const NewsList = ({ items, maxItems = 3, showMoreButton = true }: NewsListProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {items.slice(0, maxItems).map((item) => (
          <NewsCard key={item.id} {...item} variant="compact" />
        ))}
      </div>
      {showMoreButton && (
        <div className="flex justify-end">
          <LinkButton href="/news" text="もっとみる" />
        </div>
      )}
    </div>
  );
};

// 後方互換性のため残す
export const NewsCarousel = NewsList;
