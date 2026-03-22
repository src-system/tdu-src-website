'use client'

import { useEffect, useRef } from 'react'
import { Markdown } from '@/src/app/_components/markdown'
import { isValidLexicalContent, lexicalToMarkdown } from '@/src/app/_lib/lexical-utils'

export type LexicalContent = { root?: { children?: unknown[] } } | null | undefined

type RichTextProps = {
  content: LexicalContent
  className?: string
}

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void
      }
    }
  }
}

/** Payload の Lexical richText を Markdown コンポーネントで表示 */
export const RichText = ({ content, className = '' }: RichTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const markdown = isValidLexicalContent(content) ? lexicalToMarkdown(content) : ''
  const hasTwitterEmbed = markdown.includes('twitter-tweet')

  useEffect(() => {
    if (!hasTwitterEmbed) return

    const scriptSrc = 'https://platform.twitter.com/widgets.js'
    const renderWidgets = () => {
      window.twttr?.widgets.load(containerRef.current ?? undefined)
    }

    if (window.twttr?.widgets) {
      renderWidgets()
      return
    }

    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${scriptSrc}"]`)
    if (existingScript) {
      existingScript.addEventListener('load', renderWidgets, { once: true })
      return () => {
        existingScript.removeEventListener('load', renderWidgets)
      }
    }

    // Twitter ウィジェットスクリプトを読み込み、ロード後に明示的に描画
    const script = document.createElement('script')
    script.src = scriptSrc
    script.async = true
    script.charset = 'utf-8'
    script.addEventListener('load', renderWidgets, { once: true })
    document.body.appendChild(script)

    return () => {
      script.removeEventListener('load', renderWidgets)
    }
  }, [hasTwitterEmbed])

  if (!markdown.trim()) return null

  return (
    <div ref={containerRef} className={`rich-text max-w-none ${className}`}>
      <Markdown content={markdown} />
    </div>
  )
}
