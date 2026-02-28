import type { GlobalConfig } from 'payload'

export const Catchphrase: GlobalConfig = {
  slug: 'catchphrase',
  label: '部のキャッチコピー',
  access: {
    read: () => true,
  },
  admin: {
    group: 'トップページ',
    description:
      'トップ動画上に重ねて表示される、部のキャッチコピーの設定を行います。 ハイライトを設定した文字は緑色のアクセントが加わります。',
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
