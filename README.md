# TDU SRC Website

2026年度 東京電機大学 ソフトウェア研究部 公式ウェブサイト

## 技術スタック

| カテゴリ | 技術 |
|---------|------|
| **フロントエンド** | Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript 5 |
| **CMS** | Payload CMS 3, PostgreSQL 16 |
| **コード品質** | Biome (Linter & Formatter), Lefthook (Git hooks) |
| **インフラ** | Docker & Docker Compose, pnpm workspaces |

## プロジェクト構成

```
tdu-src-website/
├── apps/
│   ├── web/                 # Next.js フロントエンド (port 3000)
│   │   └── src/app/         # App Router ページ・コンポーネント
│   └── cms/                 # Payload CMS (port 3001)
│       └── contents/        # CMS コンテンツ定義
├── packages/
│   ├── theme/               # 共有デザイントークン (CSS変数)
│   └── types/               # 共有型定義
└── docs/
    └── api/                 # API仕様書
```

## クイックスタート

### 前提条件

- Node.js 20以上
- pnpm 9以上
- Docker & Docker Compose

### セットアップ

```bash
# 1. 依存関係のインストール
pnpm install

# 2. 環境変数の設定（PAYLOAD_SECRETを必ず変更）
cp .env.example .env

# 3. Docker + 開発サーバーを起動
pnpm dev
```

| URL | 説明 |
|-----|------|
| http://localhost:3000 | フロントエンド |
| http://localhost:3001/admin | CMS管理画面 |

## ページ構成

```
/                           # トップページ
/about                      # ソフ研について
/team                       # 班一覧
  /team/game                # ゲームプログラミング班
  /team/webapp              # Webアプリ班
  /team/sound               # サウンド班
  /team/2d                  # 2D班
  /team/3d                  # 3D班
  /team/design              # デザイン班
/news                       # お知らせ一覧
  /news/[id]                # お知らせ詳細
/sofchara                   # ソフきゃら！
  /sofchara/[name]          # キャラクター詳細
  /sofchara/guideline       # 二次創作ガイドライン
  /sofchara/sofkentown      # ソフケンタウン一覧
  /sofchara/sofkentown/[id] # ソフケンタウン詳細
```

## レンダリング戦略

このプロジェクトは **SSG + ISR (Incremental Static Regeneration)** 構成です。

| ページ種別 | 再検証間隔 | 説明 |
|-----------|-----------|------|
| 静的ページ (About, Guideline) | 1時間 | めったに更新されない |
| 一覧ページ (Top, News, Team) | 5〜30分 | 新規追加を比較的早く反映 |
| 詳細ページ | 30分〜1時間 | 個別コンテンツの更新 |

## コマンド一覧

### 開発

```bash
pnpm dev           # Docker + 全アプリ起動
pnpm dev:local     # Docker なしで全アプリ起動
pnpm dev:web       # フロントエンドのみ
pnpm dev:cms       # CMSのみ
```

### ビルド

```bash
pnpm build         # 全アプリをビルド
pnpm build:web     # フロントエンドのみ
pnpm build:cms     # CMSのみ
```

### コード品質

```bash
pnpm lint          # Lint
pnpm format        # フォーマット
pnpm check         # Lint + Format
pnpm ci            # CI用チェック
```

### Docker

```bash
pnpm docker:up     # PostgreSQL起動
pnpm docker:down   # 停止
pnpm docker:logs   # ログ表示
```

### マイグレーション

```bash
pnpm cms:migrate           # マイグレーション実行
pnpm cms:migrate:create    # 新規マイグレーション作成
pnpm cms:migrate:status    # 状態確認
```

## ドキュメント

- [セットアップガイド](docs/SETUP.md)
- [API仕様書](docs/api/)

## ライセンス

このプロジェクトは東京電機大学ソフトウェア研究部によって管理されています。
