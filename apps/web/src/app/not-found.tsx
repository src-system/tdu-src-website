import { FileQuestion } from 'lucide-react'
import { LinkButton } from '@/src/app/_components/link-button'
import { Section } from '@/src/app/_components/section'

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center py-16 md:py-24">
      <Section as="div" size="container">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-forest/10 text-forest">
            <FileQuestion className="size-12" aria-hidden />
          </div>

          <div className="flex flex-col gap-6">
            <p className="font-lexend text-6xl font-bold text-forest">404</p>
            <h1 className="font-lexend text-2xl font-semibold text-forest md:text-3xl">
              ページが見つかりません
            </h1>
            <p className="font-noto text-lg font-bold text-black">Page Not Found</p>
            <p className="mx-auto max-w-xl text-left font-medium leading-relaxed text-charcoal">
              お探しのページは存在しないか、移動した可能性があります。
              <br />
              トップページから再度お探しください。
            </p>
          </div>

          <LinkButton href="/" text="トップページへ戻る" />
        </div>
      </Section>
    </main>
  )
}
