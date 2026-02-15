import type { CollectionConfig } from 'payload'

export const Characters: CollectionConfig = {
  slug: 'characters',
  admin: {
    useAsTitle: 'name',
    description: 'ソフキャラ',
    defaultColumns: ['name', 'kana', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: '名前',
    },
    {
      name: 'kana',
      type: 'text',
      required: true,
      label: 'ふりがな',
    },
    {
      name: 'englishName',
      type: 'text',
      label: '英名',
    },
    {
      name: 'iconImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      filterOptions: {
        mimeType: { contains: 'image' },
      },
      label: 'アイコン画像',
    },
    {
      name: 'fullbodyImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      filterOptions: {
        mimeType: { contains: 'image' },
      },
      label: '全身画像',
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      label: 'URL（スラッグ）',
    },
    {
      name: 'profile',
      type: 'group',
      label: 'プロフィール',
      fields: [
        {
          name: 'birthday',
          type: 'text',
          required: true,
          label: '誕生日',
        },
        {
          name: 'height',
          type: 'text',
          required: true,
          label: '身長',
        },
        {
          name: 'personality',
          type: 'text',
          required: true,
          label: '性格',
        },
        {
          name: 'likes',
          type: 'text',
          required: true,
          label: '好きなもの',
        },
        {
          name: 'dislikes',
          type: 'text',
          required: true,
          label: '嫌いなもの',
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      label: '紹介文',
    },
    {
      name: 'rules',
      type: 'array',
      label: '利用規約',
      fields: [
        {
          name: 'level',
          type: 'select',
          required: true,
          options: [
            { label: '必須', value: 'must' },
            { label: '推奨', value: 'should' },
            { label: 'より良い', value: 'better' },
            { label: '自由', value: 'free' },
          ],
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'alternates',
      type: 'array',
      label: '差分',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
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
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'relations',
      type: 'array',
      label: '関係性',
      fields: [
        {
          name: 'character',
          type: 'relationship',
          relationTo: 'characters',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
