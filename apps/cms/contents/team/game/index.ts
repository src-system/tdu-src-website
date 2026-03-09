import type { GlobalConfig } from 'payload'
import { getTeamDetailFieldsFor } from '../teamDetailFields'

export const TeamGame: GlobalConfig = {
  slug: 'team-game',
  label: 'ゲームプログラミング班',
  access: { read: () => true },
  admin: {
    group: 'team',
    description: 'ゲームプログラミング班の詳細情報（1件のみ）',
  },
  fields: getTeamDetailFieldsFor('game'),
}
