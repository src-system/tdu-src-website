import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { AboutSections } from './collections/AboutSections'
import { Activities } from './collections/Activities'
import { Characters } from './collections/Characters'
import { HeroCatchphrases } from './collections/HeroCatchphrases'
import { HeroVideos } from './collections/HeroVideos'
import { History } from './collections/History'
import { Media } from './collections/Media'
import { News } from './collections/News'
import { TeamSections } from './collections/TeamSections'
import { Teams } from './collections/Teams'
// Collections
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    HeroVideos,
    HeroCatchphrases,
    AboutSections,
    TeamSections,
    News,
    Characters,
    Activities,
    History,
    Teams,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
})
