'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Scroll, Quote } from 'lucide-react';

interface LoveLetterProps {
  title: string;
  body: string;
  senderName: string;
  recipientName: string;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({
  title,
  body,
  senderName,
  recipientName,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto my-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-b from-[#fffcf2] via-[#faf3e0] to-[#f4e8c1] rounded-3xl p-6 sm:p-12 text-amber-950 shadow-2xl border-4 border-amber-300/60 overflow-hidden font-handwritten"
      >
        {/* Subtle vintage texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        {/* Decorative corner ribbons */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-rose-600 to-transparent opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-rose-600 to-transparent opacity-20 pointer-events-none" />

        {/* Header Ribbon badge */}
        <div className="flex items-center justify-between border-b-2 border-amber-800/20 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Scroll className="w-6 h-6 text-rose-700" />
            <span className="font-bold text-lg font-serif text-amber-900 uppercase tracking-widest">
              Carta Abierta
            </span>
          </div>
          <Heart className="w-6 h-6 text-rose-600 fill-rose-600 animate-pulse" />
        </div>

        {/* Title */}
        <h3 className="text-3xl sm:text-5xl font-cursive font-bold text-rose-800 mb-6 text-center drop-shadow-sm">
          {title}
        </h3>

        {/* Salutation */}
        <p className="text-xl sm:text-2xl font-bold text-amber-900 mb-4">
          Mi adorada {recipientName},
        </p>

        {/* Body message */}
        <div className="relative z-10 text-lg sm:text-2xl leading-relaxed text-amber-950/90 whitespace-pre-line mb-8 font-medium">
          <Quote className="w-8 h-8 text-rose-400/40 inline-block mr-2 transform -scale-x-100" />
          {body}
          <Quote className="w-8 h-8 text-rose-400/40 inline-block ml-2" />
        </div>

        {/* Signature */}
        <div className="flex justify-between items-end pt-6 border-t-2 border-amber-800/20">
          <div className="text-xs text-amber-800/70 font-sans uppercase font-bold tracking-wider">
            Escrito con amor infinito
          </div>
          <div className="text-right">
            <span className="text-amber-900 text-sm font-sans block">Por siempre tuyo,</span>
            <span className="text-3xl sm:text-4xl font-cursive text-rose-700 font-bold block mt-1">
              {senderName}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
