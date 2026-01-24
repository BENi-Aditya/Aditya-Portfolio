import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

interface TrajectoryVisualProps {
  isActive: boolean;
}

export const TrajectoryVisual = ({ isActive }: TrajectoryVisualProps) => {
  const seedControls = useAnimationControls();
  const [showImpact, setShowImpact] = useState(false);
  
  const visualDrift = 100;
  const visualHeight = 280;
  const animDuration = 1.5;

  useEffect(() => {
    if (isActive) {
      setShowImpact(false);
      seedControls.start({
        y: [0, visualHeight],
        x: [0, visualDrift],
        transition: { 
          duration: animDuration,
          ease: [0.25, 0.1, 0.25, 1]
        }
      }).then(() => {
        setShowImpact(true);
      });
    } else {
      seedControls.set({ y: 0, x: 0 });
      setShowImpact(false);
    }
  }, [isActive, seedControls]);

  return (
    <div className="relative w-full h-[400px]">
      {/* Ground line */}
      <motion.div 
        className="absolute bottom-10 left-0 right-0 h-px bg-secondary/40"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Ground grid pattern */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-10 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(90deg, hsl(185, 70%, 45%, 0.3) 1px, transparent 1px),
            linear-gradient(hsl(185, 70%, 45%, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "30px 10px",
        }}
      />
      
      {/* Target zone */}
      <motion.div
        className="absolute bottom-10 w-8 h-8 -translate-x-1/2"
        style={{ left: `calc(25% + ${visualDrift}px)` }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.div 
          className="absolute inset-0 border-2 border-accent rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0.3, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div className="absolute inset-2 bg-accent/30 rounded-full" />
        <div className="absolute inset-3 bg-accent rounded-full" />
      </motion.div>
      
      {/* Drone position (top) */}
      <motion.div
        className="absolute top-8 left-[25%] -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <svg width="60" height="40" viewBox="0 0 60 40" className="drop-shadow-[0_0_15px_hsl(185,70%,45%,0.5)]">
          <rect x="20" y="15" width="20" height="10" rx="2" fill="none" stroke="hsl(185, 70%, 45%)" strokeWidth="1.5" />
          <line x1="20" y1="17" x2="5" y2="5" stroke="hsl(185, 70%, 45%)" strokeWidth="1.5" />
          <line x1="40" y1="17" x2="55" y2="5" stroke="hsl(185, 70%, 45%)" strokeWidth="1.5" />
          <line x1="20" y1="23" x2="5" y2="35" stroke="hsl(185, 70%, 45%)" strokeWidth="1.5" />
          <line x1="40" y1="23" x2="55" y2="35" stroke="hsl(185, 70%, 45%)" strokeWidth="1.5" />
          <circle cx="5" cy="5" r="3" fill="hsl(185, 70%, 45%)" />
          <circle cx="55" cy="5" r="3" fill="hsl(185, 70%, 45%)" />
          <circle cx="5" cy="35" r="3" fill="hsl(185, 70%, 45%)" />
          <circle cx="55" cy="35" r="3" fill="hsl(185, 70%, 45%)" />
        </svg>
      </motion.div>
      
      {/* Vectors */}
      <svg className="absolute inset-0 w-full h-full overflow-visible">
        {/* Gravity vector */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <defs>
            <marker
              id="arrowGravity"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="hsl(354, 65%, 48%)" />
            </marker>
            <marker
              id="arrowWind"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="hsl(185, 70%, 45%)" />
            </marker>
          </defs>
          
          {/* Gravity arrow (pointing down) */}
          <motion.line
            x1="25%"
            y1="70"
            x2="25%"
            y2="140"
            stroke="hsl(354, 65%, 48%)"
            strokeWidth="2"
            markerEnd="url(#arrowGravity)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
          <text x="27%" y="110" fill="hsl(354, 65%, 48%)" className="text-xs font-mono">
            g (gravity)
          </text>
          
          {/* Wind arrow (pointing right) */}
          <motion.line
            x1="25%"
            y1="70"
            x2="38%"
            y2="70"
            stroke="hsl(185, 70%, 45%)"
            strokeWidth="2"
            markerEnd="url(#arrowWind)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          />
          <text x="30%" y="62" fill="hsl(185, 70%, 45%)" className="text-xs font-mono">
            v_w (wind)
          </text>
        </motion.g>
        
        {/* Trajectory curve - dashed */}
        {isActive && (
          <motion.path
            d={`M 25% 70 Q 32% 180, 42% 345`}
            fill="none"
            stroke="hsl(160, 60%, 42%)"
            strokeWidth="2"
            strokeDasharray="8,4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        )}
      </svg>
      
      {/* Seed */}
      <motion.div
        className="absolute top-[70px] left-[25%] -translate-x-1/2 z-10"
        animate={seedControls}
      >
        <motion.div 
          className="w-5 h-5 rounded-full bg-gradient-to-br from-accent to-emerald-dark shadow-[0_0_20px_hsl(160,60%,42%,0.6)]"
          animate={isActive ? { 
            rotate: 360,
            scale: [1, 0.9, 1]
          } : {}}
          transition={{ 
            rotate: { duration: 1, repeat: Infinity, ease: "linear" },
            scale: { duration: 0.3, repeat: Infinity }
          }}
        />
      </motion.div>
      
      {/* Labels */}
      <motion.div
        className="absolute top-12 left-[25%] -translate-x-1/2 text-xs mono text-muted-foreground whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        h (altitude)
      </motion.div>
      
      {/* Impact effect */}
      {showImpact && (
        <motion.div
          className="absolute bottom-8 -translate-x-1/2"
          style={{ left: `calc(25% + ${visualDrift}px)` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent"
              initial={{ scale: 0.5, opacity: 0.8 }}
              animate={{ scale: 2 + i, opacity: 0 }}
              transition={{ duration: 1, delay: i * 0.15 }}
            />
          ))}
        </motion.div>
      )}
      
      {/* Impact label */}
      {isActive && (
        <motion.div
          className="absolute bottom-14 text-xs mono text-accent font-medium"
          style={{ left: `calc(25% + ${visualDrift}px)` }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: animDuration + 0.2 }}
        >
          Target Zone
        </motion.div>
      )}
    </div>
  );
};