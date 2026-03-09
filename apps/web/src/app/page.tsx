export const revalidate = 300 // 5分

import { redirect } from 'next/navigation'
import { Catchphrase } from '@/src/app/_components/catchphrase'
import { ContentBlock } from '@/src/app/_components/content-block'
import { ContentCard } from '@/src/app/_components/content-card'
import { ImageCard } from '@/src/app/_components/image-card'
import { LinkButton } from '@/src/app/_components/link-button'
import { NewsList } from '@/src/app/_components/news-carousel'
import { Partition } from '@/src/app/_components/partition'
import { PatternBackground } from '@/src/app/_components/pattern-background'
import { RandomCharacter } from '@/src/app/_components/random-character'
import { Section } from '@/src/app/_components/section'
import type { NavSection } from '@/src/app/_components/section-nav'
import { SectionNav } from '@/src/app/_components/section-nav'
import { SplashLogo } from '@/src/app/_components/splash-logo'
import { TeamCard, TeamCardGrid } from '@/src/app/_components/team-card'
import { WaveSection } from '@/src/app/_components/wave-section'
import { getTopPageData } from '@/src/app/_lib/payload'

const HOME_SECTIONS = [
  { id: 'about', label: 'ABOUT' },
  { id: 'team', label: 'TEAM' },
  { id: 'news', label: 'NEWS' },
  { id: 'characters', label: 'CHARACTERS' },
] as const satisfies NavSection[]

const Home = async () => {
  const result = await getTopPageData()

  if (!result.success) {
    const failedItemsParam = result.failedItems.join(',')
    const params = new URLSearchParams({
      type: 'no-content',
      failedItems: failedItemsParam,
    })
    if (result.failedItems.includes('about-images')) {
      params.set(
        'message',
        'Aboutセクションには3枚の画像が必要です。\n\n画像が1枚も取得できなかったか、3枚に不足しています。Payload CMS の管理画面で About セクションに3枚以上の画像を設定してください。',
      )
    }
    if (result.failedItems.includes('no-characters')) {
      params.set(
        'message',
        'キャラクターが1件も登録されていません。\n\nPayload CMS の管理画面でキャラクターを1件以上登録してください。',
      )
    }
    redirect(`/error?${params.toString()}`)
  }

  const { topVideo, catchphrase, content, teamData, newsData, characters } = result.data

  return (
    <main>
      <SectionNav sections={HOME_SECTIONS} />
      <div className="relative h-[60svh] min-h-[500px] w-full overflow-hidden">
        <video className="h-full w-full object-cover" autoPlay muted loop playsInline>
          <source src={topVideo.videoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
        <Catchphrase segments={catchphrase.segments} />
        <div className="absolute inset-0 flex items-center justify-center md:bottom-10 bottom-8">
          <SplashLogo enabled={topVideo.logoEnabled} />
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
              {content.about.images.map((img) => (
                <ImageCard key={img.alt} imagePath={img.imagePath} alt={img.alt} />
              ))}
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
              {teamData.map((team) => (
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
              <ContentBlock
                title={content.news.title}
                subtitle={content.news.subtitle}
                description={content.news.description}
              />
            </div>
            <NewsList items={newsData} />
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
                  description={content.characters.description}
                />
                <div className="mt-6">
                  <LinkButton href="/sofchara" text="キャラクター紹介" />
                </div>
              </div>
              <div className="flex justify-center md:justify-end md:flex-2">
                <RandomCharacter characters={characters} />
              </div>
            </div>
          </div>
        </Section>
      </PatternBackground>
    </main>
  )
}

export default Home
