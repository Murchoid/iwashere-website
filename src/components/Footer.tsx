import { Github, BookOpen, Download } from "lucide-react";
import Logo from "./Logo";
import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Tagline */}
          <Logo/>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to="/documentation" className="hover:text-primary transition-colors inline-flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Documentation
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors inline-flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Downloads
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors inline-flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Getting Started
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Community
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>© 2026 iwashere. Released under the MIT License.</p>
        </div>
      </div>
    </footer>
  );
}
