import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import { Link } from "@tanstack/react-router";


export default function Header() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          
          <Logo/>
          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="hover:text-primary transition-colors">
              Features
            </a>
            <a href="#install" className="hover:text-primary transition-colors">
              Install
            </a>
            <Link to="/documentation" className="hover:text-primary transition-colors">
              Documentation
            </Link>
            <a href="#" className="hover:text-primary transition-colors">
              GitHub
            </a>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
