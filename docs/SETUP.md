# セットアップガイド

## 🚀 クイックスタート

### 1. 依存関係のインストール

```bash
pnpm install
```

### 2. 環境変数の設定

`.env`ファイルが自動的に作成されています。`PAYLOAD_SECRET`を必ず変更してください。

```bash
# .env を開いて PAYLOAD_SECRET を変更
code .env
```

推奨：以下のコマンドでランダムな秘密鍵を生成できます。

```bash
# PowerShell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))

# Bash/Linux
openssl rand -base64 32
```

### 3. データベースの起動

```bash
pnpm docker:up
```

### 4. 開発サーバーの起動

```bash
# すべてのアプリを並列起動
pnpm dev

# または個別に起動
pnpm dev:web  # フロントエンド http://localhost:3000
pnpm dev:cms  # CMS http://localhost:3001
```

### 5. Payload CMSの初期設定

1. ブラウザで `http://localhost:3001/admin` にアクセス
2. 管理者アカウントを作成
3. コレクションにコンテンツを追加

## 📂 プロジェクト構成

```
tdu-src-website/
├── apps/
│   ├── web/                 # Next.js フロントエンド
│   │   ├── src/
│   │   │   ├── app/        # App Router ページ
│   │   │   └── _components/ # 共通コンポーネント
│   │   ├── public/          # 静的ファイル
│   │   └── package.json
│   │
│   └── cms/                 # Payload CMS
│       ├── app/             # Next.js App Router
│       ├── collections/     # Payload コレクション定義
│       ├── media/           # アップロードされたメディア
│       ├── payload.config.ts
│       └── package.json
│
├── packages/
│   └── types/               # 共有型定義
│       ├── src/
│       │   └── index.ts
│       └── package.json
│
├── docs/
│   ├── api/                 # API仕様書
│   └── SETUP.md             # このファイル
│
├── docker-compose.yml       # Docker設定
├── pnpm-workspace.yaml      # pnpm workspace設定
├── package.json             # ルートpackage.json
└── .env                     # 環境変数
```

## 🔧 開発ワークフロー

### フロントエンド開発

1. `apps/web/src/app/` でページを編集
2. `apps/web/src/app/_components/` で共通コンポーネントを編集
3. 型定義が必要な場合は `packages/types/src/index.ts` に追加

### CMS開発

1. `apps/cms/collections/` でコレクションを編集
2. Payload CMSを再起動して変更を反映
3. 管理画面でコンテンツを追加/編集

### 型定義の追加

1. `packages/types/src/index.ts` に型を追加
2. 型をビルド：`pnpm --filter @tdu-src/types build`
3. 両方のアプリで型が自動的に利用可能になります

## 🐳 Docker コマンド

```bash
# PostgreSQLコンテナを起動
pnpm docker:up

# コンテナを停止
pnpm docker:down

# ログを表示
pnpm docker:logs

# コンテナの状態を確認
docker ps
```

## 📦 パッケージ管理

```bash
# ルートで依存関係を追加
pnpm add <package> -w

# 特定のアプリに依存関係を追加
pnpm --filter @tdu-src/web add <package>
pnpm --filter @tdu-src/cms add <package>

# すべての依存関係を更新
pnpm update -r
```

## 🎨 コード品質

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

## 🏗️ ビルド

```bash
# すべてのアプリをビルド
pnpm build

# 個別にビルド
pnpm build:web
pnpm build:cms

# 本番サーバーを起動
pnpm start:web
pnpm start:cms
```

## 🔍 トラブルシューティング

### ポート競合エラー

ポート3000または3001が既に使用されている場合、`.env`で変更できます。

```env
WEB_PORT=3002
CMS_PORT=3003
```

### PostgreSQL接続エラー

1. Dockerが起動しているか確認：`docker ps`
2. ログを確認：`pnpm docker:logs`
3. データベースをリセット：

```bash
pnpm docker:down
docker volume rm tdu-src-website_postgres_data
pnpm docker:up
```

### 型定義エラー

型定義をビルドし直してください。

```bash
pnpm --filter @tdu-src/types build
```

### pnpm install エラー

キャッシュをクリアして再インストール。

```bash
pnpm store prune
pnpm install
```

### Next.js バージョン警告

`@payloadcms/next`のpeer dependency警告は無視しても問題ありません。Next.js 16.1.6は動作します。

## 📚 参考リンク

- [Next.js ドキュメント](https://nextjs.org/docs)
- [Payload CMS ドキュメント](https://payloadcms.com/docs)
- [Tailwind CSS ドキュメント](https://tailwindcss.com/docs)
- [pnpm ドキュメント](https://pnpm.io/)

## 🤝 コントリビューション

1. 機能ブランチを作成：`git checkout -b feature/your-feature`
2. 変更をコミット：`git commit -m "Add your feature"`
3. プッシュ：`git push origin feature/your-feature`
4. プルリクエストを作成

## 📝 ライセンス

このプロジェクトは東京電機大学ソフトウェア研究部によって管理されています。
