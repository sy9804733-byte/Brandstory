import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Volume2, VolumeX, MessageSquare } from 'lucide-react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import GeneratorPage from './pages/GeneratorPage';

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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generator" element={<GeneratorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
