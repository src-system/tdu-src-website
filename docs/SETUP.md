# セットアップガイド

## クイックスタート

### 1. 依存関係のインストール

```bash
pnpm install
```

### 2. 環境変数の設定

```bash
cp .env.example .env
```

`.env`ファイルを開いて`PAYLOAD_SECRET`を必ず変更してください。

```bash
# ランダムな秘密鍵を生成
# PowerShell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))

# Bash/Linux/macOS
openssl rand -base64 32
```

### 3. 開発サーバーの起動

```bash
# Docker + 全アプリを起動（推奨）
pnpm dev

# または個別に起動
pnpm dev:web  # フロントエンド http://localhost:3000
pnpm dev:cms  # CMS http://localhost:3001
```

### 4. Payload CMS の初期設定

1. ブラウザで http://localhost:3001/admin にアクセス
2. 管理者アカウントを作成
3. コンテンツを追加

## プロジェクト構成

```
tdu-src-website/
├── apps/
│   ├── web/                    # Next.js フロントエンド
│   │   └── src/app/
│   │       ├── _components/    # 共通コンポーネント
│   │       ├── _lib/           # API クライアント・ユーティリティ
│   │       ├── about/          # About ページ
│   │       ├── team/           # 班紹介ページ
│   │       ├── news/           # ニュースページ
│   │       └── sofchara/       # ソフきゃらページ
│   │
│   └── cms/                    # Payload CMS
│       ├── contents/           # コンテンツ定義
│       │   ├── about/          # About 関連
│       │   ├── news/           # ニュース関連
│       │   ├── sofchara/       # ソフきゃら関連
│       │   ├── team/           # 班関連
│       │   ├── toppage/        # トップページ関連
│       │   └── collections/    # Media, Users
│       ├── media/              # アップロードファイル
│       └── migrations/         # DBマイグレーション
│
├── packages/
│   ├── theme/                  # 共有デザイントークン
│   │   └── tokens.css          # CSS変数定義
│   └── types/                  # 共有型定義
│
├── docs/
│   ├── api/                    # API仕様書
│   └── SETUP.md                # このファイル
│
├── docker-compose.yml          # Docker設定
├── biome.json                  # Biome設定
├── lefthook.yml                # Git hooks設定
└── .env                        # 環境変数
```

## 開発ワークフロー

### フロントエンド開発

```bash
# 開発サーバー起動
pnpm dev:web

# ビルド
pnpm build:web
```

- ページ: `apps/web/src/app/[route]/page.tsx`
- コンポーネント: `apps/web/src/app/_components/`
- API クライアント: `apps/web/src/app/_lib/payload.ts`

### CMS 開発

```bash
# 開発サーバー起動
pnpm dev:cms

# マイグレーション作成
pnpm cms:migrate:create

# マイグレーション実行
pnpm cms:migrate
```

- コンテンツ定義: `apps/cms/contents/`
- 設定: `apps/cms/payload.config.ts`

### ISR / キャッシュについて

このプロジェクトは ISR (Incremental Static Regeneration) を使用しています。

```typescript
// ページの再検証間隔を設定
export const revalidate = 300 // 5分

// API フェッチのデフォルト再検証間隔
const FETCH_OPTIONS = { next: { revalidate: 60 } } // 60秒
```

**開発時に CMS 更新を即反映させるには:**

```bash
# 開発サーバーを使用（キャッシュなし）
pnpm dev
```

## Docker コマンド

```bash
# PostgreSQL コンテナを起動
pnpm docker:up

# コンテナを停止
pnpm docker:down

# ログを表示
pnpm docker:logs

# コンテナの状態を確認
docker ps

# データベースをリセット
pnpm docker:down
docker volume rm tdu-src-website_postgres_data
pnpm docker:up
```

## パッケージ管理

```bash
# ルートに依存関係を追加
pnpm add <package> -w

# 特定のアプリに追加
pnpm --filter @tdu-src/web add <package>
pnpm --filter @tdu-src/cms add <package>

# すべての依存関係を更新
pnpm update -r
```

## コード品質

```bash
# Lint
pnpm lint

# フォーマット
pnpm format

# Lint + Format
pnpm check

# CI用チェック（エラーがあれば失敗）
pnpm ci
```

Git commit 時に Lefthook が自動的に `pnpm check` を実行します。

## ビルド

```bash
# すべてのアプリをビルド
pnpm build

# 本番サーバーを起動
pnpm start:web
pnpm start:cms
```

## トラブルシューティング

### ポート競合エラー

`.env`でポートを変更:

```env
WEB_PORT=3002
CMS_PORT=3003
```

### PostgreSQL 接続エラー

```bash
# Docker が起動しているか確認
docker ps

# ログを確認
pnpm docker:logs

# データベースをリセット
pnpm docker:down
docker volume rm tdu-src-website_postgres_data
pnpm docker:up
```

### 型定義エラー

```bash
pnpm --filter @tdu-src/types build
```

### pnpm install エラー

```bash
pnpm store prune
pnpm install
```

### CMS API がアクセス拒否を返す

CMS のコンテンツ定義に `access: { read: () => true }` が設定されているか確認してください。

```typescript
// apps/cms/contents/SomeContent.ts
export const SomeContent: GlobalConfig = {
  slug: 'some-content',
  access: { read: () => true }, // これが必要
  // ...
}
```

## 参考リンク

- [Next.js ドキュメント](https://nextjs.org/docs)
- [Payload CMS ドキュメント](https://payloadcms.com/docs)
- [Tailwind CSS ドキュメント](https://tailwindcss.com/docs)
- [Biome ドキュメント](https://biomejs.dev/)
- [pnpm ドキュメント](https://pnpm.io/)

## コントリビューション

1. 機能ブランチを作成: `git checkout -b feature/your-feature`
2. 変更をコミット: `git commit -m "Add your feature"`
3. プッシュ: `git push origin feature/your-feature`
4. プルリクエストを作成
