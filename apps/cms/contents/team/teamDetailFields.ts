import type { Field } from 'payload'
import { galleryField } from './2d/Gallery'
import { pageHeaderFields } from './2d/PageHeader'
import { softwaresField } from './2d/SoftwareItem'
import { teamReaderSectionFields } from './2d/TeamReaderSection'
import { aboutSectionFields } from './AboutSection'
import { getTeamCardFieldsFor } from './TeamCard'

export function getTeamDetailFieldsFor(teamType: string): Field[] {
  const leaderInterviewField = teamReaderSectionFields.find(
    (f): f is Field & { name: string } => 'name' in f && f.name === 'leaderInterview',
  )
  const leaderInterviewWithLabel = leaderInterviewField
    ? { ...leaderInterviewField, label: '4. 班長インタビュー' }
    : null

  return [
    {
      name: 'teamCard',
      type: 'group',
      label: '1. 班カード',
      admin: {
        description: '班一覧カードに表示する情報',
      },
      fields: getTeamCardFieldsFor(teamType),
    },
    {
      name: 'pageHeader',
      type: 'group',
      label: '2. ページヘッダー',
      admin: {
        description: '班詳細ページ上部の画像とタイトル',
      },
      fields: pageHeaderFields,
    },
    {
      name: 'aboutSection',
      type: 'group',
      label: '3. Aboutセクション',
      admin: {
        description: '班の詳細説明',
      },
      fields: aboutSectionFields,
    },
    ...(leaderInterviewWithLabel ? [leaderInterviewWithLabel] : []),
    { ...softwaresField, label: '5. 使用ソフトウェア' } as Field,
    { ...galleryField, label: '6. ギャラリー' } as Field,
  ]
}
