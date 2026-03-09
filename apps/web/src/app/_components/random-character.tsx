'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Character = {
  imagePath: string
  href: string
}

type RandomCharacterProps = {
  characters: Character[]
}

export const RandomCharacter = ({ characters }: RandomCharacterProps) => {
  const [character, setCharacter] = useState<Character | null>(null)

  useEffect(() => {
    if (characters.length === 0) return
    const randomIndex = Math.floor(Math.random() * characters.length)
    setCharacter(characters[randomIndex] ?? null)
  }, [characters])

  if (!character) {
    return (
      <div className="aspect-3/4 w-full max-w-xs md:max-w-sm animate-pulse bg-linear-to-br from-gray-100 to-gray-200 rounded-2xl shadow-md" />
    )
  }

  return (
    <Link href={character.href} className="relative aspect-3/4 w-full max-w-xs md:max-w-sm block">
      <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-purple-50 rounded-2xl opacity-20 blur-xl" />
      <Image
        src={character.imagePath}
        alt="ソフきゃら"
        fill
        className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300 relative z-10"
        priority
      />
    </Link>
  )
}
