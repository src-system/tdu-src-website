import type { GlobalConfig } from 'payload'
import { aboutSectionFields } from './AboutSection'
import { characterSectionFields } from './CharacterSection'
import { conceptSectionFields } from './ConceptSection'
import { guidelineSectionFields } from './GuidelineSection'
import { pageHeaderFields } from './PageHeader'

export const SofcharaPage: GlobalConfig = {
  slug: 'sofchara-page',
  label: 'ソフキャラページ',
  admin: {
    group: 'ソフキャラ',
    description: 'ソフキャラトップページ（/sofchara）',
  },
  fields: [
    {
      name: 'pageHeader',
      type: 'group',
      label: '1. ページヘッダー',
      fields: pageHeaderFields,
    },
    {
      name: 'aboutSection',
      type: 'group',
      label: '2. Aboutセクション',
      fields: aboutSectionFields,
    },
    {
      name: 'conceptSection',
      type: 'group',
      label: '3. 企画の広がりセクション',
      fields: conceptSectionFields,
    },
    {
      name: 'guidelineSection',
      type: 'group',
      label: '4. 二次創作ガイドラインセクション',
      fields: guidelineSectionFields,
    },
    {
      name: 'characterSection',
      type: 'group',
      label: '5. キャラクター一覧セクション',
      fields: characterSectionFields,
    },
  ],
}
