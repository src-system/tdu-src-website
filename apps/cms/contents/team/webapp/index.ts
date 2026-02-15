import type { GlobalConfig } from 'payload'
import { getTeamCardFieldsFor } from '../TeamCard'
import { aboutSectionFields } from './AboutSection'
import { galleryField } from './Gallery'
import { pageHeaderFields } from './PageHeader'
import { softwaresField } from './SoftwareItem'
import { teamReaderSectionFields } from './TeamReaderSection'

export const TeamWebapp: GlobalConfig = {
  slug: 'team-webapp',
  label: 'Webアプリ班',
  admin: {
    group: 'team',
    description: 'Webアプリ班の詳細情報（1件のみ）',
  },
  fields: [
    ...getTeamCardFieldsFor('webapp'),
    ...pageHeaderFields,
    ...aboutSectionFields,
    ...teamReaderSectionFields,
    softwaresField,
    galleryField,
  ],
}
