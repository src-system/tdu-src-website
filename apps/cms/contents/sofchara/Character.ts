import type { CollectionConfig } from 'payload'

const RULE_LEVEL_OPTIONS = [
  { label: '◯ 許可', value: 'allowed' },
  { label: '△ 条件付き許可', value: 'conditional' },
  { label: '✕ 禁止', value: 'prohibited' },
]

export const Characters: CollectionConfig = {
  slug: 'characters',
  access: { read: () => true },
  admin: {
    group: 'ソフキャラ',
    useAsTitle: 'jpName',
    description: 'ソフキャラのキャラクター',
    defaultColumns: ['jpName', 'enName', 'url', 'updatedAt'],
  },
  fields: [
    {
      name: 'order',
      type: 'number',
      required: true,
      unique: true,
      label: '表示順番',
      admin: {
        description: '一覧の並び順・関連参照に使用（APIではidとして返却）',
      },
    },
    {
      name: 'jpName',
      type: 'text',
      required: true,
      label: '日本語名',
    },
    {
      name: 'enName',
      type: 'text',
      required: true,
      label: '英語名',
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL識別子',
      admin: {
        description: '詳細ページのURL（/sofchara/[url]）',
      },
    },
    {
      name: 'portraitImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      filterOptions: {
        mimeType: { contains: 'image' },
      },
      label: '顔画像',
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
      name: 'imageLabel',
      type: 'text',
      required: true,
      label: 'デフォルト画像の説明文',
    },
    {
      name: 'author',
      type: 'text',
      required: true,
      label: '作者名',
    },
    {
      name: 'introduction',
      type: 'textarea',
      required: true,
      label: 'キャラクター紹介文',
      admin: {
        description: '簡潔に',
      },
    },
    {
      name: 'catchphrase',
      type: 'text',
      label: 'キャッチフレーズ',
    },
    {
      name: 'profile',
      type: 'group',
      label: 'プロフィール',
      fields: [
        {
          name: 'birthday',
          type: 'text',
          label: '誕生日',
          admin: {
            description: '月/日形式',
          },
        },
        {
          name: 'gender',
          type: 'text',
          label: '性別',
        },
        {
          name: 'height',
          type: 'text',
          label: '身長',
        },
        {
          name: 'weight',
          type: 'text',
          label: '体重',
        },
      ],
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
      name: 'gallery',
      type: 'array',
      label: 'ギャラリー',
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
    {
      name: 'alternates',
      type: 'array',
      label: '別衣装',
      fields: [
        {
          name: 'id',
          type: 'text',
          required: true,
          label: '衣装ID',
        },
        {
          name: 'alternateName',
          type: 'text',
          required: true,
          label: '衣装名',
        },
        {
          name: 'fullbodyImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          filterOptions: {
            mimeType: { contains: 'image' },
          },
        },
        {
          name: 'portraitImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          filterOptions: {
            mimeType: { contains: 'image' },
          },
        },
      ],
    },
    {
      name: 'relations',
      type: 'array',
      label: 'ソフケンタウンとの関連性',
      fields: [
        {
          name: 'sofkenTownId',
          type: 'text',
          required: true,
          label: 'ソフケンタウンのID',
        },
        {
          name: 'description',
          type: 'textarea',
          label: '関連性の説明',
        },
      ],
    },
    {
      name: 'rules',
      type: 'group',
      label: '二次創作ガイドライン',
      fields: [
        {
          name: 'r18',
          type: 'select',
          required: true,
          options: RULE_LEVEL_OPTIONS,
          label: 'R-18表現（性的表現）',
        },
        {
          name: 'r18g',
          type: 'select',
          required: true,
          options: RULE_LEVEL_OPTIONS,
          label: 'R-18G表現（残酷・グロ表現）',
        },
        {
          name: 'colabo',
          type: 'select',
          required: true,
          options: RULE_LEVEL_OPTIONS,
          label: '外部キャラクターとの絡み',
        },
        {
          name: 'coupling',
          type: 'select',
          required: true,
          options: RULE_LEVEL_OPTIONS,
          label: 'カップリング表現',
        },
        {
          name: 'snsRolePlaying',
          type: 'select',
          required: true,
          options: RULE_LEVEL_OPTIONS,
          label: 'SNSでのなりきり活動',
        },
        {
          name: 'modification',
          type: 'select',
          required: true,
          options: RULE_LEVEL_OPTIONS,
          label: '大きな改変',
        },
        {
          name: 'others',
          type: 'richText',
          label: 'その他の規約',
        },
      ],
    },
  ],
}
