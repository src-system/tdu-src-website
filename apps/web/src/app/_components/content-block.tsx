import { Markdown } from '@/src/app/_components/markdown'

type ContentBlockProps = {
  title: string
  subtitle: string
  description?: string
  maxWidth?: 'default' | 'wide' | 'full'
}

export const ContentBlock = ({
  title,
  subtitle,
  description,
  maxWidth = 'default',
}: ContentBlockProps) => {
  const widthClasses = {
    default: 'max-w-4xl',
    wide: 'max-w-5xl',
    full: 'max-w-full',
  }

  return (
    <div className={`flex w-full ${widthClasses[maxWidth]} flex-col gap-3`}>
      {/* タイトルとサブタイトル */}
      <div className="flex flex-col">
        <h2 className="font-lexend text-4xl font-semibold text-forest">{title}</h2>
        <h3 className="font-noto text-lg font-bold text-black">{subtitle}</h3>
      </div>

      {/* 縦線と説明文 */}
      {description && (
        <div className="flex md:gap-4 gap-3 md:pl-3 pl-1.5 md:mr-0 mr-1.5">
          {/* 左側の緑色の縦線 */}
          <div className="w-2 shrink-0 bg-forest" />
          {/* 右側の説明文 */}
          <div className="md:my-4 my-2 md:text-xl text-md leading-relaxed font-medium text-black [&_p]:my-1 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0">
            <Markdown content={description} />
          </div>
        </div>
      )}
    </div>
  )
}
