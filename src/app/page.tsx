import { ContentBlock } from "./_components/content-block";
import { FooterCharacter } from "./_components/footer-character";
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
      <section className="relative md:aspect-3/1 aspect-4/3 w-full overflow-hidden bg-gray-900">
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
      <Partition />

      {/* ABOUTセクション */}
      <section className="flex flex-col w-full gap-2 bg-white mx-auto max-w-6xl 2xl:max-w-7xl md:px-20 2xl:px-32 px-6 md:py-15 2xl:py-20 py-10">
        <ContentBlock
          title={content.about.title}
          subtitle={content.about.subtitle}
          description={content.about.description}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 2xl:gap-10 md:gap-4 gap-6 md:px-0 px-6 py-2">
          <ImageCard imagePath="/images/example/1.jpg" alt="我らの東京電機大学の千住キャンパス" />
          <ImageCard imagePath="/images/example/2.jpg" alt="秋頃に行われる学園祭「旭祭」の様子" />
          <ImageCard imagePath="/images/example/3.jpg" alt="定期部内行事の「ソフ会」の様子" />
        </div>
        <div className="flex justify-start px-2.5">
          <LinkButton href="/about" text="詳しく見る" />
        </div>
      </section>

      <Partition />

      {/* TEAMセクション */}
      <section className="flex w-full flex-col gap-5 bg-white mx-auto max-w-6xl 2xl:max-w-7xl md:px-20 2xl:px-32 px-5 md:py-15 2xl:py-20 py-10">
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
      <section className="flex w-full flex-col gap-5 bg-white mx-auto max-w-6xl 2xl:max-w-7xl md:px-20 2xl:px-32 px-5 md:py-15 2xl:py-20 py-10">
        <ContentBlock title={content.news.title} subtitle={content.news.subtitle} />
        <div className="md:px-0 px-8 py-2">
          <NewsList items={[...NEWS_DATA]} />
        </div>
      </section>

      <Partition />

      {/* CHARACTERSセクション */}
      <section className="relative w-full from-white to-gray-50 mx-auto max-w-6xl 2xl:max-w-7xl md:px-20 2xl:px-32 px-5 md:py-15 2xl:py-20 py-10 overflow-hidden">
        <div className="md:flex md:items-center md:justify-between md:gap-10 2xl:gap-16">
          <div className="flex flex-col gap-5 md:flex-1">
            <ContentBlock title={content.characters.title} subtitle={content.characters.subtitle} />
            <div className="flex justify-start px-2.5">
              <LinkButton href="/sofchara" text="特設サイトへ" />
            </div>
          </div>
          <div className="flex justify-center items-center mt-8 md:mt-0 md:flex-1 md:justify-end">
            <div className="transform md:scale-120 md:-mb-16 md:mr-4">
              <RandomCharacter />
            </div>
          </div>
        </div>
      </section>

      <FooterCharacter />
    </main>
  );
};

export default Home;
