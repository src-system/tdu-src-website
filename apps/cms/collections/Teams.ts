import type { CollectionConfig } from 'payload'

export const Teams: CollectionConfig = {
  slug: 'teams',
  admin: {
    useAsTitle: 'name',
    description: '各班の詳細情報',
  },
  fields: [
    {
      name: 'teamType',
      type: 'select',
      required: true,
      unique: true,
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
      name: 'name',
      type: 'text',
      required: true,
      label: '班名',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      filterOptions: {
        mimeType: { contains: 'image' },
      },
      label: 'ヘッダー画像',
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'ページタイトル',
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      label: 'サブタイトル',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: '説明',
    },
    {
      name: 'activities',
      type: 'array',
      required: true,
      minRows: 1,
      label: '活動内容',
      fields: [
        {
          name: 'activity',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'activityLabel',
      type: 'text',
      defaultValue: '活動内容',
      label: '活動内容ラベル',
    },
    {
      name: 'leaderInterview',
      type: 'group',
      label: '班長インタビュー',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: '班長インタビュー',
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          label: '班長名',
        },
        {
          name: 'role',
          type: 'text',
          required: true,
          label: '役職',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          filterOptions: {
            mimeType: { contains: 'image' },
          },
          label: '班長画像',
        },
        {
          name: 'alt',
          type: 'text',
          required: true,
        },
        {
          name: 'qa',
          type: 'array',
          required: true,
          minRows: 1,
          label: 'Q&A',
          fields: [
            {
              name: 'question',
              type: 'text',
              required: true,
              label: '質問',
            },
            {
              name: 'answer',
              type: 'textarea',
              required: true,
              label: '回答',
            },
          ],
        },
      ],
    },
    {
      name: 'softwares',
      type: 'array',
      label: '使用ソフトウェア',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
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
      ],
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'ギャラリー',
      fields: [
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
          name: 'thumbnail',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (_data, siblingData) => siblingData.type !== 'image',
          },
        },
        {
          name: 'title',
          type: 'text',
          admin: {
            condition: (_data, siblingData) => siblingData.type === 'sound',
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
