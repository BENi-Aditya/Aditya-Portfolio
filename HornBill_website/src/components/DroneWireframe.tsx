import { motion } from "framer-motion";

interface DroneWireframeProps {
  isFlying?: boolean;
  altitude?: number;
  scale?: number;
}

export const DroneWireframe = ({ isFlying = true, altitude = 0, scale = 1 }: DroneWireframeProps) => {
  return (
    <motion.div 
      className="relative"
      style={{ 
        transform: `scale(${scale})`,
        transformOrigin: "center center"
      }}
      animate={isFlying ? {
        y: [0, -8, 0],
      } : {}}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* SVG Drone Wireframe */}
      <svg
        width="200"
        height="120"
        viewBox="0 0 200 120"
        className="drop-shadow-[0_0_30px_hsl(354,72%,50%,0.4)]"
      >
        {/* Main body */}
        <motion.rect
          x="70"
          y="45"
          width="60"
          height="30"
          rx="4"
          fill="none"
          stroke="hsl(354, 72%, 50%)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        
        {/* Central core */}
        <motion.circle
          cx="100"
          cy="60"
          r="8"
          fill="hsl(354, 72%, 50%, 0.2)"
          stroke="hsl(354, 72%, 50%)"
          strokeWidth="1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />
        
        {/* Arms */}
        {[
          { x1: 70, y1: 50, x2: 30, y2: 25 },
          { x1: 130, y1: 50, x2: 170, y2: 25 },
          { x1: 70, y1: 70, x2: 30, y2: 95 },
          { x1: 130, y1: 70, x2: 170, y2: 95 },
        ].map((arm, i) => (
          <motion.line
            key={i}
            x1={arm.x1}
            y1={arm.y1}
            x2={arm.x2}
            y2={arm.y2}
            stroke="hsl(354, 72%, 50%)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
          />
        ))}
        
        {/* Propellers */}
        {[
          { cx: 30, cy: 25 },
          { cx: 170, cy: 25 },
          { cx: 30, cy: 95 },
          { cx: 170, cy: 95 },
        ].map((prop, i) => (
          <g key={i}>
            {/* Propeller hub */}
            <motion.circle
              cx={prop.cx}
              cy={prop.cy}
              r="4"
              fill="hsl(354, 72%, 50%)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, duration: 0.3 }}
            />
            
            {/* Propeller blades (animated) */}
            <motion.ellipse
              cx={prop.cx}
              cy={prop.cy}
              rx="18"
              ry="3"
              fill="hsl(354, 72%, 50%, 0.3)"
              stroke="hsl(354, 72%, 50%)"
              strokeWidth="0.5"
              animate={isFlying ? {
                rotate: 360
              } : {}}
              transition={{
                duration: 0.1,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ transformOrigin: `${prop.cx}px ${prop.cy}px` }}
            />
          </g>
        ))}
        
        {/* Camera/payload indicator */}
        <motion.rect
          x="92"
          y="75"
          width="16"
          height="12"
          rx="2"
          fill="hsl(354, 72%, 50%, 0.3)"
          stroke="hsl(354, 72%, 50%)"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        />
        
        {/* LED indicators */}
        {[
          { cx: 75, cy: 50 },
          { cx: 125, cy: 50 },
        ].map((led, i) => (
          <motion.circle
            key={i}
            cx={led.cx}
            cy={led.cy}
            r="2"
            fill="hsl(354, 72%, 50%)"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </svg>
      
      {/* Glow effect under drone */}
      <motion.div 
        className="absolute left-1/2 -bottom-4 -translate-x-1/2 w-32 h-4 rounded-full bg-primary/20 blur-lg"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};