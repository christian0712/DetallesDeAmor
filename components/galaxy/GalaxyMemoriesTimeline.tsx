'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Orbit, Calendar, Star, Sparkles } from 'lucide-react';
import { MemoryItem } from '@/types';

interface GalaxyMemoriesTimelineProps {
  memories: MemoryItem[];
}

export const GalaxyMemoriesTimeline: React.FC<GalaxyMemoriesTimelineProps> = ({ memories }) => {
  if (!memories || memories.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto my-12 px-4 relative">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold mb-2 border border-cyan-500/40 backdrop-blur-md">
          <Orbit className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '12s' }} />
          <span>Constelación de Fechas</span>
        </div>
        <h3 className="text-2xl md:text-4xl font-serif font-bold text-white tracking-wide">
          Fechas Escritas en las Estrellas 🌌✨
        </h3>
        <p className="text-xs sm:text-sm text-cyan-200/70 mt-1">
          Nuestros momentos más importantes grabados en la historia cósmica.
        </p>
      </div>

      <div className="relative border-l-2 border-dashed border-cyan-500/40 ml-4 md:ml-32 space-y-10">
        {memories.map((item, index) => (
          <motion.div
            key={item.id || index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="relative pl-6 md:pl-8 group"
          >
            {/* Constellation Star Node Icon */}
            <div className="absolute -left-[19px] top-1.5 w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 border-2 border-cyan-300 flex items-center justify-center text-sm text-white shadow-[0_0_15px_rgba(6,182,212,0.6)] group-hover:scale-125 transition duration-300">
              {item.icon || '⭐'}
            </div>

            {/* Date Cosmic Badge */}
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-300 bg-[#0c1433]/90 px-3.5 py-1 rounded-full border border-cyan-500/40 mb-2 shadow-lg">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>{item.date}</span>
            </div>

            {/* Card Content with Cosmic Glow */}
            <div className="bg-[#09051c]/90 rounded-2xl p-5 sm:p-6 border border-cyan-500/30 shadow-[0_0_25px_rgba(6,182,212,0.15)] group-hover:border-cyan-400/70 transition duration-300 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-2xl pointer-events-none rounded-full" />
              
              <h4 className="text-lg md:text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Star className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                <span>{item.title}</span>
              </h4>
              <p className="text-cyan-200/80 text-sm md:text-base leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
