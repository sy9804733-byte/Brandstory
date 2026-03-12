import { Youtube, Instagram, Globe, Mail } from 'lucide-react';
import { motion } from 'motion/react';

const LINKS = [
  {
    name: "Instagram",
    icon: <Instagram />,
    handle: "@ayush2007368",
    url: "https://instagram.com/ayush2007368",
    color: "hover:text-pink-500"
  },
  {
    name: "YouTube",
    icon: <Youtube />,
    handle: "Brand Story Relax",
    url: "https://youtube.com/@brandstory1258",
    color: "hover:text-red-500"
  },
  {
    name: "Portfolio",
    icon: <Globe />,
    handle: "ayush-art-visions",
    url: "https://ayush-art-visions.vercel.app",
    color: "hover:text-cyan-500"
  }
];

export default function NavHub() {
  return (
    <section id="connect" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {LINKS.map((link) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5 }}
            className={`flex flex-col items-center p-8 rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-sm transition-all ${link.color}`}
          >
            <div className="mb-4 scale-150">
              {link.icon}
            </div>
            <h3 className="text-xl font-bold mb-1">{link.name}</h3>
            <p className="text-zinc-500 text-sm">{link.handle}</p>
          </motion.a>
        ))}
      </div>

      <div className="mt-20 p-10 rounded-3xl border border-white/5 bg-gradient-to-br from-zinc-900/80 to-black flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">Let's Create Together</h2>
          <p className="text-zinc-400 max-w-md">
            AI Digital Art Creator | Automobile Enthusiast | Coder.
            Turning visions into digital reality.
          </p>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-cyan-400">100M+</div>
              <div className="text-xs text-zinc-500 uppercase tracking-widest">Reach</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">1.7k+</div>
              <div className="text-xs text-zinc-500 uppercase tracking-widest">Followers</div>
            </div>
          </div>
          
          <a
            href="mailto:mra270208@gmail.com"
            className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-cyan-400 transition-colors"
          >
            <Mail size={18} />
            mra270208@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
