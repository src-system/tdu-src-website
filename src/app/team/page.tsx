import { ContentBlock } from "@/src/app/_components/content-block";
import { Partition } from "@/src/app/_components/partition";
import { TeamCard, TeamCardGrid } from "@/src/app/_components/team-card";
import { TopImage } from "@/src/app/_components/top-image";
import { TEAM_DATA } from "@/src/app/_lib/api";

const TeamListPage = () => {
  return (
    <main>
      <TopImage imagePath="/images/team-card/game.png" />
      <Partition />

      <section className="flex w-full flex-col gap-5 bg-white mx-auto max-w-6xl md:px-20 px-5 md:py-15 py-10">
        <ContentBlock
          title="TEAM"
          subtitle="班紹介"
          description="ソフトウェア研究部は6つの班で構成されています。それぞれの班で異なる分野の創作活動を行っており、興味のある分野を選んで活動できます。"
        />
      </section>

      <Partition />

      <section className="flex w-full flex-col gap-5 bg-white mx-auto max-w-6xl md:px-20 px-5 md:py-15 py-10">
        <TeamCardGrid>
          {TEAM_DATA.map((team) => (
            <TeamCard key={team.teamName} {...team} />
          ))}
        </TeamCardGrid>
      </section>
    </main>
  );
};

export default TeamListPage;
