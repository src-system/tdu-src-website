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

function getYoutubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url)
    let videoId: string | null = null
    if (u.hostname === 'youtu.be') {
      videoId = u.pathname.slice(1).split('/')[0]
    } else if (u.hostname.includes('youtube.com')) {
      videoId = u.searchParams.get('v')
    }
    if (!videoId) return null
    const start = u.searchParams.get('t')
    return `https://www.youtube.com/embed/${videoId}${start ? `?start=${start}` : ''}`
  } catch {
    return null
  }
}

function getSoundcloudEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname === 'soundcloud.com' || u.hostname === 'www.soundcloud.com') {
      return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`
    }
  } catch {
    return null
  }
  return null
}

function toEmbedHtml(url: string): string | null {
  const youtubeEmbed = getYoutubeEmbedUrl(url)
  if (youtubeEmbed) {
    return `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1rem 0;border-radius:0.5rem;"><iframe src="${youtubeEmbed}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;border-radius:0.5rem;" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe></div>\n\n`
  }
  const soundcloudEmbed = getSoundcloudEmbedUrl(url)
  if (soundcloudEmbed) {
    return `<iframe src="${soundcloudEmbed}" width="100%" height="166" style="margin:1rem 0;border:0;border-radius:0.5rem;" scrolling="no" allow="autoplay"></iframe>\n\n`
  }
  return null
}

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
  if (type === 'link' || type === 'autolink') {
    const fields = node.fields as { url?: string; newTab?: boolean } | undefined
    const url = fields?.url ?? node.url ?? '#'
    // リンクテキストが URL と同じ（単独で貼り付けた URL）場合は embed に変換
    const trimmedChild = childMd.trim()
    if (trimmedChild === url || trimmedChild === '') {
      const embedHtml = toEmbedHtml(url)
      if (embedHtml) return embedHtml
    }
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
