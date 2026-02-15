import type { GlobalConfig } from 'payload'

export const Catchphrase: GlobalConfig = {
  slug: 'catchphrase',
  label: 'キャッチコピー',
  admin: {
    group: 'トップページ',
    description: 'トップビデオ上に重ねて表示されるキャッチコピー',
  },
  fields: [
    {
      name: 'segments',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'セグメント',
      admin: {
        description: 'キャッチコピーのセグメント配列（1個以上）',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: '表示テキスト',
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
