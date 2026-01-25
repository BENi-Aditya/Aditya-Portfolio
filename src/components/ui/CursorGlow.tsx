import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
}

export function CursorGlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isCompactView, setIsCompactView] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    const updateView = () => setIsCompactView(mediaQuery.matches);

    updateView();
    mediaQuery.addEventListener("change", updateView);
    return () => mediaQuery.removeEventListener("change", updateView);
  }, []);

  useEffect(() => {
    // Initialize particles
    const initialParticles: Particle[] = [];
    const particleCount = isCompactView ? 28 : 50;
    const sizeRange = isCompactView ? 3 : 4;

    for (let i = 0; i < particleCount; i++) {
      initialParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * sizeRange + 1,
        opacity: Math.random() * 0.5 + 0.1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }
    setParticles(initialParticles);
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);
  }, [isCompactView, mouseX, mouseY]);

  useEffect(() => {
    if (isCompactView) return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isCompactView, mouseX, mouseY]);

  useEffect(() => {
    let animationId: number;
    
    const animate = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          const cursorXVal = cursorX.get();
          const cursorYVal = cursorY.get();
          
          // Calculate distance to cursor
          const dx = cursorXVal - particle.x;
          const dy = cursorYVal - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Particles react to cursor within 200px radius
          let newVx = particle.vx;
          let newVy = particle.vy;
          
          if (!isCompactView && distance < 200) {
            const force = (200 - distance) / 200;
            newVx += (dx / distance) * force * 0.5;
            newVy += (dy / distance) * force * 0.5;
          }
          
          // Apply damping
          newVx *= 0.98;
          newVy *= 0.98;
          
          // Add some random movement
          newVx += (Math.random() - 0.5) * 0.1;
          newVy += (Math.random() - 0.5) * 0.1;
          
          let newX = particle.x + newVx;
          let newY = particle.y + newVy;
          
          // Wrap around screen
          if (newX < 0) newX = window.innerWidth;
          if (newX > window.innerWidth) newX = 0;
          if (newY < 0) newY = window.innerHeight;
          if (newY > window.innerHeight) newY = 0;
          
          return {
            ...particle,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
          };
        })
      );
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [cursorX, cursorY, isCompactView]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {!isCompactView && (
        <>
          {/* Main cursor glow */}
          <motion.div
            className="absolute w-96 h-96 rounded-full"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: "-50%",
              translateY: "-50%",
              background: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
            }}
          />
          
          {/* Secondary glow */}
          <motion.div
            className="absolute w-64 h-64 rounded-full"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: "-50%",
              translateY: "-50%",
              background: "radial-gradient(circle, hsl(var(--secondary) / 0.1) 0%, transparent 60%)",
            }}
          />
        </>
      )}
      
      {/* Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.x,
            top: particle.y,
            opacity: particle.opacity,
          }}
        />
      ))}
      
      {!isCompactView && (
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <radialGradient id="cursorGradient">
              <motion.stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <motion.stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Horizontal lines */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.line
              key={`h-${i}`}
              x1="0"
              x2="100%"
              y1={`${(i + 1) * 5}%`}
              y2={`${(i + 1) * 5}%`}
              stroke="hsl(var(--primary) / 0.05)"
              strokeWidth="1"
            />
          ))}
          {/* Vertical lines */}
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.line
              key={`v-${i}`}
              x1={`${(i + 1) * 3.33}%`}
              x2={`${(i + 1) * 3.33}%`}
              y1="0"
              y2="100%"
              stroke="hsl(var(--primary) / 0.05)"
              strokeWidth="1"
            />
          ))}
        </svg>
      )}
    </div>
  );
}
