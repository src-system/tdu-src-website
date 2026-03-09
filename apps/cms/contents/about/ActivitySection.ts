import type { Field } from 'payload'

export const activitySectionFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    defaultValue: 'ACTIVITY',
    label: 'セクションタイトル',
  },
  {
    name: 'subtitle',
    type: 'text',
    defaultValue: '主な活動',
    label: 'サブタイトル',
  },
  {
    name: 'items',
    type: 'array',
    required: true,
    minRows: 1,
    label: '活動項目',
    admin: {
      description: 'アクティビティコレクションから選択し、表示順に並べてください',
    },
    fields: [
      {
        name: 'activity',
        type: 'relationship',
        relationTo: 'activities' as const,
        required: true,
        label: 'アクティビティ',
      },
    ],
  },
]
