import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface PhysicsCalculationProps {
  isActive: boolean;
}

export const PhysicsCalculation = ({ isActive }: PhysicsCalculationProps) => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    if (!isActive) {
      setStep(0);
      return;
    }
    
    const timer = setInterval(() => {
      setStep(prev => Math.min(prev + 1, 4));
    }, 700);
    
    return () => clearInterval(timer);
  }, [isActive]);

  const stepVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div 
      className="glass-panel p-6 max-w-md"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 border-b border-secondary/20 pb-3">
        <div className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
        <h3 className="text-sm uppercase tracking-widest text-secondary font-medium">
          Trajectory Calculation
        </h3>
      </div>

      <div className="space-y-4 font-mono text-sm">
        {/* Variables definition */}
        <motion.div
          variants={stepVariants}
          initial="hidden"
          animate={step >= 0 ? "visible" : "hidden"}
          transition={{ duration: 0.4 }}
          className="space-y-1"
        >
          <span className="tech-label block mb-2">Variables:</span>
          <div className="pl-4 space-y-1 text-muted-foreground">
            <p>Altitude: <span className="text-secondary">h</span> <span className="text-muted-foreground/50">(measured at drop)</span></p>
            <p>Wind Speed: <span className="text-secondary">v<sub>w</sub></span> <span className="text-muted-foreground/50">(sensor reading)</span></p>
            <p>Gravity: <span className="text-secondary">g</span> ≈ 9.81 m/s²</p>
          </div>
        </motion.div>

        {/* Fall time formula */}
        <motion.div
          variants={stepVariants}
          initial="hidden"
          animate={step >= 1 ? "visible" : "hidden"}
          transition={{ duration: 0.4 }}
          className="space-y-2 pt-3 border-t border-secondary/10"
        >
          <span className="tech-label block mb-2">Time to fall:</span>
          <div className="pl-4 space-y-2">
            <p className="text-muted-foreground">
              Using free-fall equation:
            </p>
            <p className="text-lg text-foreground bg-muted/30 px-3 py-2 rounded-lg inline-block">
              t = √(2h / g)
            </p>
            <p className="text-muted-foreground/60 text-xs">
              Range: <span className="text-secondary">1.0s – 2.5s</span> depending on altitude
            </p>
          </div>
        </motion.div>

        {/* Horizontal drift formula */}
        <motion.div
          variants={stepVariants}
          initial="hidden"
          animate={step >= 2 ? "visible" : "hidden"}
          transition={{ duration: 0.4 }}
          className="space-y-2 pt-3 border-t border-secondary/10"
        >
          <span className="tech-label block mb-2">Horizontal drift:</span>
          <div className="pl-4 space-y-2">
            <p className="text-muted-foreground">
              Wind displacement during fall:
            </p>
            <p className="text-lg text-foreground bg-muted/30 px-3 py-2 rounded-lg inline-block">
              d = v<sub>w</sub> × t
            </p>
            <p className="text-muted-foreground/60 text-xs">
              Range: <span className="text-secondary">0.5m – 8m</span> typical conditions
            </p>
          </div>
        </motion.div>

        {/* Compensation */}
        <motion.div
          variants={stepVariants}
          initial="hidden"
          animate={step >= 3 ? "visible" : "hidden"}
          transition={{ duration: 0.4 }}
          className="space-y-2 pt-3 border-t border-secondary/10"
        >
          <span className="tech-label block mb-2">Drop Compensation:</span>
          <div className="pl-4 space-y-2">
            <p className="text-lg text-foreground bg-muted/30 px-3 py-2 rounded-lg inline-block">
              offset = d (upwind)
            </p>
            <p className="text-muted-foreground/60 text-xs">
              Drone positions <span className="text-secondary">d</span> meters upwind before release
            </p>
          </div>
        </motion.div>

        {/* Final result */}
        <motion.div
          variants={stepVariants}
          initial="hidden"
          animate={step >= 4 ? "visible" : "hidden"}
          transition={{ duration: 0.4 }}
          className="pt-4 border-t border-secondary/30"
        >
          <div className="bg-secondary/10 rounded-lg p-4 border border-secondary/30">
            <p className="text-secondary font-semibold flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Dynamic offset applied based on real-time sensor data
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              All values computed on-device using Raspberry Pi
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};