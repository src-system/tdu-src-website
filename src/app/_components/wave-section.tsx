import type { ReactNode } from "react";

interface WaveSectionProps {
  children: ReactNode;
  className?: string;
}

export function WaveSection({ children, className = "" }: WaveSectionProps) {
  return (
    <section className={`relative ${className}`}>
      {/* 上部の波形 */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[60px]"
          aria-hidden="true"
        >
          <path
            d="M0,0 C200,80 400,80 600,40 C800,0 1000,0 1200,60 L1200,0 L0,0 Z"
            fill="#006400"
          />
        </svg>
      </div>

      {/* 下部の波形 */}
      <div className="absolute top-[30px] left-0 w-full overflow-hidden leading-[0]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[90px]"
          aria-hidden="true"
        >
          <path
            d="M0,0 C300,60 500,100 700,80 C900,60 1100,20 1200,50 L1200,0 L0,0 Z"
            fill="#7CCD7C"
          />
        </svg>
      </div>

      {/* コンテンツエリア */}
      <div className="relative pt-[120px]">{children}</div>
    </section>
  );
}
