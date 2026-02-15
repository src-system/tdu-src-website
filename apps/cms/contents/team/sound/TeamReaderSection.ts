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
]
