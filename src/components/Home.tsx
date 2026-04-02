import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, MessageSquare } from 'lucide-react';

import Hero from './Hero';
import Gallery from './Gallery';
import Videos from './Videos';
import NavHub from './NavHub';
import Background from './Background';
import ServiceCards from './ServiceCards';
import FeedbackForm from './FeedbackForm';
import FeedbackWall from './FeedbackWall';
import DarkModeToggle from './DarkModeToggle';

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  return (
    <motion.div ref={ref} style={{ opacity, y }} className="text-center">
      <h3 className="text-5xl md:text-7xl font-black text-white mb-2">{value}</h3>
      <p className="text-cyan-400 font-mono uppercase tracking-widest text-sm">{label}</p>
    </motion.div>
  );
}

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const [showFeedbackVideo, setShowFeedbackVideo] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30">
      <DarkModeToggle />
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

      <AnimatePresence>
        {showFeedbackForm && <FeedbackForm onClose={() => setShowFeedbackForm(false)} />}
      </AnimatePresence>

      <main className="relative z-10">
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

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-cyan-500 to-transparent"
          />
        </section>

        <section className="py-32 flex flex-col md:flex-row justify-center items-center gap-20 bg-zinc-950/50">
          <AnimatedStat value="100M+" label="Reach" />
          <AnimatedStat value="1.7k+" label="Followers" />
        </section>

        <ServiceCards />

        <section className="py-20 px-6 bg-[#050505]">
          <h2 className="text-4xl font-bold text-center mb-12">Feedback Wall</h2>
          <FeedbackWall />
          <div className="text-center mt-12">
            <button onClick={() => setShowFeedbackForm(true)} className="bg-cyan-500 px-8 py-4 rounded-full font-bold">
              Leave Feedback
            </button>
          </div>
        </section>

        <Gallery />
        <Videos />
        <NavHub />

        <footer className="py-10 text-center text-zinc-600 text-sm border-t border-white/5">
          <p>© 2024 Ayush Digital Arts. All rights reserved.</p>
        </footer>
      </main>

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

      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex gap-8 text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400">
        <a href="#" className="hover:text-white transition-colors">Home</a>
        <a href="#gallery" className="hover:text-white transition-colors">Art</a>
        <a href="#videos" className="hover:text-white transition-colors">Videos</a>
        <a href="#connect" className="hover:text-white transition-colors">Connect</a>
      </nav>
    </div>
  );
}
