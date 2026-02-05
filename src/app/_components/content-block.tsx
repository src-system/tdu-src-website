type ContentBlockProps = {
  title: string;
  subtitle: string;
  description?: string;
};

export const ContentBlock = ({ title, subtitle, description }: ContentBlockProps) => {
  return (
    <div className="flex w-full max-w-4xl flex-col gap-3">
      {/* タイトルとサブタイトル */}
      <div className="flex flex-col">
        <h2 className="font-lexend text-4xl font-semibold text-forest">{title}</h2>
        <h3 className="font-noto text-lg font-bold text-black">{subtitle}</h3>
      </div>

      {/* 縦線と説明文 */}
      {description && (
        <div className="flex gap-4 pl-3">
          {/* 左側の緑色の縦線 */}
          <div className="w-2 shrink-0 bg-forest" />
          {/* 右側の説明文 */}
          <p className="my-4 md:text-xl text-md leading-relaxed font-medium text-black whitespace-pre-line">
            {description}
          </p>
        </div>
      )}
    </div>
  );
};
