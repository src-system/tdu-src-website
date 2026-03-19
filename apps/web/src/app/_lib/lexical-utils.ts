type LexicalNode = {
  type?: string
  text?: string
  tag?: string
  listType?: string
  children?: LexicalNode[]
  format?: number | string | string[]
  fields?: { url?: string; newTab?: boolean }
  url?: string
  newTab?: boolean
  value?: {
    url?: string
    alt?: string
  }
  [key: string]: unknown
}

const CMS_PUBLIC_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001'

function resolveMediaUrl(url: string | null | undefined): string {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  const base = CMS_PUBLIC_URL.replace(/\/$/, '')
  return url.startsWith('/') ? `${base}${url}` : `${base}/${url}`
}

/** Lexicalコンテンツが有効か検証（parseEditorStateエラー防止） */
export function isValidLexicalContent(
  content: unknown,
): content is { root: { children: unknown[] } } {
  if (content == null || typeof content !== 'object') return false
  const c = content as { root?: { children?: unknown[] } }
  const children = c?.root?.children
  return Array.isArray(children) && children.length > 0
}

function isValidNode(node: unknown): node is LexicalNode {
  return node != null && typeof node === 'object' && (node as LexicalNode).type != null
}

function nodeToMarkdown(node: LexicalNode): string {
  const type = String(node.type ?? '')
  const children = (node.children ?? []).filter(isValidNode)
  const childMd = children.map(nodeToMarkdown).join('')

  if (type === 'text') {
    let text = node.text ?? ''
    const format = node.format
    const formatNum = typeof format === 'number' ? format : 0
    const formatStr =
      typeof format === 'string'
        ? format
        : Array.isArray(format)
          ? (format as string[]).join(',')
          : ''
    const FORMAT_BITMASK = {
      bold: 1,
      italic: 2,
      underline: 4,
      strikethrough: 8,
      code: 16,
    } as const
    const hasFormat = (name: keyof typeof FORMAT_BITMASK) =>
      formatStr.includes(name) || (formatNum & FORMAT_BITMASK[name]) !== 0

    if (hasFormat('code')) return `\`${text.replace(/`/g, '\\`')}\``
    if (hasFormat('bold')) text = `**${text}**`
    if (hasFormat('italic')) text = `*${text}*`
    if (hasFormat('strikethrough')) text = `~~${text}~~`
    if (hasFormat('underline')) text = `<u>${text}</u>`
    return text
  }

  if (type === 'paragraph') return childMd ? `${childMd}\n\n` : '\n\n'
  if (type === 'heading') {
    const tag = node.tag ?? 'h2'
    const level = parseInt(String(tag).replace(/\D/g, '') || '2', 10)
    const prefix = '#'.repeat(Math.min(6, Math.max(1, level)))
    return `${prefix} ${childMd.trim()}\n\n`
  }
  if (type === 'list') {
    const isOrdered = node.listType === 'number'
    const items = children
      .map((c) => {
        const itemMd = c.children?.filter(isValidNode).map(nodeToMarkdown).join('').trim()
        return isOrdered ? `1. ${itemMd}` : `- ${itemMd}`
      })
      .join('\n')
    return `${items}\n\n`
  }
  if (type === 'listitem') return childMd
  if (type === 'blockquote') {
    const trimmed = childMd.trim()
    return `${
      trimmed
        ? trimmed
            .split('\n')
            .map((l) => `> ${l}`)
            .join('\n')
        : ''
    }\n\n`
  }
  if (type === 'link') {
    const fields = node.fields as { url?: string; newTab?: boolean } | undefined
    const url = fields?.url ?? node.url ?? '#'
    return `[${childMd}](${url})`
  }
  if (type === 'linebreak') return '\n'

  // 画像（upload）ノードのハンドリング
  if (type === 'upload') {
    const value = node.value as { url?: string; alt?: string } | undefined
    const url = resolveMediaUrl(value?.url)
    const alt = value?.alt ?? ''
    if (url) {
      return `![${alt}](${url})\n\n`
    }
    return ''
  }

  return childMd
}

export function lexicalToMarkdown(content: unknown): string {
  if (!isValidLexicalContent(content)) return ''
  const children = content.root.children.filter((node): node is LexicalNode => isValidNode(node))
  const md = children.map(nodeToMarkdown).join('')
  return md.trim()
}
