import type { GlobalConfig } from 'payload'

export const NewsSection: GlobalConfig = {
  slug: 'news-section',
  label: 'Newsセクション',
  access: { read: () => true },
  admin: {
    group: 'トップページ',
    description: 'トップページのNewsセクション（タイトル・説明文のみ。記事は News で管理）',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'NEWS',
      label: 'セクションタイトル',
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      defaultValue: 'お知らせ',
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
  ],
}
