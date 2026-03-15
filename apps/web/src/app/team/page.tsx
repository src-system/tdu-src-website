export const revalidate = 300 // 5分

import { redirect } from 'next/navigation'
import { ContentBlock } from '@/src/app/_components/content-block'
import { ContentCard } from '@/src/app/_components/content-card'
import { ContentSection } from '@/src/app/_components/content-section'
import { HeroLabel } from '@/src/app/_components/hero-label'
import { PageHeader } from '@/src/app/_components/page-header'
import { getTeamIntroDataFromApi, getTeamPageDataFromApi } from '@/src/app/_lib/api'
import { TeamIntroCard } from '@/src/app/team/_components/team-intro-card'

const TeamListPage = async () => {
  const [teamPageData, teamIntroData] = await Promise.all([
    getTeamPageDataFromApi(),
    getTeamIntroDataFromApi(),
  ])

  if (!teamPageData || !teamPageData.pageHeader.imagePath) {
    const params = new URLSearchParams({
      type: 'no-content',
      failedItems: 'Teamページ',
      message:
        'Teamページのトップ画像が設定されていません。\n\nPayload CMS の管理画面で Teamページ のトップ画像を設定してください。',
    })
    redirect(`/error?${params.toString()}`)
  }

  const { pageHeader, teamOverview } = teamPageData

  return (
    <main>
      <PageHeader imagePath={pageHeader.imagePath}>
        <HeroLabel text={pageHeader.title} />
      </PageHeader>
      <ContentSection>
        <ContentCard>
          <ContentBlock
            title={teamOverview.title}
            subtitle={teamOverview.subtitle}
            description={teamOverview.description}
          />
        </ContentCard>
      </ContentSection>
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-white via-green-50/50 to-white" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "url('/images/pattern/sofchara-pattern.png')",
            backgroundSize: '250px',
          }}
        />
        <div
          className="absolute top-40 -left-32 w-96 h-96 bg-mint/20 rounded-full blur-3xl"
          style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 384px' }}
          aria-hidden="true"
        />
        <div
          className="absolute top-1/3 -right-32 w-80 h-80 bg-forest/15 rounded-full blur-3xl"
          style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 320px' }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-leaf/10 rounded-full blur-3xl"
          style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 288px' }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-40 right-1/3 w-64 h-64 bg-mint/15 rounded-full blur-3xl"
          style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 256px' }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl 2xl:max-w-7xl px-5 md:px-8 py-12 md:py-20">
          <div className="flex flex-col gap-8 md:gap-12">
            {teamIntroData.map((team, index) => (
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
