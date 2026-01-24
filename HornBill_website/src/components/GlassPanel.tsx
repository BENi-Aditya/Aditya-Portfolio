import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassPanelProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  variant?: "default" | "strong" | "subtle";
  className?: string;
  glowColor?: "primary" | "accent" | "none";
}

export const GlassPanel = ({ 
  children, 
  variant = "default", 
  className,
  glowColor = "primary",
  ...props 
}: GlassPanelProps) => {
  const variants = {
    default: "glass-panel",
    strong: "glass-panel-strong",
    subtle: "glass-panel opacity-80",
  };
  
  const glowStyles = {
    primary: "shadow-[0_0_30px_hsl(354,72%,50%,0.2)]",
    accent: "shadow-[0_0_30px_hsl(354,85%,55%,0.3)]",
    none: "",
  };

  return (
    <motion.div
      className={cn(
        variants[variant],
        glowStyles[glowColor],
        "p-6",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      {...props}
    >
      {/* Inner glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};