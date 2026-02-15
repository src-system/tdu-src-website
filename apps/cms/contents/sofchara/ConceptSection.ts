import type { Field } from 'payload'

const conceptCardFields: Field[] = [
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true,
    filterOptions: {
      mimeType: { contains: 'image' },
    },
    label: 'カード画像',
  },
  {
    name: 'imageAlt',
    type: 'text',
    required: true,
    label: '画像の代替テキスト',
  },
  {
    name: 'title',
    type: 'text',
    required: true,
    label: 'カードタイトル',
  },
  {
    name: 'description',
    type: 'textarea',
    required: true,
    label: 'カードの説明',
  },
]

export const conceptSectionFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    defaultValue: 'PROJECT CONCEPT',
    label: 'セクションタイトル',
  },
  {
    name: 'subtitle',
    type: 'text',
    defaultValue: '企画の広がり',
    label: 'サブタイトル',
  },
  {
    name: 'concepts',
    type: 'array',
    required: true,
    minRows: 3,
    maxRows: 3,
    label: 'コンセプトカード',
    admin: {
      description: '3つ固定（二次創作、キャラクター、ソフケンタウン）',
    },
    fields: conceptCardFields,
  },
]
