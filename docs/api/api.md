# コンテンツ管理スキーマ

このドキュメントは、TDU SRC Websiteで管理するコンテンツのスキーマ定義です。

## API全体図

以下の図はAPIドキュメントに基づくデータ構造を示しています。

### ER図（エンティティ関連図）

#### サイト設定・共通

```mermaid
erDiagram
    SiteSettings {
        email string
        githubUrl string
        location string
    }
```

#### トップページ

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

#### Aboutページ

```mermaid
erDiagram
    AboutPage ||--|| PageHeader : "pageHeader"
    AboutPage ||--|| AboutSection : "aboutSection"
    AboutPage ||--o{ ActivityItem : "activitySection"
    AboutPage ||--o{ HistoryItem : "historySection"

    PageHeader {
        image image
        alt string
        title string
    }

    AboutSection {
        title string
        subtitle string
        description richText
    }

    ActivityItem {
        title string
        description string
        image image
    }

    HistoryItem {
        year number
        month number
        title string
        description string
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
    Team ||--o| LeaderInterview : "leaderInterview"

    TeamSection {
        title string
        subtitle string
        description string
    }

    TeamCard {
        teamName TeamType
        image image
        description string
        activityLabels string[]
    }

    Team {
        image image
        subtitle string
        description richText
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
        thumbnail image
        title string
        relatedLinks link[]
    }

    LeaderInterview {
        name string
        image image
        body string
        qa QA[]
    }
```

#### News

```mermaid
erDiagram
    NewsItem {
        id string PK
        title string
        date date
        category CategoryType
        subcategory SubCategoryType
        summary string
        thumbnail image
        content richText
    }
```

#### ソフキャラ

```mermaid
erDiagram
    Concepts ||--o{ ConceptCard : "concepts"
    Character ||--o{ Alternate : "alternates"
    Character ||--o{ Relation : "relations"
    Relation }o--|| SofkenTown : "sofkentown"
    SofkenTown ||--o{ Character : "relatedCharacters"

    Concepts {
        title string
        subtitle string
    }

    ConceptCard {
        image image
        title string
        showButton boolean
        buttonHref string
    }

    Character {
        order number
        url string UK
        jpName string
        enName string
        fullbodyImage image
        portraitImage image
        author string
        profile Profile
        rules Rules
    }

    Alternate {
        alternateName string
        author string
        fullbodyImage image
    }

    Relation {
        sofkentown ref FK
        description string
    }

    SofkenTown {
        id string PK
        url string UK
        order number
        name string
        image image
        description richText
    }

    Guideline {
        title string
        subtitle string
        content richText
    }
```

### ページ構成

```mermaid
flowchart TB
    ROOT["/ トップ"]
    ROOT --> ABOUT["/about"]
    ROOT --> TEAM["/team"]
    ROOT --> NEWS["/news"]
    ROOT --> SOFCHARA["/sofchara"]

    TEAM --> TEAM_DETAIL["/team/[teamName]"]
    NEWS --> NEWS_DETAIL["/news/[newsId]"]
    SOFCHARA --> CHARA["/sofchara/[characterName]"]
    SOFCHARA --> GUIDELINE["/sofchara/guideline"]
    SOFCHARA --> SOFKENTOWN["/sofchara/sofkentown"]
    SOFKENTOWN --> SOFKENTOWN_DETAIL["/sofchara/sofkentown/[townId]"]
```

## ドキュメント一覧

| ドキュメント | 対象 |
|-------------|------|
| [0-general-api.md](./0-general-api.md) | サイト設定・ソフケンタウン |
| [1-top-page-api.md](./1-top-page-api.md) | トップページ |
| [2-about-page-api.md](./2-about-page-api.md) | Aboutページ |
| [3-team-page-api.md](./3-team-page-api.md) | Teamページ・班詳細 |
| [4-news-page-api.md](./4-news-page-api.md) | Newsページ |
| [5-characters-page-api.md](./5-characters-page-api.md) | ソフキャラ・キャラクター・ガイドライン |
