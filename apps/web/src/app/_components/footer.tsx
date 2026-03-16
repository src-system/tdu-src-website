import { Github, Mail, MapPin, Twitter, Youtube } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getSiteSettingsFromApi } from '@/src/app/_lib/api'

const footerLinks = [
  { href: '/about', label: 'About', sublabel: 'ソフトウェア研究部とは？' },
  { href: '/team', label: 'Team', sublabel: '班紹介' },
  { href: '/news', label: 'NEWS', sublabel: 'お知らせ' },
  { href: '/sofchara', label: 'CHARACTERS', sublabel: 'ソフきゃら！' },
]

export const Footer = async () => {
  const siteSettings = await getSiteSettingsFromApi()

  const socialLinks = [
    ...(siteSettings.githubUrl
      ? [
          {
            href: siteSettings.githubUrl,
            icon: Github,
            label: 'GitHub',
          },
        ]
      : []),
    ...(siteSettings.xUrl
      ? [
          {
            href: siteSettings.xUrl,
            icon: Twitter,
            label: 'X (Twitter)',
          },
        ]
      : []),
    ...(siteSettings.youtubeUrl
      ? [
          {
            href: siteSettings.youtubeUrl,
            icon: Youtube,
            label: 'YouTube',
          },
        ]
      : []),
    ...(siteSettings.email
      ? [
          {
            href: `mailto:${siteSettings.email}`,
            icon: Mail,
            label: 'Email',
          },
        ]
      : []),
  ]
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-charcoal to-[#2a2a2a]">
      {/* 装飾グラデーションライン */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-forest via-leaf to-mint" />

      {/* 背景装飾 */}
      <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-leaf/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 -translate-x-1/2 translate-y-1/2 rounded-full bg-forest/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-8 pt-16 pb-8">
        <div className="grid gap-12 md:grid-cols-12">
          {/* ブランドセクション */}
          <div className="md:col-span-5">
            <Link href="/" className="group mb-6 inline-flex items-center gap-4">
              <Image
                src="/logo.svg"
                alt="ソフトウェア研究部"
                width={72}
                height={72}
                className="brightness-0 invert transition-transform duration-300 group-hover:scale-110"
              />
              <div>
                <h3 className="font-bold text-white text-xl tracking-tight transition-colors group-hover:text-leaf">
                  ソフトウェア研究部
                </h3>
                <p className="font-lexend text-xs text-white/70">Software Research Club</p>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              {siteSettings.location && (
                <p className="flex items-center gap-2 text-sm text-white/90">
                  <MapPin className="h-4 w-4 text-leaf" />
                  {siteSettings.location}
                </p>
              )}
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:bg-leaf hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4 text-white transition-colors group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* リンクセクション */}
          <div className="md:col-span-7">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-4">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group block">
                    <span className="relative inline-block font-lexend font-medium text-white transition-colors group-hover:text-leaf">
                      {link.label}
                      <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-leaf transition-all duration-300 group-hover:w-full" />
                    </span>
                    <span className="mt-1.5 block text-xs text-white/70 transition-colors group-hover:text-leaf/70">
                      {link.sublabel}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* コピーライト */}
        <div className="mt-12 border-t border-white/20 pt-8 text-center">
          <p className="text-sm text-white/70">
            &copy; {new Date().getFullYear()} ソフトウェア研究部. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
