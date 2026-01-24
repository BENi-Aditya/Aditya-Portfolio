import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Play, Image as ImageIcon, Video } from "lucide-react";
import { GlassPanel } from "./GlassPanel";

interface MediaItem {
  id: string;
  type: "image" | "video";
  thumbnail: string;
  src: string;
  title: string;
  description?: string;
}

// Placeholder media items - replace with actual project media
const mediaItems: MediaItem[] = [
  {
    id: "1",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop",
    src: "https://www.youtube.com/watch?v=Dli05LBOTP0&t=9s",
    title: "Project Demo",
    description: "Full demonstration of the Horn-Bill drone system"
  },
  {
    id: "2",
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=400&h=300&fit=crop",
    src: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1200&h=900&fit=crop",
    title: "Drone Assembly",
    description: "The fully assembled Horn-Bill drone"
  },
  {
    id: "3",
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=900&fit=crop",
    title: "Seed Bomb Design",
    description: "Close-up of seed bomb construction"
  },
  {
    id: "4",
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
    src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=900&fit=crop",
    title: "Competition Day",
    description: "World Robot Olympiad participation"
  },
  {
    id: "5",
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=900&fit=crop",
    title: "Circuit Board",
    description: "Custom electronics and Raspberry Pi integration"
  },
  {
    id: "6",
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?w=400&h=300&fit=crop",
    src: "https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?w=1200&h=900&fit=crop",
    title: "Field Testing",
    description: "Outdoor testing of drop mechanism"
  },
];

export const MediaGallery = () => {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  const handleItemClick = (item: MediaItem) => {
    if (item.type === "video") {
      window.open(item.src, "_blank");
    } else {
      setSelectedItem(item);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {mediaItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassPanel 
              className="cursor-pointer group overflow-hidden aspect-[4/3]"
              onClick={() => handleItemClick(item)}
            >
              <div className="relative w-full h-full">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                
                {/* Type indicator */}
                <div className="absolute top-3 right-3">
                  <div className="w-8 h-8 rounded-full bg-background/80 border border-secondary/30 flex items-center justify-center">
                    {item.type === "video" ? (
                      <Play className="w-4 h-4 text-secondary" />
                    ) : (
                      <ImageIcon className="w-4 h-4 text-secondary" />
                    )}
                  </div>
                </div>
                
                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h4 className="text-sm font-medium text-foreground">{item.title}</h4>
                  {item.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{item.description}</p>
                  )}
                </div>
                
                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </GlassPanel>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              onClick={() => setSelectedItem(null)}
            />
            
            {/* Content */}
            <motion.div
              className="relative max-w-5xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <GlassPanel className="p-2">
                <img
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  className="w-full rounded-lg"
                />
              </GlassPanel>
              
              {/* Title */}
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-foreground">{selectedItem.title}</h3>
                {selectedItem.description && (
                  <p className="text-sm text-muted-foreground mt-1">{selectedItem.description}</p>
                )}
              </div>
              
              {/* Close button */}
              <button
                onClick={() => setSelectedItem(null)}
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