# Aboutページ API

Aboutページで使用するデータの管理項目です。

## Payload定義（全体）

| 項目 | 値 |
|------|-----|
| 種別 | Global |
| slug | `about-page` |
| ファイル | `contents/about/index.ts` |
| API | `GET /api/globals/about-page?depth=2` |

※ pageHeader, aboutSection, activitySection, historySection をグループで保持
※ アクティビティ・ヒストリーは各コレクションで登録し、Aboutページで参照して表示順を指定

---

## 1. ページヘッダー（pageHeader）

### 概要
Aboutページ上部に表示されるヘッダー画像とタイトルです。

### 使用箇所
- Aboutページ（ページヘッダー）

### Payload定義
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| pageHeader.image | upload (relationTo: media) | ✓ | ヘッダー画像（16:9推奨） |
| pageHeader.alt | text | - | 代替テキスト |
| pageHeader.title | text | - | ページタイトル（デフォルト: "部の活動"） |

### フィールド
| フィールド | 型 | 必須 | 備考 |
|-----------|-----|------|------|
| image | image | ✓ | ヘッダー画像（16:9推奨） |
| alt | string | - | 画像の代替テキスト |
| title | string | - | ページタイトル |

---

## 2. Aboutセクション（aboutSection）

### 概要
ソフトウェア研究部の紹介と基本情報を表示するセクションです。

### 使用箇所
- Aboutページ（メインコンテンツ）

### Payload定義
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| aboutSection.title | text | - | defaultValue: "ABOUT" |
| aboutSection.subtitle | text | - | defaultValue: "ソフトウェア研究部について" |
| aboutSection.description | richText | - | Lexicalエディタ |

### フィールド
| フィールド | 型 | 必須 | デフォルト値 | 備考 |
|-----------|-----|------|------------|------|
| title | string | - | "ABOUT" | セクションタイトル |
| subtitle | string | - | "ソフトウェア研究部について" | サブタイトル |
| description | richText (Lexical) | - | - | 紹介文（リッチテキスト） |

**注意:**
- 見出し、リスト、強調等をLexicalエディタで編集可能
- フロントではRichTextコンポーネントで表示

---

## 3. アクティビティセクション（activitySection）

### 概要
主な活動内容を紹介するセクションです。

### 登録ページ
- **Collections > アクティビティ** で活動項目を登録
- **Aboutページ > アクティビティセクション** で表示順を指定

### Payload定義

**Aboutページ側（表示順指定）:**
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| activitySection.title | text | - | defaultValue: "ACTIVITY" |
| activitySection.subtitle | text | - | defaultValue: "主な活動" |
| activitySection.items | array | - | relationship で activities を参照 |
| activitySection.items[].activity | relationship (activities) | ✓ | 表示順に並べる |

**アクティビティコレクション（activities）:**

| 項目 | 値 |
|------|-----|
| 種別 | Collection |
| slug | `activities` |
| ファイル | `contents/about/Activities.ts` |

| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| title | text | ✓ | 活動タイトル |
| description | textarea | ✓ | 活動の説明 |
| image | upload (media) | ✓ | アイコン画像 |
| alt | text | - | 代替テキスト |

### 取得する値
| フィールド | 型 | 備考 |
|-----------|-----|------|
| title | string | セクションタイトル |
| subtitle | string | サブタイトル |
| items | ActivityItem[] | 活動項目の配列 |

**ActivityItem:**
| フィールド | 型 | 備考 |
|-----------|-----|------|
| title | string | 活動タイトル |
| description | string | 活動の説明 |
| imagePath | string | 画像URL |
| alt | string | 代替テキスト |

---

## 4. ヒストリーセクション（historySection）

### 概要
ソフトウェア研究部の歴史を時系列で表示するセクションです。

### 登録ページ
- **Collections > ヒストリー** で沿革イベントを登録
- **Aboutページ > ヒストリーセクション** で表示順を指定

### Payload定義

**Aboutページ側（表示順指定）:**
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| historySection.title | text | - | defaultValue: "HISTORY" |
| historySection.subtitle | text | - | defaultValue: "沿革" |
| historySection.timeline | array | - | relationship で history を参照 |
| historySection.timeline[].event | relationship (history) | ✓ | 古い順に並べる |

**ヒストリーコレクション（history）:**

| 項目 | 値 |
|------|-----|
| 種別 | Collection |
| slug | `history` |
| ファイル | `contents/about/History.ts` |

| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| year | number | ✓ | 年（西暦） |
| month | number | - | 月（1-12） |
| title | text | ✓ | イベントタイトル |
| description | textarea | ✓ | 詳細説明 |

### 取得する値
| フィールド | 型 | 備考 |
|-----------|-----|------|
| title | string | セクションタイトル |
| subtitle | string | サブタイトル |
| timeline | HistoryItem[] | 沿革の配列 |

**HistoryItem:**
| フィールド | 型 | 備考 |
|-----------|-----|------|
| year | number | 年（西暦） |
| month | number | 月（任意） |
| title | string | イベントタイトル |
| description | string | 詳細説明 |

**注意:**
- `timeline`は古い順（年代昇順）に並べて表示
