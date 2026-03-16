type HeroLabelProps = {
  text: string
  variant?: 'default' | 'accent'
}

export const HeroLabel = ({ text, variant = 'default' }: HeroLabelProps) => {
  const variantClasses = {
    default: 'bg-mint',
    accent: 'bg-forest',
  }

  return (
    <div className="absolute bottom-12 left-0 md:bottom-16 2xl:bottom-20 md:left-0 z-10">
      <div
        className={`${variantClasses[variant]} py-4 md:py-5 2xl:py-6 px-10 md:px-14 2xl:px-20 shadow-lg rounded-r-lg`}
      >
        <span className="text-white font-noto font-bold text-3xl md:text-5xl lg:text-6xl 2xl:text-7xl">
          {text}
        </span>
      </div>
    </div>
  )
}
