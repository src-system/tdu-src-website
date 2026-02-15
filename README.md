# TDU SRC Website

2026年度 東京電機大学 ソフトウェア研究部 公式ウェブサイト

## 🏗️ プロジェクト構成

このプロジェクトはpnpm workspacesを使用したmonorepo構成になっています。

```
tdu-src-website/
├── apps/
│   ├── web/          # Next.js フロントエンドアプリケーション (port 3000)
│   └── cms/          # Payload CMS (port 3001)
├── packages/
│   └── types/        # 共有型定義パッケージ
└── docs/
    └── api/          # API仕様書
```

## 🛠️ 技術スタック

### フロントエンド (apps/web)
- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **TypeScript 5**
- **Biome** (Linter & Formatter)

### CMS (apps/cms)
- **Payload CMS 3**
- **PostgreSQL 16**
- **Next.js 16**

### インフラ
- **Docker & Docker Compose**
- **pnpm workspaces**

## 🚀 セットアップ

### 前提条件

- Node.js 20以上
- pnpm 9以上
- Docker & Docker Compose

### 開発環境のセットアップ

1. リポジトリのクローン

```bash
git clone https://github.com/your-org/tdu-src-website.git
cd tdu-src-website
```

2. 依存関係のインストール

```bash
pnpm install
```

3. 環境変数の設定

```bash
cp .env.example .env
```

`.env`ファイルを編集して必要な環境変数を設定してください。特に`PAYLOAD_SECRET`は必ず変更してください。

4. Dockerコンテナの起動

```bash
pnpm docker:up
```

PostgreSQLデータベースが起動します。

5. 開発サーバーの起動

```bash
# すべてのアプリを並列で起動
pnpm dev

# または個別に起動
pnpm dev:web  # フロントエンド (http://localhost:3000)
pnpm dev:cms  # CMS (http://localhost:3001)
```

## 📦 利用可能なコマンド

### 開発

```bash
pnpm dev           # すべてのアプリを並列で起動
pnpm dev:web       # フロントエンドのみ起動
pnpm dev:cms       # CMSのみ起動
```

### ビルド

```bash
pnpm build         # すべてのアプリをビルド
pnpm build:web     # フロントエンドのみビルド
pnpm build:cms     # CMSのみビルド
```

### Linting & Formatting

```bash
pnpm lint          # コードのLint
pnpm format        # コードのフォーマット
pnpm check         # Lint + Format
pnpm ci            # CI用チェック
```

### Docker

```bash
pnpm docker:up     # Dockerコンテナを起動
pnpm docker:down   # Dockerコンテナを停止
pnpm docker:logs   # Dockerログを表示
```

## 📝 ページ構成

```
/                   # トップページ
/about              # ソフ研について
/team               # 班紹介
  /graphics         # グラフィック班
  /sounds           # サウンド班
  /programming      # プログラミング班
  /planning         # 企画班
  /video            # 映像班
  /modeling         # モデリング班
/news               # お知らせ一覧
/news/[id]          # お知らせ詳細
/sofchara           # ソフキャラ
/sofchara/[name]    # キャラクター詳細
/sofchara/guideline # 二次創作ガイドライン
/sofchara/sofkentown # ソフケンタウン
```

## 🎨 コンテンツ管理

Payload CMSの管理画面は `http://localhost:3001/admin` でアクセスできます。

初回アクセス時にユーザーアカウントを作成してください。

## 🐳 本番環境へのデプロイ

Dockerを使用した本番環境へのデプロイ:

```bash
docker-compose up -d
```

環境変数は本番用に適切に設定してください。

## 📚 API仕様書

詳細なAPI仕様は`docs/api/`ディレクトリを参照してください。

- [トップページAPI](docs/api/1-top-page-api.md)
- [Aboutページ API](docs/api/2-about-page-api.md)
- [班紹介ページAPI](docs/api/3-team-page-api.md)
- [お知らせページAPI](docs/api/4-news-page-api.md)
- [ソフキャラページAPI](docs/api/5-characters-page-api.md)

## 🔧 トラブルシューティング

### ポートが既に使用されている

ポート3000または3001が既に使用されている場合は、`.env`ファイルで`WEB_PORT`や`CMS_PORT`を変更してください。

### PostgreSQL接続エラー

Dockerコンテナが正常に起動しているか確認してください:

```bash
docker ps
pnpm docker:logs
```

### 型定義エラー

型定義パッケージをビルドしてください:

```bash
pnpm --filter @tdu-src/types build
```

## 📄 ライセンス

このプロジェクトは東京電機大学ソフトウェア研究部によって管理されています。

## 🤝 コントリビューション

バグ報告や機能提案はIssueを作成してください。
プルリクエストも歓迎します！