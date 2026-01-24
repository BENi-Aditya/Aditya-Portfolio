import { motion } from "framer-motion";
import { SocialLinks } from "./SocialLinks";

interface HeaderProps {
  scrollProgress: number;
}

export const Header = ({ scrollProgress }: HeaderProps) => {
  const showHeader = scrollProgress > 0.05;

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: showHeader ? 0 : -100, 
        opacity: showHeader ? 1 : 0 
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
            <span className="text-primary font-bold text-sm">HB</span>
          </div>
          <span className="font-semibold text-foreground text-sm">
            <span className="text-primary">HORN</span>BILL
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {["Systems", "Physics", "Design", "Recognition"].map((item) => (
            <button
              key={item}
              className="text-xs uppercase tracking-widest text-muted-foreground hover:text-secondary transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Social Links */}
        <SocialLinks variant="header" />
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
    </motion.header>
  );
};