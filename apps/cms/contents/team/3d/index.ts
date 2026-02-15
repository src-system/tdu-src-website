import type { GlobalConfig } from 'payload'
import { getTeamCardFieldsFor } from '../TeamCard'
import { aboutSectionFields } from './AboutSection'
import { galleryField } from './Gallery'
import { pageHeaderFields } from './PageHeader'
import { softwaresField } from './SoftwareItem'
import { teamReaderSectionFields } from './TeamReaderSection'

export const Team3d: GlobalConfig = {
  slug: 'team-3d',
  label: '3D班',
  admin: {
    group: 'team',
    description: '3D班の詳細情報（1件のみ）',
  },
  fields: [
    ...getTeamCardFieldsFor('3d'),
    ...pageHeaderFields,
    ...aboutSectionFields,
    ...teamReaderSectionFields,
    softwaresField,
    galleryField,
  ],
}
