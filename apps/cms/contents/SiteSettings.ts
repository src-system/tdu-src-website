import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'サイト設定',
  access: { read: () => true },
  admin: {
    group: 'サイト全体',
    description: 'フッターなどで使用するサイト全体の設定',
  },
  fields: [
    {
      name: 'contact',
      type: 'group',
      label: '連絡先',
      fields: [
        {
          name: 'email',
          type: 'email',
          label: 'メールアドレス',
          admin: {
            description: 'お問い合わせ用のメールアドレス',
          },
        },
        {
          name: 'githubUrl',
          type: 'text',
          label: 'GitHub URL',
          admin: {
            description: 'GitHubの組織/ユーザーページURL（例: https://github.com/tdu-soft-ware）',
          },
          validate: (value: string | null | undefined) => {
            if (!value) return true
            if (!value.startsWith('https://github.com/')) {
              return 'GitHub URLは https://github.com/ で始まる必要があります'
            }
            return true
          },
        },
        {
          name: 'xUrl',
          type: 'text',
          label: 'X (Twitter) URL',
          admin: {
            description: 'X (Twitter) のアカウントURL（例: https://x.com/tdu_src）',
          },
          validate: (value: string | null | undefined) => {
            if (!value) return true
            if (!value.startsWith('https://x.com/') && !value.startsWith('https://twitter.com/')) {
              return 'X URLは https://x.com/ または https://twitter.com/ で始まる必要があります'
            }
            return true
          },
        },
        {
          name: 'youtubeUrl',
          type: 'text',
          label: 'YouTube URL',
          admin: {
            description: 'YouTubeチャンネルURL（例: https://www.youtube.com/@tdu-src）',
          },
          validate: (value: string | null | undefined) => {
            if (!value) return true
            if (
              !value.startsWith('https://www.youtube.com/') &&
              !value.startsWith('https://youtube.com/')
            ) {
              return 'YouTube URLは https://www.youtube.com/ で始まる必要があります'
            }
            return true
          },
        },
      ],
    },
    {
      name: 'location',
      type: 'text',
      label: '所在地',
      admin: {
        description: 'フッターに表示する所在地（例: 東京電機大学 千住キャンパス）',
      },
    },
  ],
}
