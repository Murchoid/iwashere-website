import { createFileRoute, notFound } from '@tanstack/react-router'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useEffect, useState } from 'react'
import { Edit } from 'lucide-react'
import { findDocItemBySlug } from '#/lib/docs.config'

// Import all MDX files (Vite's import.meta.glob)
const docFiles = import.meta.glob('/src/content/documentation/**/*.mdx', {
  query: '?raw',
  import: 'default',
})

export const Route = createFileRoute('/documentation/$slug')({
  loader: async ({ params }) => {
     const slug = params.slug
    
    // Find the doc item to get the proper title
    const docItem = findDocItemBySlug(slug)
    
    const filePath = Object.keys(docFiles).find(path => 
      path.includes(`${slug}.mdx`)
    )
    
    if (!filePath) {
      throw notFound()
    }
    
    const loader = docFiles[filePath]
    const content = await loader()
    
    return {
      content: content as string,
      title: docItem?.label || slug.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' '),
      slug,
    }
  },
  component: DocPage,
})

function DocPage() {
  const { content, slug } = Route.useLoaderData()
  const [headings, setHeadings] = useState<Array<{id: string, text: string, level: number}>>([])

  // Extract headings from markdown content
  useEffect(() => {
    const headingRegex = /^(#{2,3})\s+(.+)$/gm
    const matches = [...content.matchAll(headingRegex)]
    const extracted = matches.map(match => {
      const level = match[1].length // Number of # symbols
      const text = match[2].trim()
      // Create URL-friendly ID from heading text
      const id = text
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-')
      return { id, text, level }
    })
    setHeadings(extracted)
  }, [content])

  return (
    <div className="flex gap-8">
      {/* Main content */}
      <article className="prose prose-invert min-w-180 max-w-180 flex-1">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            const language = match ? match[1] : ''
            
            if (language) {
              return (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={language}
                  PreTag="div"
                  className="rounded-lg"
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              )
            }
            
            return (
              <code className="bg-code-bg text-code-text px-1 py-0.5 rounded" {...props}>
                {children}
              </code>
            )
          },
          // Style links
          a({ href, children }) {
            return (
              <a 
                href={href} 
                className="text-primary hover:underline"
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {children}
              </a>
            )
          },
          // Style tables
          table({ children }) {
            return (
              <div className="overflow-x-auto">
                <table className="border-collapse w-full">
                  {children}
                </table>
              </div>
            )
          },
          th({ children }) {
            return <th className="bg-muted p-2 text-left">{children}</th>
          },
          td({ children }) {
            return <td className="border border-border p-2">{children}</td>
          },
            h2({ children }) {
              const id = children?.toString()
                .toLowerCase()
                .replace(/[^\w\s]/g, '')
                .replace(/\s+/g, '-')
              return <h2 id={id}>{children}</h2>
            },
            h3({ children }) {
              const id = children?.toString()
                .toLowerCase()
                .replace(/[^\w\s]/g, '')
                .replace(/\s+/g, '-')
              return <h3 id={id}>{children}</h3>
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </article>

      {/* On This Page - Right Sidebar */}
      {headings.length > 0 && (
        <aside className="hidden xl:block w-56 flex-shrink-0 sticky top-0 right-5">
          <div className="sticky top-20 bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              On this page
            </h4>
            <ul className="space-y-2 text-sm">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    className={`
                      block truncate transition
                      ${heading.level === 3 ? 'pl-3 text-xs' : ''}
                      text-muted-foreground hover:text-primary
                    `}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(heading.id)?.scrollIntoView({ 
                        behavior: 'smooth' 
                      })
                    }}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>

            {/* Edit this page link */}
            <div className="mt-4 pt-4 border-t border-border">
              <a
                href={`https://github.com/Murchoid/iwashere-website/edit/main/src/content/documentation/${slug}.mdx`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
              >
                <Edit className="w-4 h-4" />
                Edit this page
              </a>
            </div>
          </div>
        </aside>
      )}
    </div>
  )
}