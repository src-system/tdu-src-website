import Image from 'next/image'
import Link from 'next/link'

type SofkentownCardProps = {
  url: string
  name: string
  imagePath: string
}

export const SofkentownCard = ({ url, name, imagePath }: SofkentownCardProps) => {
  return (
    <Link
      href={`/sofchara/sofkentown/${url}`}
      className="group flex flex-col rounded-2xl border border-forest/20 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
    >
      <div className="relative aspect-video overflow-hidden">
        {imagePath ? (
          <Image
            src={imagePath}
            alt={name}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-forest group-hover:text-mint transition-colors">
          {name}
        </h3>
      </div>
    </Link>
  )
}
