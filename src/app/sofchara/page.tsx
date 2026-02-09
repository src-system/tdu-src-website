import { CharacterCard } from "@/src/app/_components/character-card";
import { ContentBlock } from "@/src/app/_components/content-block";
import { ContentCard } from "@/src/app/_components/content-card";
import { ContentSection } from "@/src/app/_components/content-section";
import { GuidelineSection } from "@/src/app/_components/guideline-section";
import { Section } from "@/src/app/_components/section";
import { CHARACTER_DATA } from "@/src/app/_lib/api";

const SofcharaPage = () => {
  return (
    <main>
      <ContentSection>
        <ContentCard>
          <ContentBlock
            title="ソフきゃら！"
            subtitle="CHARACTERS"
            description="「ソフきゃら」はソフトウェア研究部のオリジナルキャラクターたちです。部員たちが愛情を込めてデザイン・制作しました。ゲームや作品に登場したり、部の広報活動で活躍しています。"
          />
        </ContentCard>
      </ContentSection>

      <Section className="gap-6">
        <ContentBlock title="二次創作ガイドライン" subtitle="GUIDELINE" />
        <GuidelineSection
          okItems={[
            "ファンアート、イラストの制作・公開",
            "同人誌、グッズの制作（個人での頒布に限る）",
            "SNSでのファンアート投稿",
            "動画やゲームでの使用（非商用に限る）",
          ]}
          ngItems={[
            "公式を騙る行為",
            "商用利用（企業案件等）",
            "キャラクターのイメージを著しく損なう表現",
            "AI学習データとしての使用",
          ]}
        />
      </Section>

      <Section className="gap-6">
        <ContentBlock title="キャラクター一覧" subtitle="CHARACTER LIST" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {CHARACTER_DATA.map((character) => (
            <CharacterCard key={character.id} {...character} />
          ))}
        </div>
      </Section>
    </main>
  );
};

export default SofcharaPage;
