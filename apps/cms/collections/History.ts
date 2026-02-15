import type { CollectionConfig } from 'payload'

export const History: CollectionConfig = {
  slug: 'history',
  admin: {
    useAsTitle: 'year',
    description: 'Aboutページの沿革',
  },
  fields: [
    {
      name: 'year',
      type: 'text',
      required: true,
      label: '年度',
    },
    {
      name: 'events',
      type: 'array',
      required: true,
      minRows: 1,
      label: '出来事',
      fields: [
        {
          name: 'event',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
