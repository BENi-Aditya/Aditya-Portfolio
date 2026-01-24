import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Award, Trophy, Medal, Star, X, ExternalLink } from "lucide-react";

interface Achievement {
  icon: "trophy" | "medal" | "award" | "star";
  title: string;
  subtitle: string;
  certificateUrl?: string;
}

const achievements: Achievement[] = [
  {
    icon: "trophy",
    title: "2nd Place",
    subtitle: "Delhi Regionals",
    certificateUrl: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&h=600&fit=crop",
  },
  {
    icon: "medal",
    title: "Top 10",
    subtitle: "Nationals, Hyderabad",
    certificateUrl: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&h=600&fit=crop",
  },
  {
    icon: "star",
    title: "Golden Badge",
    subtitle: "Recipient",
    certificateUrl: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&h=600&fit=crop",
  },
  {
    icon: "award",
    title: "World Robot Olympiad",
    subtitle: "Official Participant",
    certificateUrl: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&h=600&fit=crop",
  },
];

const iconMap = {
  trophy: Trophy,
  medal: Medal,
  award: Award,
  star: Star,
};

export const AchievementPanel = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<Achievement | null>(null);

  return (
    <>
      <motion.div
        className="glass-panel-strong p-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 border-b border-secondary/20 pb-4">
          <Award className="w-6 h-6 text-secondary" />
          <h3 className="text-lg uppercase tracking-widest text-foreground font-medium">
            Achievements
          </h3>
        </div>
        
        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = iconMap[achievement.icon];
            return (
              <motion.div
                key={index}
                className={`text-center ${achievement.certificateUrl ? 'cursor-pointer' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2 }}
                onClick={() => achievement.certificateUrl && setSelectedCertificate(achievement)}
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-3 rounded-full bg-secondary/10 border border-secondary/30 flex items-center justify-center relative group"
                  whileHover={{ scale: 1.1, boxShadow: "0 0 30px hsl(185, 70%, 45%, 0.4)" }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon className="w-8 h-8 text-secondary" />
                  {achievement.certificateUrl && (
                    <div className="absolute inset-0 rounded-full bg-secondary/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <ExternalLink className="w-4 h-4 text-secondary" />
                    </div>
                  )}
                </motion.div>
                <h4 className="font-semibold text-foreground mb-1">
                  {achievement.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {achievement.subtitle}
                </p>
                {achievement.certificateUrl && (
                  <p className="text-xs text-secondary mt-1">Click to view</p>
                )}
              </motion.div>
            );
          })}
        </div>
        
        {/* Footer tagline */}
        <motion.p
          className="text-center text-muted-foreground mt-8 pt-6 border-t border-secondary/10 italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          Built as a real system. Tested as one.
        </motion.p>
      </motion.div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              onClick={() => setSelectedCertificate(null)}
            />
            
            {/* Content */}
            <motion.div
              className="relative max-w-3xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="glass-panel-strong p-4">
                <img
                  src={selectedCertificate.certificateUrl}
                  alt={`${selectedCertificate.title} Certificate`}
                  className="w-full rounded-lg"
                />
              </div>
              
              {/* Title */}
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-foreground">
                  {selectedCertificate.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedCertificate.subtitle}
                </p>
              </div>
              
              {/* Close button */}
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center hover:bg-secondary/20 transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};