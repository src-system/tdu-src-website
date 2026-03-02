/**
 * Payload CMS API クライアント
 * トップページ・各セクションのコンテンツを取得
 */

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001'

const isDev = process.env.NODE_ENV === 'development'

/** CMS 更新を即時反映するため、常にキャッシュなしで取得 */
const FETCH_OPTIONS = { cache: 'no-store' as RequestCache } as const

function resolveMediaUrl(url: string | null | undefined): string {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  const base = CMS_URL.replace(/\/$/, '')
  return url.startsWith('/') ? `${base}${url}` : `${base}/${url}`
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, FETCH_OPTIONS)
    if (!res.ok) {
      if (isDev) {
        console.warn(`[payload] ${url} → ${res.status} ${res.statusText}`)
      }
      return null
    }
    return (await res.json()) as T
  } catch (err) {
    if (isDev) {
      console.warn(`[payload] ${url} → fetch failed:`, err instanceof Error ? err.message : err)
    }
    return null
  }
}

export type CatchphraseSegment = {
  text: string
  highlighted: boolean
}

export type TopVideoData = {
  videoUrl: string
  logoEnabled: boolean
}

export type CatchphraseData = {
  segments: CatchphraseSegment[]
}

export type TopHeroFetchResult =
  | { success: true; topVideo: TopVideoData; catchphrase: CatchphraseData }
  | { success: false; failedItems: ('top-video' | 'catchphrase')[] }

async function fetchTopVideo(): Promise<TopVideoData | null> {
  const url = `${CMS_URL}/api/globals/top-video?depth=1`
  try {
    const res = await fetch(url, FETCH_OPTIONS)
    if (!res.ok) {
      if (isDev) console.warn(`[payload] top-video → ${res.status}`)
      return null
    }

    const data = (await res.json()) as {
      video?: number | { url?: string | null }
      logoEnabled?: boolean
    }

    const video = data.video
    const videoUrl = typeof video === 'object' && video?.url ? resolveMediaUrl(video.url) : ''

    if (!videoUrl) {
      if (isDev) {
        console.warn(
          '[payload] top-video → video.url が空です。動画をアップロードし、トップビデオに設定してください。',
          {
            videoType: typeof video,
            video,
          },
        )
      }
      return null
    }

    return {
      videoUrl,
      logoEnabled: data.logoEnabled ?? true,
    }
  } catch (err) {
    if (isDev) {
      console.warn('[payload] top-video → fetch failed:', err instanceof Error ? err.message : err)
    }
    return null
  }
}

async function fetchCatchphrase(): Promise<CatchphraseData | null> {
  const url = `${CMS_URL}/api/globals/catchphrase`
  try {
    const res = await fetch(url, FETCH_OPTIONS)
    if (!res.ok) {
      if (isDev) console.warn(`[payload] catchphrase → ${res.status}`)
      return null
    }

    const data = (await res.json()) as {
      segments?: Array<{ text?: string; highlighted?: boolean }>
    }

    const segments = data.segments
    if (!Array.isArray(segments) || segments.length === 0) {
      if (isDev) {
        console.warn(
          '[payload] catchphrase → segments が空です。1件以上のセグメントを設定してください。',
          {
            segments: data.segments,
          },
        )
      }
      return null
    }

    const validSegments: CatchphraseSegment[] = segments
      .filter((s): s is { text: string; highlighted: boolean } => !!s?.text)
      .map((s) => ({
        text: s.text,
        highlighted: s.highlighted ?? false,
      }))

    if (validSegments.length === 0) {
      if (isDev) {
        console.warn('[payload] catchphrase → text が空のセグメントのみです')
      }
      return null
    }

    return { segments: validSegments }
  } catch (err) {
    if (isDev) {
      console.warn(
        '[payload] catchphrase → fetch failed:',
        err instanceof Error ? err.message : err,
      )
    }
    return null
  }
}

export async function getTopHeroData(): Promise<TopHeroFetchResult> {
  const [topVideo, catchphrase] = await Promise.all([fetchTopVideo(), fetchCatchphrase()])

  const failedItems: ('top-video' | 'catchphrase')[] = []
  if (!topVideo) failedItems.push('top-video')
  if (!catchphrase) failedItems.push('catchphrase')

  if (failedItems.length > 0) {
    return { success: false, failedItems }
  }

  return {
    success: true,
    topVideo: topVideo!,
    catchphrase: catchphrase!,
  }
}

// --- コンテンツブロック（about, team, news, characters）---

export type AboutSectionData = {
  title: string
  subtitle: string
  description: string
  images: { imagePath: string; alt: string }[]
}

export type ContentBlockData = {
  title: string
  subtitle: string
  description?: string
}

export type ContentBlocksData = {
  about: AboutSectionData
  team: ContentBlockData
  news: ContentBlockData
  characters: ContentBlockData
}

export async function getContentBlocks(): Promise<ContentBlocksData> {
  const [aboutRes, teamRes, newsPageRes, sofcharaRes] = await Promise.all([
    fetchJson<{
      title?: string
      subtitle?: string
      description?: string
      images?: Array<{ image?: { url?: string }; alt?: string }>
    }>(`${CMS_URL}/api/globals/about-section?depth=1`),
    fetchJson<{ title?: string; subtitle?: string; description?: string }>(
      `${CMS_URL}/api/globals/team-section`,
    ),
    fetchJson<{
      newsOverview?: { title?: string; subtitle?: string; description?: string }
    }>(`${CMS_URL}/api/globals/news-page`),
    fetchJson<{
      characterSection?: { title?: string; subtitle?: string; description?: string }
    }>(`${CMS_URL}/api/globals/sofchara-page`),
  ])

  const aboutImages =
    aboutRes?.images?.map((img) => ({
      imagePath: resolveMediaUrl(typeof img.image === 'object' ? img.image?.url : undefined),
      alt: img.alt ?? '',
    })) ?? []

  return {
    about: {
      title: aboutRes?.title ?? '',
      subtitle: aboutRes?.subtitle ?? '',
      description: aboutRes?.description ?? '',
      images: aboutImages,
    },
    team: {
      title: teamRes?.title ?? '',
      subtitle: teamRes?.subtitle ?? '',
      description: teamRes?.description ?? '',
    },
    news: {
      title: newsPageRes?.newsOverview?.title ?? '',
      subtitle: newsPageRes?.newsOverview?.subtitle ?? '',
      description: newsPageRes?.newsOverview?.description ?? '',
    },
    characters: {
      title: sofcharaRes?.characterSection?.title ?? '',
      subtitle: sofcharaRes?.characterSection?.subtitle ?? '',
      description: sofcharaRes?.characterSection?.description ?? '',
    },
  }
}

// --- Aboutページ ---

export type AboutPageActivityItem = {
  title: string
  description: string
  imagePath: string
  alt: string
}

export type AboutPageHistoryItem = {
  year: number
  month?: number
  title: string
  description: string
}

export type AboutPageData = {
  pageHeader: {
    imagePath: string
    alt: string
    title: string
  }
  aboutSection: {
    title: string
    subtitle: string
    description: unknown // Lexical JSON
  }
  activitySection: {
    title: string
    subtitle: string
    items: AboutPageActivityItem[]
  }
  historySection: {
    title: string
    subtitle: string
    timeline: AboutPageHistoryItem[]
  }
}

export async function getAboutPageData(): Promise<AboutPageData | null> {
  const data = await fetchJson<{
    pageHeader?: {
      image?: number | { url?: string | null }
      alt?: string
      title?: string
    }
    aboutSection?: {
      title?: string
      subtitle?: string
      description?: unknown
    }
    activitySection?: {
      title?: string
      subtitle?: string
      items?: Array<{
        activity?:
          | number
          | {
              title?: string
              description?: string
              image?: number | { url?: string | null }
              alt?: string
            }
      }>
    }
    historySection?: {
      title?: string
      subtitle?: string
      timeline?: Array<{
        event?:
          | number
          | {
              year?: number
              month?: number
              title?: string
              description?: string
            }
      }>
    }
  }>(`${CMS_URL}/api/globals/about-page?depth=2`)

  if (!data) return null

  const pageHeaderImage =
    typeof data.pageHeader?.image === 'object' && data.pageHeader?.image?.url
      ? resolveMediaUrl(data.pageHeader.image.url)
      : ''

  const activityItems: AboutPageActivityItem[] =
    data.activitySection?.items?.map((item) => {
      const act = typeof item.activity === 'object' ? item.activity : null
      const img = typeof act?.image === 'object' ? act.image : null
      return {
        title: act?.title ?? '',
        description: act?.description ?? '',
        imagePath: resolveMediaUrl(img?.url),
        alt: act?.alt ?? '',
      }
    }) ?? []

  const historyItems: AboutPageHistoryItem[] =
    data.historySection?.timeline?.map((item) => {
      const ev = typeof item.event === 'object' ? item.event : null
      return {
        year: ev?.year ?? 0,
        month: ev?.month,
        title: ev?.title ?? '',
        description: ev?.description ?? '',
      }
    }) ?? []

  return {
    pageHeader: {
      imagePath: pageHeaderImage,
      alt: data.pageHeader?.alt ?? '',
      title: data.pageHeader?.title ?? '部の活動',
    },
    aboutSection: {
      title: data.aboutSection?.title ?? 'ABOUT',
      subtitle: data.aboutSection?.subtitle ?? 'ソフトウェア研究部について',
      description: data.aboutSection?.description ?? null,
    },
    activitySection: {
      title: data.activitySection?.title ?? 'ACTIVITY',
      subtitle: data.activitySection?.subtitle ?? '主な活動',
      items: activityItems,
    },
    historySection: {
      title: data.historySection?.title ?? 'HISTORY',
      subtitle: data.historySection?.subtitle ?? '沿革',
      timeline: historyItems,
    },
  }
}

// --- Newsページ ---

export type NewsPageData = {
  pageHeader: {
    imagePath: string
    alt: string
    title: string
  }
  newsOverview: {
    title: string
    subtitle: string
    description: string
  }
}

export async function getNewsPageData(): Promise<NewsPageData | null> {
  const data = await fetchJson<{
    pageHeader?: {
      image?: number | { url?: string | null }
      alt?: string
      title?: string
    }
    newsOverview?: {
      title?: string
      subtitle?: string
      description?: string
    }
  }>(`${CMS_URL}/api/globals/news-page?depth=1`)

  if (!data) return null

  const pageHeaderImage =
    typeof data.pageHeader?.image === 'object' && data.pageHeader?.image?.url
      ? resolveMediaUrl(data.pageHeader.image.url)
      : ''

  return {
    pageHeader: {
      imagePath: pageHeaderImage,
      alt: data.pageHeader?.alt ?? '',
      title: data.pageHeader?.title ?? '新着情報',
    },
    newsOverview: {
      title: data.newsOverview?.title ?? 'NEWS',
      subtitle: data.newsOverview?.subtitle ?? 'お知らせ',
      description: data.newsOverview?.description ?? '',
    },
  }
}

// --- Teamページ ---

export type TeamPageData = {
  pageHeader: {
    imagePath: string
    alt: string
    title: string
  }
  teamOverview: {
    title: string
    subtitle: string
    description: string
  }
}

export async function getTeamPageData(): Promise<TeamPageData | null> {
  const data = await fetchJson<{
    pageHeader?: {
      image?: number | { url?: string | null }
      alt?: string
      title?: string
    }
    teamOverview?: {
      title?: string
      subtitle?: string
      description?: string
    }
  }>(`${CMS_URL}/api/globals/team-page?depth=1`)

  if (!data) return null

  const pageHeaderImage =
    typeof data.pageHeader?.image === 'object' && data.pageHeader?.image?.url
      ? resolveMediaUrl(data.pageHeader.image.url)
      : ''

  return {
    pageHeader: {
      imagePath: pageHeaderImage,
      alt: data.pageHeader?.alt ?? '',
      title: data.pageHeader?.title ?? '班紹介',
    },
    teamOverview: {
      title: data.teamOverview?.title ?? 'TEAM',
      subtitle: data.teamOverview?.subtitle ?? '班紹介',
      description: data.teamOverview?.description ?? '',
    },
  }
}

// --- ニュース ---

const CATEGORY_LABELS: Record<string, string> = {
  announcement: 'お知らせ',
  event: 'イベント',
  report: '活動報告',
  sofchara: 'ソフキャラ',
  work: '作品紹介',
}

const SUB_CATEGORY_LABELS: Record<string, string> = {
  game: 'ゲームプログラミング',
  web: 'Webアプリ',
  sound: 'サウンド',
  '2d': '2D',
  '3d': '3D',
  design: 'デザイン',
}

export type NewsItemData = {
  id: string
  title: string
  date: string
  imagePath: string
  category: string
  subcategory?: string
  /** 一覧用の要約 */
  summary?: string
  /** 本文（Lexical richText） */
  content?: unknown
}

const ITEMS_PER_PAGE = 10

export type NewsListResult = {
  docs: NewsItemData[]
  totalDocs: number
  totalPages: number
  page: number
}

export async function getNewsListPaginated(options?: {
  category?: string
  subcategory?: string
  page?: number
  limit?: number
  sort?: string
}): Promise<NewsListResult> {
  const params = new URLSearchParams()
  params.set('limit', String(options?.limit ?? ITEMS_PER_PAGE))
  params.set('page', String(options?.page ?? 1))
  params.set('sort', options?.sort ?? '-date')
  params.set('depth', '1')

  if (options?.category) {
    params.set('where[category][equals]', options.category)
  }
  if (options?.subcategory) {
    params.set('where[subcategory][equals]', options.subcategory)
  }

  const data = await fetchJson<{
    docs?: Array<{
      id?: number
      title?: string
      date?: string
      category?: string
      subcategory?: string
      summary?: string
      thumbnail?: { url?: string }
      alt?: string
    }>
    totalDocs?: number
    totalPages?: number
    page?: number
  }>(`${CMS_URL}/api/news?${params.toString()}`)

  const docs = (data?.docs ?? []).map((doc) => ({
    id: String(doc.id ?? ''),
    title: doc.title ?? '',
    date: doc.date ? new Date(doc.date).toLocaleDateString('ja-JP') : '',
    imagePath: resolveMediaUrl(typeof doc.thumbnail === 'object' ? doc.thumbnail?.url : undefined),
    category: CATEGORY_LABELS[doc.category ?? ''] ?? doc.category ?? 'その他',
    subcategory: doc.subcategory
      ? (SUB_CATEGORY_LABELS[doc.subcategory] ?? doc.subcategory)
      : undefined,
    summary: doc.summary,
  }))

  return {
    docs,
    totalDocs: data?.totalDocs ?? 0,
    totalPages: data?.totalPages ?? 0,
    page: data?.page ?? 1,
  }
}

export async function getNewsList(options?: {
  limit?: number
  sort?: string
}): Promise<NewsItemData[]> {
  const result = await getNewsListPaginated({
    limit: options?.limit ?? 100,
    sort: options?.sort ?? '-date',
    page: 1,
  })
  return result.docs
}

export async function getNewsItem(id: string): Promise<NewsItemData | null> {
  const data = await fetchJson<{
    id?: number
    title?: string
    date?: string
    category?: string
    subcategory?: string
    summary?: string
    content?: unknown
    thumbnail?: { url?: string }
    alt?: string
  }>(`${CMS_URL}/api/news/${id}?depth=1`)

  if (!data) return null

  return {
    id: String(data.id ?? id),
    title: data.title ?? '',
    date: data.date ? new Date(data.date).toLocaleDateString('ja-JP') : '',
    imagePath: resolveMediaUrl(
      typeof data.thumbnail === 'object' ? data.thumbnail?.url : undefined,
    ),
    category: CATEGORY_LABELS[data.category ?? ''] ?? data.category ?? 'その他',
    subcategory: data.subcategory
      ? (SUB_CATEGORY_LABELS[data.subcategory] ?? data.subcategory)
      : undefined,
    summary: data.summary,
    content: data.content,
  }
}

// --- チーム ---

const TEAM_SLUGS = [
  'team-game',
  'team-webapp',
  'team-sound',
  'team-2d',
  'team-3d',
  'team-design',
] as const
const TEAM_NAME_MAP: Record<string, string> = {
  'team-game': 'game',
  'team-webapp': 'webapp',
  'team-sound': 'sound',
  'team-2d': '2d',
  'team-3d': '3d',
  'team-design': 'design',
}

const TEAM_SLUG_MAP: Record<string, string> = {
  game: 'team-game',
  webapp: 'team-webapp',
  sound: 'team-sound',
  '2d': 'team-2d',
  '3d': 'team-3d',
  design: 'team-design',
}

export type TeamCardData = {
  teamName: string
  displayName: string
  imagePath: string
}

export type TeamIntroData = {
  teamName: string
  displayName: string
  imagePath: string
  description: string
  activities: string[]
}

export async function getTeamData(): Promise<TeamCardData[]> {
  const results = await Promise.all(
    TEAM_SLUGS.map((slug) =>
      fetchJson<{
        teamCard?: { teamType?: string; name?: string; cardImage?: { url?: string } }
        teamType?: string
        name?: string
        cardImage?: { url?: string }
      }>(`${CMS_URL}/api/globals/${slug}?depth=1`),
    ),
  )

  return results
    .filter((r): r is NonNullable<typeof r> => r != null)
    .map((r, i) => {
      const card = r.teamCard ?? r
      return {
        teamName: card.teamType ?? TEAM_NAME_MAP[TEAM_SLUGS[i]!] ?? '',
        displayName: card.name ?? '',
        imagePath: resolveMediaUrl(card.cardImage?.url),
      }
    })
    .filter((t) => t.teamName && t.imagePath)
}

export async function getTeamIntroData(): Promise<TeamIntroData[]> {
  const results = await Promise.all(
    TEAM_SLUGS.map((slug) =>
      fetchJson<{
        teamCard?: {
          teamType?: string
          name?: string
          cardImage?: { url?: string }
          cardDescription?: string
          activityLabels?: Array<{ label?: string }>
        }
        teamType?: string
        name?: string
        cardImage?: { url?: string }
        cardDescription?: string
        activityLabels?: Array<{ label?: string }>
      }>(`${CMS_URL}/api/globals/${slug}?depth=1`),
    ),
  )

  return results
    .filter((r): r is NonNullable<typeof r> => r != null)
    .map((r, i) => {
      const card = r.teamCard ?? r
      return {
        teamName: card.teamType ?? TEAM_NAME_MAP[TEAM_SLUGS[i]!] ?? '',
        displayName: card.name ?? '',
        imagePath: resolveMediaUrl(card.cardImage?.url),
        description: card.cardDescription ?? '',
        activities: (card.activityLabels ?? []).map((a) => a.label ?? '').filter(Boolean),
      }
    })
    .filter((t) => t.teamName && t.imagePath)
}

export type TeamDetailData = {
  teamName: string
  displayName: string
  pageHeader: {
    imagePath: string
    alt: string
    title: string
  }
  aboutSection: {
    title: string
    subtitle: string
    description: unknown
    images: { imagePath: string; alt: string }[]
  }
  leaderInterview?: {
    title: string
    subtitle: string
    leaderName: string
    leaderImagePath?: string
    leaderImageAlt?: string
    body?: string
    qa: { question: string; answer: string }[]
  }
  softwares?: {
    title: string
    items: { name: string; description?: string; iconPath?: string }[]
  }
  gallery?: {
    items: {
      type: 'image' | 'video' | 'sound'
      mediaPath: string
      alt: string
      thumbnailPath?: string
      title?: string
      description?: string
      relatedLinks?: { linkName: string; link: string }[]
    }[]
  }
}

export async function getTeamDetail(teamName: string): Promise<TeamDetailData | null> {
  const slug = TEAM_SLUG_MAP[teamName]
  if (!slug) return null

  const data = await fetchJson<{
    teamCard?: { teamType?: string; name?: string }
    teamType?: string
    name?: string
    pageHeader?: {
      image?: { url?: string }
      alt?: string
      title?: string
    }
    image?: { url?: string }
    alt?: string
    title?: string
    aboutSection?: {
      aboutTitle?: string
      subtitle?: string
      description?: unknown
      images?: Array<{ image?: { url?: string }; alt?: string }>
    }
    aboutTitle?: string
    subtitle?: string
    description?: unknown
    images?: Array<{ image?: { url?: string }; alt?: string }>
    leaderInterview?: {
      title?: string
      subtitle?: string
      name?: string
      image?: { url?: string }
      alt?: string
      body?: string
      qa?: Array<{ question?: string; answer?: string }>
    }
    softwares?: Array<{
      name?: string
      description?: string
      image?: { url?: string }
    }>
    gallery?: Array<{
      type?: string
      media?: { url?: string }
      alt?: string
      thumbnail?: { url?: string }
      title?: string
      description?: string
      relatedLinks?: Array<{ linkName?: string; link?: string }>
    }>
  }>(`${CMS_URL}/api/globals/${slug}?depth=2`)

  if (!data) return null

  const pageHeader = data.pageHeader ?? { image: data.image, alt: data.alt, title: data.title }
  const pageHeaderImage =
    typeof pageHeader.image === 'object' ? resolveMediaUrl(pageHeader.image?.url) : ''
  const TEAM_CARD_FALLBACK: Record<string, string> = {
    game: '/images/team-card/game.png',
    webapp: '/images/team-card/webapp.png',
    sound: '/images/team-card/sound.jpg',
    '2d': '/images/team-card/2D.png',
    '3d': '/images/team-card/3D.png',
    design: '/images/team-card/design.png',
  }
  const resolvedPageHeaderImage =
    pageHeaderImage || TEAM_CARD_FALLBACK[teamName] || '/images/about.png'

  const aboutSection = data.aboutSection ?? {
    aboutTitle: data.aboutTitle,
    subtitle: data.subtitle,
    description: data.description,
    images: data.images,
  }
  const aboutImages =
    aboutSection.images?.map((img) => ({
      imagePath: resolveMediaUrl(typeof img.image === 'object' ? img.image?.url : undefined),
      alt: img.alt ?? '',
    })) ?? []

  const leaderInterviewData = data.leaderInterview
  const hasBody = Boolean(leaderInterviewData?.body?.trim())
  const hasQa = (leaderInterviewData?.qa?.length ?? 0) > 0
  const leaderInterview =
    leaderInterviewData?.name && (hasBody || hasQa)
      ? {
          title: leaderInterviewData.title ?? 'Team Reader Interview',
          subtitle: leaderInterviewData.subtitle ?? '班長インタビュー',
          leaderName: leaderInterviewData.name,
          leaderImagePath:
            typeof leaderInterviewData.image === 'object'
              ? resolveMediaUrl(leaderInterviewData.image?.url)
              : undefined,
          leaderImageAlt: leaderInterviewData.alt,
          body: leaderInterviewData.body?.trim() || undefined,
          qa: (leaderInterviewData.qa ?? []).map((q) => ({
            question: q.question ?? '',
            answer: q.answer ?? '',
          })),
        }
      : undefined

  const softwaresData = data.softwares
  const softwares =
    softwaresData && softwaresData.length > 0
      ? {
          title: '使用ソフトウェア',
          items: softwaresData.map((s) => ({
            name: s.name ?? '',
            description: s.description,
            iconPath: typeof s.image === 'object' ? resolveMediaUrl(s.image?.url) : undefined,
          })),
        }
      : undefined

  const galleryData = data.gallery
  const gallery =
    galleryData && galleryData.length > 0
      ? {
          items: galleryData.map((g) => ({
            type: (g.type === 'video' || g.type === 'sound' ? g.type : 'image') as
              | 'image'
              | 'video'
              | 'sound',
            mediaPath: resolveMediaUrl(typeof g.media === 'object' ? g.media?.url : undefined),
            alt: g.alt ?? '',
            thumbnailPath:
              typeof g.thumbnail === 'object' ? resolveMediaUrl(g.thumbnail?.url) : undefined,
            title: g.title,
            description: g.description,
            relatedLinks:
              g.relatedLinks?.filter((r): r is { linkName: string; link: string } =>
                Boolean(r?.linkName && r?.link),
              ) ?? [],
          })),
        }
      : undefined

  const teamCard = data.teamCard ?? data
  return {
    teamName: teamCard.teamType ?? teamName,
    displayName: teamCard.name ?? '',
    pageHeader: {
      imagePath: resolvedPageHeaderImage,
      alt: pageHeader.alt ?? '',
      title: pageHeader.title ?? teamCard.name ?? '',
    },
    aboutSection: {
      title: aboutSection.aboutTitle ?? 'ABOUT',
      subtitle: aboutSection.subtitle ?? '',
      description: aboutSection.description ?? null,
      images: aboutImages,
    },
    leaderInterview,
    softwares,
    gallery,
  }
}

// --- キャラクター ---

export type CharacterData = {
  id: string
  name: string
  imagePath: string
  description: string
  profile?: { birthday?: string; height?: string; likes?: string; dislikes?: string }
  backstory?: string
}

export async function getCharacters(): Promise<CharacterData[]> {
  const data = await fetchJson<{
    docs?: Array<{
      id?: number
      order?: number
      jpName?: string
      enName?: string
      url?: string
      portraitImage?: { url?: string }
      fullbodyImage?: { url?: string }
      introduction?: string
      description?: unknown
      profile?: { birthday?: string; height?: string; likes?: string; dislikes?: string }
    }>
  }>(`${CMS_URL}/api/characters?depth=1&limit=100`)

  const docs = data?.docs ?? []
  return docs.map((doc) => ({
    id: doc.url ?? String(doc.id ?? doc.order ?? ''),
    name: doc.jpName ?? doc.enName ?? '',
    imagePath: resolveMediaUrl(
      (typeof doc.fullbodyImage === 'object' ? doc.fullbodyImage?.url : undefined) ??
        (typeof doc.portraitImage === 'object' ? doc.portraitImage?.url : undefined),
    ),
    description: doc.introduction ?? '',
    profile: doc.profile,
    backstory: typeof doc.description === 'string' ? doc.description : undefined,
  }))
}

export async function getCharacterImages(): Promise<string[]> {
  const chars = await getCharacters()
  return chars.map((c) => c.imagePath).filter(Boolean)
}

// --- トップページ統合取得 ---

export type TopPageFailedItem =
  | 'top-video'
  | 'catchphrase'
  | 'about-section'
  | 'about-images'
  | 'team-section'
  | 'team-data'
  | 'news-section'
  | 'news-data'
  | 'characters-section'
  | 'characters-data'
  | 'no-characters'

export type TopPageData = {
  topVideo: TopVideoData
  catchphrase: CatchphraseData
  content: ContentBlocksData
  teamData: TeamCardData[]
  newsData: NewsItemData[]
  characters: { imagePath: string; href: string }[]
}

export type TopPageFetchResult =
  | { success: true; data: TopPageData }
  | { success: false; failedItems: TopPageFailedItem[] }

export async function getTopPageData(): Promise<TopPageFetchResult> {
  const [
    topVideo,
    catchphrase,
    aboutRes,
    teamSectionRes,
    newsSectionRes,
    charactersSectionRes,
    teamResults,
    newsRes,
    charactersRes,
  ] = await Promise.all([
    fetchTopVideo(),
    fetchCatchphrase(),
    fetchJson<{
      title?: string
      subtitle?: string
      description?: string
      images?: Array<{ image?: { url?: string }; alt?: string }>
    }>(`${CMS_URL}/api/globals/about-section?depth=1`),
    fetchJson<{ title?: string; subtitle?: string; description?: string }>(
      `${CMS_URL}/api/globals/team-section`,
    ),
    fetchJson<{
      title?: string
      subtitle?: string
      description?: string
    }>(`${CMS_URL}/api/globals/news-section`),
    fetchJson<{
      title?: string
      subtitle?: string
      description?: string
    }>(`${CMS_URL}/api/globals/characters-section`),
    Promise.all(
      TEAM_SLUGS.map((slug) =>
        fetchJson<{
          teamCard?: { teamType?: string; name?: string; cardImage?: { url?: string } }
          teamType?: string
          name?: string
          cardImage?: { url?: string }
        }>(`${CMS_URL}/api/globals/${slug}?depth=1`),
      ),
    ),
    fetchJson<{
      docs?: Array<{
        id?: number
        title?: string
        date?: string
        category?: string
        subcategory?: string
        summary?: string
        thumbnail?: { url?: string }
      }>
    }>(`${CMS_URL}/api/news?limit=3&sort=-date&depth=1`),
    fetchJson<{
      docs?: Array<{
        id?: number
        order?: number
        url?: string
        fullbodyImage?: { url?: string }
        portraitImage?: { url?: string }
      }>
    }>(`${CMS_URL}/api/characters?depth=1&limit=100`),
  ])

  const failedItems: TopPageFailedItem[] = []
  if (!topVideo) failedItems.push('top-video')
  if (!catchphrase) failedItems.push('catchphrase')
  if (!aboutRes) failedItems.push('about-section')
  if (!teamSectionRes) failedItems.push('team-section')
  if (!newsSectionRes) failedItems.push('news-section')
  if (!charactersSectionRes) failedItems.push('characters-section')

  const teamData = teamResults
    .filter((r): r is NonNullable<typeof r> => r != null)
    .map((r, i) => {
      const card = r.teamCard ?? r
      return {
        teamName: card.teamType ?? TEAM_NAME_MAP[TEAM_SLUGS[i]!] ?? '',
        displayName: card.name ?? '',
        imagePath: resolveMediaUrl(card.cardImage?.url),
      }
    })
    .filter((t) => t.teamName && t.imagePath)
  const newsDocs = newsRes?.docs ?? []
  const newsData: NewsItemData[] = newsDocs.map((doc) => ({
    id: String(doc.id ?? ''),
    title: doc.title ?? '',
    date: doc.date ? new Date(doc.date).toLocaleDateString('ja-JP') : '',
    imagePath: resolveMediaUrl(typeof doc.thumbnail === 'object' ? doc.thumbnail?.url : undefined),
    category: CATEGORY_LABELS[doc.category ?? ''] ?? doc.category ?? 'その他',
    subcategory: doc.subcategory
      ? (SUB_CATEGORY_LABELS[doc.subcategory] ?? doc.subcategory)
      : undefined,
    summary: doc.summary,
  }))
  if (!newsRes) failedItems.push('news-data')

  const charDocs = charactersRes?.docs ?? []
  const characters = charDocs
    .map((doc) => ({
      imagePath: resolveMediaUrl(
        (typeof doc.fullbodyImage === 'object' ? doc.fullbodyImage?.url : undefined) ??
          (typeof doc.portraitImage === 'object' ? doc.portraitImage?.url : undefined),
      ),
      href: `/sofchara/${doc.url ?? String(doc.id ?? doc.order ?? '')}`,
    }))
    .filter((c) => c.imagePath)
  if (!charactersRes) failedItems.push('characters-data')
  if (charactersRes && characters.length === 0) failedItems.push('no-characters')

  if (failedItems.length > 0) {
    return { success: false, failedItems }
  }

  const aboutImages =
    aboutRes!.images?.map((img) => ({
      imagePath: resolveMediaUrl(typeof img.image === 'object' ? img.image?.url : undefined),
      alt: img.alt ?? '',
    })) ?? []

  if (aboutImages.length < 3) {
    failedItems.push('about-images')
    return { success: false, failedItems }
  }

  const content: ContentBlocksData = {
    about: {
      title: aboutRes!.title ?? '',
      subtitle: aboutRes!.subtitle ?? '',
      description: aboutRes!.description ?? '',
      images: aboutImages,
    },
    team: {
      title: teamSectionRes!.title ?? '',
      subtitle: teamSectionRes!.subtitle ?? '',
      description: teamSectionRes!.description ?? '',
    },
    news: {
      title: newsSectionRes!.title ?? '',
      subtitle: newsSectionRes!.subtitle ?? '',
      description: newsSectionRes!.description ?? '',
    },
    characters: {
      title: charactersSectionRes!.title ?? '',
      subtitle: charactersSectionRes!.subtitle ?? '',
      description: charactersSectionRes!.description ?? '',
    },
  }

  return {
    success: true,
    data: {
      topVideo: topVideo!,
      catchphrase: catchphrase!,
      content,
      teamData,
      newsData,
      characters,
    },
  }
}
