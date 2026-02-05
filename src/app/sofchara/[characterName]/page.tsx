import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Partition } from "@/src/app/_components/partition";
import { CHARACTER_DATA } from "@/src/app/_lib/api";

export function generateStaticParams() {
  return CHARACTER_DATA.map((character) => ({
    characterName: character.id,
  }));
}

type Props = {
  params: Promise<{ characterName: string }>;
};

const CharacterDetailPage = async ({ params }: Props) => {
  const { characterName } = await params;

  const character = CHARACTER_DATA.find((c) => c.id === characterName);

  if (!character) {
    notFound();
  }

  return (
    <main>
      <div className="bg-gradient-to-b from-forest/10 to-white">
        <div className="mx-auto max-w-6xl md:px-20 px-5 pt-8 pb-4">
          <Link
            href="/sofchara"
            className="inline-flex items-center gap-1 text-sm text-forest hover:underline"
          >
            <ChevronLeftIcon className="size-4" />
            キャラクター一覧に戻る
          </Link>
        </div>

        <div className="mx-auto max-w-6xl md:px-20 px-5 pb-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative w-64 h-80 md:w-80 md:h-[26rem] flex-shrink-0">
              <Image
                src={character.imagePath}
                alt={character.name}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-2">
                {character.name}
              </h1>
              <p className="text-lg text-forest mb-6">{character.description}</p>
              <p className="text-charcoal leading-relaxed">{character.backstory}</p>
            </div>
          </div>
        </div>
      </div>

      <Partition />

      <section className="mx-auto max-w-6xl md:px-20 px-5 md:py-15 py-10">
        <h2 className="text-xl font-bold text-charcoal mb-6">プロフィール</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-4">
            <span className="text-forest font-bold w-24">誕生日</span>
            <span className="text-charcoal">{character.profile.birthday}</span>
          </div>
          <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-4">
            <span className="text-forest font-bold w-24">身長</span>
            <span className="text-charcoal">{character.profile.height}</span>
          </div>
          <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-4">
            <span className="text-forest font-bold w-24">好きなもの</span>
            <span className="text-charcoal">{character.profile.likes}</span>
          </div>
          <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-4">
            <span className="text-forest font-bold w-24">苦手なもの</span>
            <span className="text-charcoal">{character.profile.dislikes}</span>
          </div>
        </div>
      </section>

      <Partition />

      <section className="mx-auto max-w-6xl md:px-20 px-5 md:py-15 py-10">
        <h2 className="text-xl font-bold text-charcoal mb-6">他のキャラクター</h2>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {CHARACTER_DATA.filter((c) => c.id !== characterName)
            .slice(0, 5)
            .map((otherChar) => (
              <Link
                key={otherChar.id}
                href={`/sofchara/${otherChar.id}`}
                className="group flex flex-col items-center gap-2 rounded-lg p-2 transition-all hover:bg-forest/5"
              >
                <div className="relative w-16 h-20 md:w-20 md:h-28">
                  <Image
                    src={otherChar.imagePath}
                    alt={otherChar.name}
                    fill
                    className="object-contain transition-transform group-hover:scale-105"
                  />
                </div>
                <span className="text-xs md:text-sm text-charcoal text-center">
                  {otherChar.name}
                </span>
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
};

export default CharacterDetailPage;
