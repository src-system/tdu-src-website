import type { GlobalConfig } from 'payload'
import { aboutSectionFields } from './AboutSection'
import { activitySectionFields } from './ActivitySection'
import { historySectionFields } from './HistorySection'
import { pageHeaderFields } from './PageHeader'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'Aboutページ',
  access: { read: () => true },
  admin: {
    group: 'Aboutページ',
    description: 'Aboutページの全セクション',
  },
  fields: [
    {
      name: 'pageHeader',
      type: 'group',
      label: '1. ページヘッダー',
      fields: pageHeaderFields,
    },
    {
      name: 'aboutSection',
      type: 'group',
      label: '2. Aboutセクション',
      fields: aboutSectionFields,
    },
    {
      name: 'activitySection',
      type: 'group',
      label: '3. アクティビティセクション',
      fields: activitySectionFields,
    },
    {
      name: 'historySection',
      type: 'group',
      label: '4. ヒストリーセクション',
      fields: historySectionFields,
    },
  ],
}
