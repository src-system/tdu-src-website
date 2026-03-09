export const revalidate = 1800 // 30分

import { notFound } from 'next/navigation'
import { ContentCard } from '@/src/app/_components/content-card'
import { HeroLabel } from '@/src/app/_components/hero-label'
import { LinkButton } from '@/src/app/_components/link-button'
import { PageHeader } from '@/src/app/_components/page-header'
import { PatternBackground } from '@/src/app/_components/pattern-background'
import { getTeamDataFromApi, getTeamDetailFromApi } from '@/src/app/_lib/api'
import { TeamAboutSection } from '../_components/team-about-section'
import { TeamGallerySection } from '../_components/team-gallery-section'
import { TeamLeaderInterviewSection } from '../_components/team-leader-interview-section'
import { TeamSoftwaresSection } from '../_components/team-softwares-section'

const FALLBACK_TEAM_NAMES = ['game', 'webapp', 'sound', '2d', '3d', 'design'] as const

export async function generateStaticParams() {
  const teamData = await getTeamDataFromApi()
  const teamNames = teamData.length > 0 ? teamData.map((t) => t.teamName) : [...FALLBACK_TEAM_NAMES]
  return teamNames.map((teamName) => ({ teamName }))
}

type Props = {
  params: Promise<{ teamName: string }>
}

const TeamDetailPage = async ({ params }: Props) => {
  const { teamName } = await params

  const team = await getTeamDetailFromApi(teamName)

  if (!team) {
    notFound()
  }

  const { pageHeader, aboutSection, leaderInterview, softwares, gallery } = team

  return (
    <main>
      <PageHeader imagePath={pageHeader.imagePath}>
        <HeroLabel text={pageHeader.title} />
      </PageHeader>

      <PatternBackground className="min-h-screen">
        <div className="py-16 md:py-24">
          <div className="mx-auto max-w-5xl 2xl:max-w-7xl px-6 md:px-8">
            <ContentCard>
              <article>
                <TeamAboutSection
                  title={aboutSection.title}
                  subtitle={aboutSection.subtitle}
                  description={aboutSection.description}
                  images={aboutSection.images}
                />

                {leaderInterview && (
                  <TeamLeaderInterviewSection
                    title={leaderInterview.title}
                    subtitle={leaderInterview.subtitle}
                    leaderName={leaderInterview.leaderName}
                    leaderImagePath={leaderInterview.leaderImagePath}
                    leaderImageAlt={leaderInterview.leaderImageAlt}
                    body={leaderInterview.body}
                    qa={leaderInterview.qa}
                  />
                )}

                {softwares && <TeamSoftwaresSection items={softwares.items} />}

                {gallery && <TeamGallerySection items={gallery.items} />}

                <div className="mt-12 pt-8 border-t border-gray-200 flex justify-center">
                  <LinkButton href="/team" text="班一覧に戻る" />
                </div>
              </article>
            </ContentCard>
          </div>
        </div>
      </PatternBackground>
    </main>
  )
}

export default TeamDetailPage
