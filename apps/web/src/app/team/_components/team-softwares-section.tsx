import Image from 'next/image'
import { ContentBlock } from '@/src/app/_components/content-block'
import { Markdown } from '@/src/app/_components/markdown'

type TeamSoftwaresSectionProps = {
  items: { name: string; description?: string; iconPath?: string }[]
}

export const TeamSoftwaresSection = ({ items }: TeamSoftwaresSectionProps) => {
  if (items.length === 0) return null

  return (
    <div className="mt-12 pt-10 border-t border-gray-200">
      <ContentBlock title="SOFTWARES" subtitle="班で使用している主なソフトウェア" />
      <div className="mt-6 flex flex-wrap gap-4">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 border border-gray-200 min-w-[200px]"
          >
            {item.iconPath && (
              <div className="relative w-16 h-16 shrink-0 rounded overflow-hidden bg-white">
                <Image src={item.iconPath} alt={item.name} fill className="object-contain p-1" />
              </div>
            )}
            <div>
              <p className="font-bold text-charcoal">{item.name}</p>
              {item.description && (
                <div className="text-sm text-gray-600 mt-1 [&_p]:my-0">
                  <Markdown content={item.description} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
