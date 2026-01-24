import { motion } from "framer-motion";

export const SeedBombVisual = () => {
  return (
    <div className="relative w-64 h-64">
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      {/* Rotating seed bomb */}
      <motion.div
        className="absolute inset-4"
        animate={{ rotateY: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Main sphere */}
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <radialGradient id="seedGradient" cx="30%" cy="30%">
              <stop offset="0%" stopColor="hsl(354, 72%, 60%)" />
              <stop offset="50%" stopColor="hsl(354, 63%, 40%)" />
              <stop offset="100%" stopColor="hsl(354, 63%, 25%)" />
            </radialGradient>
            <filter id="seedGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Outer shell */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="url(#seedGradient)"
            filter="url(#seedGlow)"
            opacity="0.9"
          />
          
          {/* Clay texture lines */}
          {[20, 40, 60, 80, 100, 120, 140, 160, 180].map((y, i) => (
            <motion.ellipse
              key={i}
              cx="100"
              cy={y}
              rx={Math.sqrt(80 * 80 - Math.pow(y - 100, 2)) || 0}
              ry="2"
              fill="none"
              stroke="hsl(354, 72%, 70%)"
              strokeWidth="0.5"
              opacity="0.3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: i * 0.1 }}
            />
          ))}
          
          {/* Inner core indicator */}
          <circle
            cx="100"
            cy="100"
            r="35"
            fill="none"
            stroke="hsl(120, 40%, 45%)"
            strokeWidth="2"
            strokeDasharray="5,3"
            opacity="0.6"
          />
          
          {/* Seeds inside (dots) */}
          {[
            { x: 85, y: 90 },
            { x: 105, y: 95 },
            { x: 95, y: 110 },
            { x: 110, y: 105 },
            { x: 90, y: 105 },
          ].map((pos, i) => (
            <motion.circle
              key={i}
              cx={pos.x}
              cy={pos.y}
              r="4"
              fill="hsl(40, 60%, 50%)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            />
          ))}
        </svg>
      </motion.div>
      
      {/* Labels */}
      <motion.div
        className="absolute -right-32 top-8 flex items-center gap-2"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="w-12 h-px bg-primary/50" />
        <span className="text-xs mono text-muted-foreground whitespace-nowrap">
          Protective Clay Shell
        </span>
      </motion.div>
      
      <motion.div
        className="absolute -right-28 top-1/2 flex items-center gap-2"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="w-8 h-px bg-green-500/50" />
        <span className="text-xs mono text-muted-foreground whitespace-nowrap">
          Nutrient Compost
        </span>
      </motion.div>
      
      <motion.div
        className="absolute -right-24 bottom-16 flex items-center gap-2"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="w-4 h-px bg-yellow-500/50" />
        <span className="text-xs mono text-muted-foreground whitespace-nowrap">
          Native Seeds
        </span>
      </motion.div>
    </div>
  );
};