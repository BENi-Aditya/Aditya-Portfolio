import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Calendar, Code2, Cpu, Rocket } from "lucide-react";

const skills = [
  { icon: Code2, name: "Full-Stack Development", items: ["React", "Node.js", "Python", "TypeScript"] },
  { icon: Cpu, name: "AI & Machine Learning", items: ["TensorFlow", "OpenCV", "LLMs", "Computer Vision"] },
  { icon: Rocket, name: "Embedded & Robotics", items: ["Arduino", "Raspberry Pi", "ROS", "PX4"] },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 md:py-24 relative" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 grid-bg-dots opacity-20" />
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <span className="badge-glow mb-4 inline-block">About Me</span>
              <h2 className="section-heading">
                Building systems that <span className="gradient-text">matter</span>
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground mb-8">
              <p className="text-lg">
                I’m a technologist and maker from India, interested in how engineering can move from ideas to real, usable impact. I enjoy working at the intersection of software, hardware, and design where a concept turns into something people can actually use.
              </p>
              <p>
                I’ve worked on projects ranging from autonomous drones for reforestation to AI models for early lung disease detection. Across these, my focus stays the same: understand the problem deeply, design carefully, and build solutions that are practical, scalable, and responsible.
              </p>
              <p>
                Right now, I’m building <span className="text-primary">VibeCode</span>, an AI-first cloud IDE, and continuing to develop and lead technical projects through hackathons, competitions, and independent research.
              </p>
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>India</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 text-primary" />
                <span>High school class of 26</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <skill.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-mono font-semibold text-lg mb-2">{skill.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 text-xs font-mono rounded-full bg-muted text-muted-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Code Snippet */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="glass-card p-4 font-mono text-sm"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <code className="text-muted-foreground">
                <span className="text-secondary">const</span>{" "}
                <span className="text-primary">mission</span> = {"{"}
                <br />
                <span className="ml-4">goal: </span>
                <span className="text-green-400">"build impactful tech"</span>,
                <br />
                <span className="ml-4">approach: </span>
                <span className="text-green-400">"ship fast, iterate faster"</span>,
                <br />
                <span className="ml-4">status: </span>
                <span className="text-primary">"always learning"</span>
                <br />
                {"}"};
              </code>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
