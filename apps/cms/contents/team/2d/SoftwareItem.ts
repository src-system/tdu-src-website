import type { Field } from 'payload'

const softwareItemFields: Field[] = [
  {
    name: 'name',
    type: 'text',
    required: true,
    label: 'ソフトウェア名',
  },
  {
    name: 'description',
    type: 'textarea',
    label: '用途の説明',
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    filterOptions: {
      mimeType: { contains: 'image' },
    },
    label: 'アイコン画像',
  },
  {
    name: 'alt',
    type: 'text',
    label: '代替テキスト',
  },
]

export const softwaresField: Field = {
  name: 'softwares',
  type: 'array',
  label: '使用ソフトウェア',
  admin: {
    description: 'オプション。データがない場合は非表示',
  },
  fields: softwareItemFields,
}
