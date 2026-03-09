import type { GlobalConfig } from 'payload'
import { getTeamDetailFieldsFor } from '../teamDetailFields'

export const TeamSound: GlobalConfig = {
  slug: 'team-sound',
  label: 'サウンド班',
  access: { read: () => true },
  admin: {
    group: 'team',
    description: 'サウンド班の詳細情報（1件のみ）',
  },
  fields: getTeamDetailFieldsFor('sound'),
}
