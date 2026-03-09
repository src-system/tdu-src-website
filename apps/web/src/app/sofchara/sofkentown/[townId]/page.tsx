export const revalidate = 1800 // 30分

import { MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ContentCard } from '@/src/app/_components/content-card'
import { LinkButton } from '@/src/app/_components/link-button'
import { PatternBackground } from '@/src/app/_components/pattern-background'
import type { LexicalContent } from '@/src/app/_components/rich-text'
import { RichText } from '@/src/app/_components/rich-text'
import { getSofkentownByUrlFromApi, getSofkentownListFromApi } from '@/src/app/_lib/api'

export async function generateStaticParams() {
  const sofkentownList = await getSofkentownListFromApi()
  return sofkentownList.map((town) => ({
    townId: town.url,
  }))
}

type Props = {
  params: Promise<{ townId: string }>
}

const SofkentownDetailPage = async ({ params }: Props) => {
  const { townId } = await params

  const town = await getSofkentownByUrlFromApi(townId)

  if (!town) {
    notFound()
  }

  return (
    <PatternBackground className="min-h-screen">
      <main className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl 2xl:max-w-7xl px-6 md:px-8">
          <ContentCard>
            <article>
              {town.imagePath && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
                  <Image
                    src={town.imagePath}
                    alt={town.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-6 h-6 text-forest" />
                <h1 className="text-3xl md:text-4xl font-bold text-forest">{town.name}</h1>
              </div>

              {town.description ? (
                <RichText
                  content={town.description as LexicalContent}
                  className="prose-headings:mt-8 prose-headings:mb-4 first:prose-headings:mt-0"
                />
              ) : (
                <p className="text-gray-600">説明はありません。</p>
              )}

              {town.relatedCharacters.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h2 className="text-2xl font-bold text-forest mb-6">関連キャラクター</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {town.relatedCharacters.map((character) => (
                      <Link
                        key={character.id}
                        href={`/sofchara/${character.id}`}
                        className="group flex flex-col items-center gap-2 rounded-xl bg-gray-50 p-4 transition-all duration-200 hover:bg-forest/5 hover:shadow-md"
                      >
                        <div className="relative w-20 h-28 md:w-24 md:h-32">
                          <Image
                            src={character.imagePath}
                            alt={character.name}
                            fill
                            className="object-contain transition-transform duration-200 group-hover:scale-105"
                          />
                        </div>
                        <span className="text-sm font-bold text-charcoal group-hover:text-forest transition-colors">
                          {character.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-12 pt-8 border-t border-gray-200 flex justify-center">
                <LinkButton href="/sofchara/sofkentown" text="ソフケンタウン一覧に戻る" />
              </div>
            </article>
          </ContentCard>
        </div>
      </main>
    </PatternBackground>
  )
}

export default SofkentownDetailPage
