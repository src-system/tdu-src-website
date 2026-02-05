type ClubActiveLabelProps = {
  labelText?: string;
};

export const ClubActiveLabel = ({ labelText = "部の活動" }: ClubActiveLabelProps) => {
  return (
    <div className="absolute md:top-[64%] top-[68%] left-0 z-10 w-[42%]">
      <div className="bg-mint py-[0.5vw] flex items-center justify-end pr-[3vw] shadow-lg">
        <span className="text-white font-noto font-bold 2xl:text-[4vw] md:text-[5vw] text-[6vw]">
          {labelText}
        </span>
      </div>
    </div>
  );
};
