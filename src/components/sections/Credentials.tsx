import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, FileText, Image as ImageIcon, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Credentials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="credentials" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 grid-bg-dots opacity-10" />

      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="badge-glow mb-4 inline-block">Credentials</span>
          <h2 className="section-heading">
            Internships & <span className="gradient-text">Courses</span>
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-mono font-bold text-lg">Internships</h3>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Full Stack Developer</div>
                <div className="font-medium">Defronix</div>
              </div>
              <FileText className="w-5 h-5 text-muted-foreground" />
            </div>

            <div className="mt-6 rounded-xl overflow-hidden border border-border/50 bg-muted/20">
              <object
                data="/certificates/defronix-certificate.pdf"
                type="application/pdf"
                className="w-full h-[420px]"
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button variant="glass" size="sm" asChild>
                <a href="/certificates/defronix-certificate.pdf" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open PDF
                </a>
              </Button>
              <Button variant="glass" size="sm" asChild>
                <a href="/certificates/defronix-certificate.pdf" download>
                  Download
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-secondary/10 border border-secondary/20">
                <GraduationCap className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="font-mono font-bold text-lg">Courses</h3>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Introduction to AI and Data Science</div>
                <div className="font-medium">IIT Madras</div>
              </div>
              <ImageIcon className="w-5 h-5 text-muted-foreground" />
            </div>

            <div className="mt-6 rounded-xl overflow-hidden border border-border/50 bg-muted/20">
              <img
                src="/certificates/iit-madras-ai-ds.jpg"
                alt="Introduction to AI and Data Science certificate"
                className="w-full h-[420px] object-cover"
                loading="lazy"
              />
            </div>

            <div className="mt-6">
              <Button variant="glass" size="sm" asChild>
                <a href="/certificates/iit-madras-ai-ds.jpg" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Image
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
