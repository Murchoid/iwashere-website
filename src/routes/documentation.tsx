import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { ChevronRight, Menu, X, ExternalLink, Edit, Search } from 'lucide-react'
import Logo from '#/components/Logo'

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
              <Logo/>
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
              {/* Getting Started */}
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Getting Started
                </h4>
                <ul className="space-y-1">
                  {[
                    { href: '/documentation/what-is-iwashere', label: 'What is iwashere?' },
                    { href: '/documentation/installation', label: 'Installation' },
                    { href: '/documentation/quick-start', label: 'Quick Start (5 min)' },
                  ].map(item => (
                    <li key={item.href}>
                      <DocSidebarLink href={item.href}>{item.label}</DocSidebarLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Commands */}
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Commands
                </h4>
                <ul className="space-y-1">
                  {[
                    { href: '/documentation/init', label: 'init' },
                    { href: '/documentation/add', label: 'add' },
                    { href: '/documentation/show', label: 'show' },
                    { href: '/documentation/list', label: 'list' },
                    { href: '/documentation/edit', label: 'edit' },
                    { href: '/documentation/delete', label: 'delete' },
                    { href: '/documentation/branch', label: 'branch' },
                    { href: '/documentation/status', label: 'status' },
                  ].map(item => (
                    <li key={item.href}>
                      <DocSidebarLink href={item.href}>{item.label}</DocSidebarLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sessions */}
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Sessions
                </h4>
                <ul className="space-y-1">
                  {[
                    { href: '/documentation/session-overview', label: 'Overview' },
                    { href: '/documentation/session-start', label: 'start' },
                    { href: '/documentation/session-pause', label: 'pause' },
                    { href: '/documentation/session-continue', label: 'continue' },
                    { href: '/documentation/session-end', label: 'end' },
                  ].map(item => (
                    <li key={item.href}>
                      <DocSidebarLink href={item.href}>{item.label}</DocSidebarLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Tags
                </h4>
                <ul className="space-y-1">
                  {[
                    { href: '/documentation/tags/add', label: 'add' },
                    { href: '/documentation/tags/remove', label: 'remove' },
                    { href: '/documentation/tags/list', label: 'list' },
                  ].map(item => (
                    <li key={item.href}>
                      <DocSidebarLink href={item.href}>{item.label}</DocSidebarLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Git Integration */}
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Git Integration
                </h4>
                <ul className="space-y-1">
                  {[
                    { href: '/documentation/git/overview', label: 'Overview' },
                    { href: '/documentation/git/branch', label: 'Branch-aware notes' },
                  ].map(item => (
                    <li key={item.href}>
                      <DocSidebarLink href={item.href}>{item.label}</DocSidebarLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Configuration */}
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Configuration
                </h4>
                <ul className="space-y-1">
                  {[
                    { href: '/documentation/config/overview', label: 'Overview' },
                    { href: '/documentation/config/options', label: 'Options' },
                  ].map(item => (
                    <li key={item.href}>
                      <DocSidebarLink href={item.href}>{item.label}</DocSidebarLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Team Features */}
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Team Features
                </h4>
                <ul className="space-y-1">
                  {[
                    { href: '/documentation/team/sharing', label: 'Sharing notes' },
                    { href: '/documentation/team/setup', label: 'Team setup' },
                    { href: '/documentation/team/receiving', label: 'Receiving notes' },
                  ].map(item => (
                    <li key={item.href}>
                      <DocSidebarLink href={item.href}>{item.label}</DocSidebarLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* FAQ */}
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  FAQ / Troubleshooting
                </h4>
                <ul className="space-y-1">
                  {[
                    { href: '/documentation/faq/common-issues', label: 'Common issues' },
                    { href: '/documentation/faq/permissions', label: 'Permission problems' },
                    { href: '/documentation/faq/sessions', label: 'Session management' },
                  ].map(item => (
                    <li key={item.href}>
                      <DocSidebarLink href={item.href}>{item.label}</DocSidebarLink>
                    </li>
                  ))}
                </ul>
              </div>
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

              {/* On This Page - Right Sidebar (Desktop) */}
              <div className="hidden xl:block fixed right-8 top-20 w-56">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    On this page
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {['Overview', 'Installation', 'Basic Usage', 'Examples', 'Options'].map(item => (
                      <li key={item}>
                        <a
                          href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-muted-foreground hover:text-primary transition block truncate"
                          onClick={(e) => {
                            e.preventDefault()
                            document.getElementById(item.toLowerCase().replace(/\s+/g, '-'))?.scrollIntoView({ behavior: 'smooth' })
                          }}
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>

                  {/* Edit this page link */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <a
                      href="https://github.com/Murchoid/iwashere/edit/main/docs/page.md"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
                    >
                      <Edit className="w-4 h-4" />
                      Edit this page
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Logo/>
              </div>
              <p className="text-sm text-muted-foreground">
                Never lose your coding context again.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Documentation</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/documentation/getting-started" className="hover:text-primary">Getting Started</Link></li>
                <li><Link to="/documentation/commands" className="hover:text-primary">Commands</Link></li>
                <li><Link to="/documentation/sessions" className="hover:text-primary">Sessions</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/downloads" className="hover:text-primary">Downloads</Link></li>
                <li><Link to="/changelog" className="hover:text-primary">Changelog</Link></li>
                <li><a href="https://github.com/Murchoid/iwashere" className="hover:text-primary">GitHub</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Discord</a></li>
                <li><a href="#" className="hover:text-primary">Twitter</a></li>
                <li><a href="#" className="hover:text-primary">Report Issue</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} iwashere. MIT Licensed. Built with Go.
          </div>
        </div>
      </footer>
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