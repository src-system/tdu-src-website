export const revalidate = 300 // 5分

import { ChevronLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ContentBlock } from '@/src/app/_components/content-block'
import { ContentCard } from '@/src/app/_components/content-card'
import { PatternBackground } from '@/src/app/_components/pattern-background'
import { type LexicalContent, RichText } from '@/src/app/_components/rich-text'
import { getGuidelinePageDataFromApi } from '@/src/app/_lib/api'
import { isValidLexicalContent } from '@/src/app/_lib/lexical-utils'

const GuidelinePage = async () => {
  const guidelineData = await getGuidelinePageDataFromApi()

  if (!guidelineData || !isValidLexicalContent(guidelineData.content)) {
    const params = new URLSearchParams({
      type: 'no-content',
      failedItems: 'guideline',
      message:
        '二次創作ガイドラインのコンテンツが設定されていません。\n\nPayload CMS の管理画面で 二次創作ガイドライン の本文を設定してください。',
    })
    redirect(`/error?${params.toString()}`)
  }

  return (
    <PatternBackground className="min-h-screen">
      <main className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl 2xl:max-w-7xl px-6 md:px-8">
          <ContentCard>
            <div className="space-y-4">
              <Link
                href="/sofchara"
                className="inline-flex items-center gap-1.5 text-base md:text-2xl font-semibold text-forest"
              >
                <ChevronLeftIcon className="size-8" />
                ソフきゃらトップに戻る
              </Link>
              <ContentBlock title={guidelineData.title} subtitle={guidelineData.subtitle} />
              <RichText content={guidelineData.content as LexicalContent} />
            </div>
          </ContentCard>
        </div>
      </main>
    </PatternBackground>
  )
}

export default GuidelinePage
