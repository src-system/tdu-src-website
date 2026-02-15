import type { GlobalConfig } from 'payload'

export const Guideline: GlobalConfig = {
  slug: 'guideline',
  label: '二次創作ガイドライン',
  admin: {
    group: 'ソフキャラ',
    description: 'ガイドラインページ（/sofchara/guideline）',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'ページタイトル',
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
