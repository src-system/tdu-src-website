type WaveDividerProps = {
  bgColor?: string;
  waveColor?: string;
};

export const WaveDivider = ({ bgColor = "bg-green-50", waveColor = "white" }: WaveDividerProps) => {
  return (
    <svg
      className={`w-full h-20 md:h-32 ${bgColor} block`}
      viewBox="0 0 1920 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M0 0H1920V60Q1440 120 960 60Q480 0 0 60V0Z" fill={waveColor} />
    </svg>
  );
};
