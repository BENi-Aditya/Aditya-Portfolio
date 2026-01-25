import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Medal, Award, Star, Globe, School } from "lucide-react";

const stats = [
  { icon: Trophy, value: "Top 10", label: "WRO Nationals" },
  { icon: Medal, value: "20+", label: "Competition Awards" },
  { icon: Star, value: "2×", label: "Science Captain" },
];

const achievements = [
  {
    category: "International",
    items: [
      { name: "Eurekathon 2025 International Hackathon", position: "3rd Position" },
      { name: "CS Base Hack4Health International Hackathon", position: "Winner (twice)" },
      { name: "Hidden Leaf International Hackathon", position: "2nd Position" },
      { name: "Hackbro International Hackathon", position: "1st Position" },
      { name: "2025 UNity Hacks International Hackathon", position: "1st Position" },
      { name: "International Student Bloomathon 2025", position: "1st Position" },
      { name: "Hackfordge International Hackathon", position: "2nd Position" },
      { name: "HawkHacks International Hackathon", position: "Winner" },
    ],
  },
  {
    category: "National",
    items: [
      { name: "WRO - Nationals", position: "Golden Badge - Top-10" },
      { name: "WRO - Regionals", position: "2nd Position" },
      { name: "Kshitij IIT-KGP National Aeromodelling Comp.", position: "Cleared Round 1" },
      { name: "Eureka IIT Bombay", position: "Cleared Round 1" },
      { name: "ECell IIT Kanpur", position: "Cleared Round 1" },
      { name: "Soarfest National Aeromodelling Comp.", position: "2nd Position" },
      { name: "Sharda University National Hackathon", position: "4th Position 2025" },
      { name: "Sharda University National Hackathon", position: "4th Position 2023" },
      { name: "INFINITUS DPS-GZB", position: "2nd Position" },
      { name: "Vivo Ignite National Innovation Comp.", position: "Top 100 out of 1900" },
      { name: "AFS National Business Pitch Comp.", position: "3rd Position" },
    ],
  },
  {
    category: "School",
    items: [
      { name: "Elected Science Captain", position: "2023" },
      { name: "Elected Science Captain", position: "2024" },
      { name: "Intraschool Innovation Month Seniors", position: "1st Position" },
      { name: "Intraschool Innovation Month Juniors", position: "2nd Position" },
      { name: "Intraclass Science Month", position: "2nd Position" },
    ],
  },
];

export function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="py-20 md:py-24 relative" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="badge-glow mb-4 inline-block">Achievements</span>
          <h2 className="section-heading">
            Track record of <span className="gradient-text">excellence</span>
          </h2>
          <p className="section-subheading mx-auto">
            A selection of competitions, hackathons, and recognition across multiple domains.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-stretch justify-center gap-4 mb-12 sm:mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="glass-card p-6 text-center group hover:border-primary/30 transition-all w-full sm:w-[280px]"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 mb-4 group-hover:scale-110 transition-transform">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold font-mono text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements by Category */}
        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + catIndex * 0.1 }}
              className={`glass-card p-6 ${category.category === "School" ? "md:col-span-2" : ""}`}
            >
              <div className="flex items-center gap-3 mb-6">
                {category.category === "International" && <Globe className="w-5 h-5 text-primary" />}
                {category.category === "National" && <Trophy className="w-5 h-5 text-primary" />}
                {category.category === "Hackathons" && <Award className="w-5 h-5 text-primary" />}
                {category.category === "School" && <School className="w-5 h-5 text-primary" />}
                <h3 className="font-mono font-bold text-xl">{category.category}</h3>
              </div>

              <div
                className={
                  category.category === "School"
                    ? "grid sm:grid-cols-2 gap-3 sm:gap-x-8"
                    : "space-y-3"
                }
              >
                {category.items.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between py-2 border-b border-border/30 last:border-0 ${
                      category.category === "School" ? "sm:border-b-0 sm:border-t sm:border-border/30 sm:py-3" : ""
                    }`}
                  >
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                    <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {item.position}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
