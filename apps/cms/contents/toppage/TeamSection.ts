import type { GlobalConfig } from 'payload'

export const TeamSection: GlobalConfig = {
  slug: 'team-section',
  label: 'Teamセクション',
  access: { read: () => true },
  admin: {
    group: 'トップページ',
    description: 'トップページのTeamセクション（タイトル・説明文のみ。班カードは Teams で管理）',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'TEAM',
      label: 'セクションタイトル',
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      defaultValue: '班紹介',
      label: 'サブタイトル',
    },
    {
      name: 'description',
      type: 'text',
      label: '説明文',
    },
  ],
}
