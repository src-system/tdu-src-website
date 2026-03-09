import type { CollectionConfig } from 'payload'

export const History: CollectionConfig = {
  slug: 'history',
  labels: { singular: 'ヒストリー', plural: 'ヒストリー' },
  access: { read: () => true },
  admin: {
    group: 'Aboutページ',
    useAsTitle: 'title',
    description: '沿革イベント（Aboutページのヒストリーセクションで参照）',
  },
  fields: [
    {
      name: 'year',
      type: 'number',
      required: true,
      label: '年',
      admin: {
        description: '西暦',
      },
    },
    {
      name: 'month',
      type: 'number',
      label: '月',
      admin: {
        description: '1-12（オプション、指定なしは年のみ表示）',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'イベントタイトル',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: '詳細説明',
    },
  ],
}
