import type { CollectionConfig } from 'payload'

export const History: CollectionConfig = {
  slug: 'history',
  admin: {
    group: 'About',
    useAsTitle: 'year',
    description: '沿革（AboutページのHistorySectionで使用）',
  },
  fields: [
    {
      name: 'year',
      type: 'text',
      required: true,
      label: '年',
      admin: {
        description: '西暦',
      },
    },
    {
      name: 'events',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'イベント一覧',
      fields: [
        {
          name: 'event',
          type: 'text',
          required: true,
          label: 'イベント',
        },
      ],
    },
  ],
}
