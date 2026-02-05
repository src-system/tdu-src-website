import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide";
  variant?: "default" | "tight";
};

export const Section = ({
  children,
  className = "",
  size = "default",
  variant = "default",
}: SectionProps) => {
  const sizeClasses = {
    default: "max-w-6xl 2xl:max-w-7xl",
    wide: "max-w-7xl 2xl:max-w-[90rem]",
  };

  const variantClasses = {
    default: "md:py-15 2xl:py-20 py-10",
    tight: "md:py-10 py-6",
  };

  return (
    <section
      className={`flex w-full flex-col gap-5 bg-white mx-auto ${sizeClasses[size]} md:px-20 2xl:px-32 px-5 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </section>
  );
};
