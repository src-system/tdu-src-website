type CatchphraseSegment = {
  text: string
  highlighted?: boolean
}

export type HeroCatchphraseProps = {
  segments: CatchphraseSegment[]
}

export const HeroCatchphrase = ({ segments }: HeroCatchphraseProps) => {
  return (
    <div className="absolute bottom-8 left-4 md:bottom-15 md:left-10 z-30">
      <div className="bg-white/95 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-sm mb-2">
        <span className="text-2xl md:text-6xl lg:text-7xl font-bold">
          {segments.map((segment, index) => (
            <span
              key={`${segment.text}-${index}`}
              className={
                segment.highlighted
                  ? 'bg-linear-to-r from-forest to-leaf bg-clip-text text-transparent'
                  : 'text-charcoal'
              }
            >
              {segment.text}
            </span>
          ))}
        </span>
      </div>
    </div>
  )
}
