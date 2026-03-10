import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/documentation/')({
  component: DocsIndexPage,
})

function DocsIndexPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Documentation</h1>
      
      <p className="text-foreground/80 text-lg">
        Welcome to the iwashere documentation! Choose a topic below to get started.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Getting Started Card */}
        <Link to="/documentation/getting-started" className="block p-6 bg-card border border-border rounded-lg hover:border-primary transition group">
          <h2 className="text-xl font-semibold mb-2 group-hover:text-primary">Getting Started</h2>
          <p className="text-muted-foreground">Learn how to install and initialize iwashere in your projects.</p>
        </Link>

        {/* Commands Card */}
        <Link to="/documentation/commands-overview" className="block p-6 bg-card border border-border rounded-lg hover:border-primary transition group">
          <h2 className="text-xl font-semibold mb-2 group-hover:text-primary">Commands</h2>
          <p className="text-muted-foreground">Complete reference for all iwashere commands.</p>
        </Link>

        {/* Sessions Card */}
        <Link to="/documentation/session-overview" className="block p-6 bg-card border border-border rounded-lg hover:border-primary transition group">
          <h2 className="text-xl font-semibold mb-2 group-hover:text-primary">Sessions</h2>
          <p className="text-muted-foreground">Manage work sessions to group related notes.</p>
        </Link>

        {/* Tags Card */}
        <Link to="/documentation/tags-overview" className="block p-6 bg-card border border-border rounded-lg hover:border-primary transition group">
          <h2 className="text-xl font-semibold mb-2 group-hover:text-primary">Tags</h2>
          <p className="text-muted-foreground">Organize your notes with tags.</p>
        </Link>

        {/* Git Integration Card */}
        <Link to="/documentation/git-overview" className="block p-6 bg-card border border-border rounded-lg hover:border-primary transition group">
          <h2 className="text-xl font-semibold mb-2 group-hover:text-primary">Git Integration</h2>
          <p className="text-muted-foreground">How iwashere works with your git repositories.</p>
        </Link>

        {/* Team Features Card */}
        <Link to="/documentation/sharing-overview" className="block p-6 bg-card border border-border rounded-lg hover:border-primary transition group">
          <h2 className="text-xl font-semibold mb-2 group-hover:text-primary">Team Features</h2>
          <p className="text-muted-foreground">Share notes with your team securely.</p>
        </Link>
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