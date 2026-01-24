import { motion, useTransform, MotionValue } from "framer-motion";

interface PersistentDroneProps {
  scrollProgress: MotionValue<number>;
  currentSection: number;
}

export const PersistentDrone = ({ scrollProgress, currentSection }: PersistentDroneProps) => {
  // Drone position transforms based on scroll
  const droneX = useTransform(scrollProgress, [0, 0.3, 0.5, 0.7, 1], ["50%", "20%", "70%", "30%", "50%"]);
  const droneY = useTransform(scrollProgress, [0, 0.2, 0.5, 0.8, 1], ["40%", "25%", "35%", "20%", "60%"]);
  const droneScale = useTransform(scrollProgress, [0, 0.15, 0.3, 0.5, 0.7, 0.9, 1], [1, 0.7, 0.5, 0.8, 0.6, 0.4, 0.3]);
  const droneRotate = useTransform(scrollProgress, [0, 0.3, 0.5, 0.7, 1], [0, -5, 5, -3, 0]);
  const droneOpacity = useTransform(scrollProgress, [0, 0.03, 0.85, 0.95], [1, 1, 1, 0.3]);

  // Prop animation speed
  const propSpeed = 0.08;

  return (
    <motion.div
      className="fixed pointer-events-none z-40"
      style={{
        left: droneX,
        top: droneY,
        scale: droneScale,
        rotate: droneRotate,
        opacity: droneOpacity,
        x: "-50%",
        y: "-50%",
      }}
    >
      {/* Drone glow effect */}
      <div className="absolute inset-0 blur-3xl bg-secondary/20 scale-150" />
      
      {/* Drone SVG */}
      <svg 
        width="200" 
        height="120" 
        viewBox="0 0 200 120" 
        className="relative drop-shadow-[0_0_30px_hsl(185,70%,45%,0.4)]"
      >
        {/* Main body */}
        <motion.rect 
          x="70" y="45" width="60" height="30" rx="4" 
          fill="none" 
          stroke="hsl(185, 70%, 45%)" 
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />
        
        {/* Body detail lines */}
        <line x1="80" y1="55" x2="120" y2="55" stroke="hsl(185, 70%, 45%, 0.5)" strokeWidth="1" />
        <line x1="80" y1="65" x2="120" y2="65" stroke="hsl(185, 70%, 45%, 0.5)" strokeWidth="1" />
        
        {/* Camera lens */}
        <circle cx="100" cy="60" r="8" fill="none" stroke="hsl(354, 65%, 48%)" strokeWidth="1.5" />
        <circle cx="100" cy="60" r="4" fill="hsl(354, 65%, 48%, 0.5)" />
        
        {/* Arms */}
        <line x1="70" y1="50" x2="30" y2="25" stroke="hsl(185, 70%, 45%)" strokeWidth="2" />
        <line x1="130" y1="50" x2="170" y2="25" stroke="hsl(185, 70%, 45%)" strokeWidth="2" />
        <line x1="70" y1="70" x2="30" y2="95" stroke="hsl(185, 70%, 45%)" strokeWidth="2" />
        <line x1="130" y1="70" x2="170" y2="95" stroke="hsl(185, 70%, 45%)" strokeWidth="2" />
        
        {/* Motor housings */}
        {[
          { cx: 30, cy: 25 },
          { cx: 170, cy: 25 },
          { cx: 30, cy: 95 },
          { cx: 170, cy: 95 },
        ].map((pos, i) => (
          <g key={i}>
            <circle cx={pos.cx} cy={pos.cy} r="8" fill="hsl(240, 8%, 10%)" stroke="hsl(185, 70%, 45%)" strokeWidth="1.5" />
            {/* Spinning props */}
            <motion.ellipse
              cx={pos.cx}
              cy={pos.cy}
              rx="18"
              ry="3"
              fill="hsl(185, 70%, 45%, 0.4)"
              animate={{ rotate: 360 }}
              transition={{ duration: propSpeed, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: `${pos.cx}px ${pos.cy}px` }}
            />
            <motion.ellipse
              cx={pos.cx}
              cy={pos.cy}
              rx="18"
              ry="3"
              fill="hsl(185, 70%, 45%, 0.4)"
              animate={{ rotate: 360 }}
              transition={{ duration: propSpeed, repeat: Infinity, ease: "linear", delay: propSpeed / 2 }}
              style={{ transformOrigin: `${pos.cx}px ${pos.cy}px`, rotate: 90 }}
            />
          </g>
        ))}
        
        {/* LED indicators */}
        <motion.circle 
          cx="75" cy="48" r="2" 
          fill="hsl(160, 60%, 50%)"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <motion.circle 
          cx="125" cy="48" r="2" 
          fill="hsl(354, 65%, 50%)"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </svg>
      
      {/* Section indicator */}
      <motion.div 
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs mono text-secondary/50"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        SEC.{currentSection.toString().padStart(2, '0')}
      </motion.div>
    </motion.div>
  );
};