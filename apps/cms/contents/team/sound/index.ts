import type { GlobalConfig } from 'payload'
import { getTeamCardFieldsFor } from '../TeamCard'
import { aboutSectionFields } from './AboutSection'
import { galleryField } from './Gallery'
import { pageHeaderFields } from './PageHeader'
import { softwaresField } from './SoftwareItem'
import { teamReaderSectionFields } from './TeamReaderSection'

export const TeamSound: GlobalConfig = {
  slug: 'team-sound',
  label: 'サウンド班',
  admin: {
    group: 'team',
    description: 'サウンド班の詳細情報（1件のみ）',
  },
  fields: [
    ...getTeamCardFieldsFor('sound'),
    ...pageHeaderFields,
    ...aboutSectionFields,
    ...teamReaderSectionFields,
    softwaresField,
    galleryField,
  ],
}
