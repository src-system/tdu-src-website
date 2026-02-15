# Newsページ API

Newsページで使用するデータの管理項目です。

---

## 1. ページヘッダー（トップ画像）

### 概要
Newsページ上部に表示されるヘッダー画像とタイトルです。

### 使用箇所
- Newsページ（ページヘッダー）

### フィールド
| フィールド | 型 | 必須 | 備考 |
|-----------|-----|------|------|
| image | image | ✓ | ヘッダー画像（16:9推奨） |
| alt | string | ✓ | 画像の代替テキスト |
| title | string | ✓ | ページタイトル |

---

## 2. 記事一覧

### 概要
お知らせや活動報告などのニュース記事を一覧表示します。

### 使用箇所
- Newsページ（記事一覧）
- トップページ（最新3件）

### フィールド
| フィールド | 型 | 必須 | デフォルト値 | 備考 |
|-----------|-----|------|------------|------|
| title | string | - | "NEWS" | セクションタイトル |
| subtitle | string | - | "お知らせ" | サブタイトル |
| description | string | ✓ | - | 説明文（改行対応） |
| items | NewsItem[ id, title, date, categories, summary, thumbnail, alt ] | ✓ | - | 記事の配列 (本文は取得しない) |

※ 1ページ10件でクエリパラメータで取得する

**NewsItem:**
| フィールド | 型 | 必須 | 備考 |
|-----------|-----|------|------|
| id | string | ✓ | 記事ID（URL識別子） |
| title | string | ✓ | 記事タイトル |
| date | date | ✓ | 公開日 |
| categories | CategoryType | ✓ | カテゴリー |
| summary | string | ✓ | 要約文（記事一覧で表示） |
| thumbnail | image | ✓ | サムネイル画像（16:9推奨） |
| alt | string | ✓ | サムネイル画像の代替テキスト |
| content | markdown | ✓ | 本文（Markdown、画像含む） |
| author | string | - | 著者名（オプション） |
| tags | string[] | - | タグ（オプション） |

**CategoryType:**
- `announcement` - お知らせ
- `event` - イベント
- `report` - 活動報告
- `sofchara` - ソフキャラ
- `work` - 作品紹介
- `game` - ゲームプログラミング
- `web` - Webアプリ
- `sound` - サウンド
- `2d` - 2D
- `3d` - 3D
- `design` - デザイン

**注意:**
- トップページでは最新3件のみ表示
- 記事は公開日の降順で並べ替え
- 記事一覧では`content` `author` は不要（詳細ページのみ使用）

---

# `News/newsId` 記事詳細ページ

### 概要
各記事の詳細内容を表示するページです。記事ごとに個別のページを持ちます。

### 使用箇所
- `/news/[newsId]` 各記事の詳細ページ

### フィールド
**NewsItem:**
| フィールド | 型 | 必須 | 備考 |
|-----------|-----|------|------|
| id | string | ✓ | 記事ID（URL識別子） |
| title | string | ✓ | 記事タイトル |
| date | date | ✓ | 公開日 |
| categories | CategoryType | ✓ | カテゴリー |
| summary | string | ✓ | 要約文（記事一覧で表示） |
| thumbnail | image | ✓ | サムネイル画像（16:9推奨） |
| alt | string | ✓ | サムネイル画像の代替テキスト |
| content | markdown | ✓ | 本文（Markdown、画像含む） |
| author | string | - | 著者名（オプション） |

```

**注意:**
- `content`はMarkdownで記述可能（見出し、リスト、画像等）
- 画像はMarkdown記法で埋め込み可能
- `author`と`tags`はオプションで、データがない場合は非表示
