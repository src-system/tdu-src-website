import type { GlobalConfig } from 'payload'
import { getTeamDetailFieldsFor } from '../teamDetailFields'

export const Team2d: GlobalConfig = {
  slug: 'team-2d',
  label: '2D班',
  access: { read: () => true },
  admin: {
    group: 'team',
    description: '2D班の詳細情報（1件のみ）',
  },
  fields: getTeamDetailFieldsFor('2d'),
}
