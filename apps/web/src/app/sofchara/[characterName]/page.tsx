/** CMS 更新を即時反映するため動的レンダリング */
export const dynamic = 'force-dynamic'

import { ChevronLeftIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CharacterCard } from '@/src/app/_components/character-card'
import { Markdown } from '@/src/app/_components/markdown'
import { Partition } from '@/src/app/_components/partition'
import { ProfileGrid } from '@/src/app/_components/profile-item'
import { getCharacterData } from '@/src/app/_lib/api'

export async function generateStaticParams() {
  const characterData = await getCharacterData()
  return characterData.map((character) => ({
    characterName: character.id,
  }))
}

type Props = {
  params: Promise<{ characterName: string }>
}

const CharacterDetailPage = async ({ params }: Props) => {
  const { characterName } = await params

  const characterData = await getCharacterData()
  const character = characterData.find((c) => c.id === characterName)

  if (!character) {
    notFound()
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
              <div className="text-lg text-forest mb-6 [&_p]:my-0">
                <Markdown content={character.description} />
              </div>
              {character.backstory && (
                <div className="text-charcoal leading-relaxed">
                  <Markdown content={character.backstory} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Partition />

      <section className="mx-auto max-w-6xl 2xl:max-w-7xl md:px-20 2xl:px-32 px-5 md:py-15 2xl:py-20 py-10">
        <h2 className="text-xl font-bold text-charcoal mb-6">プロフィール</h2>
        <ProfileGrid
          items={[
            { label: '誕生日', value: character.profile?.birthday },
            { label: '身長', value: character.profile?.height },
            { label: '好きなもの', value: character.profile?.likes },
            { label: '苦手なもの', value: character.profile?.dislikes },
          ].filter((item): item is { label: string; value: string } => !!item.value)}
        />
      </section>

      <Partition />

      <section className="mx-auto max-w-6xl 2xl:max-w-7xl md:px-20 2xl:px-32 px-5 md:py-15 2xl:py-20 py-10">
        <h2 className="text-xl font-bold text-charcoal mb-6">他のキャラクター</h2>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {characterData
            .filter((c) => c.id !== characterName)
            .slice(0, 5)
            .map((otherChar) => (
              <CharacterCard key={otherChar.id} {...otherChar} size="sm" />
            ))}
        </div>
      </section>
    </main>
  )
}

export default CharacterDetailPage
