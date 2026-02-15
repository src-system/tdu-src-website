import { ContentBlock } from "@/src/app/_components/content-block";
import { ContentCard } from "@/src/app/_components/content-card";
import { HeroCatchphrase, type HeroCatchphraseProps } from "@/src/app/_components/hero-catchphrase";
import { ImageCard } from "@/src/app/_components/image-card";
import { LinkButton } from "@/src/app/_components/link-button";
import { NewsList } from "@/src/app/_components/news-carousel";
import { Partition } from "@/src/app/_components/partition";
import { PatternBackground } from "@/src/app/_components/pattern-background";
import { RandomCharacter } from "@/src/app/_components/random-character";
import { Section } from "@/src/app/_components/section";
import type { NavSection } from "@/src/app/_components/section-nav";
import { SectionNav } from "@/src/app/_components/section-nav";
import { SplashLogo } from "@/src/app/_components/splash-logo";
import { TeamCard, TeamCardGrid } from "@/src/app/_components/team-card";
import { WaveSection } from "@/src/app/_components/wave-section";
import { getAllContentBlocks, NEWS_DATA, TEAM_DATA } from "@/src/app/_lib/api";

const VIDEO_PATH = "/video/splash_movie.mp4";

const HOME_SECTIONS = [
  { id: "about", label: "ABOUT" },
  { id: "team", label: "TEAM" },
  { id: "news", label: "NEWS" },
  { id: "characters", label: "CHARACTERS" },
] as const satisfies NavSection[];

const HERO_SEGMENTS = [
  { text: "創造", highlighted: true },
  { text: "を、", highlighted: false },
  { text: "共有", highlighted: true },
  { text: "する。", highlighted: false },
] as const satisfies HeroCatchphraseProps["segments"];

const SPLASH_LOGO_ENABLED = true;

const Home = async () => {
  const content = await getAllContentBlocks();

  return (
    <main>
      <SectionNav sections={HOME_SECTIONS} />
      <div className="relative h-[60svh] min-h-[500px] w-full overflow-hidden">
        <video className="h-full w-full object-cover" autoPlay muted loop playsInline>
          <source src={VIDEO_PATH} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
        <HeroCatchphrase segments={HERO_SEGMENTS} />
        <div className="absolute inset-0 flex items-center justify-center md:bottom-10 bottom-8">
          <SplashLogo enabled={SPLASH_LOGO_ENABLED} />
        </div>
      </div>
      <Partition />

      <div id="about" className="relative bg-white py-16 md:py-24 overflow-hidden">
        <Section as="div" size="container">
          <ContentCard>
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
          </ContentCard>
        </Section>
      </div>

      <WaveSection
        id="team"
        bgColor="bg-green-50"
        topWaveBgColor="bg-green-50"
        topWaveColor="white"
        bottomWaveBgColor="bg-white"
        bottomWaveColor="#f0fdf4"
      >
        <Section as="div" size="container">
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
        </Section>
      </WaveSection>

      <div id="news" className="relative bg-white py-16 md:py-24 overflow-hidden">
        <Section as="div" size="container">
          <ContentCard>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <ContentBlock title={content.news.title} subtitle={content.news.subtitle} />
            </div>
            <NewsList items={[...NEWS_DATA]} />
          </ContentCard>
        </Section>
      </div>

      <Partition />

      <PatternBackground as="section" id="characters" className="py-16 md:py-24">
        <Section as="div" size="container">
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
        </Section>
      </PatternBackground>
    </main>
  );
};

export default Home;
