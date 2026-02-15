import type { CollectionConfig } from 'payload'

export const Sofkentown: CollectionConfig = {
  slug: 'sofkentown',
  admin: {
    group: 'ソフキャラ',
    useAsTitle: 'name',
    description: 'ソフケンタウン（共通世界観）',
    defaultColumns: ['name', 'id', 'updatedAt'],
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      required: true,
      unique: true,
      label: '識別ID',
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: '場所・設定の名前',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
      label: 'イメージ画像',
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      label: '詳細説明',
      admin: {
        description: 'Markdown対応',
      },
    },
    {
      name: 'relatedCharacters',
      type: 'array',
      label: '関連キャラクター',
      admin: {
        description: '関連するキャラクターのID（characters.id）',
      },
      fields: [
        {
          name: 'characterId',
          type: 'number',
          required: true,
          label: 'キャラクターID',
        },
      ],
    },
  ],
}
