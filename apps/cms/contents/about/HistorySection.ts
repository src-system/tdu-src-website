import type { Field } from 'payload'

export const historySectionFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    defaultValue: 'HISTORY',
    label: 'セクションタイトル',
  },
  {
    name: 'subtitle',
    type: 'text',
    defaultValue: '沿革',
    label: 'サブタイトル',
  },
  {
    name: 'timeline',
    type: 'array',
    required: true,
    minRows: 1,
    label: '歴史イベント',
    admin: {
      description: 'ヒストリーコレクションから選択し、古い順（年代昇順）に並べてください',
    },
    fields: [
      {
        name: 'event',
        type: 'relationship',
        relationTo: 'history' as const,
        required: true,
        label: 'ヒストリー',
      },
    ],
  },
]
