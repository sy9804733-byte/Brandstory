import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const cards = [
  { title: "Digital Goods", icon: "📦", link: "/generator" },
  { title: "Services", icon: "✨", link: "#" },
  { title: "Physical Goods", icon: "💎", link: "#" },
];

export default function ServiceCards() {
  return (
    <section className="py-20 px-6 bg-[#050505]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -20 }}
            className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center text-center"
          >
            <div className="text-6xl mb-6">{card.icon}</div>
            <h3 className="text-2xl font-bold text-white mb-4">{card.title}</h3>
            <Link to={card.link} className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-cyan-400 transition-colors">
              Explore now
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
