import Image from "next/image";

type TopImageProps = {
  imagePath: string;
  children?: React.ReactNode;
};

export const TopImage = ({ imagePath, children }: TopImageProps) => {
  return (
    <div className="relative md:h-[60svh] h-[50svh] w-full overflow-hidden">
      <Image src={imagePath} alt="" fill className="object-cover" priority />
      {children}
    </div>
  );
};
