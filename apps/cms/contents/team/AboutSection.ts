import type { Field } from 'payload'

/** ImageCard: image, alt */
export const imageCardFields: Field[] = [
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true,
    filterOptions: {
      mimeType: { contains: 'image' },
    },
    label: '画像',
  },
  {
    name: 'alt',
    type: 'text',
    required: true,
    label: '代替テキスト',
  },
]

export const aboutSectionFields: Field[] = [
  {
    name: 'aboutTitle',
    type: 'text',
    required: true,
    defaultValue: 'ABOUT',
    label: 'セクションタイトル',
  },
  {
    name: 'subtitle',
    type: 'text',
    required: true,
    label: 'サブタイトル',
    admin: {
      description: '例：◯◯班とは？',
    },
  },
  {
    name: 'description',
    type: 'richText',
    required: true,
    label: '班の詳細説明',
  },
  {
    name: 'images',
    type: 'array',
    maxRows: 3,
    label: '画像',
    admin: {
      description: '任意。最大3枚（4:3～16:9推奨）',
    },
    fields: imageCardFields,
  },
]
