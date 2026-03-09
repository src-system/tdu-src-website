# Teamページ API

Teamページで使用するデータの管理項目です。

## Payload定義（全体）

| 項目 | 値 |
|------|-----|
| 種別 | Global |
| slug | `team-page` |
| ファイル | `contents/team/index.ts` |
| API | `GET /api/globals/team-page` |

※ 各班の詳細は個別のGlobalで管理（`team-2d`, `team-3d`, `team-game`, `team-webapp`, `team-sound`, `team-design`）

---

# `/team` - Teamトップページ

班の一覧を表示するページです。

## 1. ページヘッダー（トップ画像）

### 概要
Teamページ上部に表示されるヘッダー画像とタイトルです。

### Payload定義
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| pageHeader.image | upload (relationTo: media) | ✓ | ヘッダー画像（16:9推奨） |
| pageHeader.alt | text | - | 代替テキスト |
| pageHeader.title | text | - | ページタイトル（デフォルト: "班紹介"） |

### フィールド
| フィールド | 型 | 必須 | 備考 |
|-----------|-----|------|------|
| image | image | ✓ | ヘッダー画像（16:9推奨） |
| alt | string | - | 画像の代替テキスト |
| title | string | - | ページタイトル |

---

## 2. Aboutセクション（teamOverview）

### 概要
ソフトウェア研究部の班活動についてを説明するセクションです。

### Payload定義
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| teamOverview.title | text | - | defaultValue: "TEAM" |
| teamOverview.subtitle | text | - | defaultValue: "班紹介" |
| teamOverview.description | textarea | - | 説明文 |

### フィールド
| フィールド | 型 | 必須 | デフォルト値 | 備考 |
|-----------|-----|------|------------|------|
| title | string | - | "TEAM" | セクションタイトル |
| subtitle | string | - | "班紹介" | サブタイトル |
| description | string | - | - | 説明文 |

---

## 3. 班カード一覧

### 概要
各班のカード情報です。各班のGlobalから取得します。

### 取得API
各班のGlobalから `teamCard` グループを取得:
- `GET /api/globals/team-game`
- `GET /api/globals/team-webapp`
- `GET /api/globals/team-sound`
- `GET /api/globals/team-2d`
- `GET /api/globals/team-3d`
- `GET /api/globals/team-design`

### フィールド（teamCard グループ）
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| teamCard.teamType | text | ✓ | 班識別子（固定値） |
| teamCard.name | text | ✓ | 班の表示名 |
| teamCard.cardImage | upload | ✓ | 班カード画像（16:9推奨） |
| teamCard.cardAlt | text | - | 代替テキスト |
| teamCard.cardDescription | textarea | - | 班の簡単な説明 |
| teamCard.activityLabels | array | - | 活動ラベルの配列 |
| teamCard.activityLabels[].label | text | ✓ | 活動ラベル |

### TeamType（班識別子）
| 値 | 表示名 | URL |
|----|--------|-----|
| game | ゲームプログラミング | `/team/game` |
| webapp | Webアプリ | `/team/webapp` |
| sound | サウンド | `/team/sound` |
| 2d | 2D | `/team/2d` |
| 3d | 3D | `/team/3d` |
| design | デザイン | `/team/design` |

### 取得する値（TeamCard）
| フィールド | 型 | 備考 |
|-----------|-----|------|
| teamName | string | 班識別子（URL用） |
| displayName | string | 班の表示名 |
| imagePath | string | 班カード画像URL |
| description | string | 班の説明 |
| activities | string[] | 活動ラベル |

---

# `/team/[teamName]` - 班詳細ページ

各班の詳細情報を表示するページです。

## Payload定義

各班は個別のGlobalとして定義されています:

| slug | ファイル | 備考 |
|------|----------|------|
| team-game | `contents/team/game/index.ts` | ゲーム班 |
| team-webapp | `contents/team/webapp/index.ts` | Web班 |
| team-sound | `contents/team/sound/index.ts` | サウンド班 |
| team-2d | `contents/team/2d/index.ts` | 2D班 |
| team-3d | `contents/team/3d/index.ts` | 3D班 |
| team-design | `contents/team/design/index.ts` | デザイン班 |

各班は共通のフィールド構造（`teamDetailFields.ts`）を使用しています。

---

## 1. 班カード（teamCard）

トップページの班一覧で使用するカード情報です。（上記「班カード一覧」参照）

---

## 2. ページヘッダー（pageHeader）

### 概要
班詳細ページ上部に表示されるヘッダー画像とタイトルです。

### Payload定義
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| pageHeader.image | upload | - | ヘッダー画像（未設定時はcardImage使用） |
| pageHeader.alt | text | - | 代替テキスト |
| pageHeader.title | text | - | ページタイトル（未設定時はname使用） |

---

## 3. Aboutセクション（aboutSection）

### 概要
班の詳細説明セクションです。

### Payload定義
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| aboutSection.aboutTitle | text | - | セクションタイトル（デフォルト: "ABOUT"） |
| aboutSection.subtitle | text | - | サブタイトル（◯◯班とは？など） |
| aboutSection.description | richText | - | 班の詳細説明（Lexical） |
| aboutSection.images | array | - | 画像の配列（1〜3枚） |
| aboutSection.images[].image | upload | ✓ | 画像 |
| aboutSection.images[].alt | text | - | 代替テキスト |

---

## 4. 班長インタビュー（leaderInterview）

### 概要
班長のインタビュー記事を表示します。

### Payload定義
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| leaderInterview.title | text | - | タイトル（デフォルト: "Team Reader Interview"） |
| leaderInterview.subtitle | text | - | サブタイトル（デフォルト: "班長インタビュー"） |
| leaderInterview.name | text | - | 班長の名前 |
| leaderInterview.image | upload | - | 班長の写真 |
| leaderInterview.alt | text | - | 代替テキスト |
| leaderInterview.body | textarea | - | インタビュー概要 |
| leaderInterview.qa | array | - | Q&A形式のインタビュー |
| leaderInterview.qa[].question | text | ✓ | 質問 |
| leaderInterview.qa[].answer | textarea | ✓ | 回答 |

**注意:**
- `name`が設定されており、`body`または`qa`が1件以上ある場合のみ表示

---

## 5. 使用ソフトウェア（softwares）

### 概要
班で使用している主なソフトウェア・技術スタックを表示します。

### Payload定義
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| softwares | array | - | ソフトウェアの配列 |
| softwares[].name | text | ✓ | ソフトウェア名 |
| softwares[].description | text | - | 用途の説明 |
| softwares[].image | upload | - | アイコン画像 |

**注意:**
- 1件以上登録されている場合のみセクション表示

---

## 6. ギャラリー（gallery）

### 概要
班の活動写真や作品のギャラリーです。画像・動画・音声を混在可能。

### Payload定義
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| gallery | array | - | ギャラリーアイテムの配列 |
| gallery[].type | select | ✓ | メディア種別（image/video/sound） |
| gallery[].media | upload | ✓ | メディアファイル |
| gallery[].alt | text | - | 代替テキスト |
| gallery[].thumbnail | upload | - | サムネイル（動画・音声の場合） |
| gallery[].title | text | - | タイトル |
| gallery[].description | textarea | - | 説明 |
| gallery[].relatedLinks | array | - | 関連リンク |
| gallery[].relatedLinks[].linkName | text | ✓ | リンク名 |
| gallery[].relatedLinks[].link | text | ✓ | URL |

### GalleryItem Type
| 値 | 備考 |
|----|------|
| image | 画像 |
| video | 動画 |
| sound | 音声 |

**注意:**
- 1件以上登録されている場合のみセクション表示
- 動画・音声の場合はthumbnailを設定推奨
