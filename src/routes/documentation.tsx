import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { ChevronRight, Menu, X, ExternalLink, Edit, Search } from 'lucide-react'
import Logo from '#/components/Logo'
import Footer from '#/components/Footer'
import ThemeToggle from '#/components/ThemeToggle'
import { docSections } from '#/lib/docs.config'

export const Route = createFileRoute('/documentation')({
  component: DocsLayout,
})

function DocsLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <Logo />
            </Link>

            {/* Breadcrumb */}
            <nav className="hidden md:flex items-center text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition">Home</Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-foreground">Documentation</span>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center bg-muted rounded-md px-3 py-1.5 w-64">
              <Search className="w-4 h-4 text-muted-foreground mr-2" />
              <input
                type="text"
                placeholder="Search docs..."
                className="bg-transparent border-none outline-none text-sm w-full text-foreground placeholder-muted-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* GitHub link */}
            <a
              href="https://github.com/Murchoid/iwashere"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition"
            >
              GitHub <ExternalLink className="w-3 h-3" />
            </a>

            <ThemeToggle />
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8 relative">
          {/* Sidebar */}
          <aside className={`
            fixed md:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 
            bg-card border-r border-border 
            transition-transform duration-300 z-40
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            overflow-y-auto p-4
          `}>
            <nav className="space-y-6">
              {docSections.map((section) => (
                <div key={section.title}>
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    {section.title}
                  </h4>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item.href}>
                        <DocSidebarLink href={item.href}>{item.label}</DocSidebarLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 md:ml-10 min-w-50">
            <div className="max-w-2xl ">
              {/* Content Area with Typography */}
              <article className="prose prose-invert max-w-none
                prose-headings:scroll-mt-20
                prose-headings:text-foreground
                prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-4
                prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-3
                prose-h3:text-xl prose-h3:font-medium prose-h3:mt-6 prose-h3:mb-2
                prose-p:text-foreground/80 prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground prose-strong:font-semibold
                prose-code:bg-code-bg prose-code:text-code-text prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-code-bg prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                prose-pre:border prose-pre:border-border
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
                prose-ul:list-disc prose-ul:pl-6
                prose-ol:list-decimal prose-ol:pl-6
                prose-li:text-foreground/80
                prose-table:w-full prose-table:border-collapse
                prose-th:bg-muted prose-th:p-2 prose-th:text-left
                prose-td:border prose-td:border-border prose-td:p-2
              ">
                {/* This is where your markdown content goes */}
                <Outlet />
              </article>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}

// Sidebar Link Component
function DocSidebarLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isActive = location.pathname === href

  return (
    <Link
      to={href}
      className={`
        block px-3 py-1.5 text-sm rounded-md transition
        ${isActive
          ? 'bg-primary/10 text-primary font-medium'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
        }
      `}
    >
      {children}
    </Link>
  )
}