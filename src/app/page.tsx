import { ContentBlock } from "./_components/content-block";
import { ImageCard } from "./_components/image-card";
import { LinkButton } from "./_components/link-button";
import { NewsList } from "./_components/news-carousel";
import { Partition } from "./_components/partition";
import { RandomCharacter } from "./_components/random-character";
import { SplashLogo } from "./_components/splash-logo";
import { TeamCard, TeamCardGrid } from "./_components/team-card";
import { getAllContentBlocks, NEWS_DATA, TEAM_DATA } from "./_lib/api";

const Home = async () => {
  const content = await getAllContentBlocks();

  return (
    <main>
      <section className="relative md:h-[540px] h-[300px] w-full overflow-hidden bg-gray-900">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/video-poster.jpg"
        >
          <source src="/video/splash_movie.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex items-center justify-center">
          <SplashLogo />
        </div>
      </section>

      {/* セクション区切り */}
      <Partition />

      {/* ABOUTセクション */}
      <section className="flex w-full flex-col gap-5 bg-white mx-auto max-w-6xl md:px-20 px-5 md:py-15 py-10">
        <ContentBlock
          title={content.about.title}
          subtitle={content.about.subtitle}
          description={content.about.description}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 gap-4 md:px-0 px-8 py-4">
          <ImageCard imagePath="/images/example/1.webp" alt="example 1" />
          <ImageCard imagePath="/images/example/cover_products_nama.webp" alt="example 2" />
          <ImageCard imagePath="/images/example/FD5GC_R1_20250109.jpg" alt="example 3" />
        </div>
        <div className="flex justify-start px-2.5">
          <LinkButton href="/about" text="詳しく見る" />
        </div>
      </section>

      <Partition />

      {/* TEAMセクション */}
      <section className="flex w-full flex-col gap-5 bg-white mx-auto max-w-6xl md:px-20 px-5 md:py-15 py-10">
        <ContentBlock
          title={content.team.title}
          subtitle={content.team.subtitle}
          description={content.team.description}
        />
        <div className="md:px-0 px-8 py-4">
          <TeamCardGrid>
            {TEAM_DATA.map((team) => (
              <TeamCard key={team.teamName} {...team} />
            ))}
          </TeamCardGrid>
        </div>
      </section>

      <Partition />

      {/* NEWSセクション */}
      <section className="flex w-full flex-col gap-5 bg-white mx-auto max-w-6xl md:px-20 px-5 md:py-15 py-10">
        <ContentBlock title={content.news.title} subtitle={content.news.subtitle} />
        <div className="md:px-0 px-8 py-2">
          <NewsList items={[...NEWS_DATA]} />
        </div>
      </section>

      <Partition />

      {/* CHARACTERSセクション */}
      <section className="relative w-full bg-linear-to-b from-white to-gray-50 mx-auto max-w-6xl md:px-20 px-5 md:py-15 py-10 overflow-hidden">
        <div className="md:flex md:items-center md:justify-between md:gap-10">
          <div className="flex flex-col gap-5 md:flex-1">
            <ContentBlock title={content.characters.title} subtitle={content.characters.subtitle} />
            <div className="flex justify-start px-2.5">
              <LinkButton href="/characters" text="特設サイトへ" />
            </div>
          </div>
          <div className="flex justify-center md:justify-end flex-shrink-0 w-full md:w-72">
            <RandomCharacter />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
