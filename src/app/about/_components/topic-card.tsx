import Image from "next/image";

type TopicCardProps = {
  title: string;
  description: string;
  image: string;
}

export const TopicCard = ({ title, description, image }: TopicCardProps) => {
  return (
    <div className="flex border-2 shadow-sm border-gray-300 rounded-2xl overflow-hidden py-10">
      {/* 左側の緑のアクセントライン */}
      <div className="w-5 bg-forest shrink-0" />

      {/* コンテンツエリア */}
      <div className="flex flex-1 gap-8 p-8">
        {/* 左側：タイトルと説明文 */}
        <div className="flex-1 flex flex-col justify-start">
          <h3 className="text-3xl font-bold">{title}</h3>
          <p className="text-xl leading-relaxed mt-4">{description}</p>
        </div>

        {/* 右側：画像 */}
        <div className="flex-1 flex items-center">
          <div className="relative w-full aspect-video">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};