'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Feather, Sparkles } from 'lucide-react';

interface VintageLoveLetterProps {
  title: string;
  body: string;
  senderName: string;
  recipientName: string;
}

export const VintageLoveLetter: React.FC<VintageLoveLetterProps> = ({
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
        className="bg-[#faf6ee] text-slate-800 rounded-3xl p-6 sm:p-12 border-4 border-[#d6c4a6] shadow-2xl relative overflow-hidden font-serif"
      >
        {/* Masking tape on top center */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#e6d7be]/90 rotate-1 shadow-sm border border-amber-300/40 rounded-sm" />

        {/* Vintage Stamp Accent */}
        <div className="absolute top-6 right-6 w-16 h-20 rounded border-2 border-dashed border-rose-900/30 bg-rose-50/50 flex flex-col items-center justify-center p-1 text-[10px] text-rose-950 font-mono rotate-6">
          <Heart className="w-5 h-5 text-rose-700 fill-rose-700 mb-1" />
          <span>LOVE 1998</span>
        </div>

        <div className="text-center mb-8 relative z-10 pt-2">
          <div className="w-12 h-12 rounded-full bg-amber-200/80 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Feather className="w-6 h-6 text-amber-900" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-amber-950 mb-1">
            {title}
          </h2>
          <span className="text-xs font-cursive text-amber-800 text-lg block">
            Querida/o {recipientName}:
          </span>
        </div>

        {/* Parchment Body */}
        <div className="text-base sm:text-lg leading-relaxed text-slate-800 whitespace-pre-line font-serif italic space-y-4 relative z-10 px-2 sm:px-6 py-6 bg-[#f3ebd9]/60 rounded-2xl border border-amber-300/40 shadow-inner">
          {body}
        </div>

        {/* Sender Signature */}
        <div className="mt-8 text-right relative z-10 pr-4">
          <p className="text-xs text-amber-900/70 font-mono">Con todo mi amor verdadero,</p>
          <p className="text-2xl sm:text-3xl font-cursive text-amber-950 font-bold mt-1">
            {senderName} ❤️
          </p>
        </div>
      </motion.div>
    </section>
  );
};
