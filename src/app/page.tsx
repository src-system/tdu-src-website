import { ContentBlock } from "@/src/app/_components/content-block";
import { ImageCard } from "@/src/app/_components/image-card";
import { LinkButton } from "@/src/app/_components/link-button";
import { NewsList } from "@/src/app/_components/news-carousel";
import { Partition } from "@/src/app/_components/partition";
import { RandomCharacter } from "@/src/app/_components/random-character";
import { SectionNav } from "@/src/app/_components/section-nav";
import { SplashLogo } from "@/src/app/_components/splash-logo";
import { TeamCard, TeamCardGrid } from "@/src/app/_components/team-card";
import { getAllContentBlocks, NEWS_DATA, TEAM_DATA } from "@/src/app/_lib/api";

const Home = async () => {
  const content = await getAllContentBlocks();

  return (
    <main>
      <SectionNav />
      <section className="relative h-[60svh] w-full overflow-hidden">
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
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-8 left-4 md:bottom-15 md:left-10 z-30">
          <div className="bg-white/95 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-sm mb-2">
            <span className="text-4xl md:text-6xl lg:text-7xl font-bold">
              <span className="bg-linear-to-r from-forest to-leaf bg-clip-text text-transparent">
                創造
              </span>
              <span className="text-charcoal">を、</span>
              <span className="bg-linear-to-r from-forest to-leaf bg-clip-text text-transparent">
                共有
              </span>
              <span className="text-charcoal">する。</span>
            </span>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center md:bottom-10 bottom-8">
          <SplashLogo />
        </div>
      </section>

      <Partition />
      <section id="about" className="relative bg-white py-16 md:py-24 overflow-hidden">
        <div className="relative mx-auto max-w-5xl 2xl:max-w-7xl px-6 md:px-8">
          <div className="bg-white border-3 border-forest/20 rounded-2xl md:p-12 p-6">
            <ContentBlock
              title={content.about.title}
              subtitle={content.about.subtitle}
              description={content.about.description}
            />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <ImageCard imagePath="/images/example/1.jpg" alt="千住キャンパス" />
              <ImageCard imagePath="/images/example/2.jpg" alt="旭祭の様子" />
              <ImageCard imagePath="/images/example/3.jpg" alt="ソフ会の様子" />
            </div>
            <div className="mt-8">
              <LinkButton href="/about" text="詳しく見る" />
            </div>
          </div>
        </div>
      </section>

      {/* 波形セクション区切り（TEAM上部） */}
      <svg
        className="w-full h-20 md:h-32 bg-green-50 block"
        viewBox="0 0 1920 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 0H1920V60Q1440 120 960 60Q480 0 0 60V0Z" fill="white" />
      </svg>

      {/* TEAMセクション */}
      <section id="team" className="relative bg-green-50 py-16 md:py-24 overflow-hidden">
        <div className="relative mx-auto max-w-5xl 2xl:max-w-7xl px-6 md:px-8">
          <ContentBlock
            title={content.team.title}
            subtitle={content.team.subtitle}
            description={content.team.description}
          />
          <div className="mt-8">
            <TeamCardGrid>
              {TEAM_DATA.map((team) => (
                <TeamCard key={team.teamName} {...team} />
              ))}
            </TeamCardGrid>
          </div>
          <div className="mt-8">
            <LinkButton href="/team" text="班の詳細を見る" />
          </div>
        </div>
      </section>

      {/* 波形セクション区切り（TEAM下部） */}
      <svg
        className="w-full h-20 md:h-32 bg-white block"
        viewBox="0 0 1920 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 0H1920V60Q1440 120 960 60Q480 0 0 60V0Z" fill="#f0fdf4" />
      </svg>

      {/* NEWSセクション */}
      <section id="news" className="relative bg-white py-16 md:py-24 overflow-hidden">
        <div className="relative mx-auto max-w-5xl 2xl:max-w-7xl px-6 md:px-8">
          <div className="bg-white border-3 border-forest/20 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <ContentBlock title={content.news.title} subtitle={content.news.subtitle} />
            </div>
            <NewsList items={[...NEWS_DATA]} />
          </div>
        </div>
      </section>

      <Partition />

      {/* CHARACTERSセクション */}
      <section id="characters" className="relative bg-green-50 py-16 md:py-24 overflow-hidden">
        {/* 背景パターン */}
        <div
          className="absolute inset-0 opacity-[0.06] z-0"
          style={{
            backgroundImage: "url('/images/pattern/sofchara-pattern.png')",
            backgroundSize: "400px",
            backgroundRepeat: "repeat",
          }}
        />
        <div className="relative z-10 mx-auto max-w-5xl 2xl:max-w-7xl px-6 md:px-8">
          <div className="bg-white rounded-2xl p-4 md:p-12 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="md:flex-3">
                <ContentBlock
                  title={content.characters.title}
                  subtitle={content.characters.subtitle}
                  description="ソフトウェア研究部のオリジナルキャラクター「ソフきゃら」。個性豊かな9人のキャラクターたちをご覧ください。"
                />
                <div className="mt-6">
                  <LinkButton href="/sofchara" text="キャラクター紹介" />
                </div>
              </div>
              <div className="flex justify-center md:justify-end md:flex-2">
                <RandomCharacter />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
