export const Partition = () => {
  return (
    <div className="relative z-10 flex h-0 w-full items-start overflow-visible md:gap-[30%] gap-[20%]">
      {/* 角丸の細くて長めの長方形 */}
      <div className="md:h-12 h-9 flex-4 -translate-x-5 -translate-y-1/2 rounded-full bg-forest" />

      {/* 30-60-30度の二等辺三角形（左向き） */}
      <div
        className="aspect-7/1 flex-4 bg-leaf"
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
      />
    </div>
  );
};
