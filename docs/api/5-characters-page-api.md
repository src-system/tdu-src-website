# ソフキャラページ API

ソフキャラ関連ページで使用するデータの管理項目です。

---

# `/sofchara` - ソフキャラトップページ

ソフキャラのトップページです。

## Payload定義（全体）

| 項目 | 値 |
|------|-----|
| 種別 | Global |
| slug | `sofchara-page` |
| ファイル | `contents/sofchara/index.ts` |
| API | `GET /api/globals/sofchara-page` |

※ キャラクター一覧は `GET /api/characters` で取得

---

## 1. ページヘッダー（トップ画像）

### 概要
ソフキャラページ上部に表示されるヘッダー画像とタイトルです。

### Payload定義
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| pageHeader.image | upload (relationTo: media) | ✓ | ヘッダー画像（16:9推奨） |
| pageHeader.alt | text | - | 代替テキスト |
| pageHeader.title | text | - | ページタイトル（デフォルト: "ソフきゃら！"） |

### フィールド
| フィールド | 型 | 必須 | 備考 |
|-----------|-----|------|------|
| image | image | ✓ | ヘッダー画像（16:9推奨） |
| alt | string | - | 画像の代替テキスト |
| title | string | - | ページタイトル |

---

## 2. Aboutセクション

### 概要
「ソフきゃら！」企画の説明セクションです。

### Payload定義
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| aboutSection.title | text | - | defaultValue: "ソフきゃら！" |
| aboutSection.subtitle | text | - | defaultValue: "ABOUT SOFCHARA" |
| aboutSection.description | textarea | ✓ | 企画の説明文 |
| aboutSection.cardTitle | text | ✓ | カード内のタイトル |
| aboutSection.cardDescription | textarea | ✓ | カード内の文章 |
| aboutSection.icon | upload (relationTo: media) | - | カード内のアイコン |

### フィールド
| フィールド | 型 | 必須 | デフォルト値 | 備考 |
|-----------|-----|------|------------|------|
| title | string | - | "ソフきゃら！" | セクションタイトル |
| subtitle | string | - | "ABOUT SOFCHARA" | サブタイトル |
| description | string | ✓ | - | 企画の説明文（改行対応） |
| cardTitle | string | ✓ | - | カード内のタイトル |
| cardDescription | string | ✓ | - | カード内の文章 |
| iconPath | string | - | - | カード内のアイコンURL |

---

## 3. 企画の広がりセクション（コンセプト）

### 概要
二次創作、キャラクター、ソフケンタウンの3つのコンセプトを紹介するカードセクションです。

### Payload定義
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| conceptSection.title | text | - | defaultValue: "PROJECT CONCEPT" |
| conceptSection.subtitle | text | - | defaultValue: "企画の広がり" |
| conceptSection.concepts | array | ✓ | コンセプトカードの配列 |
| conceptSection.concepts[].image | upload | ✓ | カード画像 |
| conceptSection.concepts[].imageAlt | text | - | 代替テキスト |
| conceptSection.concepts[].title | text | ✓ | カードタイトル |
| conceptSection.concepts[].description | textarea | ✓ | カードの説明 |
| conceptSection.concepts[].showButton | checkbox | - | ボタン表示フラグ（デフォルト: true） |
| conceptSection.concepts[].buttonText | text | - | ボタンテキスト |
| conceptSection.concepts[].buttonHref | text | - | ボタンリンク先 |

### フィールド
| フィールド | 型 | 必須 | デフォルト値 | 備考 |
|-----------|-----|------|------------|------|
| title | string | - | "PROJECT CONCEPT" | セクションタイトル |
| subtitle | string | - | "企画の広がり" | サブタイトル |
| concepts | ConceptCard[] | ✓ | - | コンセプトカードの配列 |

**ConceptCard:**
| フィールド | 型 | 必須 | 備考 |
|-----------|-----|------|------|
| imagePath | string | ✓ | カード画像URL |
| imageAlt | string | - | 画像の代替テキスト |
| title | string | ✓ | カードタイトル |
| description | string | ✓ | カードの説明 |
| showButton | boolean | - | ボタン表示フラグ |
| buttonText | string | - | ボタンテキスト |
| buttonHref | string | - | ボタンリンク先 |

---

## 4. 二次創作ガイドラインセクション

### 概要
二次創作ガイドラインページへの誘導セクションです。

### Payload定義
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| guidelineSection.title | text | - | defaultValue: "二次創作ガイドライン" |
| guidelineSection.subtitle | text | - | defaultValue: "GUIDELINE" |
| guidelineSection.description | textarea | ✓ | 説明文 |

### フィールド
| フィールド | 型 | 必須 | デフォルト値 | 備考 |
|-----------|-----|------|------------|------|
| title | string | - | "二次創作ガイドライン" | セクションタイトル |
| subtitle | string | - | "GUIDELINE" | サブタイトル |
| description | string | ✓ | - | 説明文 |

---

## 5. キャラクター一覧セクション

### 概要
ソフキャラの一覧を表示するセクションです。

### 使用箇所
- ソフキャラページ（キャラクター一覧）
- トップページ（ランダム表示）

### Payload定義
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| characterSection.title | text | - | defaultValue: "キャラクター" |
| characterSection.subtitle | text | - | defaultValue: "CHARACTER LIST" |

### フィールド
| フィールド | 型 | 必須 | デフォルト値 | 備考 |
|-----------|-----|------|------------|------|
| title | string | - | "キャラクター" | セクションタイトル |
| subtitle | string | - | "CHARACTER LIST" | サブタイトル |

---

# `/sofchara/[characterName]` - キャラクター詳細ページ

各キャラクターの詳細情報を表示するページです。

## Payload定義

| 項目 | 値 |
|------|-----|
| 種別 | Collection |
| slug | `characters` |
| ファイル | `contents/sofchara/Character.ts` |
| API | `GET /api/characters?where[url][equals]={url}` |

## フィールド

### 基本情報
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| order | number | ✓ | 表示順（重複不可） |
| jpName | text | ✓ | 日本語名 |
| enName | text | ✓ | 英語名 |
| url | text | ✓ | URL識別子（ユニーク） |
| fullbodyImage | upload | ✓ | 全身画像 |
| portraitImage | upload | - | 顔画像（アイコン用） |
| imageLabel | text | - | 画像の説明文 |
| author | text | ✓ | 作者名 |
| introduction | textarea | - | キャラクター紹介文（簡潔） |
| catchphrase | text | - | キャッチフレーズ |

### プロフィール情報（profile グループ）
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| profile.birthday | text | - | 誕生日 |
| profile.gender | text | - | 性別 |
| profile.height | text | - | 身長 |
| profile.weight | text | - | 体重 |
| profile.likes | text | - | 好きなもの |
| profile.dislikes | text | - | 苦手なもの |

### 詳細コンテンツ
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| description | richText | - | 詳細説明（Lexical） |
| gallery | array | - | ギャラリー画像 |
| gallery[].image | upload | ✓ | 画像 |
| gallery[].alt | text | - | 代替テキスト |

### 別衣装（alternates）
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| alternates | array | - | 別衣装の配列 |
| alternates[].alternateName | text | ✓ | 衣装名 |
| alternates[].author | text | - | 作者名 |
| alternates[].fullbodyImage | upload | ✓ | 全身画像 |
| alternates[].portraitImage | upload | - | 顔画像 |

### ソフケンタウンとの関連（relations）
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| relations | array | - | 関連性の配列 |
| relations[].sofkentown | relationship | ✓ | ソフケンタウンへの参照 |
| relations[].description | textarea | - | 関連性の説明 |

### 二次創作ガイドライン（rules グループ）
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| rules.r18 | select | - | R-18表現（allowed/conditional/prohibited） |
| rules.r18g | select | - | R-18G表現 |
| rules.colabo | select | - | 外部キャラクターとの絡み |
| rules.coupling | select | - | カップリング表現 |
| rules.snsRolePlaying | select | - | SNSでのなりきり活動 |
| rules.modification | select | - | 大きな改変 |
| rules.others | richText | - | その他の規約 |

**RuleLevel:**
- `allowed` (◯) - 許可
- `conditional` (△) - 条件付き許可
- `prohibited` (✕) - 禁止

---

# `/sofchara/guideline` - ガイドラインページ

ソフキャラの二次創作ガイドラインページです。

## Payload定義

| 項目 | 値 |
|------|-----|
| 種別 | Global |
| slug | `guideline` |
| ファイル | `contents/sofchara/Guideline.ts` |
| API | `GET /api/globals/guideline` |

## フィールド
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| title | text | - | ページタイトル（デフォルト: "GUIDELINE"） |
| subtitle | text | - | サブタイトル（デフォルト: "二次創作ガイドライン"） |
| content | richText | ✓ | ガイドライン本文（Lexical） |

---

# `/sofchara/sofkentown` - ソフケンタウンページ

ソフキャラの共通世界観「ソフケンタウン」の一覧・詳細ページです。

**詳細は `0-general-api.md` を参照してください。**

## 概要
- 一覧ページ: `/sofchara/sofkentown`
- 詳細ページ: `/sofchara/sofkentown/[townId]`

## Payload定義

| 項目 | 値 |
|------|-----|
| 種別 | Collection |
| slug | `sofkentown` |
| ファイル | `contents/sofchara/Sofkentown.ts` |
| API | `GET /api/sofkentown` |

## 主なフィールド
| フィールド | 型 | 必須 | 備考 |
|-----------|-----|------|------|
| order | number | ✓ | 表示順 |
| name | string | ✓ | 場所・設定の名前 |
| url | string | ✓ | URL名（半角英数字とハイフン） |
| image | image | - | イメージ画像 |
| description | richText | ✓ | 詳細説明 |
| relatedCharacters | Character[] | - | 関連キャラクター |
