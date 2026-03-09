/**
 * Payload CMS API クライアント
 * コンテンツブロック・ニュース・チーム・キャラクターを取得
 */

import {
  type AboutPageData,
  type AboutSectionData,
  type CharacterAlternate,
  type CharacterData,
  type CharacterGalleryItem,
  type CharacterProfile,
  type CharacterRules,
  type ContentBlockData,
  type ContentBlocksData,
  type GuidelinePageData,
  getAboutPageData,
  getCharacterByUrl,
  getCharacterImages,
  getCharacters,
  getContentBlocks,
  getGuidelinePageData,
  getNewsItem,
  getNewsList,
  getNewsListPaginated,
  getNewsPageData,
  getSiteSettings,
  getSofcharaPageData,
  getSofkentownByUrl,
  getSofkentownList,
  getSofkentownsByCharacterUrl,
  getTeamData,
  getTeamDetail,
  getTeamIntroData,
  getTeamPageData,
  type NewsItemData,
  type NewsListResult,
  type SiteSettingsData,
  type SofcharaPageData,
  type SofkentownItemData,
  type TeamCardData,
  type TeamDetailData,
  type TeamIntroData,
} from './payload'

export type { AboutPageData }

export async function getAboutPageDataFromApi(): Promise<AboutPageData | null> {
  return getAboutPageData()
}

export type { ContentBlockData }

export async function getContentBlock(
  key: keyof ContentBlocksData,
): Promise<ContentBlockData | AboutSectionData> {
  const blocks = await getContentBlocks()
  return blocks[key]
}

export async function getAllContentBlocks(): Promise<ContentBlocksData> {
  return getContentBlocks()
}

export { getContentBlocks }

// ニュースカテゴリー定義（フィルタ用）
// type: 'category' = メインカテゴリー, 'subcategory' = 班（サブカテゴリー）
// apiValue: Payload API / URL クエリで使用する値
export const NEWS_CATEGORIES = [
  { id: 'all', label: 'すべて', type: 'all' as const, apiValue: '' },
  { id: 'お知らせ', label: 'お知らせ', type: 'category' as const, apiValue: 'announcement' },
  { id: 'イベント', label: 'イベント', type: 'category' as const, apiValue: 'event' },
  { id: '活動報告', label: '活動報告', type: 'category' as const, apiValue: 'report' },
  { id: 'ソフキャラ', label: 'ソフキャラ', type: 'category' as const, apiValue: 'sofchara' },
  { id: '作品紹介', label: '作品紹介', type: 'category' as const, apiValue: 'work' },
  {
    id: 'ゲームプログラミング',
    label: 'ゲームプログラミング',
    type: 'subcategory' as const,
    apiValue: 'game',
  },
  { id: 'Webアプリ', label: 'Webアプリ', type: 'subcategory' as const, apiValue: 'web' },
  { id: 'サウンド', label: 'サウンド', type: 'subcategory' as const, apiValue: 'sound' },
  { id: '2D', label: '2D', type: 'subcategory' as const, apiValue: '2d' },
  { id: '3D', label: '3D', type: 'subcategory' as const, apiValue: '3d' },
  { id: 'デザイン', label: 'デザイン', type: 'subcategory' as const, apiValue: 'design' },
] as const

export type { NewsItemData }

export async function getNewsPageDataFromApi() {
  return getNewsPageData()
}

export async function getNewsData(options?: { limit?: number }): Promise<NewsItemData[]> {
  return getNewsList({ limit: options?.limit ?? 100, sort: '-date' })
}

export type { NewsListResult }

export async function getNewsListPaginatedFromApi(options?: {
  category?: string
  subcategory?: string
  page?: number
}): Promise<NewsListResult> {
  return getNewsListPaginated({
    category: options?.category,
    subcategory: options?.subcategory,
    page: options?.page ?? 1,
    sort: '-date',
  })
}

export async function getNewsItemFromApi(id: string): Promise<NewsItemData | null> {
  return getNewsItem(id)
}

export type { TeamCardData }

export async function getTeamPageDataFromApi() {
  return getTeamPageData()
}

export async function getTeamDataFromApi(): Promise<TeamCardData[]> {
  return getTeamData()
}

export type { TeamDetailData }

export async function getTeamDetailFromApi(teamName: string) {
  return getTeamDetail(teamName)
}

export type { TeamIntroData }

export async function getTeamIntroDataFromApi(): Promise<TeamIntroData[]> {
  return getTeamIntroData()
}

export type {
  CharacterAlternate,
  CharacterData,
  CharacterGalleryItem,
  CharacterProfile,
  CharacterRules,
}

export async function getCharacterData(): Promise<CharacterData[]> {
  return getCharacters()
}

export async function getCharacterByUrlFromApi(url: string): Promise<CharacterData | null> {
  return getCharacterByUrl(url)
}

export async function getCharacterImagesFromApi(): Promise<string[]> {
  return getCharacterImages()
}

export type { SofcharaPageData }

export async function getSofcharaPageDataFromApi(): Promise<SofcharaPageData | null> {
  return getSofcharaPageData()
}

export type { GuidelinePageData }

export async function getGuidelinePageDataFromApi(): Promise<GuidelinePageData | null> {
  return getGuidelinePageData()
}

export type { SofkentownItemData }

export async function getSofkentownListFromApi(): Promise<SofkentownItemData[]> {
  return getSofkentownList()
}

export async function getSofkentownByUrlFromApi(url: string): Promise<SofkentownItemData | null> {
  return getSofkentownByUrl(url)
}

export async function getSofkentownsByCharacterUrlFromApi(
  characterUrl: string,
): Promise<SofkentownItemData[]> {
  return getSofkentownsByCharacterUrl(characterUrl)
}

export type { SiteSettingsData }

export async function getSiteSettingsFromApi(): Promise<SiteSettingsData> {
  return getSiteSettings()
}
