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
      className="group relative block overflow-hidden rounded-xl bg-gray-900 shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,130,0,0.6)] hover:scale-[1.02]"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={imagePath}
          alt={displayName}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 px-3 py-3 text-center">
        <span className="font-bold text-xl text-white drop-shadow-lg">{displayName}</span>
      </div>
      <div className="absolute inset-0 rounded-xl border-2 border-transparent transition-all duration-300 group-hover:border-leaf group-hover:shadow-[inset_0_0_20px_rgba(33,178,25,0.3)]" />
    </Link>
  );
};

type TeamCardGridProps = {
  children: React.ReactNode;
};

export const TeamCardGrid = ({ children }: TeamCardGridProps) => {
  return <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:px-0 px-3">{children}</div>;
};
