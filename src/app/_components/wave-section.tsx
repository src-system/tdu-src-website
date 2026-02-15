import type { ReactNode } from "react";
import { WaveDivider } from "@/src/app/_components/wave-divider";

type WaveSectionProps = {
  id?: string;
  children: ReactNode;
  bgColor?: string;
  topWaveBgColor?: string;
  topWaveColor?: string;
  bottomWaveBgColor?: string;
  bottomWaveColor?: string;
  hasTopWave?: boolean;
  hasBottomWave?: boolean;
};

export const WaveSection = ({
  id,
  children,
  bgColor = "bg-white",
  topWaveBgColor = "bg-green-50",
  topWaveColor = "white",
  bottomWaveBgColor = "bg-white",
  bottomWaveColor = "#f0fdf4",
  hasTopWave = true,
  hasBottomWave = true,
}: WaveSectionProps) => {
  return (
    <>
      {hasTopWave && <WaveDivider bgColor={topWaveBgColor} waveColor={topWaveColor} />}

      <section id={id} className={`relative ${bgColor} py-16 md:py-24 overflow-hidden`}>
        {children}
      </section>

      {hasBottomWave && <WaveDivider bgColor={bottomWaveBgColor} waveColor={bottomWaveColor} />}
    </>
  );
};
