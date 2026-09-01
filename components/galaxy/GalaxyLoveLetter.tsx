'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Stars } from 'lucide-react';

interface GalaxyLoveLetterProps {
  title: string;
  body: string;
  senderName: string;
  recipientName: string;
}

export const GalaxyLoveLetter: React.FC<GalaxyLoveLetterProps> = ({
  title,
  body,
  senderName,
  recipientName,
}) => {
  return (
    <section className="max-w-3xl mx-auto px-4 py-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-b from-[#110729]/90 to-[#080217]/90 rounded-3xl p-6 sm:p-12 border border-purple-500/30 backdrop-blur-2xl shadow-[0_0_50px_rgba(168,85,247,0.15)] relative overflow-hidden text-white"
      >
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-purple-500/20 blur-3xl pointer-events-none rounded-full" />
        
        <div className="text-center mb-8 relative z-10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-purple-500/30">
            <Stars className="w-6 h-6 text-cyan-300" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-2">
            {title}
          </h2>
          <span className="text-xs font-mono text-cyan-300/80 uppercase tracking-widest">
            — Carta de las Estrellas para {recipientName} —
          </span>
        </div>

        {/* Letter Body */}
        <div className="text-sm sm:text-base leading-relaxed text-purple-100/90 whitespace-pre-line font-light space-y-4 relative z-10 px-2 sm:px-6 py-4 bg-[#190938]/40 rounded-2xl border border-purple-500/20">
          {body}
        </div>

        {/* Sender Signature */}
        <div className="mt-8 text-right relative z-10 pr-4">
          <p className="text-xs text-cyan-300/70 font-mono">Con todo mi amor infinito,</p>
          <p className="text-xl sm:text-2xl font-cursive text-cyan-300 font-bold mt-1">
            {senderName} ❤️
          </p>
        </div>
      </motion.div>
    </section>
  );
};
