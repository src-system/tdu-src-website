import type { Field } from 'payload'

export const teamReaderSectionFields: Field[] = [
  {
    name: 'leaderInterview',
    type: 'group',
    label: '班長インタビュー',
    admin: {
      description: 'オプション。データがない場合は非表示',
    },
    fields: [
      {
        name: 'title',
        type: 'text',
        required: true,
        label: 'タイトル',
        defaultValue: 'Team Reader Interview',
      },
      {
        name: 'subtitle',
        type: 'textarea',
        label: 'サブタイトル',
        defaultValue: '班長インタビュー',
      },
      {
        name: 'name',
        type: 'text',
        required: true,
        label: '班長名',
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
        label: '班長画像の代替テキスト',
      },
      {
        name: 'body',
        type: 'textarea',
        label: 'インタビュー本文',
        admin: {
          description: 'インタビュー内容をテキストで記載',
        },
      },
      {
        name: 'qa',
        type: 'array',
        label: 'Q&A',
        admin: {
          description: '任意。質問と回答の形式で追加',
        },
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
]
