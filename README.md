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

| 設定 | 値 |
|-----|-----|
| 再検証間隔 | 5分（全ページ統一） |

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

## 本番デプロイ

### 本番環境

| 項目 | 内容 |
|------|------|
| サーバー | ConoHa VPS (Ubuntu) |
| フロントエンド | https://tdu-src.com |
| CMS管理画面 | https://cms.tdu-src.com/admin |
| SSL | Let's Encrypt (Certbot) |
| リバースプロキシ | Nginx |
| コンテナ管理 | Docker Compose |

### 初回デプロイ手順

#### 1. 前提ソフトウェアのインストール

```bash
# nvm + Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.bashrc
nvm install 22
nvm use 22

# pnpm
npm install -g pnpm

# Docker (公式ドキュメントに従う)
# Docker Compose v2 も必須
```

#### 2. リポジトリのセットアップ

```bash
git clone <repo-url> ~/tdu-src-website
cd ~/tdu-src-website
pnpm install
```

#### 3. 環境変数の設定

`.env` を作成・編集する：

```bash
cp .env.example .env
```

```env
# 外部公開URL（クライアントサイド用）
NEXT_PUBLIC_CMS_URL=https://cms.tdu-src.com

# DBポート（5432が使用中の場合は別ポートを指定）
POSTGRES_PORT=5433

# ホスト側からマイグレーションを実行するためのDB接続URL
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/tdu_src

# Payload CMS シークレット（必ず変更すること）
PAYLOAD_SECRET=<ランダムな文字列>
```

#### 4. Dockerコンテナのビルドと起動

```bash
sudo docker compose up -d --build
```

起動確認：

```bash
sudo docker ps
sudo docker logs tdu-src-web --tail 30
sudo docker logs tdu-src-cms --tail 30
```

#### 5. DBマイグレーションの実行

コンテナ起動後、ホスト側から初回マイグレーションを実行する：

```bash
pnpm cms:migrate:create
pnpm cms:migrate
```

> **注意**: `pnpm cms:migrate` はホスト側の Node.js + TypeScript 環境から実行する。
> `.env` の `DATABASE_URL` がホスト側から接続できるポートを向いていることを確認すること。

#### 6. Nginxの設定

```bash
# 設定ファイルをコピー
sudo cp deploy/nginx/tdu-src.com.conf /etc/nginx/sites-available/tdu-src.com.conf
sudo cp deploy/nginx/cms.tdu-src.com.conf /etc/nginx/sites-available/cms.tdu-src.com.conf

# シンボリックリンク（既存でない場合）
sudo ln -sf /etc/nginx/sites-available/cms.tdu-src.com.conf /etc/nginx/sites-enabled/

# 設定テストとリロード
sudo nginx -t && sudo nginx -s reload
```

#### 7. SSL証明書の取得（cms.tdu-src.com）

事前に `cms.tdu-src.com` のDNS AレコードをサーバーのパブリックIPに設定しておくこと。

```bash
sudo certbot --nginx -d cms.tdu-src.com
```

### 再デプロイ手順（コード変更時）

```bash
cd ~/tdu-src-website
git pull
sudo docker compose up -d --build
```

スキーマ変更があった場合はマイグレーションも実行：

```bash
pnpm cms:migrate:create
pnpm cms:migrate
```

### コンテナ管理コマンド

```bash
# 状態確認
sudo docker ps

# ログ確認
sudo docker logs tdu-src-web --tail 50
sudo docker logs tdu-src-cms --tail 50
sudo docker logs tdu-src-postgres --tail 50

# 再起動
sudo docker compose restart

# 停止
sudo docker compose down
```

### トラブルシューティング

#### 502 Bad Gateway（nginx側）

- `upstream sent too big header` の場合：nginx設定の `location /` ブロックに以下が含まれているか確認
  ```nginx
  proxy_buffer_size 128k;
  proxy_buffers 4 256k;
  proxy_busy_buffers_size 256k;
  ```
  含まれていなければ `deploy/nginx/tdu-src.com.conf` を再コピーしてnginxをリロード

- `upstream timed out` の場合：コンテナが起動中か `sudo docker ps` で確認

#### DBマイグレーションエラー

- `relation "xxx" does not exist`：マイグレーションが未実行。`pnpm cms:migrate` を実行
- ポート接続エラー：`.env` の `DATABASE_URL` のポートが `POSTGRES_PORT` と一致しているか確認

#### Dockerのポート競合

```bash
# 使用中のポートを確認
ss -tlnp | grep <port>
```

`.env` の `POSTGRES_PORT` を変更して `docker compose down && docker compose up -d --build`

## ドキュメント

- [API仕様書](docs/api/)

## ライセンス

このプロジェクトは東京電機大学ソフトウェア研究部によって管理されています。
