// Strapi API クライアント（将来的にStrapiから取得）

// const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";

// 仮のインラインデータ（Strapi導入後は削除）
const mockData = {
  about: {
    title: "ABOUT",
    subtitle: "活動内容",
    description:
      "こんにちは。\n\n東京電機大学 東京千住キャンパス学術研究部会所属のソフトウェア研究部です。 「ソフトウェア研究部」は総合創作系サークルで、「ソフ研」という愛称で呼ばれています。\nソフ研はとても伝統があるサークルで、 その歴史は50年以上にもなります。",
  },
  team: {
    title: "TEAM",
    subtitle: "ソフトウェア研究部で活動している班",
    description:
      "ソフトウェア研究部は６つの班で構成されており\nそれぞれの班では異なる活動を行っています。\nそれぞれの班紹介はこちらからご覧ください。",
  },
  news: {
    title: "NEWS",
    subtitle: "新着情報",
  },
  characters: {
    title: "CHARACTERS",
    subtitle: "ソフきゃら！",
  },
};

export type ContentBlockData = {
  title: string;
  subtitle: string;
  description?: string;
};

export async function getContentBlock(key: keyof typeof mockData): Promise<ContentBlockData> {
  // TODO: Strapi導入後は以下のようにAPIから取得
  // const res = await fetch(`${STRAPI_URL}/api/${key}`);
  // return res.json();

  return mockData[key];
}

export async function getAllContentBlocks(): Promise<Record<string, ContentBlockData>> {
  // TODO: Strapi導入後はAPIから一括取得
  return mockData;
}

// ニュースカテゴリー定義
export const NEWS_CATEGORIES = [
  { id: "all", label: "すべて" },
  { id: "お知らせ", label: "お知らせ" },
  { id: "イベント", label: "イベント" },
  { id: "活動報告", label: "活動報告" },
  { id: "作品紹介", label: "作品紹介" },
  { id: "メディア", label: "メディア" },
] as const;

// ニュースデータ
export const NEWS_DATA = [
  {
    id: "1",
    date: "2025/01/06",
    title: "ウェブサイトをリニューアルしました",
    imagePath: "/images/example/1.jpg",
    category: "お知らせ",
    content:
      "ソフトウェア研究部のウェブサイトをリニューアルしました。新しいデザインでより見やすく、情報にアクセスしやすくなりました。今後も定期的に更新していきますので、ぜひご覧ください。",
  },
  {
    id: "2",
    date: "2025/01/04",
    title: "コミックマーケット105に参加しました",
    imagePath: "/images/example/2.jpg",
    category: "イベント",
    content:
      "2024年12月30日・31日に開催されたコミックマーケット105に参加しました。サウンド班によるオリジナル楽曲CD、2D班による画集などを頒布し、多くの方にお越しいただきました。",
  },
  {
    id: "3",
    date: "2024/12/20",
    title: "年末活動報告",
    imagePath: "/images/example/3.jpg",
    category: "活動報告",
    content:
      "2024年の活動を振り返ります。今年は学園祭での作品展示、コミケへの参加、各種ゲームジャムへの挑戦など、多くの活動を行いました。",
  },
  {
    id: "4",
    date: "2024/12/15",
    title: "冬合宿を開催しました",
    imagePath: "/images/example/1.jpg",
    category: "イベント",
    content:
      "12月14日〜15日にかけて冬合宿を開催しました。各班の進捗共有や親睦を深めるイベントを行いました。",
  },
  {
    id: "5",
    date: "2024/12/01",
    title: "新作ゲーム「ダンジョンクエスト」公開",
    imagePath: "/images/example/2.jpg",
    category: "作品紹介",
    content:
      "ゲームプログラミング班が制作した新作ゲーム「ダンジョンクエスト」を公開しました。ぜひプレイしてみてください。",
  },
  {
    id: "6",
    date: "2024/11/25",
    title: "旭祭2024出展レポート",
    imagePath: "/images/example/3.jpg",
    category: "活動報告",
    content:
      "11月23日〜24日に開催された旭祭2024に出展しました。多くの方にご来場いただきありがとうございました。",
  },
  {
    id: "7",
    date: "2024/11/20",
    title: "新入部員募集のお知らせ",
    imagePath: "/images/example/1.jpg",
    category: "お知らせ",
    content:
      "ソフトウェア研究部では新入部員を随時募集しています。プログラミング未経験でも大歓迎です！",
  },
  {
    id: "8",
    date: "2024/11/15",
    title: "学内プログラミングコンテスト優勝",
    imagePath: "/images/example/2.jpg",
    category: "メディア",
    content:
      "学内プログラミングコンテストで、ソフ研メンバーが見事優勝しました。おめでとうございます！",
  },
  {
    id: "9",
    date: "2024/11/10",
    title: "サウンド班新曲「Starlight」リリース",
    imagePath: "/images/example/3.jpg",
    category: "作品紹介",
    content: "サウンド班が制作した新曲「Starlight」をYouTubeで公開しました。ぜひお聴きください。",
  },
  {
    id: "10",
    date: "2024/11/05",
    title: "旭祭準備進行中",
    imagePath: "/images/example/1.jpg",
    category: "活動報告",
    content: "旭祭に向けて各班で準備が進んでいます。今年も様々な作品を展示予定です。",
  },
  {
    id: "11",
    date: "2024/10/30",
    title: "ハロウィンイベント開催",
    imagePath: "/images/example/2.jpg",
    category: "イベント",
    content:
      "部室でハロウィンイベントを開催しました。仮装コンテストやゲーム大会で盛り上がりました。",
  },
  {
    id: "12",
    date: "2024/10/25",
    title: "3D班モデリング作品集公開",
    imagePath: "/images/example/3.jpg",
    category: "作品紹介",
    content: "3D班が制作したモデリング作品集をWebサイトで公開しました。力作揃いです。",
  },
  {
    id: "13",
    date: "2024/10/20",
    title: "技術勉強会「React入門」開催",
    imagePath: "/images/example/1.jpg",
    category: "活動報告",
    content: "Webアプリ班主催の技術勉強会「React入門」を開催しました。多くの参加者が集まりました。",
  },
  {
    id: "14",
    date: "2024/10/15",
    title: "ゲームジャム参加報告",
    imagePath: "/images/example/2.jpg",
    category: "活動報告",
    content: "10月13日〜15日に開催されたゲームジャムに参加し、48時間でゲームを制作しました。",
  },
  {
    id: "15",
    date: "2024/10/10",
    title: "部のロゴをリニューアルしました",
    imagePath: "/images/example/3.jpg",
    category: "お知らせ",
    content: "デザイン班が制作した新しいロゴを公開しました。より現代的なデザインになりました。",
  },
  {
    id: "16",
    date: "2024/10/05",
    title: "2D班イラスト展示会",
    imagePath: "/images/example/1.jpg",
    category: "イベント",
    content: "2D班によるイラスト展示会を学内で開催しました。多くの方にご覧いただきました。",
  },
  {
    id: "17",
    date: "2024/09/30",
    title: "後期活動開始のお知らせ",
    imagePath: "/images/example/2.jpg",
    category: "お知らせ",
    content: "後期の活動が開始しました。新たなプロジェクトも始動します。",
  },
  {
    id: "18",
    date: "2024/09/25",
    title: "夏合宿レポート公開",
    imagePath: "/images/example/3.jpg",
    category: "活動報告",
    content: "8月に開催した夏合宿のレポートを公開しました。充実した3日間でした。",
  },
  {
    id: "19",
    date: "2024/09/20",
    title: "新作アプリ「タスク管理くん」リリース",
    imagePath: "/images/example/1.jpg",
    category: "作品紹介",
    content: "Webアプリ班が制作したタスク管理アプリをリリースしました。無料で利用できます。",
  },
  {
    id: "20",
    date: "2024/09/15",
    title: "OB・OG交流会開催",
    imagePath: "/images/example/2.jpg",
    category: "イベント",
    content: "卒業生との交流会を開催しました。現役生にとって貴重な機会となりました。",
  },
  {
    id: "21",
    date: "2024/09/10",
    title: "テレビ取材を受けました",
    imagePath: "/images/example/3.jpg",
    category: "メディア",
    content: "地元テレビ局の取材を受け、部の活動が紹介されました。",
  },
  {
    id: "22",
    date: "2024/09/05",
    title: "Unity勉強会を開催しました",
    imagePath: "/images/example/1.jpg",
    category: "活動報告",
    content:
      "ゲームプログラミング班主催のUnity勉強会を開催しました。初心者向けの内容で好評でした。",
  },
  {
    id: "23",
    date: "2024/08/30",
    title: "コミケ106サークル当選",
    imagePath: "/images/example/2.jpg",
    category: "お知らせ",
    content: "コミックマーケット106にサークル参加が決定しました。新作を頒布予定です。",
  },
  {
    id: "24",
    date: "2024/08/25",
    title: "夏合宿を開催します",
    imagePath: "/images/example/3.jpg",
    category: "イベント",
    content: "8月28日〜30日にかけて夏合宿を開催します。集中開発期間として活用します。",
  },
  {
    id: "25",
    date: "2024/08/20",
    title: "新キャラクター「ニーヴァ」公開",
    imagePath: "/images/example/1.jpg",
    category: "作品紹介",
    content: "ソフきゃらシリーズの新キャラクター「ニーヴァ」を公開しました。",
  },
];

// チームデータ
export const TEAM_DATA = [
  {
    teamName: "game",
    displayName: "ゲームプログラミング班",
    imagePath: "/images/team-card/game.png",
  },
  { teamName: "webapp", displayName: "Webアプリ班", imagePath: "/images/team-card/webapp.png" },
  { teamName: "sound", displayName: "サウンド班", imagePath: "/images/team-card/sound.jpg" },
  { teamName: "2d", displayName: "2D班", imagePath: "/images/team-card/2D.png" },
  { teamName: "3d", displayName: "3D班", imagePath: "/images/team-card/3D.png" },
  { teamName: "design", displayName: "デザイン班", imagePath: "/images/team-card/design.png" },
] as const;

// 班紹介データ
export const TEAM_INTRO_DATA = [
  {
    teamName: "game",
    displayName: "ゲームプログラミング班",
    imagePath: "/images/team-card/game.png",
    description:
      "UnityやUnreal Engineなどのゲームエンジンを使って、オリジナルゲームを制作しています。学園祭では毎年制作したゲームを展示し、来場者に楽しんでいただいています。",
    activities: [
      "Unityを使った2D/3Dゲーム開発",
      "ゲームジャムへの参加",
      "学園祭でのゲーム展示",
      "オリジナルゲームの企画・開発",
    ],
  },
  {
    teamName: "webapp",
    displayName: "Webアプリ班",
    imagePath: "/images/team-card/webapp.png",
    description:
      "ReactやNext.jsなどのモダンなフレームワークを使って、Webサイトやアプリケーションを開発しています。このサイトもWebアプリ班が制作しました。",
    activities: [
      "React/Next.jsを使ったWeb開発",
      "部のWebサイト制作・運営",
      "ハッカソンへの参加",
      "バックエンド開発の勉強会",
    ],
  },
  {
    teamName: "sound",
    displayName: "サウンド班",
    imagePath: "/images/team-card/sound.jpg",
    description:
      "DTMソフトを使ったオリジナル楽曲の制作を行っています。ゲーム用BGMや効果音の制作、コミケでのCD頒布なども行っています。",
    activities: [
      "DTMによる楽曲制作",
      "ゲーム用BGM・効果音の制作",
      "コミックマーケットでのCD頒布",
      "音楽理論の勉強会",
    ],
  },
  {
    teamName: "2d",
    displayName: "2D班",
    imagePath: "/images/team-card/2D.png",
    description:
      "イラストや漫画などの2Dグラフィック制作を行っています。ゲームのキャラクターデザインや、コミケでの画集頒布なども活動の一環です。",
    activities: [
      "キャラクターイラスト制作",
      "漫画・同人誌の制作",
      "ゲーム用グラフィック制作",
      "イラスト技法の勉強会",
    ],
  },
  {
    teamName: "3d",
    displayName: "3D班",
    imagePath: "/images/team-card/3D.png",
    description:
      "Blenderなどの3DCGソフトを使って、3Dモデルやアニメーションの制作を行っています。ゲーム用アセットやVTuber用モデルなども制作しています。",
    activities: [
      "Blenderによる3Dモデリング",
      "キャラクターモデル制作",
      "ゲーム用3Dアセット制作",
      "3DCGアニメーション制作",
    ],
  },
  {
    teamName: "design",
    displayName: "デザイン班",
    imagePath: "/images/team-card/design.png",
    description:
      "UIデザインやグラフィックデザインを中心に活動しています。部のロゴやポスター、Webサイトのデザインなど、様々なデザイン業務を担当しています。",
    activities: ["UI/UXデザイン", "ポスター・フライヤー制作", "ロゴデザイン", "Webデザイン"],
  },
] as const;

// キャラクター画像データ
export const CHARACTER_IMAGES = [
  "/images/sofcharatop/ワカツキ_web.png",
  "/images/sofcharatop/ゆうしゃ_web.png",
  "/images/sofcharatop/沙v2_web.png",
  "/images/sofcharatop/スカウト_web.png",
  "/images/sofcharatop/柔守ツクリv2_web.png",
  "/images/sofcharatop/御隣サラ_web.png",
  "/images/sofcharatop/フコ_web.png",
  "/images/sofcharatop/柔守ツクリ_web.png",
  "/images/sofcharatop/スカウトv2_web.png",
  "/images/sofcharatop/ニーヴァ_web.png",
  "/images/sofcharatop/紀井めもり_web.png",
] as const;

// キャラクター詳細データ
export const CHARACTER_DATA = [
  {
    id: "wakatsuki",
    name: "ワカツキ",
    imagePath: "/images/sofcharatop/ワカツキ_web.png",
    description: "元気いっぱいの看板娘",
    profile: {
      birthday: "4月1日",
      height: "155cm",
      likes: "お祭り、みんなで遊ぶこと",
      dislikes: "退屈な時間",
    },
    backstory:
      "ソフトウェア研究部の看板娘として活躍中。いつも元気いっぱいで、部室の雰囲気を明るくしてくれる存在。新入生の勧誘活動では誰よりも積極的に声をかける。",
  },
  {
    id: "yuusha",
    name: "ゆうしゃ",
    imagePath: "/images/sofcharatop/ゆうしゃ_web.png",
    description: "勇敢な冒険者",
    profile: {
      birthday: "8月15日",
      height: "168cm",
      likes: "冒険、新しい挑戦",
      dislikes: "じっとしていること",
    },
    backstory:
      "どんな困難にも立ち向かう勇敢な冒険者。ゲームプログラミング班の作品に登場する主人公キャラクターとして生まれた。正義感が強く、仲間思い。",
  },
  {
    id: "suna",
    name: "沙",
    imagePath: "/images/sofcharatop/沙v2_web.png",
    description: "クールな雰囲気の少女",
    profile: {
      birthday: "12月21日",
      height: "162cm",
      likes: "読書、静かな場所",
      dislikes: "騒がしい場所",
    },
    backstory:
      "クールで落ち着いた雰囲気を持つ少女。実は面倒見が良く、困っている人を見ると放っておけない性格。プログラミングの腕前は部内でもトップクラス。",
  },
  {
    id: "scout",
    name: "スカウト",
    imagePath: "/images/sofcharatop/スカウト_web.png",
    description: "情報収集のエキスパート",
    profile: {
      birthday: "6月6日",
      height: "158cm",
      likes: "情報収集、分析",
      dislikes: "嘘をつくこと",
    },
    backstory:
      "あらゆる情報を収集・分析することに長けたエキスパート。部の広報活動やイベント情報の収集で大活躍。好奇心旺盛で、知らないことがあると調べずにはいられない。",
  },
  {
    id: "tsukuri",
    name: "柔守ツクリ",
    imagePath: "/images/sofcharatop/柔守ツクリv2_web.png",
    description: "ものづくりが大好き",
    profile: {
      birthday: "3月3日",
      height: "150cm",
      likes: "工作、プログラミング",
      dislikes: "完成品を壊されること",
    },
    backstory:
      "ものづくりへの情熱は誰にも負けない。ゲームからWebアプリまで、何でも作ってしまう天才肌。作品へのこだわりは強いが、他人の意見も素直に聞ける柔軟さも持つ。",
  },
  {
    id: "sara",
    name: "御隣サラ",
    imagePath: "/images/sofcharatop/御隣サラ_web.png",
    description: "お隣さんのような親しみやすさ",
    profile: {
      birthday: "5月5日",
      height: "157cm",
      likes: "おしゃべり、お菓子作り",
      dislikes: "一人でいること",
    },
    backstory:
      "誰とでも仲良くなれる、お隣さんのような親しみやすさを持つ少女。部室ではムードメーカーとして活躍し、イベントの企画では率先してアイデアを出す。",
  },
  {
    id: "fuko",
    name: "フコ",
    imagePath: "/images/sofcharatop/フコ_web.png",
    description: "不思議な雰囲気の子",
    profile: {
      birthday: "10月31日",
      height: "145cm",
      likes: "不思議なもの、夜空",
      dislikes: "決まりきった日常",
    },
    backstory:
      "どこか不思議な雰囲気を纏う謎めいた子。独特の感性を持ち、他の人が思いつかないようなアイデアを次々と生み出す。サウンド班の楽曲制作にも関わっている。",
  },
  {
    id: "niiva",
    name: "ニーヴァ",
    imagePath: "/images/sofcharatop/ニーヴァ_web.png",
    description: "神秘的な存在",
    profile: {
      birthday: "1月1日",
      height: "170cm",
      likes: "瞑想、星を見ること",
      dislikes: "争いごと",
    },
    backstory:
      "神秘的なオーラを纏う存在。普段は物静かだが、その言葉には不思議な説得力がある。3D班のモデリング作品として生まれ、今では部のシンボル的存在に。",
  },
  {
    id: "memori",
    name: "紀井めもり",
    imagePath: "/images/sofcharatop/紀井めもり_web.png",
    description: "記憶を司る少女",
    profile: {
      birthday: "9月9日",
      height: "152cm",
      likes: "日記を書くこと、写真",
      dislikes: "忘れること",
    },
    backstory:
      "記憶を司る能力を持つとされる少女。部の歴史や思い出を大切にしており、アルバム係として活動記録を残している。おっとりした性格だが、大事なことは絶対に忘れない。",
  },
  {
    id: "mock-01",
    name: "モック01",
    imagePath: "/images/sofcharatop/ワカツキ_web.png",
    description: "展開ボタン確認用のモック",
    profile: {
      birthday: "1月10日",
      height: "160cm",
      likes: "テスト表示、UI確認",
      dislikes: "未検証の実装",
    },
    backstory:
      "UIの表示確認のために追加したモックキャラクターです。展開ボタンの動作確認を目的として一時的に使用されます。",
  },
  {
    id: "mock-02",
    name: "モック02",
    imagePath: "/images/sofcharatop/ゆうしゃ_web.png",
    description: "展開ボタン確認用のモック",
    profile: {
      birthday: "2月20日",
      height: "163cm",
      likes: "モックデータ、表示切替",
      dislikes: "不整合な状態",
    },
    backstory:
      "UIの表示確認のために追加したモックキャラクターです。9件を超えた場合の展開UIを検証するために使用されます。",
  },
] as const;
