export const revalidate = 300 // 5分

import { redirect } from 'next/navigation'
import { ContentBlock } from '@/src/app/_components/content-block'
import { Section } from '@/src/app/_components/section'
import { getSofkentownListFromApi } from '@/src/app/_lib/api'
import { SofkentownCard } from './_components/sofkentown-card'

const SofkentownPage = async () => {
  const sofkentownList = await getSofkentownListFromApi()

  if (!sofkentownList || sofkentownList.length === 0) {
    const params = new URLSearchParams({
      type: 'no-content',
      failedItems: 'sofkentown-data',
      message:
        'ソフケンタウンのデータが設定されていません。\n\nPayload CMS の管理画面でソフケンタウンのコンテンツを追加してください。',
    })
    redirect(`/error?${params.toString()}`)
  }

  return (
    <main>
      <Section className="gap-8 py-16 md:py-24">
        <ContentBlock
          title="SOFKENTOWN"
          subtitle="ソフケンタウン"
          description="ソフキャラたちが暮らす世界の場所や設定を紹介します"
          maxWidth="wide"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sofkentownList.map((town) => (
            <SofkentownCard
              key={town.id}
              url={town.url}
              name={town.name}
              imagePath={town.imagePath}
            />
          ))}
        </div>
      </Section>
    </main>
  )
}

export default SofkentownPage
