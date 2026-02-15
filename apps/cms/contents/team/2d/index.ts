import type { GlobalConfig } from 'payload'
import { getTeamCardFieldsFor } from '../TeamCard'
import { aboutSectionFields } from './AboutSection'
import { galleryField } from './Gallery'
import { pageHeaderFields } from './PageHeader'
import { softwaresField } from './SoftwareItem'
import { teamReaderSectionFields } from './TeamReaderSection'

export const Team2d: GlobalConfig = {
  slug: 'team-2d',
  label: '2D班',
  admin: {
    group: 'team',
    description: '2D班の詳細情報（1件のみ）',
  },
  fields: [
    ...getTeamCardFieldsFor('2d'),
    ...pageHeaderFields,
    ...aboutSectionFields,
    ...teamReaderSectionFields,
    softwaresField,
    galleryField,
  ],
}
