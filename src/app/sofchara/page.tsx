import Image from "next/image";
import { ContentBlock } from "@/src/app/_components/content-block";
import { ContentCard } from "@/src/app/_components/content-card";
import { ContentSection } from "@/src/app/_components/content-section";
import { HeroLabel } from "@/src/app/_components/hero-label";
import { LinkButton } from "@/src/app/_components/link-button";
import { PageHeader } from "@/src/app/_components/page-header";
import { Section } from "@/src/app/_components/section";
import { CHARACTER_DATA } from "@/src/app/_lib/api";
import { CharacterList } from "@/src/app/sofchara/_components/character-list";

const SofcharaPage = () => {
  return (
    <main>
      <PageHeader imagePath={CHARACTER_DATA[0].imagePath}>
        <HeroLabel text="ソフきゃら！" />
      </PageHeader>
      <section className="relative overflow-hidden bg-linear-to-b from-green-50/70 via-white to-white">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: "url('/images/pattern/sofchara-pattern.png')",
              backgroundSize: "320px",
              backgroundRepeat: "repeat",
            }}
          />
        </div>
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-mint/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 h-72 w-72 rounded-full bg-forest/15 blur-3xl pointer-events-none" />
        <ContentSection>
          <ContentCard>
            <div className="space-y-8">
              <ContentBlock
                title="ソフきゃら！"
                subtitle="ABOUT SOFCHARA"
                description={
                  "ソフきゃら！は、東京電機大学千住キャンパスの学生団体であるソフトウェア研究部が運営する「広報キャラ企画」です。\n\n公式コンテンツ、イベントでの公開、部内外問わない二次創作により本企画を創作の基盤として発展させ、同時にソフトウェア研究部の活動や魅力を伝えることを目的としています。"
                }
              />
              <div className="grid grid-cols-1 gap-8 rounded-2xl border border-forest/10 bg-white/85 p-5 md:grid-cols-[220px_1fr] md:items-center md:p-8 shadow-[0_10px_30px_rgba(6,130,0,0.08)]">
                <div className="mx-auto rounded-full border-4 border-white bg-linear-to-br from-mint/20 to-forest/10 p-3 shadow-md">
                  <Image
                    src="/images/sofchara/sofchara_icon.avif"
                    alt="ソフきゃら！ロゴ"
                    width={220}
                    height={220}
                    className="h-auto w-[180px] rounded-full md:w-[220px]"
                    priority
                  />
                </div>
                <div className="space-y-4 text-charcoal">
                  <h3 className="text-2xl font-bold text-forest">みんなで盛り上げる</h3>
                  <p className="leading-relaxed">
                    ソフきゃら！では、このコンテンツを最大限楽しんでもらうためにあらゆるジャンルの二次創作活動を歓迎しています。
                  </p>
                  <p className="leading-relaxed">
                    イラスト、3Dモデル、ゲーム、楽曲、小説、漫画、コスプレなど、様々な形態での二次創作活動でソフきゃら！を一緒に盛り上げましょう。
                  </p>
                  <p className="leading-relaxed">
                    ソフトウェア研究部に所属していない方、東京電機大学の学生でない方による二次創作も歓迎しています。
                  </p>
                </div>
              </div>
            </div>
          </ContentCard>
        </ContentSection>
      </section>

      <Section className="gap-6">
        <ContentBlock title="PROJECT CONCEPT" subtitle="企画の広がり" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-forest/20 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative mb-4 aspect-16/10 overflow-hidden rounded-xl">
              <Image
                src="/images/sofchara/sofchara_icon.avif"
                alt="二次創作イメージ"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-forest">二次創作</h3>
              <p className="text-charcoal leading-relaxed">
                部内外を問わず、幅広い創作活動を歓迎しています。制作前にはガイドラインをご確認ください。
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-forest/20 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative mb-4 aspect-16/10 overflow-hidden rounded-xl">
              <Image
                src={CHARACTER_DATA[1].imagePath}
                alt="キャラクターイメージ"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-forest">キャラクター</h3>
              <p className="text-charcoal leading-relaxed">
                キャラクターは部員の「好き」から生まれます。個性豊かなキャラクターが集まり、誰かの推しになる場を目指しています。
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-forest/20 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative mb-4 aspect-16/10 overflow-hidden rounded-xl">
              <Image
                src={CHARACTER_DATA[2].imagePath}
                alt="ソフケンタウンイメージ"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-forest">ソフケンタウン</h3>
              <p className="text-charcoal leading-relaxed">
                全キャラクター共通の舞台設定として発展中。公式・ファンメイドを横断して関係性が広がっていきます。
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="gap-6">
        <ContentBlock title="二次創作ガイドライン" subtitle="GUIDELINE" />
        <ContentCard>
          <div className="space-y-5 rounded-xl bg-linear-to-r from-green-50 to-white p-5 md:p-7">
            <p className="text-charcoal leading-relaxed">
              二次創作に関する詳細なルールは専用ページにまとめています。制作・公開前に必ずご確認ください。
            </p>
            <LinkButton href="/sofchara/guideline" text="ガイドラインを見る" />
          </div>
        </ContentCard>
      </Section>

      <Section className="gap-6">
        <ContentBlock title="キャラクター一覧" subtitle="CHARACTER LIST" />
        <CharacterList characters={CHARACTER_DATA} />
      </Section>
    </main>
  );
};

export default SofcharaPage;
