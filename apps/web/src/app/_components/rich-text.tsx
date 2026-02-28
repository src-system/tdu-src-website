'use client'

import { Markdown } from '@/src/app/_components/markdown'
import { isValidLexicalContent, lexicalToMarkdown } from '@/src/app/_lib/lexical-utils'

export type LexicalContent = { root?: { children?: unknown[] } } | null | undefined

type RichTextProps = {
  content: LexicalContent
  className?: string
}

/** Payload の Lexical richText を Markdown コンポーネントで表示 */
export const RichText = ({ content, className = '' }: RichTextProps) => {
  if (!isValidLexicalContent(content)) return null

  const markdown = lexicalToMarkdown(content)
  if (!markdown.trim()) return null

  return (
    <div className={`rich-text max-w-none ${className}`}>
      <Markdown content={markdown} />
    </div>
  )
}
