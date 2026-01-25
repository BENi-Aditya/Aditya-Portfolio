import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, Sparkles, Users, Zap, ArrowRight, Rocket, Youtube, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function getGithubRepoPath(url: string) {
  try {
    const u = new URL(url);
    return u.pathname.replace(/^\//, "").replace(/\.git$/, "");
  } catch {
    return "";
  }
}

const startups = [
  {
    id: "vibecode",
    name: "VibeCode",
    tagline: "AI-first cloud IDE that helps developers go from prompt → code → deploy",
    description:
      "VibeCode is an AI-powered online IDE that helps developers move from ideas to working code. It includes an ideation panel for refining concepts and structuring solutions before implementation.\n\nEverything runs in the browser no downloads or setup. Languages, dependencies, and modules are managed on the server, so users can focus purely on building. A dedicated teaching mode explains core programming concepts step by step, helping VibeCoders learn the logic behind the code, not just the syntax.",
    status: "Pre-revenue",
    stage: "Prototype",
    website: "https://vibecode.org.in",
    videoMain: "https://youtu.be/qky4DxjHTt4",
    videoShort: "https://www.youtube.com/shorts/FM0iGzQLhxs",
    github: "https://github.com/BENi-Aditya/VibeCode-MVP",
    features: [
      { icon: Sparkles, text: "AI-powered code generation" },
      { icon: Zap, text: "Instant deployments" },
      { icon: Users, text: "Real-time collaboration" },
    ],
    color: "primary",
  },
  {
    id: "watchalong",
    name: "Watch-Along",
    tagline: "Lightweight synchronized watch platform for friends and study groups",
    description:
      "Watch movies and YouTube videos together, in real time. Everyone stays perfectly in sync—if one person pauses, it pauses for everyone.\n\nThe experience goes beyond shared playback. Built-in video calling lets you see reactions as they happen, making remote watching feel closer to being in the same room.\n\nThere’s also a quiet bonus most people don’t notice: it removes ads, keeping the focus on the content and the moment.",
    status: "Active",
    stage: "Beta",
    website: "https://watch-along.vercel.app/",
    videoMain: null,
    videoShort: null,
    github: "https://github.com/BENi-Aditya/WatchAlong",
    features: [
      { icon: Zap, text: "Low-latency sync" },
      { icon: Users, text: "Built-in chat" },
      { icon: Sparkles, text: "Easy room creation" },
    ],
    color: "secondary",
  },
];

export function Startups() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStartup, setActiveStartup] = useState(0);

  const nextStartupIndex = (activeStartup + 1) % startups.length;
  const prevStartupIndex = (activeStartup - 1 + startups.length) % startups.length;
  const nextStartupName = startups[nextStartupIndex].name;

  return (
    <section id="startups" className="py-20 md:py-24 relative overflow-hidden" ref={ref}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[200px]" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Rocket className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-primary">Two live Pre-Seed Projects</span>
          </motion.div>
          
          <h2 className="section-heading text-4xl md:text-5xl">
            What I'm <span className="gradient-text neon-text">Building</span>
          </h2>
          <p className="section-subheading mx-auto mt-4">
            Pre-revenue products I'm actively developing. Looking for collaborators and early testers.
          </p>
        </motion.div>

        {/* Interactive Startup Selector */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 sm:mb-12">
          {startups.map((startup, index) => (
            <motion.button
              key={startup.id}
              onClick={() => setActiveStartup(index)}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-mono text-sm transition-all duration-300 ${
                activeStartup === index
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-card/50 text-muted-foreground hover:bg-card border border-border/50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {startup.name}
            </motion.button>
          ))}
        </div>

        {/* Startup Display - Creative Card */}
        <motion.div
          key={activeStartup}
          initial={{ opacity: 0, y: 30, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative">
            <button
              type="button"
              onClick={() => setActiveStartup(prevStartupIndex)}
              aria-label="Previous project"
              className="absolute left-2 md:left-[-84px] lg:left-[-120px] top-1/2 -translate-y-1/2 z-40 p-3 md:p-4 rounded-full bg-card/80 border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all shadow-lg"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              type="button"
              onClick={() => setActiveStartup(nextStartupIndex)}
              aria-label={`Next: ${nextStartupName}`}
              className="absolute right-2 md:right-[-84px] lg:right-[-120px] top-1/2 -translate-y-1/2 z-40 p-3 md:p-4 rounded-full bg-card/80 border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all shadow-lg"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <div className="glass-card overflow-hidden relative group">
              {/* Animated border glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-[-2px] bg-gradient-to-r from-primary via-secondary to-primary rounded-xl animate-spin-slow opacity-30 blur-sm" />
              </div>
              
              <div className="relative bg-card/90 rounded-xl overflow-hidden">
                <div className="lg:grid lg:grid-cols-2 gap-0">
                  {/* Left - Visual Section */}
                  <div className="relative p-6 sm:p-8 lg:p-12 bg-gradient-to-br from-primary/10 to-secondary/5">
                    {/* Floating Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 rounded-full bg-primary/30"
                          style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + (i % 3) * 20}%`,
                          }}
                          animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 0.8, 0.3],
                          }}
                          transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            delay: i * 0.5,
                          }}
                        />
                      ))}
                    </div>
                    
                    <div className="relative z-10">
                      {/* Status Badges */}
                      <div className="flex gap-2 mb-6">
                        <span className="badge-glow">{startups[activeStartup].status}</span>
                        <span className="badge-secondary">{startups[activeStartup].stage}</span>
                      </div>

                      {/* Name with animated underline */}
                      <div className="relative inline-block mb-4">
                        <h3 className="font-mono font-bold text-4xl lg:text-5xl">
                          {startups[activeStartup].name}
                        </h3>
                        <motion.div
                          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        />
                      </div>
                      
                      {/* Tagline */}
                      <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                        {startups[activeStartup].tagline}
                      </p>

                      {/* Features with stagger animation */}
                      <div className="space-y-4">
                        {startups[activeStartup].features.map((feature, i) => (
                          <motion.div 
                            key={i} 
                            className="flex items-center gap-3 group/feature"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                          >
                            <div className="p-2 rounded-lg bg-primary/10 group-hover/feature:bg-primary/20 transition-colors">
                              <feature.icon className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-sm text-muted-foreground group-hover/feature:text-foreground transition-colors">
                              {feature.text}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right - Content Section */}
                  <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-between">
                    <div>
                      <p className="text-muted-foreground mb-8 leading-relaxed text-lg whitespace-pre-line">
                        {startups[activeStartup].description}
                      </p>

                      {startups[activeStartup].github && (
                        <a
                          href={startups[activeStartup].github!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block mb-8 rounded-xl overflow-hidden border border-border/50 bg-muted/20 hover:border-primary/30 transition-colors"
                        >
                          <img
                            src={`https://opengraph.githubassets.com/1/${getGithubRepoPath(startups[activeStartup].github!)}`}
                            alt={`${startups[activeStartup].name} GitHub preview`}
                            className="w-full h-auto"
                            loading="lazy"
                          />
                        </a>
                      )}

                      {/* Video Preview */}
                      {startups[activeStartup].videoMain && (
                        <motion.div 
                          className="mb-8 group/video"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="aspect-video rounded-xl overflow-hidden border border-border/50 bg-muted/30 relative">
                            <iframe
                              src={startups[activeStartup].videoMain!.replace("youtu.be/", "youtube.com/embed/").split("?")[0]}
                              title={`${startups[activeStartup].name} Demo`}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full"
                            />
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                      <Button variant="hero" size="xl" asChild className="group mr-auto">
                        <a href={startups[activeStartup].website} target="_blank" rel="noopener noreferrer">
                          Visit {startups[activeStartup].name}
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </Button>

                      {startups[activeStartup].github && (
                        <Button variant="glass" size="lg" asChild>
                          <a href={startups[activeStartup].github!} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            GitHub
                          </a>
                        </Button>
                      )}

                      {startups[activeStartup].id === "vibecode" && (
                        <Button variant="glass" size="lg" asChild>
                          <a href="https://www.youtube.com/@BENiTech-o8o/videos" target="_blank" rel="noopener noreferrer">
                            <Youtube className="w-4 h-4 mr-2" />
                            YouTube
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Startup Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {startups.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveStartup(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeStartup === index
                  ? "bg-primary w-8"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
