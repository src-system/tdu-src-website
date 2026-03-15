# tdu-src.com 切り替え手順書

旧HTML静的サイト ↔ 新Next.jsサイトを素早く切り替えるための手順書。

---

## 現在の設定ファイル一覧

| ファイル | 説明 |
|---------|------|
| `deploy/nginx/tdu-src.com.conf` | **新サイト用**（Next.js / Docker） |
| `deploy/nginx/tdu-src.com.old.conf` | **旧サイト用**（静的HTML） |
| `deploy/nginx/new.tdu-src.com.conf` | **ステージング環境**（new.tdu-src.com → Next.js） |
| `deploy/nginx/cms.tdu-src.com.conf` | **CMS管理画面**（cms.tdu-src.com → Payload CMS） |

## ステージング環境（new.tdu-src.com）

本番切り替え前に新サイトを `new.tdu-src.com` で確認できる構成。

| URL | 内容 |
|-----|------|
| https://tdu-src.com | **旧サイト**（静的HTML） |
| https://new.tdu-src.com | **新サイト**（Next.js / 確認用） |
| https://cms.tdu-src.com/admin | **CMS管理画面** |

### ステージング環境の初回セットアップ

1. ConoHaのDNS管理で `new.tdu-src.com` のAレコードを `160.251.202.23` に追加
2. 以下を実行：

```bash
sudo bash ~/tdu-src-website/deploy/setup-new-subdomain.sh
```

---

## 旧サイトに戻す（静的HTML）

```bash
sudo cp ~/tdu-src-website/deploy/nginx/tdu-src.com.old.conf \
        /etc/nginx/sites-available/tdu-src.com.conf

sudo nginx -t && sudo nginx -s reload
```

確認：
```bash
curl -s -o /dev/null -w "%{http_code}" https://tdu-src.com/
# → 200 が返れば旧サイト表示中
```

---

## 新サイトに切り替える（Next.js）

### 1. Dockerコンテナが起動しているか確認

```bash
sudo docker ps | grep tdu-src-web
```

起動していない場合：
```bash
cd ~/tdu-src-website
sudo docker compose up -d
```

### 2. nginx設定を新サイト用に切り替え

```bash
sudo cp ~/tdu-src-website/deploy/nginx/tdu-src.com.conf \
        /etc/nginx/sites-available/tdu-src.com.conf

sudo nginx -t && sudo nginx -s reload
```

確認：
```bash
curl -s -o /dev/null -w "%{http_code}" https://tdu-src.com/
# → 307（コンテンツ未登録）または 200（コンテンツあり）が返れば新サイト表示中
```

---

## 各サイトの仕組み

### 旧サイト（静的HTML）

```
tdu-src.com → Nginx → /home/sofuken/public_html/tdu-src.com/public/
```

- 静的HTMLファイルをnginxが直接配信
- Dockerコンテナ不要
- ファイル: `/home/sofuken/public_html/tdu-src.com/public/`

### 新サイト（Next.js）

```
tdu-src.com → Nginx → localhost:3000 (Docker: tdu-src-web)
                                ↓
                       localhost:3001 (Docker: tdu-src-cms) → PostgreSQL
```

- Dockerコンテナ3つが必要（web, cms, postgres）
- CMS管理画面: https://cms.tdu-src.com/admin
- コンテンツ未登録の場合はエラーページが表示される

---

## 新サイトのDockerコンテナ管理

```bash
# 状態確認
sudo docker ps

# 起動
cd ~/tdu-src-website && sudo docker compose up -d

# 停止（旧サイト運用中は停止してもよい）
sudo docker compose down

# ログ確認
sudo docker logs tdu-src-web --tail 50
sudo docker logs tdu-src-cms --tail 50
```

---

## 注意事項

- nginx設定を切り替えるだけでサイトが切り替わる（DNS変更不要）
- `/project/` 配下のプロジェクトページは旧・新どちらの設定でも維持される
- SSL証明書はどちらの設定でも共通して使用される
- 新サイトに切り替える前にDockerコンテナが起動していることを確認すること
