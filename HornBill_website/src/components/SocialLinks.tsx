import { motion } from "framer-motion";
import { Github, Youtube } from "lucide-react";

interface SocialLinksProps {
  variant?: "header" | "hero" | "footer";
  className?: string;
}

const links = {
  youtube: "https://www.youtube.com/watch?v=Dli05LBOTP0&t=9s",
  github: "https://github.com/BENi-Aditya/Drone_Brain",
};

export const SocialLinks = ({ variant = "header", className = "" }: SocialLinksProps) => {
  if (variant === "hero") {
    return (
      <motion.div 
        className={`flex items-center gap-4 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <a 
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-border hover:border-secondary hover:bg-secondary/10 transition-all duration-300 group"
        >
          <Github className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">View Code</span>
        </a>
        <a 
          href={links.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-all duration-300 group"
        >
          <Youtube className="w-5 h-5 text-primary group-hover:text-primary transition-colors" />
          <span className="text-sm text-primary group-hover:text-primary transition-colors">Watch Demo</span>
        </a>
      </motion.div>
    );
  }

  if (variant === "footer") {
    return (
      <div className={`flex items-center justify-center gap-4 ${className}`}>
        <a 
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <Github className="w-5 h-5 text-muted-foreground transition-colors" />
        </a>
        <a 
          href={links.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <Youtube className="w-5 h-5 text-muted-foreground transition-colors" />
        </a>
      </div>
    );
  }

  // Header variant
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <a 
        href={links.github}
        target="_blank"
        rel="noopener noreferrer"
        className="social-link"
      >
        <Github className="w-4 h-4 text-muted-foreground transition-colors" />
      </a>
      <a 
        href={links.youtube}
        target="_blank"
        rel="noopener noreferrer"
        className="social-link"
      >
        <Youtube className="w-4 h-4 text-muted-foreground transition-colors" />
      </a>
    </div>
  );
};