import type { CollectionConfig } from 'payload'

export const HeroVideos: CollectionConfig = {
  slug: 'hero-videos',
  admin: {
    useAsTitle: 'video',
    description: 'トップページのヒーロービデオ設定',
  },
  fields: [
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      required: true,
      filterOptions: {
        mimeType: { contains: 'video' },
      },
    },
    {
      name: 'logoEnabled',
      type: 'checkbox',
      required: true,
      defaultValue: true,
      label: 'スプラッシュロゴを表示',
    },
  ],
}
