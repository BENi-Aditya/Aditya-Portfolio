import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Github, Youtube, Linkedin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/BENi-Aditya", color: "hover:text-foreground" },
  { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/@BENiTech-o8o/videos", color: "hover:text-red-400" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/aditya-tripathi-55371533b/", color: "hover:text-blue-400" },
  { name: "Email", icon: Mail, href: "mailto:aditya.tripathi.beni@gmail.com", color: "hover:text-primary" },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 relative" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 grid-bg-dots opacity-20" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="badge-glow mb-4 inline-block">Contact</span>
          <h2 className="section-heading">
            Let's <span className="gradient-text">connect</span>
          </h2>
          <p className="section-subheading mx-auto">
            Interested in working together? Send an email or message on LinkedIn.
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto flex flex-col items-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full space-y-6 text-center"
          >
            {/* Quick Actions */}
            <div className="glass-card p-6">
              <h3 className="font-mono font-bold text-lg mb-4 flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Quick Connect
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Prefer a direct conversation? Send an email or message on LinkedIn.
              </p>
              <div className="space-y-3">
                <Button variant="hero" className="w-full" asChild>
                  <a href="mailto:aditya.tripathi.beni@gmail.com">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </a>
                </Button>
                <Button variant="hero-outline" className="w-full" asChild>
                  <a
                    href="https://www.linkedin.com/in/aditya-tripathi-55371533b/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    Message on LinkedIn
                  </a>
                </Button>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-6">
              <h3 className="font-mono font-bold text-lg mb-4">Find me online</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 text-muted-foreground ${link.color} transition-all hover:bg-muted`}
                  >
                    <link.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Code Snippet */}
            <div className="glass-card p-4 font-mono text-xs">
              <code className="text-muted-foreground">
                <span className="text-secondary">await</span>{" "}
                <span className="text-primary">connect</span>({"{"}
                <br />
                <span className="ml-4">from: </span>
                <span className="text-green-400">"you"</span>,
                <br />
                <span className="ml-4">to: </span>
                <span className="text-green-400">"BENi"</span>,
                <br />
                <span className="ml-4">reason: </span>
                <span className="text-green-400">"build something amazing"</span>
                <br />
                {"}"});
              </code>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
