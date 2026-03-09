import type { GlobalConfig } from 'payload'
import { getTeamDetailFieldsFor } from '../teamDetailFields'

export const TeamWebapp: GlobalConfig = {
  slug: 'team-webapp',
  label: 'Webアプリ班',
  access: { read: () => true },
  admin: {
    group: 'team',
    description: 'Webアプリ班の詳細情報（1件のみ）',
  },
  fields: getTeamDetailFieldsFor('webapp'),
}
