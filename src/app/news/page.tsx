import { ContentBlock } from "@/src/app/_components/content-block";
import { ContentCard } from "@/src/app/_components/content-card";
import { HeroLabel } from "@/src/app/_components/hero-label";
import { PageHeader } from "@/src/app/_components/page-header";
import { PatternBackground } from "@/src/app/_components/pattern-background";
import { NewsList } from "@/src/app/news/_components/news-list";

const NewsPage = () => {
  return (
    <PatternBackground>
      <main>
        <PageHeader imagePath="/images/example/1.jpg">
          <HeroLabel text="新着情報" />
        </PageHeader>
        <div className="py-16 md:py-24">
          <div className="mx-auto max-w-5xl 2xl:max-w-7xl px-6 md:px-8">
            <ContentCard>
              <ContentBlock
                title="NEWS"
                subtitle="新着情報"
                description="ソフトウェア研究部の最新ニュースをお届けします。"
              />
              <div className="mt-6">
                <NewsList />
              </div>
            </ContentCard>
          </div>
        </div>
      </main>
    </PatternBackground>
  );
};

export default NewsPage;
