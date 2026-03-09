import type { Field } from 'payload'

const galleryFields: Field[] = [
  {
    name: 'type',
    type: 'select',
    required: true,
    options: [
      { label: '画像', value: 'image' },
      { label: '動画', value: 'video' },
      { label: '音声', value: 'sound' },
    ],
  },
  {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
    required: true,
  },
  {
    name: 'alt',
    type: 'text',
    required: true,
    label: '代替テキスト',
  },
  {
    name: 'thumbnail',
    type: 'upload',
    relationTo: 'media',
    admin: {
      condition: (_data, siblingData) => siblingData?.type !== 'image',
      description: '動画・音声の場合',
    },
  },
  {
    name: 'title',
    type: 'text',
    label: '作品タイトル',
  },
  {
    name: 'description',
    type: 'textarea',
    label: '作品説明',
  },
  {
    name: 'relatedLinks',
    type: 'array',
    label: '関連リンク',
    admin: {
      description: '任意。複数追加可能',
    },
    fields: [
      {
        name: 'linkName',
        type: 'text',
        label: 'リンク名',
        required: true,
      },
      {
        name: 'link',
        type: 'text',
        label: 'リンク',
        required: true,
      },
    ],
  },
]

export const galleryField: Field = {
  name: 'gallery',
  type: 'array',
  label: 'ギャラリー',
  admin: {
    description: 'オプション。画像・動画・音声を混在可能',
  },
  fields: galleryFields,
}
