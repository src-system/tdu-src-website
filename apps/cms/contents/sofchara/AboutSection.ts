import type { Field } from 'payload'

export const aboutSectionFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    defaultValue: 'ソフきゃら！',
    label: 'セクションタイトル',
  },
  {
    name: 'subtitle',
    type: 'text',
    defaultValue: 'ABOUT SOFCHARA',
    label: 'サブタイトル',
  },
  {
    name: 'description',
    type: 'textarea',
    required: true,
    label: '企画の説明文',
    admin: {
      description: '改行対応',
    },
  },
  {
    name: 'cardTitle',
    type: 'text',
    required: true,
    label: 'カード内のタイトル',
  },
  {
    name: 'cardDescription',
    type: 'textarea',
    required: true,
    label: 'カード内の文章',
  },
  {
    name: 'icon',
    type: 'upload',
    relationTo: 'media',
    required: true,
    filterOptions: {
      mimeType: { contains: 'image' },
    },
    label: 'カード内のアイコン',
  },
]
