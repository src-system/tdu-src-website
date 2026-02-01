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
    date: "2025.01.15",
    title: "新歓イベントのお知らせ",
    imagePath: "/images/example/1.webp",
  },
  {
    id: "2",
    date: "2025.01.10",
    title: "冬コミ出展レポート",
    imagePath: "/images/example/cover_products_nama.webp",
  },
  {
    id: "3",
    date: "2024.12.20",
    title: "年末活動報告",
    imagePath: "/images/example/FD5GC_R1_20250109.jpg",
  },
] as const;

// チームデータ
export const TEAM_DATA = [
  { teamName: "yamazaki", displayName: "山崎班", imagePath: "/images/team-card/YAMAZAKI.jpg" },
  { teamName: "hakusyu", displayName: "白州班", imagePath: "/images/team-card/HAKUSYU.jpg" },
  { teamName: "kaku", displayName: "角班", imagePath: "/images/team-card/KAKU.webp" },
  { teamName: "chita", displayName: "知多班", imagePath: "/images/team-card/CHITA.jpg" },
  { teamName: "old", displayName: "オールド班", imagePath: "/images/team-card/OLD.jpg" },
  { teamName: "hibiki", displayName: "響班", imagePath: "/images/team-card/HIBIKI.jpg" },
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
