import type { GlobalConfig } from 'payload'
import { getTeamDetailFieldsFor } from '../teamDetailFields'

export const Team3d: GlobalConfig = {
  slug: 'team-3d',
  label: '3D班',
  access: { read: () => true },
  admin: {
    group: 'team',
    description: '3D班の詳細情報（1件のみ）',
  },
  fields: getTeamDetailFieldsFor('3d'),
}
