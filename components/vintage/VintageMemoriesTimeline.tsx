'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Calendar, Clock, Stamp } from 'lucide-react';
import { MemoryItem } from '@/types';

interface VintageMemoriesTimelineProps {
  memories: MemoryItem[];
}

export const VintageMemoriesTimeline: React.FC<VintageMemoriesTimelineProps> = ({ memories }) => {
  if (!memories || memories.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto my-12 px-4 relative">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-2 border border-amber-500/40 backdrop-blur-md">
          <Camera className="w-4 h-4 text-amber-400" />
          <span>Bitácora de Recuerdos Vintage</span>
        </div>
        <h3 className="text-2xl md:text-4xl font-serif font-bold text-amber-100 tracking-wide">
          Momentos Guardados en el Tiempo 📸📜
        </h3>
        <p className="text-xs sm:text-sm text-amber-200/70 mt-1 font-serif italic">
          Páginas amarillentas de nuestra historia de amor grabadas para siempre.
        </p>
      </div>

      <div className="relative border-l-2 border-amber-500/40 ml-4 md:ml-32 space-y-10">
        {memories.map((item, index) => (
          <motion.div
            key={item.id || index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="relative pl-6 md:pl-8 group"
          >
            {/* Vintage Node Icon */}
            <div className="absolute -left-[19px] top-1.5 w-9 h-9 rounded-full bg-gradient-to-tr from-amber-700 via-amber-800 to-amber-950 border-2 border-amber-400 flex items-center justify-center text-sm text-amber-100 shadow-[0_0_15px_rgba(217,119,6,0.4)] group-hover:scale-125 transition duration-300">
              {item.icon || '📜'}
            </div>

            {/* Date Vintage Badge */}
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300 bg-[#281a0e]/90 px-3.5 py-1 rounded-full border border-amber-500/40 mb-2 shadow-lg">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{item.date}</span>
            </div>

            {/* Vintage Journal Card */}
            <div className="bg-[#24170d]/90 rounded-2xl p-5 sm:p-6 border border-amber-500/30 shadow-xl group-hover:border-amber-400/60 transition duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 blur-xl pointer-events-none rounded-full" />
              
              <h4 className="text-lg md:text-xl font-bold font-serif text-amber-200 mb-2 flex items-center gap-2">
                <Stamp className="w-4 h-4 text-amber-400" />
                <span>{item.title}</span>
              </h4>
              <p className="text-amber-100/80 text-sm md:text-base leading-relaxed font-serif">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
