export const revalidate = 300 // 5分

import { redirect } from 'next/navigation'
import { ContentBlock } from '@/src/app/_components/content-block'
import { ContentCard } from '@/src/app/_components/content-card'
import { ContentSection } from '@/src/app/_components/content-section'
import { HeroLabel } from '@/src/app/_components/hero-label'
import { PageHeader } from '@/src/app/_components/page-header'
import { type LexicalContent, RichText } from '@/src/app/_components/rich-text'
import { SectionNav } from '@/src/app/_components/section-nav'
import { isValidLexicalContent } from '@/src/app/_lib/lexical-utils'
import { getAboutPageData } from '@/src/app/_lib/payload'
import { HistorySection } from '@/src/app/about/_components/history-section'
import { TopicCard } from '@/src/app/about/_components/topic-card'

const About = async () => {
  const data = await getAboutPageData()

  if (!data) {
    const params = new URLSearchParams({
      type: 'no-content',
      failedItems: 'about-page',
      message:
        'Aboutページのコンテンツを取得できませんでした。\n\nPayload CMS の管理画面で Aboutページ の設定を確認してください。',
    })
    redirect(`/error?${params.toString()}`)
  }

  const { pageHeader, aboutSection, activitySection, historySection } = data

  return (
    <main>
      <SectionNav
        sections={[
          { id: 'about', label: 'ソフトウェア研究部とは？' },
          { id: 'activity', label: '活動内容' },
          { id: 'history', label: '歴史' },
        ]}
      />
      <PageHeader imagePath={pageHeader.imagePath || '/images/about.png'}>
        <HeroLabel text={pageHeader.title} />
      </PageHeader>
      <ContentSection sectionId="about">
        <ContentCard>
          <div>
            <ContentBlock title={aboutSection.title} subtitle={aboutSection.subtitle} />
            {isValidLexicalContent(aboutSection.description) && (
              <RichText content={aboutSection.description as LexicalContent} className="mt-4" />
            )}
          </div>
        </ContentCard>
      </ContentSection>

      <svg
        className="w-full h-20 md:h-32 bg-green-50 block"
        viewBox="0 0 1920 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 0H1920V60Q1440 120 960 60Q480 0 0 60V0Z" fill="white" />
      </svg>

      <section
        id="activity"
        className="relative w-full bg-linear-to-b from-green-50 via-white to-white overflow-hidden"
      >
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute top-20 left-10 w-72 h-72 bg-forest/10 rounded-full blur-3xl"
            style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 288px' }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-mint/10 rounded-full blur-3xl"
            style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 384px' }}
            aria-hidden="true"
          />
        </div>
        <div className="relative mx-auto max-w-6xl 2xl:max-w-7xl md:px-20 2xl:px-32 px-5 md:py-15 2xl:py-20 py-10">
          <ContentBlock
            title={activitySection.title}
            subtitle={activitySection.subtitle}
            description="ソフ研では、以下のような活動を行っています。"
          />
          <div className="flex flex-col gap-10 mt-8">
            {activitySection.items.length > 0 ? (
              activitySection.items.map((item, i) => (
                <TopicCard
                  key={`${item.title}-${i}`}
                  title={item.title}
                  description={item.description}
                  image={item.imagePath || '/images/team-card/YAMAZAKI.jpg'}
                />
              ))
            ) : (
              <p className="text-gray-500">活動内容はまだ登録されていません。</p>
            )}
          </div>
        </div>
      </section>

      <div id="history">
        <HistorySection
          title={historySection.title}
          subtitle={historySection.subtitle}
          items={historySection.timeline}
        />
      </div>
    </main>
  )
}

export default About
