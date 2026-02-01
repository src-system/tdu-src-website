import Image from "next/image";
import Link from "next/link";

type TeamCardProps = {
  teamName: string;
  displayName: string;
  imagePath: string;
};

export const TeamCard = ({ teamName, displayName, imagePath }: TeamCardProps) => {
  return (
    <Link
      href={`/team/${teamName}`}
      className="block overflow-hidden rounded-xl border-4 border-forest bg-white shadow-[0_4px_0_0_var(--color-forest)] transition-all duration-200 hover:translate-y-1 hover:shadow-[0_2px_0_0_var(--color-forest)] active:translate-y-2 active:shadow-none"
    >
      <div className="relative aspect-video w-full">
        <Image src={imagePath} alt={displayName} fill className="object-cover" />
      </div>
      <div className="bg-forest px-3 py-2 text-center">
        <span className="font-bold text-xl text-white">{displayName}</span>
      </div>
    </Link>
  );
};

type TeamCardGridProps = {
  children: React.ReactNode;
};

export const TeamCardGrid = ({ children }: TeamCardGridProps) => {
  return <div className="grid grid-cols-2 gap-4 md:grid-cols-3">{children}</div>;
};
