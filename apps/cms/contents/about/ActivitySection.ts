import type { Field } from 'payload'

const activityItemFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    required: true,
    label: '活動タイトル',
  },
  {
    name: 'description',
    type: 'textarea',
    required: true,
    label: '活動の説明',
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true,
    filterOptions: {
      mimeType: { contains: 'image' },
    },
    label: 'アイコン画像',
  },
  {
    name: 'alt',
    type: 'text',
    required: true,
    label: '代替テキスト',
  },
]

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
    fields: activityItemFields,
  },
]
