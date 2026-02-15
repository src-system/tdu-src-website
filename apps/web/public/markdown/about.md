# 見出し1 (H1)

## 見出し2 (H2)

### 見出し3 (H3)

#### 見出し4 (H4)

##### 見出し5 (H5)

###### 見出し6 (H6)

---

## テキスト装飾

これは通常のテキストです。

**太字テキスト** と __これも太字__ です。

*斜体テキスト* と _これも斜体_ です。

***太字かつ斜体*** のテキストです。

~~取り消し線~~ のテキストです。

---

## リンク

[通常のリンク](https://example.com)

[タイトル付きリンク](https://example.com "リンクのタイトル")

自動リンク: https://example.com

メールリンク: <example@example.com>

[参照リンク][ref1]

[ref1]: https://example.com "参照リンクの例"

---

## リスト

### 順序なしリスト

- アイテム1
- アイテム2
  - ネストしたアイテム2-1
  - ネストしたアイテム2-2
    - さらにネスト
- アイテム3

### 順序付きリスト

1. 最初のアイテム
2. 2番目のアイテム
   1. ネストしたアイテム
   2. ネストしたアイテム
3. 3番目のアイテム

### タスクリスト (GFM)

- [x] 完了したタスク
- [x] これも完了
- [ ] 未完了のタスク
- [ ] もう一つの未完了タスク

---

## 引用

> これは引用ブロックです。
> 複数行にまたがることができます。

> ネストした引用
>
> > 内側の引用
> >
> > > さらに内側の引用

---

## コードブロック

### インラインコード

これは `インラインコード` の例です。

### コードブロック（言語指定なし）

```
function hello() {
  console.log("Hello, World!");
}
```

### JavaScript

```javascript
const greeting = (name) => {
  return `Hello, ${name}!`;
};

// アロー関数の使用例
const result = greeting("World");
console.log(result);
```

### TypeScript

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const getUser = async (id: number): Promise<User> => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
};
```

### Python

```python
def fibonacci(n: int) -> list[int]:
    """フィボナッチ数列を生成する"""
    if n <= 0:
        return []
    elif n == 1:
        return [0]

    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    return fib

print(fibonacci(10))
```

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>サンプルページ</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>これはサンプルです。</p>
</body>
</html>
```

### CSS

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card {
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}
```

### JSON

```json
{
  "name": "ソフトウェア研究部",
  "founded": 1990,
  "members": 50,
  "activities": [
    "ゲーム制作",
    "Web開発",
    "競技プログラミング"
  ],
  "active": true
}
```

### Bash

```bash
#!/bin/bash

echo "ディレクトリ一覧:"
ls -la

# ファイルの検索
find . -name "*.md" -type f | while read file; do
  echo "Found: $file"
done
```

---

## テーブル

### 基本的なテーブル

| 名前 | 役職 | 所属 |
|------|------|------|
| 田中太郎 | 部長 | 情報工学科 |
| 山田花子 | 副部長 | メディア学科 |
| 佐藤次郎 | 会計 | 電子工学科 |

### 配置指定テーブル

| 左揃え | 中央揃え | 右揃え |
|:-------|:--------:|-------:|
| テキスト | テキスト | テキスト |
| 左 | 中央 | 右 |
| ABC | ABC | ABC |

### 複雑なテーブル

| 機能 | 説明 | サポート状況 |
|:-----|:-----|:------------:|
| **太字** | テキストを太字にする | OK |
| *斜体* | テキストを斜体にする | OK |
| `コード` | インラインコード | OK |
| [リンク](#) | ハイパーリンク | OK |

---

## 画像

### 通常の画像

![代替テキスト](/images/about.png "画像のタイトル")

### リンク付き画像

[![代替テキスト](/images/about.png)](https://example.com)

---

## 水平線

3種類の書き方:

---

***

___

---

## 脚注 (GFM)

これは脚注付きのテキストです[^1]。

複数の脚注も使えます[^2]。

長い脚注の例[^longnote]。

[^1]: これが脚注の内容です。
[^2]: 2番目の脚注です。
[^longnote]: 長い脚注は複数の段落を含むことができます。

    インデントすることで段落を追加できます。

---

## 折りたたみ (HTML)

<details>
<summary>クリックして展開</summary>

ここに隠れたコンテンツがあります。

- リスト項目1
- リスト項目2
- リスト項目3

```javascript
console.log("折りたたみ内のコード");
```

</details>

---

## エスケープ

特殊文字をエスケープ:

\*アスタリスク\*

\`バッククォート\`

\# ハッシュ

\[ブラケット\]

---

## HTML要素

<div style="background-color: #f0f0f0; padding: 1rem; border-radius: 0.5rem;">
  <strong>HTMLブロック</strong>
  <p>Markdownファイル内でHTMLを直接使用できます。</p>
</div>

<kbd>Ctrl</kbd> + <kbd>C</kbd> でコピー

<mark>ハイライトされたテキスト</mark>

<abbr title="HyperText Markup Language">HTML</abbr>は略語です。

上付き: x<sup>2</sup> + y<sup>2</sup> = z<sup>2</sup>

下付き: H<sub>2</sub>O

---

## 改行

行末にスペース2つで
改行できます。

または、バックスラッシュで\
改行することもできます。

---

## オートリンク拡張 (GFM)

- URL: https://www.example.com
- メール: example@example.com
- www付き: www.example.com

---

これでMarkdownの主要な機能をほぼすべてカバーしました。
