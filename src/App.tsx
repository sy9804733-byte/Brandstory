import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, MessageSquare } from 'lucide-react';

import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Videos from './components/Videos';
import NavHub from './components/NavHub';
import Background from './components/Background';

export default function App() {
  const [isMuted, setIsMuted] = useState(true);
  const [showFeedbackVideo, setShowFeedbackVideo] = useState(false);

  // Audio handling (Vibe Factor)
  useEffect(() => {
    console.log("Audio toggle:", isMuted ? "Muted" : "Playing Lo-Fi");
  }, [isMuted]);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30">
      {/* Feedback Video Overlay */}
      {showFeedbackVideo && (
        <div className="fixed inset-0 z-[1000] bg-black flex items-center justify-center">
          <button
            onClick={() => setShowFeedbackVideo(false)}
            className="absolute top-6 right-6 text-white bg-zinc-800 p-2 rounded-full"
          >
            Close
          </button>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/bQOCnka-1nA?autoplay=1"
            title="Feedback Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Suspense fallback={null}>
                <Hero />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
              </Suspense>
            </Canvas>
          </div>

          <div className="relative z-10 text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
                AYUSH
              </h1>
              <p className="text-cyan-400 font-mono tracking-widest uppercase text-sm md:text-base">
                AI Digital Artist | Automobile YouTuber | Coder
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-12"
            >
              <a
                href="#gallery"
                className="px-8 py-4 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 font-bold uppercase tracking-widest text-xs"
              >
                Explore Vision
              </a>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-cyan-500 to-transparent"
          />
        </section>

        <Gallery />
        <Videos />
        <NavHub />

        {/* Footer */}
        <footer className="py-10 text-center text-zinc-600 text-sm border-t border-white/5">
          <p>© 2024 Ayush Digital Arts. All rights reserved.</p>
        </footer>
      </main>

      {/* Audio Toggle and Feedback (Vibe Factor) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-4 rounded-full bg-zinc-900 border border-white/10 text-white hover:bg-zinc-800 transition-colors shadow-2xl"
          title="Toggle Background Music"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} className="text-cyan-400" />}
        </button>
        <button
          onClick={() => setShowFeedbackVideo(true)}
          className="p-4 rounded-full bg-zinc-900 border border-white/10 text-white hover:bg-zinc-800 transition-colors shadow-2xl"
          title="Send Feedback"
        >
          <MessageSquare size={20} />
        </button>
      </div>

      {/* Background Music Player */}
      {!isMuted && (
        <div className="fixed -top-[1000px] -left-[1000px] opacity-0 pointer-events-none">
          <iframe
            width="100"
            height="100"
            src="https://www.youtube.com/embed/iik25wqIuFo?autoplay=1&mute=0&loop=1&playlist=iik25wqIuFo"
            title="Background Music"
            allow="autoplay"
          ></iframe>
        </div>
      )}

      {/* Navigation Overlay */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex gap-8 text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400">
        <a href="#" className="hover:text-white transition-colors">Home</a>
        <a href="#gallery" className="hover:text-white transition-colors">Art</a>
        <a href="#videos" className="hover:text-white transition-colors">Videos</a>
        <a href="#connect" className="hover:text-white transition-colors">Connect</a>
      </nav>
    </div>
  );
}
