import { Github, BookOpen, Download } from "lucide-react";
import Logo from "./Logo";
import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer className = "flex border-t border-border bg-card mt-12" >
      <div className="container mx-auto px-2 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Logo />
            </div>
            <p className="text-sm text-muted-foreground">
              Never lose your coding context again.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/documentation" className="hover:text-primary transition-colors inline-flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Documentation
                </Link>
              </li>
              <li>
                <a href="https://github.com/Murchoid/iwashere/releases/latest" className="hover:text-primary transition-colors inline-flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Downloads
                </a>
              </li>
              <li>
                <a href="https://github.com/Murchoid/iwashere" className="hover:text-primary transition-colors inline-flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Documentation</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/documentation/getting-started" className="hover:text-primary">Getting Started</Link></li>
              <li><Link to="/documentation/commands" className="hover:text-primary">Commands</Link></li>
              <li><Link to="/documentation/session-overview" className="hover:text-primary">Sessions</Link></li>
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
    </footer >
  );
}
