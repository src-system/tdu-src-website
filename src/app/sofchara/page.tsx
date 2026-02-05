import Image from "next/image";
import Link from "next/link";
import { ContentBlock } from "../_components/content-block";
import { Partition } from "../_components/partition";
import { TopImage } from "../_components/top-image";
import { CHARACTER_DATA } from "../_lib/api";

const SofcharaPage = () => {
  return (
    <main>
      <TopImage imagePath="/images/sofcharatop/ワカツキ_web.png" />
      <Partition />

      {/* 概要セクション */}
      <section className="flex w-full flex-col gap-5 bg-white mx-auto max-w-6xl md:px-20 px-5 md:py-15 py-10">
        <ContentBlock
          title="ソフきゃら！"
          subtitle="CHARACTERS"
          description="「ソフきゃら」はソフトウェア研究部のオリジナルキャラクターたちです。部員たちが愛情を込めてデザイン・制作しました。ゲームや作品に登場したり、部の広報活動で活躍しています。"
        />
      </section>

      <Partition />

      {/* 二次創作ガイドライン */}
      <section className="flex w-full flex-col gap-6 bg-white mx-auto max-w-6xl md:px-20 px-5 md:py-15 py-10">
        <ContentBlock title="二次創作ガイドライン" subtitle="GUIDELINE" />
        <div className="space-y-4 text-charcoal">
          <p>ソフきゃらの二次創作は、以下のガイドラインに沿っていただければ大歓迎です！</p>
          <div className="rounded-lg bg-forest/5 p-6 space-y-4">
            <div>
              <h4 className="font-bold text-forest mb-2">OK</h4>
              <ul className="space-y-1 text-sm">
                <li>・ファンアート、イラストの制作・公開</li>
                <li>・同人誌、グッズの制作（個人での頒布に限る）</li>
                <li>・SNSでのファンアート投稿</li>
                <li>・動画やゲームでの使用（非商用に限る）</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-red-600 mb-2">NG</h4>
              <ul className="space-y-1 text-sm">
                <li>・公式を騙る行為</li>
                <li>・商用利用（企業案件等）</li>
                <li>・キャラクターのイメージを著しく損なう表現</li>
                <li>・AI学習データとしての使用</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            ※ガイドラインは予告なく変更される場合があります。ご不明な点はお問い合わせください。
          </p>
        </div>
      </section>

      <Partition />

      {/* キャラクター一覧 */}
      <section className="flex w-full flex-col gap-6 bg-white mx-auto max-w-6xl md:px-20 px-5 md:py-15 py-10">
        <ContentBlock title="キャラクター一覧" subtitle="CHARACTER LIST" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {CHARACTER_DATA.map((character) => (
            <Link
              key={character.id}
              href={`/sofchara/${character.id}`}
              className="group flex flex-col items-center gap-3 rounded-xl bg-gray-50 p-4 transition-all duration-200 hover:bg-forest/5 hover:shadow-md"
            >
              <div className="relative w-32 h-40 md:w-40 md:h-52">
                <Image
                  src={character.imagePath}
                  alt={character.name}
                  fill
                  className="object-contain transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg text-charcoal">{character.name}</h3>
                <p className="text-sm text-gray-500">{character.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default SofcharaPage;
