import { motion } from "framer-motion";

interface TelemetryItemProps {
  label: string;
  value: string | number;
  unit?: string;
  status?: "active" | "warning" | "nominal";
}

const TelemetryItem = ({ label, value, unit, status = "nominal" }: TelemetryItemProps) => {
  const statusColors = {
    active: "text-primary",
    warning: "text-yellow-500",
    nominal: "text-foreground",
  };

  return (
    <motion.div 
      className="flex flex-col"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="tech-label">{label}</span>
      <div className="flex items-baseline">
        <span className={`telemetry-value ${statusColors[status]}`}>
          {value}
        </span>
        {unit && <span className="telemetry-unit">{unit}</span>}
      </div>
    </motion.div>
  );
};

interface TelemetryDisplayProps {
  altitude: number;
  velocity: number;
  heading: number;
  mode: string;
}

export const TelemetryDisplay = ({ 
  altitude, 
  velocity, 
  heading, 
  mode 
}: TelemetryDisplayProps) => {
  return (
    <motion.div 
      className="glass-panel p-4 space-y-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-primary/20 pb-2">
        <span className="text-xs uppercase tracking-widest text-primary font-medium">
          Telemetry
        </span>
        <motion.div 
          className="w-2 h-2 rounded-full bg-primary"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
      
      {/* Grid of values */}
      <div className="grid grid-cols-2 gap-4">
        <TelemetryItem 
          label="Altitude" 
          value={altitude.toFixed(1)} 
          unit="m"
          status="active"
        />
        <TelemetryItem 
          label="Velocity" 
          value={velocity.toFixed(1)} 
          unit="m/s"
        />
        <TelemetryItem 
          label="Heading" 
          value={heading} 
          unit="°"
        />
        <TelemetryItem 
          label="Mode" 
          value={mode}
          status="active"
        />
      </div>
      
      {/* Status bar */}
      <div className="flex items-center gap-2 pt-2 border-t border-primary/10">
        <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: "0%" }}
            animate={{ width: "85%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
        <span className="text-xs mono text-muted-foreground">85%</span>
      </div>
    </motion.div>
  );
};