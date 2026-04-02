import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function FeedbackForm({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await supabase.from('service_feedback').insert([{ name, message }]);
    
    setIsSubmitting(false);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm"
    >
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Feedback</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white"><X /></button>
        </div>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-white/5 p-4 rounded-xl mb-4 text-white placeholder-white/50 border border-white/10"
          required
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-white/5 p-4 rounded-xl mb-6 text-white placeholder-white/50 border border-white/10 h-32"
          required
        />
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-cyan-500 py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 hover:bg-cyan-400 transition-colors"
        >
          {isSubmitting ? 'Sending...' : <><Send size={20} /> Submit</>}
        </button>
      </form>
    </motion.div>
  );
}
