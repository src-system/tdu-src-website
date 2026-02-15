import fs from 'node:fs/promises'
import path from 'node:path'
import { ContentBlock } from '@/src/app/_components/content-block'
import { ContentCard } from '@/src/app/_components/content-card'
import { ContentSection } from '@/src/app/_components/content-section'
import { HeroLabel } from '@/src/app/_components/hero-label'
import { Markdown } from '@/src/app/_components/markdown'
import { PageHeader } from '@/src/app/_components/page-header'
import { SectionNav } from '@/src/app/_components/section-nav'
import { HistorySection } from '@/src/app/about/_components/history-section'
import { TopicCard } from '@/src/app/about/_components/topic-card'

const About = async () => {
  const markdownPath = path.join(process.cwd(), 'public/markdown/部の活動(仮).md')
  const markdownContent = await fs.readFile(markdownPath, 'utf-8')
  return (
    <main>
      <SectionNav
        sections={[
          { id: 'about', label: 'ABOUT' },
          { id: 'activity', label: 'Activity' },
          { id: 'history', label: 'History' },
        ]}
      />
      <PageHeader imagePath="/images/about.png">
        <HeroLabel text="部の活動" />
      </PageHeader>
      <ContentSection sectionId="about">
        <ContentCard>
          <div>
            <ContentBlock title="ABOUT" subtitle="ソフトウェア研究部とは？" />
            <Markdown content={markdownContent} />
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
          <div className="absolute top-20 left-10 w-72 h-72 bg-forest/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-mint/10 rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl 2xl:max-w-7xl md:px-20 2xl:px-32 px-5 md:py-15 2xl:py-20 py-10">
          <ContentBlock
            title="Activity"
            subtitle="活動内容"
            description="ソフ研では、以下のような活動を行っています。"
          />
          <div className="flex flex-col gap-10 mt-8">
            <TopicCard
              title="活動内容"
              description="ソフ研では、以下のような活動を行っています。"
              image="/images/team-card/YAMAZAKI.jpg"
            />
            <TopicCard
              title="活動内容"
              description="ソフ研では、以下のような活動を行っています。"
              image="/images/team-card/YAMAZAKI.jpg"
            />
            <TopicCard
              title="活動内容"
              description="ソフ研では、以下のような活動を行っています。"
              image="/images/team-card/YAMAZAKI.jpg"
            />
          </div>
        </div>
      </section>

      <div id="history">
        <HistorySection />
      </div>
    </main>
  )
}

export default About
