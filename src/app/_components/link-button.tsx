import { ChevronRightIcon } from "lucide-react";

import Link from "next/link";

type LinkButtonProps = {
  href: string;
  text: string;
};

export const LinkButton = ({ href, text }: LinkButtonProps) => {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-md border-2 border-forest bg-white px-3 py-1.5 md:px-5 md:py-2.5 text-sm md:text-base text-forest shadow-[0_4px_0_0_var(--color-forest)] transition-all duration-200 hover:translate-y-1 hover:shadow-[0_2px_0_0_var(--color-forest)] active:translate-y-2 active:shadow-none"
    >
      {text}
      <span className="ml-1 md:ml-1.5">
        <ChevronRightIcon className="size-3.5 md:size-4" />
      </span>
    </Link>
  );
};
