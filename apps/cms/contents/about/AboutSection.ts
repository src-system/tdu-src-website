import type { Field } from 'payload'

export const aboutSectionFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    defaultValue: 'ABOUT',
    label: 'セクションタイトル',
  },
  {
    name: 'subtitle',
    type: 'text',
    defaultValue: 'ソフトウェア研究部について',
    label: 'サブタイトル',
  },
  {
    name: 'description',
    type: 'richText',
    required: true,
    label: '紹介文',
    admin: {
      description: '見出し、リスト、強調等のマークダウンテキスト',
    },
  },
]
