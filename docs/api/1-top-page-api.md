# トップページ API

トップページで使用するデータの管理項目です。

---

## 1. トップビデオ

### 概要
トップページ上部に表示される背景動画とロゴアニメーションの設定です。

### 使用箇所
- トップページ（トップセクション）

### Payload定義
| 項目 | 値 |
|------|-----|
| 種別 | toppage |
| slug | `top-video` |
| ファイル | `contents/toppage/TopVideo.ts` |
| API | `GET /api/globals/top-video` |

| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| video | upload (relationTo: media) | ✓ | mimeType: video |
| logoEnabled | checkbox | ✓ | defaultValue: true |

### フィールド（管理）
| フィールド | 型 | 必須 | 備考 |
|-----------|-----|------|------|
| video | video | ✓ | 16:9推奨、ループ再生 |
| logoEnabled | boolean | ✓ | スプラッシュロゴの表示/非表示 |

### 取得する値
| フィールド | 種別 | 型 | 備考 |
|-----------|------|-----|------|
| video | - | video | 動画URL等 |
| logoEnabled | - | boolean | スプラッシュロゴの表示/非表示 |

---

## 2. キャッチコピー

### 概要
トップビデオ上に重ねて表示されるキャッチコピーです。

### 使用箇所
- トップページ（トップセクション）

### Payload定義
| 項目 | 値 |
|------|-----|
| 種別 | toppage |
| slug | `catchphrase` |
| ファイル | `contents/toppage/Catchphrase.ts` |
| API | `GET /api/globals/catchphrase` |

| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| segments | array | ✓ | minRows: 1 |
| segments[].text | text | ✓ | 表示テキスト |
| segments[].highlighted | checkbox | ✓ | defaultValue: false |

### フィールド（管理）
| フィールド | 型 | 必須 | 備考 |
|-----------|-----|------|------|
| segments | Segment[] | ✓ | キャッチコピーのセグメント配列（1個以上） |

**Segment:**
| フィールド | 型 | 必須 | 備考 |
|-----------|-----|------|------|
| text | string | ✓ | 表示テキスト |
| highlighted | boolean | ✓ | ハイライト表示するか |

### 取得する値
| フィールド | 種別 | 型 | 備考 |
|-----------|------|-----|------|
| segments | - | Segment[] | text, highlighted |

---

## 3. Aboutセクション

### 概要
活動内容を紹介するセクションです。説明文と3枚の画像で構成されます。

### 使用箇所
- トップページ（Aboutセクション）

### Payload定義
| 項目 | 値 |
|------|-----|
| 種別 | toppage |
| slug | `about-section` |
| ファイル | `contents/toppage/AboutSection.ts` |
| API | `GET /api/globals/about-section` |

| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| title | text | - | defaultValue: "ABOUT" |
| subtitle | text | - | defaultValue: "活動内容" |
| description | textarea | ✓ | 改行対応 |
| images | array | ✓ | minRows: 3, maxRows: 3 |
| images[].image | upload (relationTo: media) | ✓ | mimeType: image |
| images[].alt | text | ✓ | 代替テキスト |

### フィールド（管理）
| フィールド | 型 | 必須 | デフォルト値 | 備考 |
|-----------|-----|------|------------|------|
| title | string | - | "ABOUT" | セクションタイトル |
| subtitle | string | - | "活動内容" | サブタイトル |
| description | string | ✓ | - | 説明文（改行対応） |
| images | ImageCard[] | ✓ | - | 3枚固定 |

**ImageCard:**
| フィールド | 型 | 必須 | 備考 |
|-----------|-----|------|------|
| image | image | ✓ | 画像（4:3～16:9推奨） |
| alt | string | ✓ | 代替テキスト |

### 取得する値
| フィールド | 種別 | 型 | 備考 |
|-----------|------|-----|------|
| title | - | string | セクションタイトル |
| subtitle | - | string | サブタイトル |
| description | - | string | 説明文 |
| images | - | ImageCard[] | image, alt |

**注意:**
- 画像が読み込めない場合は代替コンテンツを表示

---

## 4. Teamセクション

### 概要
各班の紹介セクションです。説明文と班ごとのカード画像で構成されます。
セクションのタイトル・説明文は toppage で管理し、班カードのデータは Teams で管理します。

### 使用箇所
- トップページ（Teamセクション）

### Payload定義（toppage：セクション見出しのみ）
| 項目 | 値 |
|------|-----|
| 種別 | toppage |
| slug | `team-section` |
| ファイル | `contents/toppage/TeamSection.ts` |
| API | `GET /api/globals/team-section` |

| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| title | text | - | defaultValue: "TEAM" |
| subtitle | text | - | defaultValue: "班紹介" |
| description | text | ✓ | 説明文 |

### Payload定義（班カード：Teams）
| 項目 | 値 |
|------|-----|
| 種別 | Collection |
| slug | `teams` |
| ファイル | `contents/team/Teams.ts` |
| API | `GET /api/teams` |

班カード用フィールド: `teamType`, `cardImage`, `cardAlt`, `cardDescription`, `activityLabels` 等（詳細は `team-page-api` 参照）

### フィールド（管理）
**toppage（TeamSection）:** title, subtitle, description のみ

**班カード（Teams）:** `contents/team/Teams.ts` で定義・管理（`team-page-api` 参照）

### 取得する値
| フィールド | 種別 | 型 | 備考 |
|-----------|------|-----|------|
| title | toppage | string | セクションタイトル |
| subtitle | toppage | string | サブタイトル |
| description | toppage | string | 説明文 |
| teams | teams | TeamCard[teamName, image, alt] | 班カードの配列（`/api/teams` から取得） |

**TeamCard（取得時）:**
| フィールド | 種別 | 型 | 備考 |
|-----------|------|-----|------|
| teamName | teams | TeamType | 班名・URL識別子 |
| image | teams | image | 班カード画像（cardImage） |
| alt | teams | string | 代替テキスト（cardAlt） |

**注意:**
- 6つの班すべてが必須
- 班の詳細情報は `team-page-api` の Teams で管理

---

## 5. Newsセクション

### 概要
最新のお知らせを表示するセクションです。
トップページでは最新の3つを取得して表示します。

### 使用箇所
- トップページ（Newsセクション）

### Payload定義（news-section：セクション見出し）
| 項目 | 値 |
|------|-----|
| 種別 | toppage |
| slug | `news-section` |
| ファイル | `contents/toppage/NewsSection.ts` |
| API | `GET /api/globals/news-section` |

| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| title | text | - | defaultValue: "NEWS" |
| subtitle | text | - | defaultValue: "お知らせ" |
| description | textarea | ✓ | 改行対応 |

### Payload定義（news：記事一覧）
| 項目 | 値 |
|------|-----|
| 種別 | Collection |
| slug | `news` |
| ファイル | `contents/news/NewsItem.ts` |
| API | `GET /api/news`（limit: 3, sort: -date） |

| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| title | text | ✓ | 記事タイトル |
| thumbnail | upload (relationTo: media) | ✓ | mimeType: image |
| date | date | ✓ | pickerAppearance: dayOnly |
| category | select | ✓ | event, achievement, media, recruitment, other |
| content | richText | ✓ | 本文 |
| author | text | - | 著者 |
| tags | array | - | tags[].tag: text |

### フィールド（管理）
**news-section（NewsSection）:** title, subtitle, description（トップページのセクション見出し）

**News コレクション（記事データ）:**
| フィールド | 型 | 必須 | 備考 |
|-----------|-----|------|------|
| title | string | ✓ | 記事タイトル |
| thumbnail | image | ✓ | サムネイル画像 |
| date | date | ✓ | 公開日 |
| category | CategoryType | ✓ | カテゴリー |
| content | richText | ✓ | 本文 |
| author | string | - | 著者 |
| tags | string[] | - | タグ |

### 取得する値
| フィールド | 種別 | 型 | 備考 |
|-----------|------|-----|------|
| title | news-section | string | セクションタイトル |
| subtitle | news-section | string | サブタイトル |
| newslist | news | NewsItem[] | 最新3件 |

**NewsItem（トップページ取得時）:**
| フィールド | 種別 | 型 | 備考 |
|-----------|------|-----|------|
| id | news | string | 記事ID |
| title | news | string | 記事タイトル |
| thumbnail | news | image | サムネイル |
| date | news | date | 公開日 |
| category | news | CategoryType | カテゴリー |

※ content, author は取得しない

**注意:**
- ニュース記事のデータは `news-page-api` で管理

---

## 6. キャラクターセクション

### 概要
ソフキャラを紹介するセクションです。ランダムにキャラクターを1体表示します。

### 使用箇所
- トップページ（キャラクターセクション）

### Payload定義（characters-section：セクション見出し）
| 項目 | 値 |
|------|-----|
| 種別 | toppage |
| slug | `characters-section` |
| ファイル | `contents/toppage/CharactersSection.ts` |
| API | `GET /api/globals/characters-section` |

| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| title | text | - | defaultValue: "CHARACTERS" |
| subtitle | text | - | defaultValue: "ソフきゃら！" |
| description | textarea | - | トップページのキャラクターセクションで表示 |

### Payload定義（characters：キャラクター一覧）
| 項目 | 値 |
|------|-----|
| 種別 | Collection |
| slug | `characters` |
| ファイル | `contents/sofchara/Character.ts` |
| API | `GET /api/characters`（limit: 100, depth: 1） |

| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| name | text | ✓ | キャラクター名 |
| kana | text | ✓ | ふりがな |
| englishName | text | - | 英名 |
| iconImage | upload (relationTo: media) | ✓ | mimeType: image |
| fullbodyImage | upload (relationTo: media) | ✓ | mimeType: image |
| portraitImage | upload (relationTo: media) | - | 縦長画像（fullbodyImage の代替） |
| url | text | ✓ | URL（スラッグ） |
| profile | group | - | birthday, height, personality, likes, dislikes |
| content | richText | - | 紹介文 |
| rules | array | - | level, description |
| alternates | array | - | name, image, alt, description |
| relations | array | - | character (relationship), description |

### フィールド（管理）
**characters-section（CharactersSection）:** title, subtitle, description（トップページのセクション見出し）

**Characters コレクション:**
| フィールド | 型 | 必須 | 備考 |
|-----------|-----|------|------|
| name | string | ✓ | キャラクター名 |
| kana | string | ✓ | ふりがな |
| englishName | string | - | 英名 |
| iconImage | image | ✓ | アイコン画像 |
| fullbodyImage | image | ✓ | 全身画像 |
| url | string | ✓ | URL（スラッグ） |
| profile | group | - | プロフィール等 |
| content | richText | - | 紹介文 |

### 取得する値
| フィールド | 種別 | 型 | 備考 |
|-----------|------|-----|------|
| title | characters-section | string | セクションタイトル |
| subtitle | characters-section | string | サブタイトル |
| description | characters-section | string | 説明文 |
| characterImages | characters | string[] | 全身画像URLの配列（fullbodyImage または portraitImage）。ランダム表示用 |

**注意:**
- キャラクターデータは `characters-page-api` で管理
- 表示するキャラクターはランダムに選択