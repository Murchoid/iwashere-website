import { useEffect, useState, useRef } from 'react'
import { Search, X, FileText, Tag, Loader2 } from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'
import { searchIndex, type SearchResult } from '#/lib/search-index'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      searchIndex.initialize().finally(() => {
        setIsLoading(false)
      })
      inputRef.current?.focus()
    } else {
      setQuery('')
      setResults([])
    }
  }, [isOpen])

  // Handle search
  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchIndex.search(query)
      setResults(searchResults)
      setSelectedIndex(0)
    } else {
      setResults([])
    }
  }, [query])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => Math.max(prev - 1, 0))
          break
        case 'Enter':
          e.preventDefault()
          if (results[selectedIndex]) {
            navigate({ to: `/documentation/${results[selectedIndex].slug}` })
            onClose()
          }
          break
        case 'Escape':
          onClose()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex, navigate, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto max-w-500">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen md:min-h-0 md:mt-20 md:mx-auto md:max-w-2xl">
        <div className="relative bg-card border border-border rounded-lg shadow-2xl overflow-hidden">
          {/* Search input */}
          <div className="flex items-center border-b border-border">
            <Search className="w-5 h-5 text-muted-foreground ml-4" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search documentation..."
              className="flex-1 px-4 py-4 bg-transparent text-foreground placeholder-muted-foreground outline-none text-lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="mr-2 p-1 hover:bg-muted rounded"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
            <button
              onClick={onClose}
              className="mr-4 px-2 py-1 text-xs font-mono text-muted-foreground border border-border rounded hover:bg-muted"
            >
              ESC
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
                <span className="ml-2 text-muted-foreground">Loading search index...</span>
              </div>
            ) : results.length > 0 ? (
              <div className="p-2">
                <div className="px-3 py-2 text-xs text-muted-foreground">
                  Found {results.length} results
                </div>
                {results.map((result, index) => (
                  <Link
                    key={result.slug}
                    to={`/documentation/${result.slug}`}
                    onClick={onClose}
                    className={`
                      block p-3 rounded-lg transition-colors
                      ${index === selectedIndex ? 'bg-primary/10' : 'hover:bg-muted'}
                    `}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-foreground truncate">
                            {result.title}
                          </h4>
                          {result.matches.inTitle && (
                            <span className="px-1.5 py-0.5 text-xs bg-primary/20 text-primary rounded">
                              Title match
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {result.excerpt}
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <Tag className="w-3 h-3" />
                          <span>{result.section}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : query ? (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">No results found for "{query}"</p>
                <p className="text-sm text-muted-foreground/60 mt-1">
                  Try different keywords or check your spelling
                </p>
              </div>
            ) : (
              <div className="py-12 text-center text-muted-foreground">
                Start typing to search documentation...
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border p-3 text-xs text-muted-foreground flex justify-between">
            <div className="flex items-center gap-4">
              <span>↑↓ to navigate</span>
              <span>↵ to select</span>
            </div>
            <span>{searchIndex.getDocumentCount()} documents indexed</span>
          </div>
        </div>
      </div>
    </div>
  )
}