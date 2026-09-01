'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Disc, Heart, Sparkles, CheckCircle2, Music } from 'lucide-react';
import canvasConfetti from 'canvas-confetti';

interface VintageProposalProps {
  questionTitle: string;
  yesButtonText: string;
  yesResponseSubtitle: string;
  senderName: string;
  recipientName: string;
}

export const VintageProposal: React.FC<VintageProposalProps> = ({
  questionTitle,
  yesButtonText,
  yesResponseSubtitle,
  senderName,
  recipientName,
}) => {
  const [accepted, setAccepted] = useState(false);

  const handleYes = () => {
    setAccepted(true);

    // Launch warm golden confetti explosion
    const count = 180;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#f59e0b', '#d97706', '#fbbf24', '#f43f5e', '#ffffff'],
    };

    function fire(particleRatio: number, opts: canvasConfetti.Options) {
      canvasConfetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-12 text-center relative">
      <div className="bg-[#f7f0e1] text-slate-900 rounded-3xl p-8 sm:p-12 border-4 border-[#d8c7a9] shadow-2xl relative overflow-hidden">
        
        {/* Masking tape on top center */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#e6d7be]/90 rotate-[-1deg] shadow-sm border border-amber-300/40 rounded-sm pointer-events-none" />

        {!accepted ? (
          <div className="space-y-6 relative z-10">
            <div className="w-16 h-16 rounded-full bg-[#2a1b10] border-2 border-amber-400 text-amber-300 flex items-center justify-center mx-auto shadow-xl">
              <Disc className="w-8 h-8 animate-spin" style={{ animationDuration: '6s' }} />
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-amber-950 max-w-xl mx-auto leading-tight">
              {questionTitle}
            </h2>

            <p className="text-xs sm:text-sm text-amber-900/70 font-light max-w-md mx-auto">
              Nuestra melodía recién comienza. ¿Aceptas seguir bailando esta canción juntos para siempre?
            </p>

            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleYes}
              className="px-10 py-5 rounded-full bg-gradient-to-r from-amber-600 via-amber-700 to-rose-700 hover:from-amber-700 hover:to-rose-800 text-white font-serif font-bold text-lg sm:text-xl shadow-2xl border-2 border-amber-300/50 flex items-center gap-3 mx-auto cursor-pointer transition duration-300"
            >
              <Heart className="w-6 h-6 fill-white" />
              <span>{yesButtonText}</span>
              <Sparkles className="w-6 h-6 text-amber-300" />
            </motion.button>
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-6 relative z-10 py-4"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-600 text-emerald-700 flex items-center justify-center mx-auto shadow-xl animate-bounce">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-amber-950">
              ¡Nuestro Amor es Inmortal! 🎉💖
            </h2>

            <p className="text-base sm:text-xl text-amber-900 font-cursive text-2xl font-bold max-w-md mx-auto">
              {yesResponseSubtitle}
            </p>

            <div className="pt-4 text-xs font-mono text-amber-900/80">
              📻 Canción Grabada en el Grabador de Nuestros Corazones para Siempre.
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
