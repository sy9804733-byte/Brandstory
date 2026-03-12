import { motion } from 'motion/react';

const VIDEOS = [
  { id: "iik25wqIuFo", title: "New Release" },
  { id: "SxrFX2B7shA", title: "Automobile Showcase" },
];

export default function Videos() {
  return (
    <section id="videos" className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
        Featured Content
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {VIDEOS.map((video, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="aspect-video rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl"
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="opacity-80 hover:opacity-100 transition-opacity"
            ></iframe>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
