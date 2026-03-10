import { docSections } from "./docs.config"

const docFiles = import.meta.glob('/src/content/documentation/**/*.mdx', {
  query: '?raw',
  import: 'default',
})

export interface SearchResult {
  slug: string
  title: string
  section: string
  content: string
  excerpt: string
  matches: {
    inTitle: boolean
    inContent: boolean
  }
}

class SearchIndex {
  private documents: SearchResult[] = []
  private initialized = false

  async initialize() {
    if (this.initialized) return

    const loadPromises = Object.entries(docFiles).map(async ([path, loader]) => {
      // Extract slug from path
      // /src/content/documentation/what-is-iwashere.mdx -> what-is-iwashere
      const slug = path.split('/').pop()?.replace('.mdx', '') || ''
      
      // Find the corresponding doc item to get title and section
      let title = slug.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
      let section = ''

      // Find section from config
      for (const sec of docSections) {
        const item = sec.items.find(i => i.slug === slug)
        if (item) {
          title = item.label
          section = sec.title
          break
        }
      }

      // Load content
      const content = await loader() as string
      
      // Strip markdown syntax for better searching
      const plainText = content
        .replace(/#{1,6}\s+/g, '') // Remove headings
        .replace(/`{3}[\s\S]*?`{3}/g, '') // Remove code blocks
        .replace(/`([^`]+)`/g, '$1') // Remove inline code
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Replace links with text
        .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
        .replace(/\*([^*]+)\*/g, '$1') // Remove italic
        .trim()

      // Create excerpt (first 200 chars of plain text)
      const excerpt = plainText.slice(0, 200) + (plainText.length > 200 ? '...' : '')

      this.documents.push({
        slug,
        title,
        section,
        content: plainText.toLowerCase(),
        excerpt,
        matches: { inTitle: false, inContent: false }
      })
    })

    await Promise.all(loadPromises)
    this.initialized = true
    console.log(`Search index initialized with ${this.documents.length} documents`)
  }

  search(query: string): SearchResult[] {
    if (!query.trim() || !this.initialized) return []

    const searchTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 1)
    
    // Score and filter results
    const results = this.documents
      .map(doc => {
        const titleLower = doc.title.toLowerCase()
        const contentLower = doc.content
        
        let score = 0
        const matches = { inTitle: false, inContent: false }
        
        for (const term of searchTerms) {
          // Title matches (higher score)
          if (titleLower.includes(term)) {
            score += 10
            matches.inTitle = true
          }
          
          // Content matches
          const contentMatches = (contentLower.match(new RegExp(term, 'g')) || []).length
          if (contentMatches > 0) {
            score += contentMatches
            matches.inContent = true
          }
        }
        
        return { ...doc, score, matches }
      })
      .filter(doc => doc.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ score, ...doc }) => doc) // Remove score from final result
      .slice(0, 10) // Limit to 10 results

    return results
  }

  getDocumentCount() {
    return this.documents.length
  }
}

export const searchIndex = new SearchIndex()