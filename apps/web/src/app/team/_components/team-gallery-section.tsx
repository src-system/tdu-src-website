import { ContentBlock } from '@/src/app/_components/content-block'
import { GalleryCard, type GalleryItem } from './gallery-card'

type TeamGallerySectionProps = {
  items: GalleryItem[]
}

export function TeamGallerySection({ items }: TeamGallerySectionProps) {
  if (items.length === 0) return null

  return (
    <div className="mt-12 pt-10 border-t border-gray-200">
      <ContentBlock title="GALLERY" subtitle="活動の様子" />
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={`${item.mediaPath}-${item.alt}-${item.title ?? ''}-${item.description ?? ''}`}>
            <GalleryCard item={item} />
          </div>
        ))}
      </div>
    </div>
  )
}
