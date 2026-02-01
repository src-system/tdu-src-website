import Image from "next/image";
import Link from "next/link";
import { HeaderMenu } from "./header-menu";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="flex h-20 items-center justify-between border-b border-gray-200 shadow-sm px-8">
        <Link href="/" className="relative h-14 w-19">
          <Image src="/logo.svg" alt="ソフトウェア研究部" fill className="object-contain" />
        </Link>
        <HeaderMenu />
      </div>
    </header>
  );
};
