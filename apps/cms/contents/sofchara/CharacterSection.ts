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
    defaultValue: 'ソフきゃら！',
    label: 'サブタイトル',
  },
  {
    name: 'description',
    type: 'textarea',
    label: '説明文',
    admin: {
      description: 'トップページのキャラクターセクションで表示',
    },
  },
]
