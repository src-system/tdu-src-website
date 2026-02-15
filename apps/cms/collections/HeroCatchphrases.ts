import type { CollectionConfig } from 'payload'

export const HeroCatchphrases: CollectionConfig = {
  slug: 'hero-catchphrases',
  admin: {
    useAsTitle: 'segments',
    description: 'トップページのヒーローキャッチコピー',
  },
  fields: [
    {
      name: 'segments',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
        {
          name: 'highlighted',
          type: 'checkbox',
          required: true,
          defaultValue: false,
          label: 'ハイライト表示',
        },
      ],
    },
  ],
}
