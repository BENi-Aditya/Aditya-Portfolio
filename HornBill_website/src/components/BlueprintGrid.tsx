import { motion } from "framer-motion";

export const BlueprintGrid = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Main grid pattern */}
      <div 
        className="absolute inset-0 blueprint-grid"
        style={{
          backgroundSize: "60px 60px",
        }}
      />
      
      {/* Larger grid overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(hsl(354, 72%, 50%, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, hsl(354, 72%, 50%, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "240px 240px",
        }}
      />
      
      {/* Animated pulse nodes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/20"
          style={{
            left: `${(i % 4) * 25 + 12.5}%`,
            top: `${Math.floor(i / 4) * 50 + 25}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
      
      {/* Radial glow overlay */}
      <div className="absolute inset-0 bg-radial-glow opacity-50" />
      
      {/* Vignette effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, hsl(240, 10%, 4%) 100%)",
        }}
      />
    </div>
  );
};