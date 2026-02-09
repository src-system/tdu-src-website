import type { ReactNode } from "react";

type PatternBackgroundProps = {
  children: ReactNode;
};

export const PatternBackground = ({ children }: PatternBackgroundProps) => {
  return (
    <div className="relative bg-green-50 min-h-screen overflow-hidden">
      {/* 背景パターン */}
      <div
        className="absolute inset-0 opacity-[0.06] z-0"
        style={{
          backgroundImage: "url('/images/pattern/sofchara-pattern.png')",
          backgroundSize: "400px",
          backgroundRepeat: "repeat",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
