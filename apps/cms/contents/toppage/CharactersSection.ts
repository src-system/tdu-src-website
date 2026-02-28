import type { GlobalConfig } from 'payload'

export const CharactersSection: GlobalConfig = {
  slug: 'characters-section',
  label: 'CHARACTERSセクション',
  access: { read: () => true },
  admin: {
    group: 'トップページ',
    description:
      'トップページのキャラクターセクション（タイトル・説明文のみ。キャラクターは characters で管理）',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'CHARACTERS',
      label: 'セクションタイトル',
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
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
  ],
}
