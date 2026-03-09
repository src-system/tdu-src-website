import type { GlobalConfig } from 'payload'

export const AboutSection: GlobalConfig = {
  slug: 'about-section',
  label: 'Aboutセクション',
  access: { read: () => true },
  admin: {
    group: 'トップページ',
    description: '活動内容を紹介するセクション。説明文と3枚の画像で構成',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'ABOUT',
      label: 'セクションタイトル',
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      defaultValue: '活動内容',
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
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 3,
      maxRows: 3,
      label: '画像',
      admin: {
        description: '3枚の画像を指定してください',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          filterOptions: {
            mimeType: { contains: 'image' },
          },
          label: '画像',
          admin: {
            description: '4:3から16:9の比率を推奨',
          },
        },
        {
          name: 'alt',
          type: 'text',
          required: true,
          label: '画像の内容を説明するテキスト',
        },
      ],
    },
  ],
}
