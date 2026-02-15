import { ContentBlock } from '@/src/app/_components/content-block'
import { ContentCard } from '@/src/app/_components/content-card'
import { ContentSection } from '@/src/app/_components/content-section'
import { HeroLabel } from '@/src/app/_components/hero-label'
import { PageHeader } from '@/src/app/_components/page-header'
import { TEAM_INTRO_DATA } from '@/src/app/_lib/api'
import { TeamIntroCard } from '@/src/app/team/_components/team-intro-card'

const TeamListPage = () => {
  return (
    <main>
      <PageHeader imagePath="/images/team-card/game.png">
        <HeroLabel text="ソフ研にある班を紹介" />
      </PageHeader>
      <ContentSection>
        <ContentCard>
          <ContentBlock
            title="TEAM"
            subtitle="班紹介"
            description="ソフトウェア研究部は6つの班で構成されています。それぞれの班で異なる分野の創作活動を行っており、興味のある分野を選んで活動できます。"
          />
        </ContentCard>
      </ContentSection>

      {/* 班紹介セクション */}
      <section className="relative w-full overflow-hidden">
        {/* 背景デザイン */}
        <div className="absolute inset-0 bg-linear-to-b from-white via-green-50/50 to-white" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "url('/images/pattern/sofchara-pattern.png')",
            backgroundSize: '250px',
          }}
        />

        {/* 装飾的なぼかし円 */}
        <div className="absolute top-40 -left-32 w-96 h-96 bg-mint/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-80 h-80 bg-forest/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-leaf/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-1/3 w-64 h-64 bg-mint/15 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-6xl 2xl:max-w-7xl px-5 md:px-8 py-12 md:py-20">
          <div className="flex flex-col gap-8 md:gap-12">
            {TEAM_INTRO_DATA.map((team, index) => (
              <TeamIntroCard
                key={team.teamName}
                teamName={team.teamName}
                displayName={team.displayName}
                description={team.description}
                imagePath={team.imagePath}
                activities={Array.from(team.activities)}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default TeamListPage
