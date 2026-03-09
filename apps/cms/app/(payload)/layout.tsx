import React from 'react'

type Args = {
  children: React.ReactNode
}

export default function PayloadLayout({ children }: Args) {
  return <>{children}</>
}
