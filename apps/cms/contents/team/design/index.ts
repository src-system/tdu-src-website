import type { GlobalConfig } from 'payload'
import { getTeamDetailFieldsFor } from '../teamDetailFields'

export const TeamDesign: GlobalConfig = {
  slug: 'team-design',
  label: 'デザイン班',
  access: { read: () => true },
  admin: {
    group: 'team',
    description: 'デザイン班の詳細情報（1件のみ）',
  },
  fields: getTeamDetailFieldsFor('design'),
}
