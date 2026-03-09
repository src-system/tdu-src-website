import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'メディア',
    useAsTitle: 'alt',
    description: '画像・動画・音声などのメディアファイル',
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 1024, position: 'centre' },
      { name: 'tablet', width: 1024, height: undefined, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'video/*', 'audio/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: '代替テキスト',
      admin: {
        description: 'アクセシビリティのため画像の説明を入力',
      },
    },
  ],
}
