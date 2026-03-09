import type { GlobalConfig } from 'payload'
import { teamOverviewFields } from './TeamOverview'
import { teamPageHeaderFields } from './TeamPageHeader'

export const TeamPage: GlobalConfig = {
  slug: 'team-page',
  label: 'Teamページ',
  access: { read: () => true },
  admin: {
    group: 'team',
    description: 'TeamページのヘッダーとAboutセクション',
  },
  fields: [
    {
      name: 'pageHeader',
      type: 'group',
      label: '1. ページヘッダー',
      fields: teamPageHeaderFields,
    },
    {
      name: 'teamOverview',
      type: 'group',
      label: '2. Aboutセクション',
      fields: teamOverviewFields,
    },
  ],
}
