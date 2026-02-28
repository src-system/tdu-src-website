import Image from 'next/image'
import { LinkButton } from '@/src/app/_components/link-button'
import { Markdown } from '@/src/app/_components/markdown'

type ConceptCardProps = {
  imagePath: string
  imageAlt: string
  title: string
  description: string
  buttonText: string
  buttonHref: string
}

export const ConceptCard = ({
  imagePath,
  imageAlt,
  title,
  description,
  buttonText,
  buttonHref,
}: ConceptCardProps) => {
  return (
    <div className="flex flex-col rounded-2xl border border-forest/20 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative mb-4 aspect-16/10 overflow-hidden rounded-xl">
        <Image src={imagePath} alt={imageAlt} fill className="object-cover" />
      </div>
      <div className="flex flex-col grow space-y-3">
        <h3 className="text-2xl font-bold text-forest">{title}</h3>
        <div className="grow text-base text-charcoal leading-relaxed [&_p]:my-0">
          <Markdown content={description} />
        </div>
        <div className="pt-2">
          <LinkButton href={buttonHref} text={buttonText} />
        </div>
      </div>
    </div>
  )
}
