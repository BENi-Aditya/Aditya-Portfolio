import { motion, useTransform, MotionValue } from "framer-motion";

interface TreeGrowthAnimationProps {
  scrollProgress: MotionValue<number>;
}

export const TreeGrowthAnimation = ({ scrollProgress }: TreeGrowthAnimationProps) => {
  // Tree growth based on scroll within this section (0.7 - 0.85 range)
  const treeScale = useTransform(scrollProgress, [0.7, 0.85], [0, 1]);
  const leafOpacity = useTransform(scrollProgress, [0.78, 0.85], [0, 1]);
  const groundOpacity = useTransform(scrollProgress, [0.68, 0.72], [0, 1]);

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
      {/* Ground */}
      <motion.div 
        className="absolute bottom-20 left-0 right-0 h-2"
        style={{ opacity: groundOpacity }}
      >
        <div className="w-full h-full bg-gradient-to-t from-emerald-dark/50 to-transparent" />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(90deg, hsl(160, 60%, 30%, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        />
      </motion.div>

      {/* Seed impact */}
      <motion.div 
        className="absolute bottom-20 left-1/2 -translate-x-1/2"
        style={{ opacity: groundOpacity }}
      >
        <motion.div
          className="w-4 h-4 rounded-full bg-accent"
          animate={{ 
            boxShadow: ["0 0 10px hsl(160, 60%, 42%, 0.5)", "0 0 30px hsl(160, 60%, 42%, 0.3)", "0 0 10px hsl(160, 60%, 42%, 0.5)"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Tree trunk */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 origin-bottom"
        style={{ scaleY: treeScale }}
      >
        <svg width="120" height="300" viewBox="0 0 120 300" className="overflow-visible">
          {/* Main trunk */}
          <motion.path
            d="M 60 300 L 60 200 Q 60 180, 55 160 L 55 100"
            fill="none"
            stroke="hsl(30, 40%, 30%)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          
          {/* Branch 1 */}
          <motion.path
            d="M 55 160 Q 40 140, 25 150"
            fill="none"
            stroke="hsl(30, 40%, 30%)"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ opacity: leafOpacity }}
          />
          
          {/* Branch 2 */}
          <motion.path
            d="M 58 130 Q 80 110, 95 120"
            fill="none"
            stroke="hsl(30, 40%, 30%)"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ opacity: leafOpacity }}
          />
          
          {/* Branch 3 */}
          <motion.path
            d="M 55 100 Q 30 80, 20 90"
            fill="none"
            stroke="hsl(30, 40%, 30%)"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ opacity: leafOpacity }}
          />
        </svg>
      </motion.div>

      {/* Leaves */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 origin-bottom"
        style={{ opacity: leafOpacity, scale: treeScale }}
      >
        <svg width="200" height="300" viewBox="0 0 200 300" className="overflow-visible">
          {/* Leaf clusters */}
          {[
            { cx: 25, cy: 150, r: 25 },
            { cx: 95, cy: 120, r: 30 },
            { cx: 20, cy: 90, r: 20 },
            { cx: 60, cy: 60, r: 35 },
            { cx: 40, cy: 100, r: 25 },
            { cx: 80, cy: 80, r: 28 },
            { cx: 55, cy: 40, r: 22 },
          ].map((leaf, i) => (
            <motion.circle
              key={i}
              cx={leaf.cx}
              cy={leaf.cy}
              r={leaf.r}
              fill={`hsl(${150 + i * 5}, ${50 + i * 3}%, ${35 + i * 2}%)`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.9 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Particle effects during growth */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: leafOpacity }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-accent/50"
            style={{
              left: `${40 + Math.random() * 20}%`,
              bottom: `${20 + i * 6}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      {/* Labels */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        style={{ opacity: leafOpacity }}
      >
        <p className="text-sm text-accent mono">Germination Complete</p>
        <p className="text-xs text-muted-foreground mt-1">Precision deployment → successful growth</p>
      </motion.div>
    </div>
  );
};