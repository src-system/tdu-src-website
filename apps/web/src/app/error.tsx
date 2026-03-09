'use client'

import { AlertTriangleIcon } from 'lucide-react'
import { useEffect } from 'react'
import { LinkButton } from '@/src/app/_components/link-button'
import { Section } from '@/src/app/_components/section'

export default function ErrorBoundary({
  error: err,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(err)
  }, [err])

  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center py-16 md:py-24">
      <Section as="div" size="container">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-red-50 text-red-500">
            <AlertTriangleIcon className="size-12" aria-hidden />
          </div>

          <div className="flex flex-col gap-6">
            <h1 className="font-lexend text-2xl font-semibold text-forest md:text-3xl">
              エラーが発生しました
            </h1>
            <p className="font-noto text-lg font-bold text-black">Something Went Wrong</p>
            <p className="mx-auto max-w-xl text-left font-medium leading-relaxed text-charcoal">
              ページの読み込み中にエラーが発生しました。
              <br />
              下のボタンから再試行するか、トップページへ戻ってください。
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center rounded-md border-2 border-forest bg-white px-5 py-2.5 text-base text-forest shadow-[0_4px_0_0_var(--color-forest)] transition-all hover:translate-y-1 hover:shadow-[0_2px_0_0_var(--color-forest)]"
            >
              再試行
            </button>
            <LinkButton href="/" text="トップページへ戻る" color="mint" />
          </div>
        </div>
      </Section>
    </main>
  )
}
