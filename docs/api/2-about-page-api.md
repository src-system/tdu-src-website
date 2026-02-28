# Aboutページ API

Aboutページで使用するデータの管理項目です。

## Payload定義（全体）

| 項目 | 値 |
|------|-----|
| 種別 | Global |
| slug | `about-page` |
| ファイル | `contents/about/index.ts` |
| API | `GET /api/globals/about-page` |

※ pageHeader, aboutSection, activitySection, historySection をグループで保持
※ アクティビティ・ヒストリーは各コレクションページで登録し、Aboutページで参照して表示順を指定

---

## 1. ページヘッダー（トップ画像）

### 概要
Aboutページ上部に表示されるヘッダー画像とタイトルです。

### 使用箇所
- Aboutページ（ページヘッダー）

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

---

## 2. Aboutセクション

### 概要
ソフトウェア研究部の紹介と基本情報を表示するセクションです。

### 使用箇所
- Aboutページ（メインコンテンツ）

### Payload定義
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| aboutSection.title | text | - | defaultValue: "ABOUT" |
| aboutSection.subtitle | text | - | defaultValue: "ソフトウェア研究部について" |
| aboutSection.description | richText | ✓ | Lexicalエディタ（見出し、リスト、強調等） |

### フィールド
| フィールド | 型 | 必須 | デフォルト値 | 備考 |
|-----------|-----|------|------------|------|
| title | string | - | "ABOUT" | セクションタイトル |
| subtitle | string | - | "ソフトウェア研究部について" | サブタイトル |
| description | richText (Lexical) | ✓ | - | 紹介文（リッチテキスト） |

**注意:**
- 見出し、リスト、強調等をLexicalエディタで編集可能。フロントではLexicalのレンダラーで表示

---

## 3. アクティビティセクション

### 概要
主な活動内容を紹介するセクションです。**アクティビティ**コレクションで登録し、Aboutページで参照・表示順を指定。

### 登録ページ
- **Collections > アクティビティ** で活動項目を登録

### Payload定義
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| activitySection.title | text | - | defaultValue: "ACTIVITY" |
| activitySection.subtitle | text | - | defaultValue: "主な活動" |
| activitySection.items | array | ✓ | relationship で activities を参照 |
| activitySection.items[].activity | relationship (activities) | ✓ | 表示順に並べる |

**アクティビティコレクション（activities）:**
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| title | text | ✓ | 活動タイトル |
| description | textarea | ✓ | 活動の説明 |
| image | upload (media) | ✓ | アイコン画像 |
| alt | text | ✓ | 代替テキスト |

---

## 4. ヒストリーセクション

### 概要
ソフトウェア研究部の歴史を時系列で表示するセクションです。**ヒストリー**コレクションで登録し、Aboutページで参照・表示順を指定。

### 登録ページ
- **Collections > ヒストリー** で沿革イベントを登録

### Payload定義
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| historySection.title | text | - | defaultValue: "HISTORY" |
| historySection.subtitle | text | - | defaultValue: "沿革" |
| historySection.timeline | array | ✓ | relationship で history を参照 |
| historySection.timeline[].event | relationship (history) | ✓ | 古い順に並べる |

**ヒストリーコレクション（history）:**
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| year | number | ✓ | 年（西暦） |
| month | number | - | 月（1-12） |
| title | text | ✓ | イベントタイトル |
| description | textarea | ✓ | 詳細説明 |

**注意:**
- `timeline`は古い順（年代昇順）に並べて表示
