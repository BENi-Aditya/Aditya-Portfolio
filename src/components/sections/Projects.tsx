import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, Play, ChevronLeft, ChevronRight, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: "hornbill",
    title: "Horn-Bill",
    tagline: "Autonomous seed-dispersing drone for reforestation",
    description: "A UAV system designed to plant seeds in hard-to-reach areas, featuring terrain mapping, payload mechanics, and autonomous flight control.",
    coCreators: [{ name: "Prajesh Nair", href: "https://www.linkedin.com/in/prajeshnair/" }],
    category: "Robotics",
    tags: ["Drone", "Embedded", "PX4", "Python"],
    video: "https://youtu.be/Dli05LBOTP0",
    github: "https://github.com/BENi-Aditya/hornbill",
    featured: true,
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&h=400&fit=crop",
    media: [
      "/media/hornbill/0.gif",
      "/media/hornbill/1.png",
      "/media/hornbill/2.png",
      "/media/hornbill/3.png",
      "/media/hornbill/4.png",
      "/media/hornbill/5.gif",
      "/media/hornbill/6.png",
      "/media/hornbill/7.png",
    ],
  },
  {
    id: "blindsight",
    title: "BlindSight",
    tagline: "Wearable navigation device for visually impaired",
    description: "A Raspberry Pi-powered wearable that provides real-time audio feedback for obstacle detection and navigation assistance.",
    category: "AI",
    tags: ["OpenCV", "Raspberry Pi", "TTS", "Python"],
    video: "https://youtu.be/8FhNYJAvp90",
    github: "https://github.com/BENi-Aditya/blindsight",
    featured: true,
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop",
    media: [
      "/media/blindsight/1.png",
      "/media/blindsight/2.JPG",
      "/media/blindsight/3.JPG",
      "/media/blindsight/4.jpeg",
      "/media/blindsight/5.jpeg",
      "/media/blindsight/6.jpeg",
      "/media/blindsight/7.jpeg",
    ],
  },
  {
    id: "vitalscan",
    title: "VitalScan",
    tagline: "AI-powered lung disease detection",
    description: "Deep learning model for early detection of lung diseases from X-ray images with high accuracy and fast inference.",
    category: "AI",
    tags: ["TensorFlow", "CNN", "Medical AI", "Python"],
    video: "https://youtu.be/_AQBNQMcyCo",
    github: "https://github.com/BENi-Aditya/vitalscan",
    featured: false,
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop",
    media: [
      "/media/vitalscan/FAQ's.png",
      "/media/vitalscan/Fracture.png",
      "/media/vitalscan/Landing Page.png",
      "/media/vitalscan/Pnemonia.png",
      "/media/vitalscan/TB.png",
    ],
  },
  {
    id: "resoil",
    title: "ReSoil / Yamuna",
    tagline: "River and soil restoration initiative",
    description: "Environmental restoration project focused on river cleanup and soil rehabilitation using technology and community engagement.",
    coCreators: [
      { name: "Prajesh Nair", href: "https://www.linkedin.com/in/prajeshnair/" },
      { name: "Kalash Pandita", href: "https://www.linkedin.com/in/kalash-pandita-6b3b95303/" },
      { name: "Prarthana Mehrotra", href: "https://www.linkedin.com/in/prarthana-mehrotra-865287369/" },
    ],
    category: "Social",
    tags: ["Environmental", "Research", "Impact"],
    video: "https://youtu.be/m2wak1vr1J4",
    github: null,
    featured: false,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop",
    media: [
      "/media/resoil-yamuna/1.JPG",
      "/media/resoil-yamuna/2.JPG",
      "/media/resoil-yamuna/3.png",
      "/media/resoil-yamuna/4.png",
      "/media/resoil-yamuna/5.JPG",
      "/media/resoil-yamuna/6.JPG",
    ],
  },
  {
    id: "farmly",
    title: "Farmly Automate",
    tagline: "Smart irrigation automation system",
    description: "IoT-based farm automation with soil sensors, weather integration, and automated water management for optimal crop health.",
    category: "Robotics",
    tags: ["IoT", "Arduino", "Sensors", "Dashboard"],
    video: "https://youtu.be/hzM2Mhqll8w",
    github: "https://github.com/BENi-Aditya/farmly",
    featured: false,
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&h=400&fit=crop",
  },
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [mediaIndex, setMediaIndex] = useState(0);

  const toPublicAssetUrl = (src: string) => {
    // Handles spaces and other characters (e.g. "Landing Page.png")
    // while keeping absolute URLs intact.
    return src.startsWith("/") ? encodeURI(src) : src;
  };

  const nextProject = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const activeProject = projects[activeIndex];
  const activeMedia = (activeProject as any).media as string[] | undefined;

  useEffect(() => {
    setMediaIndex(0);
  }, [activeIndex]);

  useEffect(() => {
    if (!activeMedia || activeMedia.length <= 1) return;
    const id = window.setInterval(() => {
      setMediaIndex((prev) => (prev + 1) % activeMedia.length);
    }, 4500);

    return () => window.clearInterval(id);
  }, [activeProject.id, activeMedia]);

  const nextMedia = () => {
    if (!activeMedia || activeMedia.length <= 1) return;
    setMediaIndex((prev) => (prev + 1) % activeMedia.length);
  };

  const prevMedia = () => {
    if (!activeMedia || activeMedia.length <= 1) return;
    setMediaIndex((prev) => (prev - 1 + activeMedia.length) % activeMedia.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? 15 : -15,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      rotateY: direction < 0 ? 15 : -15,
    }),
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-10" />
        {/* Orbiting rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
          <div className="absolute inset-0 rounded-full border border-primary/10 animate-spin-slow" />
          <div className="absolute inset-8 rounded-full border border-secondary/10 animate-spin-reverse" />
          <div className="absolute inset-16 rounded-full border border-primary/5 animate-spin-slow" style={{ animationDuration: "40s" }} />
        </div>
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6"
          >
            <Layers className="w-4 h-4 text-secondary" />
            <span className="text-sm font-mono text-secondary">Portfolio</span>
          </motion.div>
          
          <h2 className="section-heading text-4xl md:text-5xl">
            Built with <span className="gradient-text neon-text">Purpose</span>
          </h2>
          <p className="section-subheading mx-auto mt-4">
            Each project represents a challenge tackled, a skill learned, and an impact made.
          </p>
        </motion.div>

        {/* 3D Carousel */}
        <div className="relative max-w-7xl mx-auto" style={{ perspective: "1000px" }}>
          {/* Navigation Arrows */}
          <button
            onClick={prevProject}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 z-20 p-3 rounded-full bg-card/80 border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextProject}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 z-20 p-3 rounded-full bg-card/80 border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Project Card */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="glass-card overflow-hidden"
            >
              <div className="md:grid md:grid-cols-2">
                {/* Image */}
                <div className="relative h-[420px] md:h-auto overflow-hidden">
                  <motion.img
                    key={activeMedia ? `${activeProject.id}-${mediaIndex}` : activeProject.id}
                    src={toPublicAssetUrl(activeMedia ? activeMedia[mediaIndex] : activeProject.image)}
                    alt={activeProject.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="badge-glow">{projects[activeIndex].category}</span>
                  </div>

                  {/* Video Button */}
                  {activeProject.video && (
                    <a
                      href={activeProject.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-4 left-4 p-4 rounded-full bg-primary/90 text-primary-foreground hover:bg-primary transition-all hover:scale-110"
                    >
                      <Play className="w-6 h-6" />
                    </a>
                  )}

                  {activeMedia && activeMedia.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={prevMedia}
                        aria-label="Previous image"
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-1 text-muted-foreground hover:text-foreground transition-all"
                      >
                        <ChevronLeft className="w-7 h-7" />
                      </button>
                      <button
                        type="button"
                        onClick={nextMedia}
                        aria-label="Next image"
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-1 text-muted-foreground hover:text-foreground transition-all"
                      >
                        <ChevronRight className="w-7 h-7" />
                      </button>
                    </>
                  )}
                </div>

                {/* Content */}
                <div className="p-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="font-mono font-bold text-3xl mb-2">
                      {activeProject.title}
                    </h3>
                    <p className="text-primary font-medium mb-4">
                      {activeProject.tagline}
                    </p>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {activeProject.description}
                    </p>

                    {((activeProject as any).coCreators || (activeProject as any).coCreator) && (
                      <p className="text-sm text-muted-foreground mb-6">
                        Co-creator{(activeProject as any).coCreators?.length > 1 ? "s" : ""}: {" "}
                        {(((activeProject as any).coCreators ?? [(activeProject as any).coCreator]) as Array<{ name: string; href: string }>).map(
                          (c, idx, arr) => (
                            <span key={c.href}>
                              <a
                                href={c.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                              >
                                {c.name}
                              </a>
                              {idx < arr.length - 1 ? ", " : ""}
                            </span>
                          )
                        )}
                      </p>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {activeProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-mono rounded-full bg-muted/50 text-muted-foreground border border-border/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                      {activeProject.video && (
                        <Button variant="hero" size="sm" asChild>
                          <a href={activeProject.video} target="_blank" rel="noopener noreferrer">
                            <Play className="w-4 h-4 mr-2" />
                            Watch Demo
                          </a>
                        </Button>
                      )}
                      {activeProject.github && (
                        <Button variant="glass" size="sm" asChild>
                          <a href={activeProject.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            View Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Project Indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {projects.map((project, index) => (
            <motion.button
              key={project.id}
              onClick={() => {
                setDirection(index > activeIndex ? 1 : -1);
                setActiveIndex(index);
              }}
              className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                activeIndex === index
                  ? "w-20 h-2 bg-primary"
                  : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              whileHover={{ scale: 1.2 }}
            >
              {activeIndex === index && (
                <motion.div
                  className="absolute inset-0 bg-secondary"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ opacity: 0.5 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center gap-8 mt-12 text-center"
        >
          <div>
            <div className="text-2xl font-bold font-mono text-primary">{projects.length}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Projects</div>
          </div>
          <div className="w-px bg-border" />
          <div>
            <div className="text-2xl font-bold font-mono text-secondary">
              {projects.filter(p => p.category === "AI").length}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">AI Projects</div>
          </div>
          <div className="w-px bg-border" />
          <div>
            <div className="text-2xl font-bold font-mono text-primary">
              {projects.filter(p => p.featured).length}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Featured</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
