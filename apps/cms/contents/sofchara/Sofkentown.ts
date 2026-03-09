import type { CollectionConfig } from 'payload'

export const Sofkentown: CollectionConfig = {
  slug: 'sofkentown',
  access: { read: () => true },
  admin: {
    group: 'ソフキャラ',
    useAsTitle: 'name',
    description: 'ソフケンタウン（共通世界観）',
    defaultColumns: ['name', 'order', 'updatedAt'],
  },
  fields: [
    {
      name: 'order',
      type: 'number',
      required: true,
      unique: true,
      label: '表示順',
      admin: {
        description: '表示順（数字が小さいほど先に表示、重複不可）',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: '場所・設定の名前',
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL名',
      admin: {
        description: 'URLで使用する名前（半角英数字とハイフンのみ）例: sofken-campus',
      },
      validate: (value: string | null | undefined) => {
        if (!value) return '必須項目です'
        if (!/^[a-z0-9-]+$/.test(value)) {
          return '半角英小文字、数字、ハイフンのみ使用できます'
        }
        return true
      },
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
      type: 'relationship',
      relationTo: 'characters',
      hasMany: true,
      label: '関連キャラクター',
      admin: {
        description: '関連するキャラクターを選択（同じキャラクターは1回のみ選択可能）',
      },
    },
  ],
}
