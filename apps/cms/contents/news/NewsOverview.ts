import type { Field } from 'payload'

export const newsOverviewFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    defaultValue: 'NEWS',
    label: 'セクションタイトル',
  },
  {
    name: 'subtitle',
    type: 'text',
    defaultValue: 'お知らせ',
    label: 'サブタイトル',
  },
  {
    name: 'description',
    type: 'textarea',
    required: true,
    label: '説明文',
    admin: {
      description: '改行対応',
    },
  },
]
