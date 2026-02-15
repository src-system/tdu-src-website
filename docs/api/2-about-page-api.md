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
| aboutSection.description | textarea | ✓ | Markdown対応 |

### フィールド
| フィールド | 型 | 必須 | デフォルト値 | 備考 |
|-----------|-----|------|------------|------|
| title | string | - | "ABOUT" | セクションタイトル |
| subtitle | string | - | "ソフトウェア研究部について" | サブタイトル |
| description | markdown | ✓ | - | 紹介文（Markdown対応） |

**注意:**
- Markdownで記述可能（見出し、リスト、強調等）

---

## 3. アクティビティセクション

### 概要
主な活動内容を紹介するセクションです。

### 使用箇所
- Aboutページ（アクティビティセクション）

### Payload定義
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| activitySection.title | text | - | defaultValue: "ACTIVITY" |
| activitySection.subtitle | text | - | defaultValue: "主な活動" |
| activitySection.items | array | ✓ | minRows: 1 |
| activitySection.items[].title | text | ✓ | 活動タイトル |
| activitySection.items[].description | textarea | ✓ | 活動の説明 |
| activitySection.items[].image | upload (relationTo: media) | ✓ | アイコン画像 |
| activitySection.items[].alt | text | ✓ | 代替テキスト |

### フィールド
| フィールド | 型 | 必須 | デフォルト値 | 備考 |
|-----------|-----|------|------------|------|
| title | string | - | "ACTIVITY" | セクションタイトル |
| subtitle | string | - | "主な活動" | サブタイトル |
| items | ActivityItem[] | ✓ | - | 活動項目の配列 1つ以上必須 |

**ActivityItem:**
| フィールド | 型 | 必須 | 備考 |
|-----------|-----|------|------|
| title | string | ✓ | 活動タイトル |
| description | string | ✓ | 活動の説明 |
| image | image | ✓ | アイコン名 |


---

## 4. ヒストリーセクション

### 概要
ソフトウェア研究部の歴史を時系列で表示するセクションです。

### 使用箇所
- Aboutページ（ヒストリーセクション）

### Payload定義
| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| historySection.title | text | - | defaultValue: "HISTORY" |
| historySection.subtitle | text | - | defaultValue: "沿革" |
| historySection.timeline | array | ✓ | minRows: 1 |
| historySection.timeline[].year | number | ✓ | 年（西暦） |
| historySection.timeline[].month | number | - | 月（1-12） |
| historySection.timeline[].title | text | ✓ | イベントタイトル |
| historySection.timeline[].description | textarea | ✓ | 詳細説明 |

### フィールド
| フィールド | 型 | 必須 | デフォルト値 | 備考 |
|-----------|-----|------|------------|------|
| title | string | - | "HISTORY" | セクションタイトル |
| subtitle | string | - | "沿革" | サブタイトル |
| timeline | HistoryItem[] | ✓ | - | 歴史イベントの配列 1個以上必須 |

**HistoryItem:**
| フィールド | 型 | 必須 | 備考 |
|-----------|-----|------|------|
| year | number | ✓ | 年（西暦） |
| month | number | - | 月（1-12、オプション） |
| title | string | ✓ | イベントタイトル |
| description | string | ✓ | 詳細説明 |


**注意:**
- `timeline`は古い順（年代昇順）に並べて表示
- `month`が指定されていない場合は年のみ表示
