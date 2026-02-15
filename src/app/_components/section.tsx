import type { ElementType, ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "container";
  variant?: "default" | "tight";
  id?: string;
  as?: ElementType;
};

export const Section = ({
  children,
  className = "",
  size = "default",
  variant = "default",
  id,
  as: Component = "section",
}: SectionProps) => {
  const sizeClasses = {
    default: "max-w-6xl 2xl:max-w-7xl",
    wide: "max-w-7xl 2xl:max-w-[90rem]",
    container: "max-w-5xl 2xl:max-w-7xl",
  };

  const variantClasses = {
    default: "md:py-15 2xl:py-20 py-10",
    tight: "md:py-10 py-6",
  };

  // containerモードの場合はシンプルなコンテナレイアウト
  if (size === "container") {
    return (
      <Component
        id={id}
        className={`relative mx-auto ${sizeClasses[size]} px-6 md:px-8 ${className}`}
      >
        {children}
      </Component>
    );
  }

  // 通常のセクションレイアウト
  return (
    <Component
      id={id}
      className={`flex w-full flex-col gap-5 bg-white mx-auto ${sizeClasses[size]} md:px-20 2xl:px-32 px-5 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Component>
  );
};
