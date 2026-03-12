import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, X, ExternalLink } from 'lucide-react';

const ART_WORKS = [
  {
    id: 1,
    title: "Cyberpunk Drift",
    image: "https://picsum.photos/seed/car1/800/600",
    description: "A futuristic take on automotive aesthetics.",
    metadata: "AI Generated | 4K | 2024"
  },
  {
    id: 2,
    title: "Neon Horizon",
    image: "https://picsum.photos/seed/city1/800/600",
    description: "The intersection of technology and nature.",
    metadata: "AI Generated | 8K | 2024"
  },
  {
    id: 3,
    title: "Digital Soul",
    image: "https://picsum.photos/seed/art1/800/600",
    description: "Exploring the essence of artificial intelligence.",
    metadata: "AI Generated | 4K | 2024"
  },
  {
    id: 4,
    title: "Speed of Light",
    image: "https://picsum.photos/seed/car2/800/600",
    description: "Motion captured in a digital realm.",
    metadata: "AI Generated | 4K | 2024"
  }
];

export default function Gallery() {
  const [selectedArt, setSelectedArt] = useState<typeof ART_WORKS[0] | null>(null);

  const handleDownload = (imageUrl: string, title: string) => {
    // In a real app, this would trigger a download
    window.open(imageUrl, '_blank');
  };

  return (
    <section id="gallery" className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
        AI Art Gallery
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ART_WORKS.map((art) => (
          <motion.div
            key={art.id}
            whileHover={{ scale: 1.05, y: -10 }}
            className="relative group cursor-pointer rounded-xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedArt(art)}
          >
            <img
              src={art.image}
              alt={art.title}
              className="w-full h-64 object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <h3 className="text-lg font-semibold text-white">{art.title}</h3>
              <p className="text-xs text-cyan-400">{art.metadata}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedArt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedArt(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-zinc-900 border border-white/10 rounded-2xl max-w-4xl w-full overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedArt(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-white/20 transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/3">
                  <img
                    src={selectedArt.image}
                    alt={selectedArt.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="md:w-1/3 p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{selectedArt.title}</h3>
                    <p className="text-zinc-400 mb-4">{selectedArt.description}</p>
                    <div className="text-sm text-cyan-400 font-mono mb-6">
                      {selectedArt.metadata}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => handleDownload(selectedArt.image, selectedArt.title)}
                      className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-xl transition-colors"
                    >
                      <Download size={18} />
                      Download 4K
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 border border-white/10 hover:bg-white/5 text-white py-3 rounded-xl transition-colors">
                      <ExternalLink size={18} />
                      View on Vercel
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
