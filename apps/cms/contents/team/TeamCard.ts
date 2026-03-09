import type { Field } from 'payload'

const TEAM_OPTIONS = [
  { label: '2D班', value: '2d' },
  { label: '3D班', value: '3d' },
  { label: 'ゲームプログラミング班', value: 'game' },
  { label: 'Webアプリ班', value: 'webapp' },
  { label: 'サウンド班', value: 'sound' },
  { label: 'デザイン班', value: 'design' },
] as const

export const teamCardFields: Field[] = [
  {
    name: 'teamType',
    type: 'select',
    required: true,
    unique: true,
    options: [...TEAM_OPTIONS],
    label: '班種別',
    admin: {
      description: 'TeamType。URL（/team/[teamName]）に使用',
    },
  },
  {
    name: 'name',
    type: 'text',
    required: true,
    label: '班名',
  },
  {
    name: 'cardImage',
    type: 'upload',
    relationTo: 'media',
    required: true,
    filterOptions: {
      mimeType: { contains: 'image' },
    },
    label: '班カード画像',
    admin: {
      description: '班のイメージ画像（16:9推奨）',
    },
  },
  {
    name: 'cardAlt',
    type: 'text',
    required: true,
    label: '班カード画像の代替テキスト',
  },
  {
    name: 'cardDescription',
    type: 'textarea',
    required: true,
    label: '班の簡単な説明',
  },
  {
    name: 'activityLabels',
    type: 'array',
    required: true,
    minRows: 1,
    label: '活動ラベル',
    fields: [
      {
        name: 'label',
        type: 'text',
        required: true,
        label: 'ラベル',
      },
    ],
  },
]

/** 班ごとの Collection 用：teamType を固定 */
export function getTeamCardFieldsFor(teamType: string): Field[] {
  return [
    {
      name: 'teamType',
      type: 'text',
      required: true,
      defaultValue: teamType,
      admin: {
        readOnly: true,
        description: '班種別（自動設定）',
      },
    },
    ...teamCardFields.filter(
      (f): f is Field & { name: string } => 'name' in f && f.name !== 'teamType',
    ),
  ]
}
