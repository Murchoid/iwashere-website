import { docSections } from '#/lib/docs.config'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/documentation/')({
  component: DocsIndexPage,
})

function DocsIndexPage() {
  // Take first item from each major section for the cards
  const featuredSections = docSections.slice(0, 6).map(section => ({
    title: section.title,
    description: getSectionDescription(section.title),
    href: section.items[0]?.href || '#',
  }))

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Documentation</h1>
      
      <p className="text-foreground/80 text-lg">
        Welcome to the iwashere documentation! Choose a topic below to get started.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {featuredSections.map((section) => (
          <Link 
            key={section.title}
            to={section.href} 
            className="block p-6 bg-card border border-border rounded-lg hover:border-primary transition group"
          >
            <h2 className="text-xl font-semibold mb-2 group-hover:text-primary">{section.title}</h2>
            <p className="text-muted-foreground">{section.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Need Help?</h2>
        <p className="text-foreground/80">
          Can't find what you're looking for? Check the{' '}
          <Link to="/documentation/faqs-common-issues" className="text-primary hover:underline">FAQ</Link>
          {' '}or{' '}
          <a href="https://github.com/Murchoid/iwashere/issues" className="text-primary hover:underline">open an issue</a>.
        </p>
      </div>
    </div>
  )
}

function getSectionDescription(title: string): string {
  const descriptions: Record<string, string> = {
    "Getting Started": "Learn how to install and initialize iwashere in your projects.",
    "Commands": "Complete reference for all iwashere commands.",
    "Sessions": "Manage work sessions to group related notes.",
    "Tags": "Organize your notes with tags.",
    "Git Integration": "How iwashere works with your git repositories.",
    "Team Features": "Share notes with your team securely.",
  }
  return descriptions[title] || `Learn about ${title.toLowerCase()} in iwashere.`
}