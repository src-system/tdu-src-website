import type { CollectionConfig } from 'payload'

export const TeamSections: CollectionConfig = {
  slug: 'team-sections',
  admin: {
    useAsTitle: 'title',
    description: 'トップページのTeamセクション',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'TEAM',
    },
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: '班紹介',
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'teams',
      type: 'array',
      required: true,
      minRows: 6,
      maxRows: 6,
      fields: [
        {
          name: 'teamName',
          type: 'select',
          required: true,
          options: [
            { label: 'グラフィック班', value: 'graphics' },
            { label: 'サウンド班', value: 'sounds' },
            { label: 'プログラミング班', value: 'programming' },
            { label: '企画班', value: 'planning' },
            { label: '映像班', value: 'video' },
            { label: 'モデリング班', value: 'modeling' },
          ],
        },
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
