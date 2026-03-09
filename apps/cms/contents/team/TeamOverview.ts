import type { Field } from 'payload'

export const teamOverviewFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    defaultValue: 'TEAM',
    label: 'セクションタイトル',
  },
  {
    name: 'subtitle',
    type: 'text',
    defaultValue: '班紹介',
    label: 'サブタイトル',
  },
  {
    name: 'description',
    type: 'textarea',
    label: '説明文',
    admin: {
      description: '改行対応',
    },
  },
]
