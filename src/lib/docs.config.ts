// src/lib/docs-config.ts
export interface DocSection {
  title: string
  items: DocItem[]
}

export interface DocItem {
  label: string
  href: string
  slug: string  // For matching MDX files
}

// This single source of truth drives both the sidebar AND the routing
export const docSections: DocSection[] = [
  {
    title: "Getting Started",
    items: [
      { label: "What is iwashere?", href: "/documentation/what-is-iwashere", slug: "what-is-iwashere" },
      { label: "Installation", href: "/documentation/installation", slug: "installation" },
      { label: "Quick Start (5 min)", href: "/documentation/quick-start", slug: "quick-start" },
    ]
  },
  {
    title: "Commands",
    items: [
      { label: "Overview", href: "/documentation/commands-overview", slug: "commands-overview" },
      { label: "init", href: "/documentation/init", slug: "init" },
      { label: "add", href: "/documentation/add", slug: "add" },
      { label: "show", href: "/documentation/show", slug: "show" },
      { label: "list", href: "/documentation/list", slug: "list" },
      { label: "edit", href: "/documentation/edit", slug: "edit" },
      { label: "delete", href: "/documentation/delete", slug: "delete" },
      { label: "branch", href: "/documentation/branch", slug: "branch" },
      { label: "status", href: "/documentation/status", slug: "status" },
    ]
  },
  {
    title: "Sessions",
    items: [
      { label: "Overview", href: "/documentation/session-overview", slug: "session-overview" },
      { label: "start", href: "/documentation/session-start", slug: "session-start" },
      { label: "pause", href: "/documentation/session-pause", slug: "session-pause" },
      { label: "continue", href: "/documentation/session-continue", slug: "session-continue" },
      { label: "end", href: "/documentation/session-end", slug: "session-end" },
    ]
  },
  {
    title: "Tags",
    items: [
      { label: "Overview", href: "/documentation/tags-overview", slug: "tags-overview" },
      { label: "add", href: "/documentation/tags-add", slug: "tags-add" },
      { label: "remove", href: "/documentation/tags-remove", slug: "tags-remove" },
      { label: "list", href: "/documentation/tags-list", slug: "tags-list" },
    ]
  },
  {
    title: "Git Integration",
    items: [
      { label: "Overview", href: "/documentation/git-overview", slug: "git-overview" },
      { label: "Branch-aware notes", href: "/documentation/git-branch", slug: "git-branch" },
    ]
  },
  {
    title: "Configuration",
    items: [
      { label: "Overview", href: "/documentation/config-overview", slug: "config-overview" },
      { label: "Options", href: "/documentation/config-options", slug: "config-options" },
    ]
  },
  {
    title: "Team Features",
    items: [
      { label: "Overview", href: "/documentation/sharing-overview", slug: "sharing-overview" },
      { label: "Sharing notes", href: "/documentation/share", slug: "share" },
      { label: "Team setup", href: "/documentation/setup", slug: "setup" },
      { label: "Receiving notes", href: "/documentation/show-shared", slug: "show-shared" },
    ]
  },
  {
    title: "FAQ / Troubleshooting",
    items: [
      { label: "Common issues", href: "/documentation/faqs-common-issues", slug: "faqs-common-issues" },
      { label: "Permission problems", href: "/documentation/faqs-permissions", slug: "faqs-permissions" },
      { label: "Session management", href: "/documentation/faqs-sessions-management", slug: "faqs-sessions-management" },
    ]
  }
]

// Helper to find a doc item by slug
export function findDocItemBySlug(slug: string): DocItem | undefined {
  for (const section of docSections) {
    const found = section.items.find(item => item.slug === slug)
    if (found) return found
  }
  return undefined
}

// Helper to get all slugs (for generating routes)
export function getAllSlugs(): string[] {
  return docSections.flatMap(section => section.items.map(item => item.slug))
}