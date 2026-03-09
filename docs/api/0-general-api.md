# サイト全体 API

サイト全体で共通して使用するデータの管理項目です。

---

## 1. サイト設定

### 概要
フッターなどで使用するサイト全体の設定です。メールアドレス、GitHub URL、所在地を管理します。

### 使用箇所
- フッター（全ページ共通）

### Payload定義
| 項目 | 値 |
|------|-----|
| 種別 | Global |
| slug | `site-settings` |
| ファイル | `contents/SiteSettings.ts` |
| API | `GET /api/globals/site-settings` |

| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| contact | group | - | 連絡先情報 |
| contact.email | email | - | メールアドレス |
| contact.githubUrl | text | - | GitHub URL（https://github.com/ で始まる必要あり） |
| location | text | - | 所在地 |

### フィールド（管理）
| フィールド | 型 | 必須 | 備考 |
|-----------|-----|------|------|
| contact.email | string (email) | - | お問い合わせ用メールアドレス |
| contact.githubUrl | string | - | GitHubの組織/ユーザーページURL |
| location | string | - | フッターに表示する所在地 |

### 取得する値
| フィールド | 種別 | 型 | 備考 |
|-----------|------|-----|------|
| email | - | string | メールアドレス（空の場合はフッターに非表示） |
| githubUrl | - | string | GitHub URL（空の場合はフッターに非表示） |
| location | - | string | 所在地（空の場合はフッターに非表示） |

---

## 2. ソフケンタウン

### 概要
ソフキャラたちが暮らす世界の場所や設定を管理するコレクションです。

### 使用箇所
- ソフケンタウン一覧ページ (`/sofchara/sofkentown`)
- ソフケンタウン詳細ページ (`/sofchara/sofkentown/[townId]`)
- キャラクター詳細ページ（関連として表示）

### Payload定義
| 項目 | 値 |
|------|-----|
| 種別 | Collection |
| slug | `sofkentown` |
| ファイル | `contents/sofchara/Sofkentown.ts` |
| API | `GET /api/sofkentown` |

| フィールド | Payload型 | 必須 | 備考 |
|-----------|-----------|------|------|
| order | number | ✓ | 表示順（数字が小さいほど先、重複不可） |
| name | text | ✓ | 場所・設定の名前 |
| url | text | ✓ | URL名（半角英小文字、数字、ハイフンのみ、ユニーク） |
| image | upload (relationTo: media) | - | イメージ画像（mimeType: image） |
| description | richText | ✓ | 詳細説明 |
| relatedCharacters | relationship (relationTo: characters) | - | 関連キャラクター（hasMany: true） |

### フィールド（管理）
| フィールド | 型 | 必須 | 備考 |
|-----------|-----|------|------|
| order | number | ✓ | 表示順（重複不可） |
| name | string | ✓ | 場所・設定の名前 |
| url | string | ✓ | URL名（例: sofken-campus） |
| image | image | - | イメージ画像 |
| description | richText | ✓ | 詳細説明（Markdown対応） |
| relatedCharacters | Character[] | - | 関連するキャラクター |

### 取得する値（一覧）
| フィールド | 種別 | 型 | 備考 |
|-----------|------|-----|------|
| id | - | string | ドキュメントID |
| url | - | string | URL名 |
| order | - | number | 表示順 |
| name | - | string | 場所・設定の名前 |
| imagePath | - | string | イメージ画像URL |

### 取得する値（詳細）
| フィールド | 種別 | 型 | 備考 |
|-----------|------|-----|------|
| id | - | string | ドキュメントID |
| url | - | string | URL名 |
| order | - | number | 表示順 |
| name | - | string | 場所・設定の名前 |
| imagePath | - | string | イメージ画像URL |
| description | - | unknown (Lexical) | 詳細説明（RichText） |
| relatedCharacters | - | RelatedCharacter[] | 関連キャラクター |

**RelatedCharacter:**
| フィールド | 型 | 備考 |
|-----------|-----|------|
| id | string | キャラクターのURL名 |
| name | string | キャラクター名 |
| imagePath | string | キャラクター画像URL |

### API エンドポイント
| メソッド | エンドポイント | 備考 |
|---------|---------------|------|
| GET | `/api/sofkentown?depth=2&limit=100&sort=order` | 一覧取得（orderでソート） |
| GET | `/api/sofkentown?depth=2&where[url][equals]={url}` | URL名で個別取得 |

### 注意
- データがない場合、一覧ページは `/error?type=no-content&failedItems=sofkentown-data` にリダイレクト
- 詳細ページで該当データがない場合は 404 を返す
