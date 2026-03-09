import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

const HeaderMenu = dynamic(() => import('./header-menu').then((mod) => mod.HeaderMenu), {
  ssr: true,
})

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="flex 2xl:h-28 md:h-24 h-20 items-center justify-between border-b border-gray-200 shadow-sm 2xl:pl-10 2xl:pr-8 md:pl-8 md:pr-6 pl-8 pr-6">
        <Link href="/" className="relative 2xl:h-28 2xl:w-28 md:h-24 md:w-24 h-19 w-19">
          <Image src="/logo.svg" alt="ソフトウェア研究部" fill className="object-contain" />
        </Link>
        <HeaderMenu />
      </div>
    </header>
  )
}
