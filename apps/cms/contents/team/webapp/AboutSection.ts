import type { Field } from 'payload'

const imageCardFields: Field[] = [
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
    type: 'textarea',
    required: true,
    label: '班の詳細説明',
    admin: {
      description: 'Markdown対応',
    },
  },
  {
    name: 'images',
    type: 'array',
    required: true,
    minRows: 1,
    maxRows: 3,
    label: '画像',
    admin: {
      description: '1〜3枚（4:3～16:9推奨）',
    },
    fields: imageCardFields,
  },
]
