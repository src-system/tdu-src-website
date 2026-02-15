import type { GlobalConfig } from 'payload'

export const TopVideo: GlobalConfig = {
  slug: 'top-video',
  label: 'トップビデオ',
  admin: {
    group: 'トップページ',
    description: 'トップページ上部に表示される背景動画とスプラッシュロゴの設定',
  },
  fields: [
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      required: true,
      filterOptions: {
        mimeType: { contains: 'video' },
      },
      label: '動画',
      admin: {
        description: '16:9推奨、ループ再生',
      },
    },
    {
      name: 'logoEnabled',
      type: 'checkbox',
      required: true,
      defaultValue: true,
      label: 'スプラッシュロゴを表示',
    },
  ],
}
