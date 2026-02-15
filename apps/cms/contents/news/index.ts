import type { GlobalConfig } from 'payload'
import { newsOverviewFields } from './NewsOverview'
import { pageHeaderFields } from './PageHeader'

export const NewsPage: GlobalConfig = {
  slug: 'news-page',
  label: 'Newsページ',
  admin: {
    group: 'News',
    description: 'Newsページのヘッダーと概要',
  },
  fields: [
    {
      name: 'pageHeader',
      type: 'group',
      label: '1. ページヘッダー',
      fields: pageHeaderFields,
    },
    {
      name: 'newsOverview',
      type: 'group',
      label: '2. News概要',
      fields: newsOverviewFields,
    },
  ],
}
