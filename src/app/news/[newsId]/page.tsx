import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Partition } from "../../_components/partition";
import { NEWS_DATA } from "../../_lib/api";

export function generateStaticParams() {
  return NEWS_DATA.map((news) => ({
    newsId: news.id,
  }));
}

type Props = {
  params: Promise<{ newsId: string }>;
};

const NewsDetailPage = async ({ params }: Props) => {
  const { newsId } = await params;

  const news = NEWS_DATA.find((n) => n.id === newsId);

  if (!news) {
    notFound();
  }

  return (
    <main>
      <div className="relative aspect-video md:aspect-3/1 w-full overflow-hidden">
        <Image src={news.imagePath} alt={news.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
      </div>

      <Partition />

      <article className="mx-auto max-w-4xl md:px-20 px-5 md:py-15 py-10">
        <Link
          href="/news"
          className="inline-flex items-center gap-1 text-sm text-forest hover:underline mb-6"
        >
          <ChevronLeftIcon className="size-4" />
          ニュース一覧に戻る
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <span className="rounded-full bg-forest/10 px-3 py-1 text-sm text-forest">
            {news.category}
          </span>
          <span className="text-gray-500">{news.date}</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-charcoal mb-8">{news.title}</h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{news.content}</p>
        </div>
      </article>

      <Partition />

      <section className="mx-auto max-w-4xl md:px-20 px-5 md:py-15 py-10">
        <h2 className="text-xl font-bold text-charcoal mb-6">その他のニュース</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {NEWS_DATA.filter((n) => n.id !== newsId)
            .slice(0, 2)
            .map((otherNews) => (
              <Link
                key={otherNews.id}
                href={`/news/${otherNews.id}`}
                className="group flex gap-4 rounded-lg border border-gray-200 p-3 transition-all hover:border-forest/30 hover:shadow-sm"
              >
                <div className="relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={otherNews.imagePath}
                    alt={otherNews.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center gap-1">
                  <span className="text-xs text-gray-500">{otherNews.date}</span>
                  <h3 className="text-sm font-medium text-charcoal group-hover:text-forest line-clamp-2">
                    {otherNews.title}
                  </h3>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
};

export default NewsDetailPage;
