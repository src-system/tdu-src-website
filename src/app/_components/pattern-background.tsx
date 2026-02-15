import type { ElementType, ReactNode } from "react";

type PatternBackgroundProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  id?: string;
  bgColor?: string;
  opacity?: string;
  patternSize?: string;
};

export const PatternBackground = ({
  children,
  as: Component = "div",
  className = "",
  id,
  bgColor = "bg-green-50",
  opacity = "opacity-[0.06]",
  patternSize = "400px",
}: PatternBackgroundProps) => {
  return (
    <Component id={id} className={`relative ${bgColor} overflow-hidden ${className}`}>
      <div
        className={`absolute inset-0 ${opacity} z-0`}
        style={{
          backgroundImage: "url('/images/pattern/sofchara-pattern.png')",
          backgroundSize: patternSize,
          backgroundRepeat: "repeat",
        }}
      />
      <div className="relative z-10">{children}</div>
    </Component>
  );
};
