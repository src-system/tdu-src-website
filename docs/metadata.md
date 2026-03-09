# メタデータ設定

サイトのSEO・OGP設定に関するドキュメントです。

## 概要

Next.js の Metadata API を使用してサイト全体のメタデータを設定しています。

## 設定ファイル

| ファイル | 役割 |
|---------|------|
| `apps/web/src/app/layout.tsx` | ルートレイアウト・グローバルメタデータ |

## 現在の設定

### 基本メタデータ

```typescript
export const metadata: Metadata = {
  title: '東京電機大学 ソフトウェア研究部',
  description: '東京電機大学ソフトウェア研究部のホームページです。当部活では、ゲームプログラミング班、Webアプリ班、サウンド班、2D班、3D班、デザイン班が活動しています。',
  keywords: [
    'ソフトウェア研究部',
    'パソコン部',
    'SRC',
    'ソフ研',
    '電大',
    '東京電機大学',
    'TDU',
    '学術研究部会',
    'PC',
    'ゲーム',
    '部活',
    'ソフきゃら',
    'ソフ研',
    'ソフ研ホームページ',
    '大学',
  ],
  icons: {
    icon: '/fabicon.png',
  },
}
```

### Open Graph (OGP)

SNSでシェアされた際の表示設定です。

```typescript
openGraph: {
  title: 'ソフトウェア研究部｜東京電機大学',
  description: '東京電機大学ソフトウェア研究部のホームページです。当部活では、ゲームプログラミング班、Webアプリ班、サウンド班、2D班、3D班、デザイン班が活動しています。',
  type: 'website',
  locale: 'ja_JP',
}
```

### Twitter Card

Twitter/Xでシェアされた際の表示設定です。

```typescript
twitter: {
  card: 'summary_large_image',
  title: 'ソフトウェア研究部｜東京電機大学',
  description: '東京電機大学ソフトウェア研究部のホームページです。当部活では、ゲームプログラミング班、Webアプリ班、サウンド班、2D班、3D班、デザイン班が活動しています。',
}
```

## フィールド説明

| フィールド | 説明 | 出力先 |
|-----------|------|--------|
| title | ページタイトル | `<title>`, OGP, Twitter |
| description | ページ説明 | `<meta name="description">`, OGP, Twitter |
| keywords | 検索キーワード | `<meta name="keywords">` |
| icons.icon | ファビコン | `<link rel="icon">` |
| openGraph.type | OGPタイプ | `<meta property="og:type">` |
| openGraph.locale | 言語設定 | `<meta property="og:locale">` |
| twitter.card | Twitterカード形式 | `<meta name="twitter:card">` |

## ファビコン

| ファイル | パス | 用途 |
|---------|------|------|
| fabicon.png | `/public/fabicon.png` | ブラウザタブアイコン |

## 今後の拡張

### ページ別メタデータ

各ページで `generateMetadata` を使用することで、ページ固有のメタデータを設定できます。

```typescript
// 例: apps/web/src/app/news/[newsId]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const news = await getNewsItemFromApi(params.newsId)

  return {
    title: `${news.title} | ソフトウェア研究部`,
    description: news.summary,
    openGraph: {
      title: news.title,
      description: news.summary,
      images: [news.imagePath],
    },
  }
}
```

### OGP画像

OGP画像を設定する場合は以下を追加します。

```typescript
openGraph: {
  // ...
  images: [
    {
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'ソフトウェア研究部',
    },
  ],
}
```

**推奨サイズ:** 1200x630px（Facebook/Twitter共通）

## HTML出力例

上記の設定により、以下のようなHTMLが出力されます。

```html
<head>
  <title>東京電機大学 ソフトウェア研究部</title>
  <meta name="description" content="東京電機大学ソフトウェア研究部のホームページです。..." />
  <meta name="keywords" content="ソフトウェア研究部,パソコン部,SRC,..." />
  <link rel="icon" href="/fabicon.png" />

  <!-- Open Graph -->
  <meta property="og:title" content="ソフトウェア研究部｜東京電機大学" />
  <meta property="og:description" content="東京電機大学ソフトウェア研究部のホームページです。..." />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="ja_JP" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="ソフトウェア研究部｜東京電機大学" />
  <meta name="twitter:description" content="東京電機大学ソフトウェア研究部のホームページです。..." />
</head>
```

## 参考

- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
