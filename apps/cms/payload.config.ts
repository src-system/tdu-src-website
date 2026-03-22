import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { EXPERIMENTAL_TableFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { translations } from '@payloadcms/translations/all'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { AboutPage } from './contents/about'
import { Activities } from './contents/about/Activities'
import { History } from './contents/about/History'
import { Media } from './contents/collections/Media'
import { Users } from './contents/collections/users'
import { NewsPage } from './contents/news'
import { News } from './contents/news/NewsItem'
import { SiteSettings } from './contents/SiteSettings'
import { SofcharaPage } from './contents/sofchara'
import { Characters } from './contents/sofchara/Character'
import { Guideline } from './contents/sofchara/Guideline'
import { Sofkentown } from './contents/sofchara/Sofkentown'
import { TeamPage } from './contents/team'
import { Team2d } from './contents/team/2d'
import { Team3d } from './contents/team/3d'
import { TeamDesign } from './contents/team/design'
import { TeamGame } from './contents/team/game'
import { TeamSound } from './contents/team/sound'
import { TeamWebapp } from './contents/team/webapp'
import { AboutSection } from './contents/toppage/AboutSection'
import { Catchphrase } from './contents/toppage/Catchphrase'
import { CharactersSection } from './contents/toppage/CharactersSection'
import { NewsSection } from './contents/toppage/NewsSection'
import { TeamSection } from './contents/toppage/TeamSection'
import { TopVideo } from './contents/toppage/TopVideo'

const ja = translations.ja
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // ローカル開発では CMS_SERVER_URL 未設定だと本番 URL になり、セッションと不一致で 403 になることがある
  serverURL:
    process.env.CMS_SERVER_URL ||
    process.env.NEXT_PUBLIC_CMS_URL ||
    'https://cms.tdu-src.com',
  logger: {
    options: {
      level: process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    },
  },
  routes: {
    admin: '/admin',
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    suppressHydrationWarning: true,
  },
  globals: [
    SiteSettings,
    AboutPage,
    TopVideo,
    Catchphrase,
    AboutSection,
    NewsSection,
    TeamSection,
    CharactersSection,
    NewsPage,
    TeamPage,
    SofcharaPage,
    Guideline,
    Team2d,
    Team3d,
    TeamGame,
    TeamWebapp,
    TeamSound,
    TeamDesign,
  ],
  collections: [Activities, History, News, Characters, Sofkentown, Users, Media],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures, EXPERIMENTAL_TableFeature()],
  }),
  i18n: {
    supportedLanguages: { ja },
    fallbackLanguage: 'ja',
  },
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    push: process.env.PAYLOAD_DATABASE_PUSH === 'true',
  }),
  sharp,
})
