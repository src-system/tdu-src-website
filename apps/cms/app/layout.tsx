import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TDU SRC CMS',
  description: 'Content Management System for TDU SRC Website',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
