import Image from 'next/image'

type TopImageProps = {
  imagePath: string
  children?: React.ReactNode
}

export const TopImage = ({ imagePath, children }: TopImageProps) => {
  return (
    <div className="relative w-full aspect-14/10 md:aspect-16/7 overflow-hidden">
      <Image src={imagePath} alt="" fill className="object-cover" priority />
      {children}
    </div>
  )
}
