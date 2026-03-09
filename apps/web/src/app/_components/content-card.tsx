import type { ReactNode } from 'react'

type ContentCardProps = {
  children: ReactNode
}

export const ContentCard = ({ children }: ContentCardProps) => {
  return (
    <div className="bg-white border-3 border-forest/20 rounded-2xl md:p-12 p-6">{children}</div>
  )
}
