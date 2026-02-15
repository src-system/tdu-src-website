import type { Field } from 'payload'

const historyItemFields: Field[] = [
  {
    name: 'year',
    type: 'number',
    required: true,
    label: '年',
    admin: {
      description: '西暦',
    },
  },
  {
    name: 'month',
    type: 'number',
    label: '月',
    admin: {
      description: '1-12（オプション、指定なしは年のみ表示）',
    },
  },
  {
    name: 'title',
    type: 'text',
    required: true,
    label: 'イベントタイトル',
  },
  {
    name: 'description',
    type: 'textarea',
    required: true,
    label: '詳細説明',
  },
]

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
      description: '古い順（年代昇順）に並べてください',
    },
    fields: historyItemFields,
  },
]
