'use client'

import { RefreshCwIcon } from 'lucide-react'

export const ReloadButton = () => {
  return (
    <button
      type="button"
      onClick={() => window.location.reload()}
      className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-forest bg-white px-5 py-2.5 text-base text-forest shadow-[0_4px_0_0_var(--color-forest)] transition-all hover:translate-y-1 hover:shadow-[0_2px_0_0_var(--color-forest)]"
    >
      <RefreshCwIcon className="size-4" />
      再読み込み
    </button>
  )
}
