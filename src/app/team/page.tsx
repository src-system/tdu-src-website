import { ContentBlock } from "@/src/app/_components/content-block";
import { ContentCard } from "@/src/app/_components/content-card";
import { ContentSection } from "@/src/app/_components/content-section";
import { HeroLabel } from "@/src/app/_components/hero-label";
import { PageHeader } from "@/src/app/_components/page-header";
import { Section } from "@/src/app/_components/section";
import { TeamCard, TeamCardGrid } from "@/src/app/_components/team-card";
import { TEAM_DATA } from "@/src/app/_lib/api";

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

      <Section>
        <TeamCardGrid>
          {TEAM_DATA.map((team) => (
            <TeamCard key={team.teamName} {...team} />
          ))}
        </TeamCardGrid>
      </Section>
    </main>
  );
};

export default TeamListPage;
