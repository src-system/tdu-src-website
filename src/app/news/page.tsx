import Image from "next/image";
import Link from "next/link";
import { ContentBlock } from "../_components/content-block";
import { Partition } from "../_components/partition";
import { TopImage } from "../_components/top-image";
import { NEWS_DATA } from "../_lib/api";

const NewsPage = () => {
  return (
    <main>
      <TopImage imagePath="/images/example/1.jpg" />
      <Partition />

      <section className="flex w-full flex-col gap-5 bg-white mx-auto max-w-6xl md:px-20 px-5 md:py-15 py-10">
        <ContentBlock
          title="NEWS"
          subtitle="新着情報"
          description="ソフトウェア研究部の最新ニュースをお届けします。"
        />
      </section>

      <section className="flex w-full flex-col gap-6 bg-white mx-auto max-w-6xl md:px-20 px-5 pb-10">
        {NEWS_DATA.map((news) => (
          <Link
            key={news.id}
            href={`/news/${news.id}`}
            className="group flex flex-col md:flex-row gap-4 md:gap-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-forest/30"
          >
            <div className="relative aspect-video md:aspect-4/3 w-full md:w-48 shrink-0 overflow-hidden rounded-lg">
              <Image
                src={news.imagePath}
                alt={news.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center gap-2">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-forest/10 px-3 py-1 text-xs text-forest">
                  {news.category}
                </span>
                <span className="text-sm text-gray-500">{news.date}</span>
              </div>
              <h3 className="text-lg font-bold text-charcoal group-hover:text-forest transition-colors">
                {news.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">{news.content}</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
};

export default NewsPage;
