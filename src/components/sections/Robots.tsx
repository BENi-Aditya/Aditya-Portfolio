import { AnimatePresence, motion, useInView } from "framer-motion";
import { Bot, ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export function Robots() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-120px" });
  const [hasEntered, setHasEntered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const robotVideos = useMemo(() => Array.from({ length: 12 }, (_, i) => `${i + 1}.mp4`), []);

  const activeSrc = useMemo(() => {
    if (!hasEntered) return "";
    return `/media/Robots/${robotVideos[activeIndex]}`;
  }, [activeIndex, hasEntered, robotVideos]);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const setVideoRef = useCallback((node: HTMLVideoElement | null) => {
    videoRef.current = node;
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % robotVideos.length);
  }, [robotVideos.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + robotVideos.length) % robotVideos.length);
  }, [robotVideos.length]);

  useEffect(() => {
    if (isInView) setHasEntered(true);
  }, [isInView]);

  useEffect(() => {
    if (!hasEntered) return;

    const nextIndex = (activeIndex + 1) % robotVideos.length;
    const src = `/media/Robots/${robotVideos[nextIndex]}`;

    const preloader = document.createElement("video");
    preloader.preload = "metadata";
    preloader.muted = true;
    preloader.src = src;
    preloader.load();
  }, [activeIndex, hasEntered, robotVideos]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = !soundEnabled;
    v.volume = soundEnabled ? 1 : 0;

    if (!hasEntered || !isInView) {
      v.pause();
      return;
    }

    v.currentTime = 0;
    const p = v.play();
    if (p) p.catch(() => {});
  }, [activeIndex, hasEntered, isInView, soundEnabled]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
      scale: 0.985,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 40 : -40,
      opacity: 0,
      scale: 0.985,
    }),
  };

  return (
    <section id="robots" className="py-20 md:py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-secondary/5 blur-[180px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hasEntered ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={hasEntered ? { scale: 1 } : {}}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6"
          >
            <Bot className="w-4 h-4 text-secondary" />
            <span className="text-sm font-mono text-secondary">Robots</span>
          </motion.div>

          <h2 className="section-heading text-4xl md:text-5xl">
            Tiny machines. <span className="gradient-text neon-text">Big personality.</span>
          </h2>
          <p className="section-subheading mx-auto mt-4">
            A quick showreel of my personal favourite builds sketchy prototypes to surprisingly capable bots.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="glass-card overflow-hidden">
            <div className="relative">
              <div className="aspect-video bg-muted/20">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="w-full h-full"
                  >
                    {hasEntered ? (
                      <video
                        ref={setVideoRef}
                        className="w-full h-full object-contain"
                        src={activeSrc}
                        autoPlay
                        controls={false}
                        playsInline
                        preload={isInView ? "auto" : "metadata"}
                        muted={!soundEnabled}
                        onEnded={next}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/50">
                            <Bot className="w-4 h-4 text-secondary" />
                            <span className="text-sm font-mono text-muted-foreground">Scroll here to play</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                type="button"
                onClick={prev}
                aria-label="Previous robot video"
                className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 md:p-3 rounded-full bg-card/80 border border-border/50 text-muted-foreground hover:text-foreground hover:border-secondary/50 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next robot video"
                className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 md:p-3 rounded-full bg-card/80 border border-border/50 text-muted-foreground hover:text-foreground hover:border-secondary/50 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute left-4 top-4 flex items-center gap-2">
                <span className="badge-secondary">Robot {activeIndex + 1}/{robotVideos.length}</span>
                <span className="badge-glow">{robotVideos[activeIndex]}</span>
              </div>

              <div className="absolute right-4 top-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSoundEnabled((v) => !v)}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-card/80 border border-border/50 text-muted-foreground hover:text-foreground hover:border-secondary/50 transition-all"
                  aria-label={soundEnabled ? "Disable audio" : "Enable audio"}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  <span className="text-xs font-mono">{soundEnabled ? "Audio on" : "Audio off"}</span>
                </button>
              </div>
            </div>

            <div className="p-6 sm:p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h3 className="font-mono font-bold text-2xl">My Lovely Robot Builds</h3>
                  <p className="text-muted-foreground mt-2 leading-relaxed">
                    Scroll to view the robot showcase.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {robotVideos.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setDirection(i > activeIndex ? 1 : -1);
                        setActiveIndex(i);
                      }}
                      aria-label={`Go to robot video ${i + 1}`}
                      className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                        activeIndex === i
                          ? "w-16 h-2 bg-secondary"
                          : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
