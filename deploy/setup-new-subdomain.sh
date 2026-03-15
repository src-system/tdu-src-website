#!/bin/bash
set -e

echo "=== new.tdu-src.com セットアップ ==="

# nginx設定をコピー
echo "[1/3] nginx設定をコピー..."
sudo cp /home/sofuken/tdu-src-website/deploy/nginx/new.tdu-src.com.conf \
        /etc/nginx/sites-available/new.tdu-src.com.conf

# シンボリックリンク作成
sudo ln -sf /etc/nginx/sites-available/new.tdu-src.com.conf \
            /etc/nginx/sites-enabled/new.tdu-src.com.conf

# nginx設定テスト・リロード
echo "[2/3] nginx設定テスト・リロード..."
sudo nginx -t && sudo nginx -s reload

# SSL証明書取得
echo "[3/3] SSL証明書取得..."
echo "※ 事前に ConoHa DNS で new.tdu-src.com の A レコードを 160.251.202.23 に設定してください"
read -p "DNS設定済みですか？ (y/n): " yn
if [ "$yn" = "y" ]; then
  sudo certbot --nginx -d new.tdu-src.com
  echo "✅ セットアップ完了"
  echo "   https://new.tdu-src.com にアクセスして確認してください"
else
  echo "⚠️  DNS設定後に以下を実行してください:"
  echo "   sudo certbot --nginx -d new.tdu-src.com"
fi
