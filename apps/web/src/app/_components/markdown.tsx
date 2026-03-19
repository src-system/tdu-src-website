import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

type MarkdownProps = {
  content: string
}

const headingLShape =
  'relative pl-4 pb-2 border-b-[5px] border-l-[5px] border-mint rounded-bl-[10px] font-noto font-semibold'

const headingUnderline =
  'inline-block px-1 pb-0.5 border-b-[3px] border-mint font-noto font-semibold'

export const Markdown = ({ content }: MarkdownProps) => {
  return (
    <div className="max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          h1: ({ children }) => (
            <h1 className={`${headingLShape} text-3xl md:text-4xl mt-8 mb-4`}>{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className={`${headingLShape} text-2xl md:text-3xl mt-7 mb-3`}>{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className={`${headingUnderline} text-xl md:text-2xl mt-6 mb-3`}>{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className={`${headingUnderline} text-xl md:text-lg mt-5 mb-2`}>{children}</h4>
          ),
          h5: ({ children }) => (
            <h5 className={`${headingUnderline} text-lg md:text-base mt-4 mb-2`}>{children}</h5>
          ),
          h6: ({ children }) => (
            <h6 className={`${headingUnderline} text-lg md:text-base mt-4 mb-2`}>{children}</h6>
          ),
          p: ({ children }) => (
            <p className="text-base md:text-xl leading-relaxed font-medium mb-4 mt-1.5">
              {children}
            </p>
          ),
          ul: ({ children }) => <ul className="list-disc pl-6 my-4 space-y-2">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-6 my-4 space-y-2">{children}</ol>,
          li: ({ children }) => (
            <li className="text-base md:text-xl leading-relaxed font-medium">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-forest pl-4 my-4 italic text-charcoal">
              {children}
            </blockquote>
          ),
          pre: ({ children }) => (
            <pre className="bg-[#f6f8fa] border border-[#f6f8fa] rounded-lg p-4 my-4 overflow-x-auto">
              {children}
            </pre>
          ),
          code: ({ className, children }) => {
            const isInline = !className
            return isInline ? (
              <code className="bg-[#f6f8fa] px-1.5 py-0.5 rounded text-sm text-[#24292e]">
                {children}
              </code>
            ) : (
              <code className={`${className} bg-transparent text-[#24292e]`}>{children}</code>
            )
          },
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border-collapse border border-gray-300">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-left text-base md:text-xl font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-300 px-4 py-2 text-base md:text-xl font-medium">
              {children}
            </td>
          ),
          a: ({ href, children }) => (
            <a href={href} className="text-forest underline hover:text-leaf transition-colors">
              {children}
            </a>
          ),
          img: ({ src, alt }) =>
            src && typeof src === 'string' ? (
              <Image
                src={src}
                alt={alt ?? ''}
                width={800}
                height={600}
                style={{ width: '100%', height: 'auto' }}
                className="rounded-lg my-8"
              />
            ) : null,
          hr: () => <hr className="my-8 border-t-2 border-gray-200" />,
          details: ({ children }) => (
            <details className="my-4 border border-gray-300 rounded-lg p-4">{children}</details>
          ),
          summary: ({ children }) => (
            <summary className="text-base md:text-xl font-semibold cursor-pointer">
              {children}
            </summary>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
