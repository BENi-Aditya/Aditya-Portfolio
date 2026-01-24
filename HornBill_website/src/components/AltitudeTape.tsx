import { motion } from "framer-motion";

interface AltitudeTapeProps {
  altitude: number;
  maxAltitude?: number;
}

export const AltitudeTape = ({ altitude, maxAltitude = 50 }: AltitudeTapeProps) => {
  const percentage = (altitude / maxAltitude) * 100;
  
  // Generate tick marks
  const ticks = [];
  for (let i = 0; i <= maxAltitude; i += 10) {
    ticks.push(i);
  }

  return (
    <div className="glass-panel p-3 h-[300px] w-16 flex flex-col items-center">
      {/* Header */}
      <span className="text-[10px] uppercase tracking-wider text-primary mb-2">ALT</span>
      
      {/* Tape container */}
      <div className="flex-1 w-full relative">
        {/* Background tape */}
        <div className="absolute inset-x-2 top-0 bottom-0 bg-muted/50 rounded" />
        
        {/* Tick marks */}
        {ticks.map((tick) => {
          const pos = 100 - (tick / maxAltitude) * 100;
          return (
            <div
              key={tick}
              className="absolute left-0 right-0 flex items-center"
              style={{ top: `${pos}%` }}
            >
              <div className="w-2 h-px bg-primary/40" />
              <span className="text-[8px] mono text-muted-foreground ml-1">
                {tick}
              </span>
            </div>
          );
        })}
        
        {/* Active altitude bar */}
        <motion.div
          className="absolute inset-x-2 bottom-0 bg-gradient-to-t from-primary to-accent rounded"
          initial={{ height: "0%" }}
          animate={{ height: `${percentage}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
        
        {/* Current altitude indicator */}
        <motion.div
          className="absolute left-0 right-0 flex items-center justify-center"
          style={{ bottom: `${percentage}%` }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-primary px-1.5 py-0.5 rounded text-[10px] mono font-bold text-primary-foreground shadow-lg">
            {altitude.toFixed(0)}m
          </div>
        </motion.div>
      </div>
    </div>
  );
};