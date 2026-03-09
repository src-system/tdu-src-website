type GuidelineItem = {
  text: string
}

type GuidelineBlockProps = {
  title: string
  items: GuidelineItem[] | string[]
  variant?: 'ok' | 'ng'
}

const GuidelineBlock = ({ title, items, variant = 'ok' }: GuidelineBlockProps) => {
  const variantClasses = {
    ok: 'text-forest',
    ng: 'text-red-600',
  }

  return (
    <div>
      <h4 className={`font-bold ${variantClasses[variant]} mb-2`}>{title}</h4>
      <ul className="space-y-1 text-sm">
        {items.map((item) => {
          const text = typeof item === 'string' ? item : item.text
          return <li key={text}>・{text}</li>
        })}
      </ul>
    </div>
  )
}

import { Markdown } from '@/src/app/_components/markdown'

type GuidelineSectionProps = {
  description?: string
  okItems: string[]
  ngItems: string[]
  footer?: string
}

export const GuidelineSection = ({
  description = 'ソフきゃらの二次創作は、以下のガイドラインに沿っていただければ大歓迎です！',
  okItems,
  ngItems,
  footer = '※ガイドラインは予告なく変更される場合があります。ご不明な点はお問い合わせください。',
}: GuidelineSectionProps) => {
  return (
    <div className="space-y-4 text-charcoal">
      <Markdown content={description} />
      <div className="rounded-lg bg-forest/5 p-6 space-y-4">
        <GuidelineBlock title="OK" items={okItems} variant="ok" />
        <GuidelineBlock title="NG" items={ngItems} variant="ng" />
      </div>
      {footer && <p className="text-sm text-gray-500">{footer}</p>}
    </div>
  )
}
