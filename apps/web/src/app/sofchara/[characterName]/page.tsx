/** ISR: キャラクター詳細は30分ごとに再検証 */
export const revalidate = 1800 // 30分

import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ImageCard } from '@/src/app/_components/image-card'
import { type LexicalContent, RichText } from '@/src/app/_components/rich-text'
import {
  type CharacterRules,
  getCharacterByUrlFromApi,
  getCharacterData,
  getSofkentownsByCharacterUrlFromApi,
} from '@/src/app/_lib/api'
import { BackToListLink } from './_components/back-to-list-link'
import { CharacterImageViewer } from './_components/character-image-viewer'
import { CharacterTitle } from './_components/character-title'

export async function generateStaticParams() {
  const characterData = await getCharacterData()
  return characterData.map((character) => ({
    characterName: character.id,
  }))
}

type Props = {
  params: Promise<{ characterName: string }>
}

const RULE_LABELS: Record<keyof Omit<CharacterRules, 'others'>, string> = {
  r18: 'R-18表現（性的表現）',
  r18g: 'R-18G表現（暴力・グロ表現）',
  colabo: '「ソフきゃら！」外のキャラクターとの絡み（コラボ）',
  coupling: 'カップリング表現',
  snsRolePlaying: 'SNSでのなりきり活動',
  modification: '元のキャラクターと分かる範囲での大きな改変（TS・人外化・体型変化など）',
}

const RULE_DISPLAY: Record<string, { label: string; className: string }> = {
  allowed: { label: '〇 可能', className: 'text-green-600' },
  conditional: { label: '△ 条件付き許可', className: 'text-yellow-600' },
  prohibited: { label: '✕ 不可', className: 'text-red-600' },
}

const CharacterDetailPage = async ({ params }: Props) => {
  const { characterName } = await params

  const [character, relatedSofkentowns] = await Promise.all([
    getCharacterByUrlFromApi(characterName),
    getSofkentownsByCharacterUrlFromApi(characterName),
  ])

  if (!character) {
    notFound()
  }

  // デフォルト衣装 + 別衣装を統合
  const allOutfits = [
    {
      name: 'デフォルト衣装',
      fullbodyImagePath: character.imagePath,
      portraitImagePath: character.portraitImagePath,
      label: character.imageLabel || 'default',
      author: character.author,
    },
    ...character.alternates.map((alt) => ({
      name: alt.name,
      fullbodyImagePath: alt.fullbodyImagePath,
      portraitImagePath: alt.portraitImagePath || alt.fullbodyImagePath,
      label: alt.name,
      author: alt.author || '',
    })),
  ]

  return (
    <main className="bg-white min-h-screen">
      {/* ヘッダーセクション */}
      <div className="mx-auto max-w-4xl px-5 pt-6">
        {/* 戻るリンク + タイトル */}
        <div className="mb-6">
          <BackToListLink />
          <div className="mt-3">
            <CharacterTitle enName={character.enName} name={character.name} />
          </div>
        </div>

        {/* キャラクター表示エリア */}
        <div className="flex flex-col items-center mb-8">
          <CharacterImageViewer characterName={character.name} outfits={allOutfits} />
        </div>

        {/* キャッチフレーズ */}
        {character.catchphrase && (
          <div className="mb-8 text-center">
            <p className="inline-block text-2xl md:text-4xl font-bold leading-relaxed whitespace-pre-line text-forest border-b-4 border-forest pb-2">
              {character.catchphrase}
            </p>
          </div>
        )}

        {/* ギャラリー */}
        {character.gallery.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-10">
            {character.gallery.map((item) => (
              <ImageCard key={item.imagePath} imagePath={item.imagePath} alt={item.alt} />
            ))}
          </div>
        )}

        {/* プロフィールセクション */}
        <div className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-10">
          <p className="text-sm md:text-base text-gray-400 uppercase tracking-wider mb-3">
            PROFILE
          </p>
          {character.introduction && (
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6 whitespace-pre-line">
              {character.introduction}
            </p>
          )}

          {/* プロフィールグリッド */}
          {character.profile && (
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm md:text-base text-gray-400 uppercase tracking-wider mb-3">
                DATA
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-base md:text-lg">
                {character.profile.height && (
                  <div>
                    <span className="text-gray-400">身長</span>
                    <p className="text-gray-700 font-medium">{character.profile.height}</p>
                  </div>
                )}
                {character.profile.weight && (
                  <div>
                    <span className="text-gray-400">体重</span>
                    <p className="text-gray-700 font-medium">{character.profile.weight}</p>
                  </div>
                )}
                {character.profile.gender && (
                  <div>
                    <span className="text-gray-400">性別</span>
                    <p className="text-gray-700 font-medium">{character.profile.gender}</p>
                  </div>
                )}
                {character.profile.birthday && (
                  <div>
                    <span className="text-gray-400">誕生日</span>
                    <p className="text-gray-700 font-medium">{character.profile.birthday}</p>
                  </div>
                )}
                {character.profile.age && (
                  <div>
                    <span className="text-gray-400">年齢</span>
                    <p className="text-gray-700 font-medium">{character.profile.age}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* クレジット */}
          <div className="mt-6 text-right">
            <p className="text-base md:text-lg text-gray-500">
              キャラクター作成者： <span className="font-medium">{character.author}</span>
            </p>
          </div>
        </div>

        {/* 個別規約 */}
        {character.rules && (
          <div className="mb-10">
            <h2 className="text-base md:text-xl font-bold text-gray-800 border-l-4 border-gray-800 pl-3 mb-4">
              個別規約
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-xs md:text-base">
                <tbody>
                  {(Object.keys(RULE_LABELS) as Array<keyof typeof RULE_LABELS>).map((key) => {
                    const value = character.rules![key]
                    const display = RULE_DISPLAY[value]
                    return (
                      <tr key={key} className="border-b border-gray-100 last:border-b-0">
                        <td className="py-3 px-4 text-gray-700">{RULE_LABELS[key]}</td>
                        <td
                          className={`py-3 px-4 text-right font-medium whitespace-nowrap ${display.className}`}
                        >
                          {display.label}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            {character.rules.others != null && (
              <div className="mt-4 p-6 md:p-8 bg-gray-50 rounded-2xl">
                <p className="text-sm md:text-base text-gray-400 uppercase tracking-wider mb-3">
                  その他の注意事項
                </p>
                <div className="text-sm md:text-base text-gray-700 leading-relaxed">
                  <RichText content={character.rules.others as LexicalContent} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* 詳細説明（性格・能力など） */}
        {character.description != null && (
          <div className="relative bg-white border-3 border-forest rounded-2xl p-6 md:p-8 pt-8 md:pt-10 mb-10">
            <h2 className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white px-4 text-xl md:text-2xl font-bold text-forest">
              ソフきゃらメモ
            </h2>
            <div className="prose prose-base md:prose-lg max-w-none prose-headings:text-gray-800 prose-headings:border-l-4 prose-headings:border-gray-800 prose-headings:pl-3 prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed">
              <RichText content={character.description as LexicalContent} />
            </div>
          </div>
        )}

        {/* ソフケンタウン関連 */}
        {relatedSofkentowns.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-forest" />
              <span className="text-lg md:text-xl font-bold text-forest">関連する舞台設定</span>
              <div className="flex-1 h-px bg-forest" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedSofkentowns.map((town) => (
                <Link
                  key={town.id}
                  href={`/sofchara/sofkentown/${town.url}`}
                  className="group flex flex-col rounded-xl overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition-shadow"
                >
                  {town.imagePath && (
                    <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
                      <Image
                        src={town.imagePath}
                        alt={town.name}
                        fill
                        className="object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <p className="text-lg font-bold text-forest group-hover:text-mint transition-colors">
                      {town.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* フッター余白 */}
        <div className="h-20" />
      </div>
    </main>
  )
}

export default CharacterDetailPage
