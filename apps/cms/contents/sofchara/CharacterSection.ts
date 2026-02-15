import type { Field } from 'payload'

export const characterSectionFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    defaultValue: 'CHARACTERS',
    label: 'セクションタイトル',
  },
  {
    name: 'subtitle',
    type: 'text',
    defaultValue: 'キャラクター一覧',
    label: 'サブタイトル',
  },
]
