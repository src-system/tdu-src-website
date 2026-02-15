# `/sofchara` - ソフキャラページ

ソフキャラのトップページです。

## Payload定義（全体）

| 項目 | 値 |
|------|-----|
| 種別 | Global `sofchara-page` |
| ファイル | `contents/sofchara/` |
| API | `GET /api/globals/sofchara-page` |

※ キャラクター一覧は `GET /api/characters` で取得

---

## ページヘッダー（トップ画像）

### 概要
ソフキャラページ上部に表示されるヘッダー画像とタイトルです。

### Payload定義
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| pageHeader.image | upload (relationTo: media) | ✓ | ヘッダー画像（16:9推奨） |
| pageHeader.alt | text | ✓ | 代替テキスト |
| pageHeader.title | text | ✓ | ページタイトル |

### フィールド
| フィールド | 型 | 必須 | 備考 |
|-----------|-----|------|------|
| image | image | ✓ | ヘッダー画像（16:9推奨） |
| alt | string | ✓ | 画像の代替テキスト |
| title | string | ✓ | ページタイトル |

## Aboutセクション

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
| aboutSection.icon | upload (relationTo: media) | ✓ | カード内のアイコン |

### フィールド
| フィールド | 型 | 必須 | デフォルト値 | 備考 |
|-----------|-----|------|------------|------|
| title | string | - | "ソフきゃら！" | セクションタイトル |
| subtitle | string | - | "ABOUT SOFCHARA" | サブタイトル |
| description | string | ✓ | - | 企画の説明文（改行対応） |
| cardTitle | string | ✓ | - | カード内のタイトル |
| cardDescription | string | ✓ | - | カード内の文章 |
| icon | image | ✓ | - | カード内のアイコン |


## 企画の広がりセクション

### 概要
二次創作、キャラクター、ソフケンタウンの3つのコンセプトを紹介するカードセクションです。

### Payload定義
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| conceptSection.title | text | - | defaultValue: "PROJECT CONCEPT" |
| conceptSection.subtitle | text | - | defaultValue: "企画の広がり" |
| conceptSection.concepts | array | ✓ | minRows: 3, maxRows: 3 |
| conceptSection.concepts[].image | upload | ✓ | カード画像 |
| conceptSection.concepts[].imageAlt | text | ✓ | 代替テキスト |
| conceptSection.concepts[].title | text | ✓ | カードタイトル |
| conceptSection.concepts[].description | textarea | ✓ | カードの説明 |

### フィールド
| フィールド | 型 | 必須 | デフォルト値 | 備考 |
|-----------|-----|------|------------|------|
| title | string | - | "PROJECT CONCEPT" | セクションタイトル |
| subtitle | string | - | "企画の広がり" | サブタイトル |
| concepts | ConceptCard[] | ✓ | - | コンセプトカードの配列（3つ固定） |

**ConceptCard:**
| フィールド | 型 | 必須 | 備考 |
|-----------|-----|------|------|
| image | image | ✓ | カード画像 |
| imageAlt | string | ✓ | 画像の代替テキスト |
| title | string | ✓ | カードタイトル |
| description | string | ✓ | カードの説明 |

## 二次創作ガイドラインセクション

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

## キャラクター一覧

### 概要
ソフキャラの一覧を表示するセクションです。

### 使用箇所
- ソフキャラページ（キャラクター一覧）
- トップページ（ランダム表示）

### Payload定義
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| characterSection.title | text | - | defaultValue: "CHARACTERS" |
| characterSection.subtitle | text | - | defaultValue: "キャラクター一覧" |
| characters | Collection `characters` | - | `GET /api/characters` で取得 |

### フィールド
| フィールド | 型 | 必須 | デフォルト値 | 備考 |
|-----------|-----|------|------------|------|
| title | string | - | "CHARACTERS" | セクションタイトル |
| subtitle | string | - | "キャラクター一覧" | サブタイトル |
| characters | Character[] | ✓ | - | キャラクターの配列 |

**Character（一覧用）:**
| フィールド | 型 | 必須 | 備考 |
|-----------|-----|------|------|
| id | number | ✓ | 識別番号（表示順番） |
| jpName | string | ✓ | 日本語でのキャラクター名 |
| enName | string | ✓ | 英語でのキャラクター名 |
| portraitImage | image | ✓ | 顔画像（アイコン用） |
| url | string | ✓ | キャラクター詳細ページのURL |

---

# `/sofchara/[characterName]` - キャラクター詳細ページ

各キャラクターの詳細情報を表示するページです。

## Payload定義
Collection `characters`（`contents/sofchara/Character.ts`）
API: `GET /api/characters` で url でフィルタ、または `GET /api/characters/:id`

## フィールド
| フィールド | 型 | 必須 | 備考 |
|-----------|-----|------|------|
| id | number | ✓ | 識別番号 |
| jpName | string | ✓ | 日本語でのキャラクター名 |
| enName | string | ✓ | 英語でのキャラクター名 |
| url | string | ✓ | URL識別子 |
| fullbodyImage | image | ✓ | 全身画像 |
| imageLabel | string | ✓ | デフォルト画像の説明文 |
| portraitImage | image | ✓ | 顔画像 |
| author | string | ✓ | 作者名 |
| introduction | string | ✓ | キャラクター紹介文（簡潔） |
| catchphrase | string | - | キャッチフレーズ（オプション） |

**プロフィール情報:**
| フィールド | 型 | 必須 | 備考 |
|-----------|-----|------|------|
| birthday | string | - | 誕生日（月/日形式）（オプション） |
| gender | string | - | 性別（オプション） |
| height | string | - | 身長（オプション） |
| weight | string | - | 体重（オプション） |

**コンテンツ:**
| フィールド | 型 | 必須 | 備考 |
|-----------|-----|------|------|
| description | markdown | ✓ | 詳細説明（Markdown対応） |
| gallery | image[] | - | ギャラリー画像の配列（オプション） |
| alternates | Alternate[] | - | 別衣装の配列（オプション） |
| relations | Relation[] | - | ソフケンタウンとの関連性（オプション） |

**二次創作ガイドライン（各キャラクター別）:**
| フィールド | 型 | 必須 | 備考 |
|-----------|-----|------|------|
| rules.r18 | RuleLevel | ✓ | R-18表現（性的表現） |
| rules.r18g | RuleLevel | ✓ | R-18G表現（残酷・グロ表現） |
| rules.colabo | RuleLevel | ✓ | 外部キャラクターとの絡み |
| rules.coupling | RuleLevel | ✓ | カップリング表現 |
| rules.snsRolePlaying | RuleLevel | ✓ | SNSでのなりきり活動 |
| rules.modification | RuleLevel | ✓ | 大きな改変 |
| rules.others | markdown | - | その他の規約（オプション） |

**Alternate（別衣装）:**
| フィールド | 型 | 必須 | 備考 |
|-----------|-----|------|------|
| id | string | ✓ | 衣装ID |
| alternateName | string | ✓ | 衣装名 |
| fullbodyImage | image | ✓ | 全身画像 |
| portraitImage | image | ✓ | 顔画像 |

**Relation（関連性）:**
| フィールド | 型 | 必須 | 備考 |
|-----------|-----|------|------|
| sofkenTownId | string | ✓ | ソフケンタウンのID |
| description | string | - | 関連性の説明（オプション） |

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
| 種別 | Global `guideline` |
| ファイル | `contents/sofchara/Guideline.ts` |
| API | `GET /api/globals/guideline` |

## フィールド
| フィールド | 型 | 必須 | 備考 |
|-----------|-----|------|------|
| title | string | ✓ | ページタイトル |
| content | markdown | ✓ | ガイドライン本文（Markdown対応） |
| updatedAt | date | ✓ | 最終更新日 |

---

# `/sofchara/sofkentown` - ソフケンタウンページ

ソフキャラの共通世界観「ソフケンタウン」の情報です。

## Payload定義
| 項目 | 値 |
|------|-----|
| 種別 | Collection `sofkentown` |
| ファイル | `contents/sofchara/Sofkentown.ts` |
| API | `GET /api/sofkentown` |

## フィールド
| フィールド | 型 | 必須 | 備考 |
|-----------|-----|------|------|
| id | string | ✓ | 識別ID |
| name | string | ✓ | 場所・設定の名前 |
| image | image | - | イメージ画像（オプション） |
| description | markdown | ✓ | 詳細説明（Markdown対応） |
| relatedCharacters | number[] | - | 関連するキャラクターのID配列（オプション） |


**注意:**
- `relatedCharacters`は各キャラクターの`id`を参照
