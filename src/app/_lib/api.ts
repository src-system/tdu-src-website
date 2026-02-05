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
    date: "2024/12/29",
    title: "コミックマーケット105に参加します",
    imagePath: "/images/example/2.jpg",
    category: "イベント",
    content:
      "2024年12月30日・31日に開催されるコミックマーケット105に参加します。サウンド班によるオリジナル楽曲CD、2D班による画集などを頒布予定です。ぜひお立ち寄りください！",
  },
  {
    id: "3",
    date: "2024/12/20",
    title: "年末活動報告",
    imagePath: "/images/example/3.jpg",
    category: "活動報告",
    content:
      "2024年の活動を振り返ります。今年は学園祭での作品展示、コミケへの参加、各種ゲームジャムへの挑戦など、多くの活動を行いました。来年もさらに活動の幅を広げていきたいと思います。",
  },
] as const;

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
] as const;
