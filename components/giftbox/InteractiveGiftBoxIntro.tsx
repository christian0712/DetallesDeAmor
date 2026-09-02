'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, Heart } from 'lucide-react';

interface InteractiveGiftBoxIntroProps {
  recipientName: string;
  senderName: string;
  envelopeTitle: string;
  envelopeSubtitle: string;
  onOpen: () => void;
}

export const InteractiveGiftBoxIntro: React.FC<InteractiveGiftBoxIntroProps> = ({
  recipientName,
  senderName,
  envelopeTitle,
  envelopeSubtitle,
  onOpen,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenGift = () => {
    setIsOpening(true);
    // Launch Fireworks & Confetti explosion
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ef4444', '#f59e0b', '#10b981', '#ec4899', '#8b5cf6'],
    });

    setTimeout(() => {
      onOpen();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10 text-center">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/20 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-amber-500/20 blur-3xl pointer-events-none rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Sorpresa Romántica 🎁</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-white leading-tight">
          {envelopeTitle || 'Un Regalo Especial Para:'}{' '}
          <span className="text-gradient-rose font-cursive text-4xl sm:text-5xl block mt-1">
            {recipientName}
          </span>
        </h1>

        <p className="text-emerald-200/80 text-xs sm:text-sm font-light">
          {envelopeSubtitle || 'Desata el lazo de la caja para descubrir tu sorpresa de amor 🎁✨'}
        </p>

        {/* 3D Animated Gift Box */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenGift}
          className="relative w-56 h-56 sm:w-64 sm:h-64 mx-auto cursor-pointer group"
        >
          {/* Gift Box Container */}
          <div className="w-full h-full rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900 p-4 border-2 border-emerald-400/80 shadow-[0_0_50px_rgba(16,185,129,0.4)] flex flex-col items-center justify-center relative overflow-hidden">
            
            {/* Gift Ribbon Horizontal */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 shadow-md border-x border-amber-200/50" />
            
            {/* Gift Ribbon Vertical */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-10 bg-gradient-to-b from-amber-400 via-yellow-300 to-amber-500 shadow-md border-y border-amber-200/50" />

            {/* Glowing Ribbon Bow Center */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-tr from-amber-300 via-yellow-400 to-amber-500 border-4 border-white shadow-2xl flex items-center justify-center text-emerald-950 font-bold"
            >
              <Gift className="w-10 h-10 text-emerald-950 animate-bounce" />
            </motion.div>

            {/* Sparkle Glow Tag */}
            <div className="absolute bottom-3 z-10 bg-emerald-950/90 text-emerald-200 text-[11px] font-semibold px-3 py-1 rounded-full border border-emerald-400/40">
              Toca para abrir 🎁
            </div>
          </div>
        </motion.div>

        <p className="text-xs text-emerald-300/60 font-mono">
          De: <strong className="text-emerald-200">{senderName}</strong>
        </p>
      </motion.div>
    </div>
  );
};
