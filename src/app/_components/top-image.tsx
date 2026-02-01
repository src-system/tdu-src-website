import Image from "next/image";

type TopImageProps = {
  imagePath: string;
};

export const TopImage = ({ imagePath }: TopImageProps) => {
  return (
    <div className="relative h-[300px] w-full overflow-hidden md:h-[540px]">
      <Image src={imagePath} alt="" fill className="object-cover" priority />
    </div>
  );
};
