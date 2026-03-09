import type { Field } from 'payload'

export const guidelineSectionFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    defaultValue: '二次創作ガイドライン',
    label: 'セクションタイトル',
  },
  {
    name: 'subtitle',
    type: 'text',
    defaultValue: 'GUIDELINE',
    label: 'サブタイトル',
  },
  {
    name: 'description',
    type: 'textarea',
    required: true,
    label: '説明文',
  },
]
