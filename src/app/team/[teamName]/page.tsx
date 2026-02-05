import { notFound } from "next/navigation";
import { ContentBlock } from "../../_components/content-block";
import { Partition } from "../../_components/partition";
import { TopImage } from "../../_components/top-image";
import { TEAM_DATA } from "../../_lib/api";

// 班の詳細データ
const TEAM_DETAILS: Record<string, { description: string; activities: string[]; tools: string[] }> =
  {
    game: {
      description:
        "ゲームプログラミング班では、ゲーム制作を通じてプログラミングスキルを磨いています。UnityやUnreal Engineなどのゲームエンジンを使用し、チームで協力してオリジナルゲームを開発しています。",
      activities: [
        "オリジナルゲームの企画・開発",
        "ゲームエンジンの学習会",
        "学園祭での作品展示",
        "ゲームジャムへの参加",
      ],
      tools: ["Unity", "Unreal Engine", "C#", "C++", "Blender"],
    },
    webapp: {
      description:
        "Webアプリ班では、Webサイトやwebアプリケーションの開発を行っています。フロントエンドからバックエンドまで幅広い技術を学び、実践的なプロジェクトに取り組んでいます。",
      activities: [
        "Webサイト・アプリの開発",
        "最新Web技術の勉強会",
        "部のホームページ管理",
        "ハッカソンへの参加",
      ],
      tools: ["React", "Next.js", "TypeScript", "Node.js", "Python"],
    },
    sound: {
      description:
        "サウンド班では、ゲームや映像作品のための音楽・効果音制作を行っています。DTMソフトを使った作曲から、録音・ミキシングまで幅広く活動しています。",
      activities: [
        "オリジナル楽曲の制作",
        "ゲーム用BGM・効果音の作成",
        "DTMソフトの勉強会",
        "コミケでのCD頒布",
      ],
      tools: ["Cubase", "FL Studio", "Ableton Live", "VOCALOID", "音声編集ソフト"],
    },
    "2d": {
      description:
        "2D班では、イラストやドット絵、2Dアニメーションなどの制作を行っています。キャラクターデザインからUI素材まで、ゲームや作品に必要な2Dグラフィックを担当しています。",
      activities: [
        "イラスト・キャラクターデザイン",
        "ドット絵の制作",
        "2Dアニメーション制作",
        "画集の制作・頒布",
      ],
      tools: ["Clip Studio Paint", "Photoshop", "Illustrator", "Aseprite", "Live2D"],
    },
    "3d": {
      description:
        "3D班では、3DCGモデリングやアニメーション制作を行っています。ゲーム用の3Dモデルから映像作品まで、立体的な表現を追求しています。",
      activities: [
        "3Dモデリング・テクスチャリング",
        "3Dアニメーション制作",
        "ゲーム用アセット作成",
        "3DCG映像作品の制作",
      ],
      tools: ["Blender", "Maya", "ZBrush", "Substance Painter", "After Effects"],
    },
    design: {
      description:
        "デザイン班では、グラフィックデザインやUI/UXデザインを担当しています。ポスターやロゴ、Webデザインなど、視覚的なコミュニケーションを通じて作品の魅力を引き出します。",
      activities: [
        "ポスター・フライヤーのデザイン",
        "ロゴ・ブランディング",
        "UI/UXデザイン",
        "グッズデザイン",
      ],
      tools: ["Figma", "Adobe XD", "Illustrator", "Photoshop", "Canva"],
    },
  };

export function generateStaticParams() {
  return TEAM_DATA.map((team) => ({
    teamName: team.teamName,
  }));
}

type Props = {
  params: Promise<{ teamName: string }>;
};

const TeamDetailPage = async ({ params }: Props) => {
  const { teamName } = await params;

  const team = TEAM_DATA.find((t) => t.teamName === teamName);
  const details = TEAM_DETAILS[teamName];

  if (!team || !details) {
    notFound();
  }

  return (
    <main>
      <TopImage imagePath={team.imagePath} />
      <Partition />

      <section className="flex w-full flex-col gap-5 bg-white mx-auto max-w-6xl md:px-20 px-5 md:py-15 py-10">
        <ContentBlock
          title={team.displayName}
          subtitle="班紹介"
          description={details.description}
        />
      </section>

      <Partition />

      <section className="flex w-full flex-col gap-8 bg-white mx-auto max-w-6xl md:px-20 px-5 md:py-15 py-10">
        <div>
          <h3 className="text-xl font-bold text-forest mb-4">主な活動内容</h3>
          <ul className="space-y-2">
            {details.activities.map((activity) => (
              <li key={activity} className="flex items-start gap-2">
                <span className="text-forest mt-1">●</span>
                <span className="text-charcoal">{activity}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold text-forest mb-4">使用ツール・技術</h3>
          <div className="flex flex-wrap gap-2">
            {details.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full bg-forest/10 px-4 py-1.5 text-sm text-forest"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default TeamDetailPage;
