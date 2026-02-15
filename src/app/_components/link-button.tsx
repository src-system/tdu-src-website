"use client";

import { ChevronRightIcon } from "lucide-react";

import Link from "next/link";

type LinkButtonProps = {
  href: string;
  text: string;
  color?: "forest" | "white" | "mint" | "black";
};

const colorStyles = {
  forest: {
    base: "border-forest bg-white text-forest shadow-[0_4px_0_0_var(--color-forest)]",
    hover: "hover:shadow-[0_2px_0_0_var(--color-forest)]",
  },
  white: {
    base: "border-white bg-white/10 backdrop-blur-sm text-white shadow-[0_4px_0_0_rgba(255,255,255,0.5)]",
    hover: "hover:shadow-[0_2px_0_0_rgba(255,255,255,0.5)]",
  },
  mint: {
    base: "border-mint bg-mint text-white shadow-[0_4px_0_0_var(--color-forest)]",
    hover: "hover:shadow-[0_2px_0_0_var(--color-forest)]",
  },
  black: {
    base: "border-white bg-black/60 backdrop-blur-sm text-white shadow-[0_4px_0_0_rgba(0,0,0,0.5)]",
    hover: "hover:shadow-[0_2px_0_0_rgba(0,0,0,0.5)]",
  },
};

export const LinkButton = ({ href, text, color = "forest" }: LinkButtonProps) => {
  const styles = colorStyles[color];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // ハッシュリンクの場合のみスムーズスクロールを適用
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);

      if (element) {
        const offset = 100; // ヘッダーの高さ分のオフセット
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`inline-flex items-center justify-center rounded-md border-2 px-3 py-1.5 md:px-5 md:py-2.5 text-sm md:text-base transition-all duration-200 hover:translate-y-1 active:translate-y-2 active:shadow-none ${styles.base} ${styles.hover}`}
    >
      {text}
      <span className="ml-1 md:ml-1.5">
        <ChevronRightIcon className="size-3.5 md:size-4" />
      </span>
    </Link>
  );
};
