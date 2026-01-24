import { Github, Mail, Heart, Youtube } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border/50 relative">
      <div className="absolute inset-0 grid-bg-dots opacity-10" />
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-mono text-xl font-bold text-primary neon-text">BENi</span>
            <p className="text-sm text-muted-foreground">
              © {currentYear} Aditya Tripathi. Built with{" "}
              <Heart className="w-3 h-3 inline text-destructive" /> and lots of coffee.
            </p>
          </div>

          {/* Quick Links */}
          <nav className="flex items-center gap-6">
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <a href="#projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Projects
            </a>
            <a href="#startups" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Startups
            </a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/BENi-Aditya"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.youtube.com/@BENiTech-o8o/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="mailto:contact@example.com"
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Code Signature */}
        <div className="mt-8 text-center">
          <code className="text-xs text-muted-foreground/50 font-mono">
            {"</"}<span className="text-primary/50">BENi</span>{">"}
          </code>
        </div>
      </div>
    </footer>
  );
}
