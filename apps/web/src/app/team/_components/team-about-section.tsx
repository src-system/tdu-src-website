import { ContentBlock } from '@/src/app/_components/content-block'
import { ImageCard } from '@/src/app/_components/image-card'
import { type LexicalContent, RichText } from '@/src/app/_components/rich-text'
import { isValidLexicalContent } from '@/src/app/_lib/lexical-utils'

type TeamAboutSectionProps = {
  title: string
  subtitle: string
  description: unknown
  images: { imagePath: string; alt: string }[]
}

export const TeamAboutSection = ({ title, subtitle, description, images }: TeamAboutSectionProps) => {
  const hasLexical = isValidLexicalContent(description)

  return (
    <>
      <ContentBlock title={title} subtitle={subtitle} />
      {hasLexical && (
        <div className="mt-4">
          <RichText
            content={description as LexicalContent}
            className="prose-headings:mt-6 prose-headings:mb-3 first:prose-headings:mt-0"
          />
        </div>
      )}
      {images.length > 0 && (
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {images.map((img) => (
            <div
              key={img.imagePath || img.alt}
              className="relative w-48 aspect-4/3 shrink-0 md:w-56"
            >
              <ImageCard imagePath={img.imagePath} alt={img.alt} />
            </div>
          ))}
        </div>
      )}
    </>
  )
}
