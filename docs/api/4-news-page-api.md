# Newsページ API

Newsページで使用するデータの管理項目です。

## Payload定義（全体）

| 項目 | 値 |
|------|-----|
| 1.2. 種別 | Global `news-page` |
| 3. 種別 | Collection `news` |
| ファイル | `contents/news/` |
| API | `GET /api/globals/news-page`（1.2）, `GET /api/news`（3） |

---

## 1. ページヘッダー（トップ画像）

### 概要
Newsページ上部に表示されるヘッダー画像とタイトルです。

### 使用箇所
- Newsページ（ページヘッダー）

### Payload定義
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| pageHeader.image | upload (relationTo: media) | ✓ | ヘッダー画像（16:9推奨） |
| pageHeader.alt | text | - | 代替テキスト |
| pageHeader.title | text | - | ページタイトル（デフォルト: "新着情報"） |

### フィールド
| フィールド | 型 | 必須 | 備考 |
|-----------|-----|------|------|
| image | image | ✓ | ヘッダー画像（16:9推奨） |
| alt | string | - | 画像の代替テキスト |
| title | string | - | ページタイトル |

---

## 2. News概要

### 概要
Newsセクションのタイトル・説明文です。

### Payload定義
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| newsOverview.title | text | - | defaultValue: "NEWS" |
| newsOverview.subtitle | text | - | defaultValue: "お知らせ" |
| newsOverview.description | textarea | - | 説明文（改行対応） |

---

## 3. 記事一覧（NewsItem）

### 概要
お知らせや活動報告などのニュース記事を一覧表示します。

### 使用箇所
- Newsページ（記事一覧）
- トップページ（最新3件）

### Payload定義

| 項目 | 値 |
|------|-----|
| 種別 | Collection |
| slug | `news` |
| ファイル | `contents/news/NewsItem.ts` |
| API | `GET /api/news` |

| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| title | text | ✓ | 記事タイトル |
| date | date | ✓ | 公開日（pickerAppearance: dayAndTime） |
| category | select | ✓ | メインカテゴリー |
| subcategory | select | - | 班（サブカテゴリー） |
| summary | textarea | ✓ | 要約文（一覧で表示） |
| thumbnail | upload (relationTo: media) | ✓ | サムネイル（16:9推奨） |
| alt | text | ✓ | サムネイルの代替テキスト |
| content | richText | ✓ | 本文（Lexical） |
| author | text | - | 著者名 |

### カテゴリー（category）
| 値 | ラベル | 備考 |
|----|--------|------|
| announcement | お知らせ | 一般的なお知らせ |
| event | イベント | イベント情報 |
| report | 活動報告 | 活動報告 |
| sofchara | ソフキャラ | ソフキャラ関連 |
| work | 作品紹介 | 作品紹介 |

### サブカテゴリー（subcategory）- 班
| 値 | ラベル | 備考 |
|----|--------|------|
| game | ゲームプログラミング | ゲーム班 |
| web | Webアプリ | Web班 |
| sound | サウンド | サウンド班 |
| 2d | 2D | 2D班 |
| 3d | 3D | 3D班 |
| design | デザイン | デザイン班 |

### フィルタリング
| パラメータ | 備考 |
|-----------|------|
| `where[category][equals]={value}` | カテゴリーでフィルタ |
| `where[subcategory][equals]={value}` | サブカテゴリー（班）でフィルタ |
| `sort=-date` | 公開日の降順でソート |
| `limit=10&page=1` | ページネーション（1ページ10件） |

### 取得する値（一覧）
| フィールド | 型 | 備考 |
|-----------|-----|------|
| id | string | 記事ID |
| title | string | 記事タイトル |
| date | string | 公開日（フォーマット済み） |
| imagePath | string | サムネイル画像URL |
| category | string | カテゴリーラベル |
| subcategory | string | サブカテゴリーラベル（任意） |
| summary | string | 要約文 |

---

## 4. 記事詳細ページ

### 概要
各記事の詳細内容を表示するページです。

### 使用箇所
- `/news/[newsId]`

### API
`GET /api/news/{id}?depth=1`

### 取得する値
| フィールド | 型 | 備考 |
|-----------|-----|------|
| id | string | 記事ID |
| title | string | 記事タイトル |
| date | string | 公開日（フォーマット済み） |
| imagePath | string | サムネイル画像URL |
| category | string | カテゴリーラベル |
| subcategory | string | サブカテゴリーラベル（任意） |
| summary | string | 要約文 |
| content | unknown (Lexical) | 本文（RichText） |

**注意:**
- `content`はLexicalエディタで編集、RichTextコンポーネントで表示
- 画像はLexicalエディタで埋め込み可能
- `author`はオプションで、データがない場合は非表示
