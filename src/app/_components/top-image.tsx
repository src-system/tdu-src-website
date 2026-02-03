import Image from "next/image";

type TopImageProps = {
  imagePath: string;
};

export const TopImage = ({ imagePath }: TopImageProps) => {
  return (
    <div className="relative w-full overflow-hidden md:aspect-12/5 aspect-4/3">
      <Image src={imagePath} alt="" fill className="object-cover" priority />
    </div>
  );
};
