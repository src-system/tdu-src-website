import type { GlobalConfig } from 'payload'
import { getTeamCardFieldsFor } from '../TeamCard'
import { aboutSectionFields } from './AboutSection'
import { galleryField } from './Gallery'
import { pageHeaderFields } from './PageHeader'
import { softwaresField } from './SoftwareItem'
import { teamReaderSectionFields } from './TeamReaderSection'

export const TeamGame: GlobalConfig = {
  slug: 'team-game',
  label: 'ゲームプログラミング班',
  admin: {
    group: 'team',
    description: 'ゲームプログラミング班の詳細情報（1件のみ）',
  },
  fields: [
    ...getTeamCardFieldsFor('game'),
    ...pageHeaderFields,
    ...aboutSectionFields,
    ...teamReaderSectionFields,
    softwaresField,
    galleryField,
  ],
}
