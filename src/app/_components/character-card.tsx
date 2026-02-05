import Image from "next/image";
import Link from "next/link";

export type CharacterCardData = {
  id: string;
  name: string;
  description: string;
  imagePath: string;
};

type CharacterCardProps = CharacterCardData & {
  size?: "sm" | "md" | "lg";
};

export const CharacterCard = ({
  id,
  name,
  description,
  imagePath,
  size = "md",
}: CharacterCardProps) => {
  const sizeClasses = {
    sm: "w-16 h-20 md:w-20 md:h-28",
    md: "w-32 h-40 md:w-40 md:h-52",
    lg: "w-48 h-60 md:w-56 md:h-72",
  };

  return (
    <Link
      href={`/sofchara/${id}`}
      className="group flex flex-col items-center gap-3 rounded-xl bg-gray-50 p-4 transition-all duration-200 hover:bg-forest/5 hover:shadow-md"
    >
      <div className={`relative ${sizeClasses[size]}`}>
        <Image
          src={imagePath}
          alt={name}
          fill
          className="object-contain transition-transform duration-200 group-hover:scale-105"
        />
      </div>
      <div className="text-center">
        <h3 className="font-bold text-lg text-charcoal">{name}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </Link>
  );
};
