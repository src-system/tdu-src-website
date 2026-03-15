#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "=== [1/4] nginx設定ファイルを配置 ==="
cp "$SCRIPT_DIR/nginx/tdu-src.com.conf" /etc/nginx/sites-available/tdu-src.com.conf
echo "tdu-src.com.conf を更新しました"

cp "$SCRIPT_DIR/nginx/cms.tdu-src.com.conf" /etc/nginx/sites-available/cms.tdu-src.com.conf
echo "cms.tdu-src.com.conf を作成しました"

echo ""
echo "=== [2/4] cms.tdu-src.com を有効化 ==="
ln -sf /etc/nginx/sites-available/cms.tdu-src.com.conf /etc/nginx/sites-enabled/cms.tdu-src.com.conf
echo "シンボリックリンクを作成しました"

echo ""
echo "=== [3/4] nginx 設定テスト・リロード ==="
nginx -t
systemctl reload nginx
echo "nginx をリロードしました"

echo ""
echo "=== [4/4] cms.tdu-src.com の SSL 証明書取得 ==="
certbot --nginx -d cms.tdu-src.com --non-interactive --agree-tos --redirect
echo "SSL 証明書を取得しました"

echo ""
echo "=== 完了 ==="
echo "  https://tdu-src.com           - フロントエンド"
echo "  https://cms.tdu-src.com/admin - CMS管理画面"
