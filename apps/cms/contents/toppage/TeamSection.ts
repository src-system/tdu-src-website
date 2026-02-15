import type { GlobalConfig } from 'payload'

export const TeamSection: GlobalConfig = {
  slug: 'team-section',
  label: 'Teamセクション',
  admin: {
    group: 'トップページ',
    description: 'トップページのTeamセクション（タイトル・説明文のみ。班カードは Teams で管理）',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'TEAM',
      label: 'セクションタイトル',
    },
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: '班紹介',
      label: 'サブタイトル',
    },
    {
      name: 'description',
      type: 'text',
      required: true,
      label: '説明文',
    },
  ],
}
