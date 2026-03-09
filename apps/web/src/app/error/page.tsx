import { AlertTriangleIcon } from 'lucide-react'
import { LinkButton } from '@/src/app/_components/link-button'
import { ReloadButton } from '@/src/app/_components/reload-button'
import { Section } from '@/src/app/_components/section'

type ErrorType = 'no-content' | 'http' | 'unknown'

const FAILED_ITEM_LABELS: Record<string, string> = {
  'top-video': 'トップビデオ',
  catchphrase: 'キャッチコピー',
  'about-section': 'Aboutセクション',
  'about-images': 'Aboutセクションの画像（3枚必要）',
  'about-page': 'Aboutページ',
  'team-section': 'Teamセクション',
  'team-data': '班カードデータ',
  'news-section': 'Newsセクション見出し',
  'news-data': 'ニュース記事',
  'characters-section': 'キャラクターセクション見出し',
  'characters-data': 'キャラクターデータ',
  'sofkentown-data': 'ソフケンタウンデータ',
}

type ErrorPageProps = {
  searchParams?: Promise<{
    type?: string
    status?: string
    message?: string
    failedItems?: string
  }>
}

const ERROR_MESSAGES: Record<ErrorType, { title: string; subtitle: string; description: string }> =
  {
    'no-content': {
      title: 'コンテンツを取得できませんでした',
      subtitle: 'Content Not Available',
      description:
        'Payload CMS からコンテンツを取得できませんでした。\n\nコンテンツがまだ設定されていないか、CMS サーバーに接続できない可能性があります。\nしばらく時間をおいてから再度お試しください。',
    },
    http: {
      title: 'エラーが発生しました',
      subtitle: 'Something Went Wrong',
      description:
        'ページの読み込み中にエラーが発生しました。\n\nサーバー側の一時的な問題の可能性があります。\nしばらく時間をおいてから再度お試しください。',
    },
    unknown: {
      title: '問題が発生しました',
      subtitle: 'Something Went Wrong',
      description:
        '予期せぬエラーが発生しました。\n\nお手数ですが、トップページから再度お試しください。',
    },
  }

export default async function ErrorPage({ searchParams }: ErrorPageProps) {
  const params = await searchParams
  const type = (params?.type ?? 'unknown') as ErrorType
  const status = params?.status
  const customMessage = params?.message
  const failedItemsParam = params?.failedItems

  const failedItems = failedItemsParam
    ? failedItemsParam
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean)
        .map((id) => FAILED_ITEM_LABELS[id] ?? id)
    : []

  const errorType: ErrorType = type === 'no-content' || type === 'http' ? type : 'unknown'
  const content = ERROR_MESSAGES[errorType]

  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center py-16 md:py-24">
      <Section as="div" size="container">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-red-50 text-red-500">
            <AlertTriangleIcon className="size-12" aria-hidden />
          </div>

          <div className="flex flex-col gap-6">
            {status && (
              <p className="font-lexend text-sm font-medium text-charcoal">HTTP {status}</p>
            )}
            <h1 className="font-lexend text-2xl font-semibold text-forest md:text-3xl">
              {content.title}
            </h1>
            <p className="font-noto text-lg font-bold text-black">{content.subtitle}</p>
            <div className="mx-auto max-w-xl space-y-4 text-left">
              {failedItems.length > 0 && (
                <div>
                  <p className="font-semibold text-charcoal">取得できなかった項目：</p>
                  <ul className="mt-2 list-inside list-disc space-y-1 font-medium text-charcoal">
                    {failedItems.map((label) => (
                      <li key={label}>{label}</li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="whitespace-pre-line font-medium leading-relaxed text-charcoal">
                {customMessage ?? content.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            <LinkButton href="/" text="トップページへ戻る" color="mint" />
            <ReloadButton />
          </div>
        </div>
      </Section>
    </main>
  )
}
