#!/bin/bash
# tdu-src.com 本番デプロイスクリプト
# 実行方法: sudo bash deploy/deploy.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "=== [1/6] sofuken を docker グループに追加 ==="
usermod -aG docker sofuken
echo "sofuken を docker グループに追加しました。"

echo ""
echo "=== [2/6] Docker イメージをビルドして起動 ==="
cd "$PROJECT_DIR"
docker compose up -d --build
echo "Docker コンテナが起動しました。"

echo ""
echo "=== [3/6] postgres の起動を待機 ==="
echo "PostgreSQL のヘルスチェックを待っています..."
sleep 10

echo ""
echo "=== [4/6] DB マイグレーション実行 ==="
docker compose exec -T cms pnpm payload migrate || echo "マイグレーション: 既に最新の状態か、初回は不要な可能性があります"

echo ""
echo "=== [5/6] nginx 設定ファイルを配置 ==="
NGINX_AVAILABLE="/etc/nginx/sites-available"
NGINX_ENABLED="/etc/nginx/sites-enabled"

# tdu-src.com.conf を更新
cp "$SCRIPT_DIR/nginx/tdu-src.com.conf" "$NGINX_AVAILABLE/tdu-src.com.conf"
echo "tdu-src.com.conf を更新しました。"

# cms.tdu-src.com.conf を新規作成・有効化
cp "$SCRIPT_DIR/nginx/cms.tdu-src.com.conf" "$NGINX_AVAILABLE/cms.tdu-src.com.conf"
if [ ! -L "$NGINX_ENABLED/cms.tdu-src.com.conf" ]; then
  ln -s "$NGINX_AVAILABLE/cms.tdu-src.com.conf" "$NGINX_ENABLED/cms.tdu-src.com.conf"
fi
echo "cms.tdu-src.com.conf を作成・有効化しました。"

echo ""
echo "=== nginx 設定テスト ==="
nginx -t

echo ""
echo "=== nginx リロード ==="
systemctl reload nginx
echo "nginx をリロードしました。"

echo ""
echo "=== [6/6] cms.tdu-src.com の SSL 証明書を取得 ==="
certbot --nginx -d cms.tdu-src.com --non-interactive --agree-tos --redirect
echo "SSL 証明書を取得しました。"

echo ""
echo "=== デプロイ完了 ==="
echo ""
echo "動作確認:"
echo "  https://tdu-src.com       - フロントエンド"
echo "  https://cms.tdu-src.com/admin - CMS管理画面（初回: 管理者アカウント作成が必要）"
