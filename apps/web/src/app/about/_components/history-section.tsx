import { ContentBlock } from '@/src/app/_components/content-block'
import { Markdown } from '@/src/app/_components/markdown'

export type HistoryItem = {
  year: number
  month?: number
  title: string
  description: string
}

type HistorySectionProps = {
  title?: string
  subtitle?: string
  description?: string
  items: HistoryItem[]
}

export const HistorySection = ({
  title = 'HISTORY',
  subtitle = '沿革',
  description = '50年以上の歴史を持つソフトウェア研究部の主な出来事をご紹介します。',
  items,
}: HistorySectionProps) => {
  return (
    <section className="relative w-full bg-linear-to-b from-white to-green-50 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-20 w-80 h-80 bg-mint/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-20 w-96 h-96 bg-forest/20 rounded-full blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl 2xl:max-w-7xl md:px-20 2xl:px-32 px-5 md:py-15 2xl:py-20 py-10">
        <ContentBlock title={title} subtitle={subtitle} description={description} />
        <div className="mt-10 relative">
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-forest via-mint to-forest" />
          <div className="space-y-8">
            {items.map((item, i) => (
              <div key={`${item.year}-${item.title}-${i}`} className="relative pl-12 md:pl-20">
                <div className="absolute left-0 md:left-4 top-2 w-8 h-8 bg-forest rounded-full border-4 border-white shadow-md flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-forest/10 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-2xl md:text-4xl font-bold text-forest">
                      {item.month ? `${item.year}年${item.month}月` : `${item.year}年`}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-2xl font-bold text-charcoal mb-2">{item.title}</h3>
                  <div className="text-sm md:text-base font-medium text-gray-600 leading-relaxed [&_p]:my-0">
                    <Markdown content={item.description} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
