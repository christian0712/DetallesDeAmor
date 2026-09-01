'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Heart } from 'lucide-react';
import { MemoryItem } from '@/types';

interface MemoriesTimelineProps {
  memories: MemoryItem[];
}

export const MemoriesTimeline: React.FC<MemoriesTimelineProps> = ({ memories }) => {
  if (!memories || memories.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto my-12 px-4">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold mb-2 border border-rose-500/30">
          <Sparkles className="w-4 h-4 text-rose-400" />
          <span>Línea del Tiempo</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">
          Nuestra Historia en Fechas 🗓️❤️
        </h3>
      </div>

      <div className="relative border-l-2 border-rose-500/30 ml-4 md:ml-32 space-y-8">
        {memories.map((item, index) => (
          <motion.div
            key={item.id || index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="relative pl-6 md:pl-8 group"
          >
            {/* Timeline node icon */}
            <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 border-2 border-white flex items-center justify-center text-sm text-white shadow-lg group-hover:scale-125 transition">
              {item.icon || '❤️'}
            </div>

            {/* Date Tag */}
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-rose-400 bg-rose-950/60 px-3 py-1 rounded-full border border-rose-500/30 mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>{item.date}</span>
            </div>

            {/* Card Content */}
            <div className="glass-card-rose rounded-2xl p-5 border border-rose-500/20 shadow-xl group-hover:border-rose-500/50 transition duration-300">
              <h4 className="text-lg md:text-xl font-bold text-white mb-1 flex items-center gap-2">
                {item.title}
              </h4>
              <p className="text-rose-200/80 text-sm md:text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
