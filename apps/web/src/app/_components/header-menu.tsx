'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const menuItems = [
  { href: '/about', label: 'About', sublabel: 'ソフトウェア研究部とは？' },
  { href: '/team', label: 'Team', sublabel: '班紹介' },
  { href: '/news', label: 'NEWS', sublabel: '新着情報' },
  { href: '/sofchara', label: 'CHARACTERS', sublabel: 'ソフきゃら！' },
]

const MD_BREAKPOINT = 768

export function HeaderMenu() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= MD_BREAKPOINT) {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {/* Desktop Menu */}
      <nav className="hidden md:flex items-center">
        {menuItems.map((item, index) => (
          <div key={item.href} className="flex items-center">
            <Link
              href={item.href}
              className="group relative 2xl:px-8 md:px-6 px-4 py-1 text-center font-medium text-gray-700 hover:text-forest"
            >
              <span className="block font-lexend 2xl:text-2xl md:text-lg text-sm">
                {item.label}
              </span>
              <span className="block 2xl:text-lg md:text-sm text-xs text-gray-500 group-hover:text-forest/70">
                {item.sublabel}
              </span>
            </Link>
            {index < menuItems.length - 1 && (
              <span className="2xl:h-10 md:h-8 h-6 w-px bg-gray-300" />
            )}
          </div>
        ))}
      </nav>

      {/* Hamburger Button */}
      <button
        type="button"
        className="md:hidden relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        <span
          className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${
            isOpen ? 'translate-y-2 rotate-45' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${
            isOpen ? '-translate-y-2 -rotate-45' : ''
          }`}
        />
      </button>

      {/* Overlay */}
      <button
        type="button"
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
        aria-label="Close menu"
        tabIndex={isOpen ? 0 : -1}
      />

      {/* Side Menu */}
      <nav
        className={`fixed top-0 right-0 z-40 h-full w-64 bg-white shadow-lg transition-transform duration-300 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col pt-20 px-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group border-b border-gray-200 py-4 hover:text-forest"
              onClick={() => setIsOpen(false)}
            >
              <span className="block font-lexend text-lg font-medium">{item.label}</span>
              <span className="block text-sm text-gray-500 group-hover:text-forest/70">
                {item.sublabel}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  )
}
