import type { Field } from 'payload'

export const pageHeaderFields: Field[] = [
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true,
    filterOptions: {
      mimeType: { contains: 'image' },
    },
    label: 'ヘッダー画像',
    admin: {
      description: 'ソフキャラページ上部（16:9推奨）',
    },
  },
  {
    name: 'alt',
    type: 'text',
    required: true,
    label: '画像の代替テキスト',
  },
  {
    name: 'title',
    type: 'text',
    required: true,
    label: 'ページタイトル',
  },
]
