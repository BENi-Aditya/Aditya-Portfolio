import { motion, useScroll, useTransform, useSpring, useInView, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Lenis from "lenis";
import { BlueprintGrid } from "@/components/BlueprintGrid";
import { GlassPanel } from "@/components/GlassPanel";
import { TelemetryDisplay } from "@/components/TelemetryDisplay";
import { PhysicsCalculation } from "@/components/PhysicsCalculation";
import { TrajectoryVisual } from "@/components/TrajectoryVisual";
import { AltitudeTape } from "@/components/AltitudeTape";
import { SectionHeader } from "@/components/SectionHeader";
import { SeedBombVisual } from "@/components/SeedBombVisual";
import { AchievementPanel } from "@/components/AchievementPanel";
import { Header } from "@/components/Header";
import { PersistentDrone } from "@/components/PersistentDrone";
import { SocialLinks } from "@/components/SocialLinks";
import { TreeGrowthAnimation } from "@/components/TreeGrowthAnimation";
import { MediaGallery } from "@/components/MediaGallery";
import { Cpu, Camera, Box, Leaf, Zap, Images } from "lucide-react";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const physicsRef = useRef<HTMLDivElement>(null);
  const isPhysicsInView = useInView(physicsRef, { amount: 0.5 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  const [scrollValue, setScrollValue] = useState(0);
  const [currentSection, setCurrentSection] = useState(1);
  const [altitude, setAltitude] = useState(0);
  const [isFlying, setIsFlying] = useState(false);
  const [physicsActive, setPhysicsActive] = useState(false);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  useMotionValueEvent(smoothProgress, "change", (value) => {
    setScrollValue(value);
    setCurrentSection(Math.min(8, Math.floor(value * 8) + 1));
    
    if (value < 0.3) {
      setAltitude(value * 50);
      setIsFlying(value > 0.05);
    } else if (value < 0.6) {
      setAltitude(15 - (value - 0.3) * 10);
    } else {
      setAltitude(Math.max(0, 12 - (value - 0.6) * 30));
    }
  });

  useEffect(() => {
    if (isPhysicsInView) {
      const timer = setTimeout(() => setPhysicsActive(true), 500);
      return () => clearTimeout(timer);
    } else {
      setPhysicsActive(false);
    }
  }, [isPhysicsInView]);

  return (
    <div ref={containerRef} className="relative">
      <BlueprintGrid />
      <Header scrollProgress={scrollValue} />
      <PersistentDrone scrollProgress={smoothProgress} currentSection={currentSection} />
      
      {/* SECTION 1: Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <motion.div
          className="text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs uppercase tracking-[0.3em] text-secondary font-medium">
              System Online
            </span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 tracking-tight">
            <span className="text-primary glow-text">HORN</span>BILL
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            Autonomous Aerial Reforestation System
          </p>
          
          <p className="text-sm text-muted-foreground/70 max-w-lg mx-auto mono mb-8">
            Precision seed deployment using onboard intelligence and physics-based control.
          </p>

          <SocialLinks variant="hero" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-secondary/50 flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-2 rounded-full bg-secondary"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: Flight Systems */}
      <section className="relative min-h-screen flex items-center px-6 py-20">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <SectionHeader 
                title="Flight Systems"
                subtitle="Real-time telemetry and autonomous flight control."
                badge="Active"
              />
              
              <TelemetryDisplay
                altitude={altitude}
                velocity={isFlying ? 2.4 : 0}
                heading={275}
                mode={isFlying ? "AUTO" : "STANDBY"}
              />
            </div>
            
            <div className="flex justify-center items-center gap-8">
              <AltitudeTape altitude={altitude} />
              
              <GlassPanel className="flex-1 max-w-sm">
                <h4 className="text-sm uppercase tracking-widest text-secondary mb-4">System Status</h4>
                <div className="space-y-3">
                  {[
                    { label: "Motors", status: "Armed", active: true },
                    { label: "IMU", status: "Calibrated", active: true },
                    { label: "GPS", status: "3D Fix", active: true },
                    { label: "Payload", status: "Ready", active: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${item.active ? "text-secondary" : "text-accent"}`}>
                          {item.status}
                        </span>
                        <div className={`w-2 h-2 rounded-full ${item.active ? "bg-secondary animate-pulse" : "bg-accent"}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassPanel>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Payload */}
      <section className="relative min-h-screen flex items-center px-6 py-20">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div className="flex justify-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <div className="relative">
                <motion.div
                  className="w-64 h-48 rounded-xl border-2 border-secondary/50 relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg, hsl(240, 8%, 10%, 0.8) 0%, hsl(185, 70%, 45%, 0.1) 100%)" }}
                >
                  <div className="absolute inset-0 blueprint-grid opacity-50" />
                  <motion.div className="absolute inset-0 flex items-center justify-center" animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                    <Box className="w-20 h-20 text-secondary/80" strokeWidth={1} />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
            
            <div>
              <SectionHeader title="Payload Module" subtitle="Precision-engineered seed deployment mechanism." badge="Hardware" />
              <GlassPanel variant="strong">
                <div className="flex items-center gap-3 border-b border-secondary/20 pb-3 mb-4">
                  <Box className="w-5 h-5 text-secondary" />
                  <span className="uppercase tracking-widest text-sm">Specifications</span>
                </div>
                <ul className="space-y-3 mono text-sm">
                  {["CNC-cut aluminum enclosure", "Detachable compute mount", "Servo-actuated release", "Multi-seed pod compatibility"].map((spec, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      <span className="text-muted-foreground">{spec}</span>
                    </li>
                  ))}
                </ul>
              </GlassPanel>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Onboard Intelligence */}
      <section className="relative min-h-screen flex items-center px-6 py-20">
        <div className="container mx-auto">
          <SectionHeader title="Onboard Intelligence" subtitle="Real-time terrain analysis without cloud dependency." badge="AI System" />
          <div className="grid lg:grid-cols-2 gap-8">
            <GlassPanel variant="strong" className="aspect-video relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <motion.div className="absolute inset-x-0 h-1 bg-secondary/30" animate={{ y: ["0%", "100%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
              </div>
              <div className="absolute inset-0 blueprint-grid opacity-30" />
              <div className="absolute inset-4 flex items-center justify-center">
                <motion.div className="absolute top-4 left-4 w-24 h-20 border-2 border-destructive/50 rounded" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
                  <span className="absolute -top-5 left-0 text-[10px] mono text-destructive/70">REJECTED</span>
                </motion.div>
                <motion.div className="absolute bottom-8 right-8 w-32 h-24 border-2 border-accent rounded" animate={{ boxShadow: ["0 0 10px hsl(160, 60%, 42%, 0.3)", "0 0 20px hsl(160, 60%, 42%, 0.5)", "0 0 10px hsl(160, 60%, 42%, 0.3)"] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <span className="absolute -top-5 left-0 text-[10px] mono text-accent">VALID DROP ZONE</span>
                </motion.div>
              </div>
              <div className="absolute top-4 right-4 text-right">
                <div className="mono text-xs text-secondary">CONF: HIGH</div>
                <div className="mono text-xs text-muted-foreground">FPS: 30</div>
              </div>
            </GlassPanel>
            
            <div className="space-y-4">
              <GlassPanel>
                <div className="flex items-center gap-3 mb-4">
                  <Cpu className="w-5 h-5 text-secondary" />
                  <span className="uppercase tracking-widest text-sm">Compute Module</span>
                </div>
                <p className="text-muted-foreground text-sm">Raspberry Pi 4B running optimized inference models.</p>
              </GlassPanel>
              <GlassPanel>
                <div className="flex items-center gap-3 mb-4">
                  <Camera className="w-5 h-5 text-secondary" />
                  <span className="uppercase tracking-widest text-sm">Vision System</span>
                </div>
                <p className="text-sm text-muted-foreground">On-device inference for terrain classification.</p>
              </GlassPanel>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Physics */}
      <section ref={physicsRef} className="relative min-h-screen flex items-center px-6 py-20">
        <div className="container mx-auto">
          <SectionHeader title="Trajectory Physics" subtitle="Real-time drop offset calculation using sensor data." badge="Live Calculation" />
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <GlassPanel variant="strong" className="min-h-[450px]">
              <TrajectoryVisual isActive={physicsActive} />
            </GlassPanel>
            <PhysicsCalculation isActive={physicsActive} />
          </div>
        </div>
      </section>

      {/* SECTION 6: Seed Bomb */}
      <section className="relative min-h-screen flex items-center px-6 py-20">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader title="Seed Bomb Design" subtitle="Aerodynamically stable payload for optimal dispersion." badge="Bio-Engineering" />
              <GlassPanel>
                <div className="flex items-center gap-3 mb-4">
                  <Leaf className="w-5 h-5 text-accent" />
                  <span className="uppercase tracking-widest text-sm">Composition</span>
                </div>
                <div className="space-y-3 text-sm">
                  {[
                    { color: "bg-amber-dark", name: "Protective Clay Shell", desc: "Weather-resistant outer layer" },
                    { color: "bg-accent", name: "Nutrient Compost Core", desc: "Rich organic growing medium" },
                    { color: "bg-tertiary", name: "Native Seed Mix", desc: "Region-specific species" },
                  ].map((layer, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-3 h-3 rounded-full ${layer.color} mt-1`} />
                      <div>
                        <span className="font-medium text-foreground">{layer.name}</span>
                        <p className="text-muted-foreground text-xs">{layer.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassPanel>
            </div>
            <div className="flex justify-center">
              <SeedBombVisual />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: Tree Growth */}
      <section className="relative min-h-screen flex items-center px-6 py-20">
        <div className="container mx-auto">
          <SectionHeader title="Deployment Success" subtitle="From precision drop to successful germination." badge="Impact" />
          <TreeGrowthAnimation scrollProgress={smoothProgress} />
        </div>
      </section>

      {/* SECTION 8: Media Gallery */}
      <section className="relative min-h-screen flex items-center px-6 py-20">
        <div className="container mx-auto">
          <SectionHeader title="Project Media" subtitle="Documentation of the Horn-Bill development journey." badge="Gallery" />
          <MediaGallery />
        </div>
      </section>

      {/* SECTION 9: Achievements */}
      <section className="relative min-h-screen flex items-center px-6 py-20">
        <div className="container mx-auto max-w-4xl">
          <SectionHeader title="Recognition" subtitle="Competition achievements and technical validation." badge="World Robot Olympiad" />
          <AchievementPanel />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-secondary/20">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold mb-2">
            <span className="text-primary">HORN</span>BILL
          </h3>
          <p className="text-sm text-muted-foreground mono mb-4">Autonomous Aerial Reforestation System</p>
          <SocialLinks variant="footer" className="mb-4" />
          <p className="text-xs text-muted-foreground/50">© 2024 Horn-Bill Team. World Robot Olympiad Project.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;