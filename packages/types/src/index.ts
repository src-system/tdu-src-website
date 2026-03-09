// ======================
// Common Types
// ======================

export type Image = {
  url: string
  alt: string
  width?: number
  height?: number
}

export type Video = {
  url: string
  width?: number
  height?: number
}

// ======================
// Top Page Types
// ======================

export type TopVideo = {
  video: Video
  logoEnabled: boolean
}

export type Segment = {
  text: string
  highlighted: boolean
}

export type Catchphrase = {
  segments: Segment[]
}

export type ImageCard = {
  image: Image
  alt: string
}

export type AboutSection = {
  title?: string
  subtitle?: string
  description: string
  images: ImageCard[]
}

export type TeamType = 'graphics' | 'sounds' | 'programming' | 'planning' | 'video' | 'modeling'

export type TeamCard = {
  teamName: string
  image: Image
  alt: string
}

export type TeamSection = {
  title?: string
  subtitle?: string
  description: string
  teams: TeamCard[]
}

export type CategoryType = 'event' | 'achievement' | 'media' | 'recruitment' | 'other'

export type NewsItem = {
  id: string
  title: string
  thumbnail: Image
  date: string
  category: CategoryType
  content?: string
  author?: string
  tags?: string[]
}

export type NewsSection = {
  title?: string
  subtitle?: string
  newslist: NewsItem[]
}

export type Character = {
  id: string
  fullbodyImage: Image
  url: string
  name?: string
  kana?: string
  englishName?: string
  iconImage?: Image
  profile?: CharacterProfile
  content?: string
  rules?: CharacterRule[]
  alternates?: Alternate[]
  relations?: Relation[]
}

export type CharactersSection = {
  title?: string
  subtitle?: string
  description: string
  characters: Character[]
}

// ======================
// About Page Types
// ======================

export type PageHeader = {
  image: Image
  alt: string
  title: string
  subtitle: string
}

export type ActivityItem = {
  title: string
  description: string
  image: Image
  alt: string
}

export type ActivitySection = {
  title?: string
  activities: ActivityItem[]
}

export type HistoryItem = {
  year: string
  events: string[]
}

export type HistorySection = {
  title?: string
  history: HistoryItem[]
}

// ======================
// Team Page Types
// ======================

export type TeamBasicInfo = {
  name: string
  description: string
  activities: string[]
  activityLabel?: string
}

export type LeaderInterview = {
  title?: string
  name: string
  role: string
  image: Image
  alt: string
  qa: QAItem[]
}

export type QAItem = {
  question: string
  answer: string
}

export type SoftwareItem = {
  name: string
  description: string
  image: Image
  alt: string
}

export type SoftwareSection = {
  title?: string
  softwares: SoftwareItem[]
}

export type GalleryImage = {
  type: 'image'
  image: Image
  alt: string
}

export type GalleryVideo = {
  type: 'video'
  video: Video
  thumbnail: Image
  alt: string
}

export type GallerySound = {
  type: 'sound'
  audio: string
  title: string
  thumbnail: Image
  alt: string
}

export type GalleryItem = GalleryImage | GalleryVideo | GallerySound

export type GallerySection = {
  title?: string
  gallery: GalleryItem[]
}

// ======================
// Characters (Sofchara) Page Types
// ======================

export type ConceptCard = {
  image: Image
  alt: string
  title: string
  description: string
  buttonText: string
  buttonHref: string
}

export type ProjectExpansionSection = {
  title?: string
  concepts: ConceptCard[]
}

export type GuidelinesSection = {
  title?: string
  content: string
}

export type CharacterProfile = {
  birthday: string
  height: string
  personality: string
  likes: string
  dislikes: string
}

export type RuleLevel = 'must' | 'should' | 'better' | 'free'

export type CharacterRule = {
  level: RuleLevel
  description: string
}

export type Alternate = {
  name: string
  image: Image
  alt: string
  description: string
}

export type Relation = {
  characterId: string
  characterName: string
  description: string
}
