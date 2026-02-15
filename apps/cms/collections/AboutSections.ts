import type { CollectionConfig } from 'payload'

export const AboutSections: CollectionConfig = {
  slug: 'about-sections',
  admin: {
    useAsTitle: 'title',
    description: 'トップページのAboutセクション',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'ABOUT',
    },
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: '活動内容',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 3,
      maxRows: 3,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          filterOptions: {
            mimeType: { contains: 'image' },
          },
        },
        {
          name: 'alt',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
