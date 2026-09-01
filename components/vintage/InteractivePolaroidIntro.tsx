'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles, Heart, Film } from 'lucide-react';

interface InteractivePolaroidIntroProps {
  recipientName: string;
  senderName: string;
  envelopeTitle?: string;
  envelopeSubtitle?: string;
  onOpen: () => void;
}

export const InteractivePolaroidIntro: React.FC<InteractivePolaroidIntroProps> = ({
  recipientName,
  senderName,
  envelopeTitle = 'Nuestra Historia en Fotografías:',
  envelopeSubtitle = 'Toca el obturador de la cámara retro para revelar nuestro álbum de amor 📸✨',
  onOpen,
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-b from-[#1c140d] via-[#2d2015] to-[#1c140d] text-[#f7efdf]">
      
      {/* Vintage Warm Amber Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/15 blur-3xl pointer-events-none rounded-full" />

      {/* Floating Retro Film Roll / Hearts */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute text-amber-200 text-xl animate-float-slow"
            style={{
              top: `${(i * 12) % 100}%`,
              left: `${(i * 18) % 100}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            📸
          </div>
        ))}
      </div>

      {/* Main Polaroid Camera Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-lg w-full px-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-semibold mb-6 backdrop-blur-md">
          <Film className="w-4 h-4 text-amber-400" />
          <span>Álbum Polaroid Vintage & Vinilo Retro</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-amber-100 mb-2 tracking-wide">
          {envelopeTitle}
        </h1>

        <p className="text-2xl sm:text-3xl font-cursive text-amber-300 mb-8">
          {recipientName}
        </p>

        {/* Vintage Polaroid Camera Graphic Button */}
        <div className="relative my-6 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpen}
            className="relative w-64 bg-[#f8f2e6] rounded-3xl p-5 shadow-2xl border-4 border-[#d4c3a7] text-slate-800 cursor-pointer transform transition-all group"
          >
            {/* Masking tape on top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#e6d7be]/80 rotate-1 shadow-sm border border-amber-300/40 rounded-sm" />

            {/* Viewfinder Lens */}
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-slate-900 via-slate-800 to-amber-900 mx-auto mb-4 border-4 border-amber-200/60 shadow-inner flex items-center justify-center relative group-hover:border-amber-400 transition">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-900 to-amber-700/60 flex items-center justify-center border-2 border-white/20">
                <Camera className="w-8 h-8 text-amber-200 group-hover:scale-110 transition duration-300" />
              </div>

              {/* Red Shutter Flash Light */}
              <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-rose-500 border border-white animate-pulse" />
            </div>

            <div className="text-center font-serif">
              <span className="text-xs uppercase tracking-widest text-amber-900 font-bold block">
                POLAROID LOVE 1998
              </span>
              <span className="text-[11px] text-amber-800/70 font-cursive text-base block mt-0.5">
                Haz clic para revelar foto 📸
              </span>
            </div>
          </motion.div>
        </div>

        <p className="text-xs sm:text-sm text-amber-200/80 font-light mt-6 max-w-xs mx-auto leading-relaxed">
          {envelopeSubtitle}
        </p>

        <div className="mt-6 text-[11px] text-amber-300/60 font-mono">
          De: {senderName}
        </div>
      </motion.div>
    </div>
  );
};
