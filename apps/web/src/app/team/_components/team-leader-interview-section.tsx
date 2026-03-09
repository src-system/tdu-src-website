import Image from 'next/image'
import { ContentBlock } from '@/src/app/_components/content-block'
import { Markdown } from '@/src/app/_components/markdown'

type TeamLeaderInterviewSectionProps = {
  title: string
  subtitle: string
  leaderName: string
  leaderImagePath?: string
  leaderImageAlt?: string
  body?: string
  qa: { question: string; answer: string }[]
}

export function TeamLeaderInterviewSection({
  title,
  subtitle,
  leaderName,
  leaderImagePath,
  leaderImageAlt,
  body,
  qa,
}: TeamLeaderInterviewSectionProps) {
  if (!body?.trim() && qa.length === 0) return null

  return (
    <div className="mt-12 pt-10 border-t border-gray-200">
      <ContentBlock title={title} subtitle={subtitle} />
      <div className="mt-8 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
        {/* 班長インタビュー（アイコン・班長の名前・本文） */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          {leaderImagePath && (
            <div className="shrink-0 flex justify-center md:justify-start">
              <div className="rounded-full border-4 border-white bg-linear-to-br from-mint/20 to-forest/10 p-3 shadow-md overflow-hidden aspect-square w-32 h-32 md:w-40 md:h-40">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={leaderImagePath}
                    alt={leaderImageAlt ?? leaderName}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
              </div>
            </div>
          )}
          <div className="flex-1 space-y-4">
            <p className="text-2xl md:text-3xl font-bold text-forest">{leaderName}</p>
            {body?.trim() && (
              <div className="text-gray-700 leading-relaxed">
                <Markdown content={body} />
              </div>
            )}
          </div>
        </div>

        {/* Q&A（班長インタビューの下部） */}
        {qa.length > 0 && (
          <div className="mt-10 pt-8 border-t border-gray-200">
            <h3 className="text-2xl md:text-3xl font-bold text-forest mb-6">Q&A</h3>
            <div className="space-y-6">
              {qa.map((item) => (
                <div
                  key={`${item.question}-${item.answer.slice(0, 30)}`}
                  className="border-l-4 border-forest pl-4"
                >
                  <h4 className="font-bold text-charcoal mb-2">{item.question}</h4>
                  <div className="text-gray-700 leading-relaxed">
                    <Markdown content={item.answer} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
