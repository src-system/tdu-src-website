import Image from "next/image";

type TopImageProps = {
  imagePath: string;
  children?: React.ReactNode;
};

export const TopImage = ({ imagePath, children }: TopImageProps) => {
  return (
    <div className="relative w-full overflow-hidden md:aspect-12/5 aspect-4/3">
      <Image src={imagePath} alt="" fill className="object-cover" priority />
      {children}
    </div>
  );
};
