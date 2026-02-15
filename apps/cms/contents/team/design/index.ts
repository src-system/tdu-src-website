import type { GlobalConfig } from 'payload'
import { getTeamCardFieldsFor } from '../TeamCard'
import { aboutSectionFields } from './AboutSection'
import { galleryField } from './Gallery'
import { pageHeaderFields } from './PageHeader'
import { softwaresField } from './SoftwareItem'
import { teamReaderSectionFields } from './TeamReaderSection'

export const TeamDesign: GlobalConfig = {
  slug: 'team-design',
  label: 'デザイン班',
  admin: {
    group: 'team',
    description: 'デザイン班の詳細情報（1件のみ）',
  },
  fields: [
    ...getTeamCardFieldsFor('design'),
    ...pageHeaderFields,
    ...aboutSectionFields,
    ...teamReaderSectionFields,
    softwaresField,
    galleryField,
  ],
}
