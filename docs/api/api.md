# コンテンツ管理スキーマ

このドキュメントは、TDU SRC Websiteで管理するコンテンツのスキーマ定義です。

## API全体図

以下の図はAPIドキュメントに基づくデータ構造を示しています。

### ER図（エンティティ関連図）

#### トップページ・共通

```mermaid
erDiagram
    Catchphrase ||--o{ Segment : "segments"
    AboutSection ||--o{ ImageCard : "images"

    TopVideo {
        video video
        logoEnabled boolean
    }

    Catchphrase {
        segments Segment[]
    }

    Segment {
        text string
        highlighted boolean
    }

    AboutSection {
        title string
        subtitle string
        description string
    }

    ImageCard {
        image image
        alt string
    }
```

#### Team

```mermaid
erDiagram
    TeamSection ||--o{ TeamCard : "teams"
    TeamCard }o--|| Team : "teamName"
    Team ||--o{ ImageCard : "about"
    Team ||--o{ SoftwareItem : "software"
    Team ||--o{ GalleryItem : "gallery"

    TeamSection {
        title string
        subtitle string
        description string
    }

    TeamCard {
        teamName TeamType
        image image
        alt string
        description string
    }

    Team {
        image image
        subtitle string
        description markdown
    }

    SoftwareItem {
        name string
        description string
        icon image
    }

    GalleryItem {
        type image_video_sound
        media upload
        alt string
    }
```

#### News

```mermaid
erDiagram
    NewsItem {
        id string PK
        title string
        date date
        categories CategoryType
        summary string
        thumbnail image
        content markdown
    }
```

#### ソフキャラ

```mermaid
erDiagram
    Concepts ||--o{ ConceptCard : "concepts"
    Character ||--o{ Alternate : "alternates"
    Character ||--o{ Relation : "relations"
    Relation }o--|| SofkenTown : "sofkenTownId"
    SofkenTown ||--o{ Character : "relatedCharacters"

    Concepts {
        title string
        subtitle string
    }

    ConceptCard {
        image image
        title string
    }

    Character {
        id number PK
        url string UK
        jpName string
        fullbodyImage image
    }

    Alternate {
        id string
        alternateName string
    }

    Relation {
        sofkenTownId string FK
        description string
    }

    SofkenTown {
        id string PK
        name string
    }

    Guideline {
        title string
        content markdown
    }
```

### ページ構成

```mermaid
flowchart TB
    ROOT["/ トップ"]
    ROOT --> TEAM["/team"]
    ROOT --> NEWS["/news"]
    ROOT --> SOFCHARA["/sofchara"]

    TEAM --> TEAM_DETAIL["/team/[teamName]"]
    NEWS --> NEWS_DETAIL["/news/[id]"]
    SOFCHARA --> CHARA["/sofchara/[url]"]
    SOFCHARA --> GUIDELINE["/sofchara/guideline"]
    SOFCHARA --> SOFKENTOWN["/sofchara/sofkentown"]
```

## ドキュメント一覧

| ドキュメント | 対象 |
|-------------|------|
| [0-general-api.md](./0-general-api.md) | 共通（SNSリンク等） |
| [1-top-page-api.md](./1-top-page-api.md) | トップページ |
| [3-team-page-api.md](./3-team-page-api.md) | Teamページ・班詳細 |
| [4-news-page-api.md](./4-news-page-api.md) | Newsページ |
| [5-characters-page-api.md](./5-characters-page-api.md) | ソフキャラ・キャラクター |
