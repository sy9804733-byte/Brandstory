import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';

interface Feedback {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

export default function FeedbackWall() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { data } = await supabase
        .from('service_feedback')
        .select('*')
        .gte('created_at', sevenDaysAgo.toISOString());

      if (data) setFeedback(data);
    };

    fetchFeedback();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {feedback.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900 p-6 rounded-2xl border border-white/10 shadow-xl"
        >
          <h3 className="text-xl font-bold text-cyan-400 mb-2">{item.name}</h3>
          <p className="text-white/80">{item.message}</p>
        </motion.div>
      ))}
    </div>
  );
}
