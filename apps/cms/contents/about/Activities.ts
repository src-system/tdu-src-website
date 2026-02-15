import type { CollectionConfig } from 'payload'

export const Activities: CollectionConfig = {
  slug: 'activities',
  admin: {
    group: 'About',
    useAsTitle: 'title',
    description: '活動項目（AboutページのActivitySectionで使用）',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: '活動タイトル',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: '活動の説明',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      filterOptions: {
        mimeType: { contains: 'image' },
      },
      label: 'アイコン画像',
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: '代替テキスト',
    },
  ],
}
