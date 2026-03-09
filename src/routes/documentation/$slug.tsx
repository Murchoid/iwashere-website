import { createFileRoute, notFound } from '@tanstack/react-router'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

// Import all MDX files (Vite's import.meta.glob)
const docFiles = import.meta.glob('/src/content/documentation/**/*.mdx', {
  query: '?raw',
  import: 'default',
})

export const Route = createFileRoute('/documentation/$slug')({
  loader: async ({ params }) => {
    const slug = params.slug
    
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
      title: slug.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
    }
  },
  component: DocPage,
})

function DocPage() {
  const { content, title } = Route.useLoaderData()
  
  return (
    <article className="prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Syntax highlighting for code blocks
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
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}