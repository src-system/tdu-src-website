import type { GlobalConfig } from 'payload'

export const Guideline: GlobalConfig = {
  slug: 'guideline',
  label: '二次創作ガイドライン',
  access: { read: () => true },
  admin: {
    group: 'ソフキャラ',
    description: 'ガイドラインページ（/sofchara/guideline）',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'メインタイトル',
      defaultValue: 'GUIDELINE',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'サブタイトル',
      defaultValue: '二次創作ガイドライン',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'ガイドライン本文',
      admin: {
        description: 'Markdown対応',
      },
    },
  ],
}
