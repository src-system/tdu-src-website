import { ContentBlock } from "@/src/app/_components/content-block";
import { ContentCard } from "@/src/app/_components/content-card";
import { ContentSection } from "@/src/app/_components/content-section";
import { HeroLabel } from "@/src/app/_components/hero-label";
import { NewsCard } from "@/src/app/_components/news-card";
import { PageHeader } from "@/src/app/_components/page-header";
import { Section } from "@/src/app/_components/section";
import { NEWS_DATA } from "@/src/app/_lib/api";

const NewsPage = () => {
  return (
    <main>
      <PageHeader imagePath="/images/example/1.jpg">
        <HeroLabel text="新着情報" />
      </PageHeader>
      <ContentSection>
        <ContentCard>
          <ContentBlock
            title="NEWS"
            subtitle="新着情報"
            description="ソフトウェア研究部の最新ニュースをお届けします。"
          />
        </ContentCard>
      </ContentSection>

      <Section variant="tight" className="gap-6">
        {NEWS_DATA.map((news) => (
          <NewsCard key={news.id} {...news} variant="full" />
        ))}
      </Section>
    </main>
  );
};

export default NewsPage;
