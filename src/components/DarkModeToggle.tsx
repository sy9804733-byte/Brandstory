import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  const [showPrank, setShowPrank] = useState(false);

  const toggleTheme = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= 2 || Math.random() < 0.2) {
      setShowPrank(true);
    } else {
      setIsDark(!isDark);
      document.documentElement.classList.toggle('dark');
    }
  };

  return (
    <>
      <button onClick={toggleTheme} className="fixed top-6 right-6 z-[100]">
        <video src="/original-5afef9502258767eefcd21fde21e2099.mp4" className="w-16 h-16 rounded-full" autoPlay loop muted />
      </button>

      <AnimatePresence>
        {showPrank && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-6"
          >
            <h1 className="text-4xl font-bold text-red-500 mb-8">System Error: Creativity Reload Failed</h1>
            <video src="/videoplayback.mp4" className="w-full max-w-2xl" autoPlay controls />
            <audio src="/Arey teri maa ka bhsda phat jayega meme template.mp3" autoPlay />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
