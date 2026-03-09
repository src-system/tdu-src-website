import type { CollectionConfig } from 'payload'

const CATEGORY_OPTIONS = [
  { label: 'お知らせ', value: 'announcement' },
  { label: 'イベント', value: 'event' },
  { label: '活動報告', value: 'report' },
  { label: 'ソフキャラ', value: 'sofchara' },
  { label: '作品紹介', value: 'work' },
]

const SUB_CATEGORY_OPTIONS = [
  { label: 'ゲームプログラミング', value: 'game' },
  { label: 'Webアプリ', value: 'web' },
  { label: 'サウンド', value: 'sound' },
  { label: '2D', value: '2d' },
  { label: '3D', value: '3d' },
  { label: 'デザイン', value: 'design' },
]

export const News: CollectionConfig = {
  slug: 'news',
  access: { read: () => true },
  admin: {
    group: 'News',
    useAsTitle: 'title',
    description: 'お知らせ記事',
    defaultColumns: ['title', 'category', 'subcategory', 'date', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: '記事タイトル',
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      label: '公開日',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
          timeIntervals: 1,
        },
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'カテゴリー',
      options: CATEGORY_OPTIONS,
    },
    {
      name: 'subcategory',
      type: 'select',
      label: '班（任意）',
      options: SUB_CATEGORY_OPTIONS,
      admin: {
        description: '班に関連する記事の場合のみ選択',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      label: '要約文',
      admin: {
        description: '記事一覧で表示',
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: true,
      filterOptions: {
        mimeType: { contains: 'image' },
      },
      label: 'サムネイル画像',
      admin: {
        description: '16:9推奨',
      },
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'サムネイルの代替テキスト',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: '本文',
      admin: {
        description: 'Markdown、画像含む',
      },
    },
    {
      name: 'author',
      type: 'text',
      label: '著者名',
    },
  ],
}
