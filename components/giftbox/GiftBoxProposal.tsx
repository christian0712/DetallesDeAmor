'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

interface GiftBoxProposalProps {
  questionTitle: string;
  yesButtonText: string;
  yesResponseSubtitle: string;
  senderName: string;
  recipientName: string;
}

export const GiftBoxProposal: React.FC<GiftBoxProposalProps> = ({
  questionTitle,
  yesButtonText,
  yesResponseSubtitle,
  senderName,
  recipientName,
}) => {
  const [hasAccepted, setHasAccepted] = useState(false);

  const handleAccept = () => {
    setHasAccepted(true);

    // Fireworks Explosion
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#10b981', '#f59e0b', '#ec4899', '#3b82f6'],
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#10b981', '#f59e0b', '#ec4899', '#3b82f6'],
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <section className="max-w-3xl mx-auto px-4 my-16">
      <div className="bg-gradient-to-b from-[#10241b] via-[#0d1d16] to-[#09140f] rounded-3xl p-8 sm:p-12 border-2 border-emerald-500/40 text-center relative overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.2)]">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-6 shadow-xl border border-emerald-300">
          <Gift className="w-8 h-8 text-white" />
        </div>

        <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-4 leading-tight">
          {questionTitle || '¿Te gustaría seguir compartiendo cada regalo de la vida a mi lado?'}
        </h3>

        <p className="text-xs sm:text-sm text-emerald-200/80 mb-8 max-w-lg mx-auto font-light">
          De <strong className="text-emerald-300">{senderName}</strong> con todo el amor del mundo para{' '}
          <strong className="text-emerald-300">{recipientName}</strong>.
        </p>

        <AnimatePresence mode="wait">
          {!hasAccepted ? (
            <motion.div
              key="ask"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={handleAccept}
                className="px-10 py-5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-lg sm:text-xl shadow-2xl shadow-emerald-500/50 border border-emerald-300/40 flex items-center justify-center gap-3 mx-auto transform hover:scale-105 active:scale-95 transition duration-300"
              >
                <Heart className="w-6 h-6 fill-white animate-bounce" />
                <span>{yesButtonText || '¡Sí, quiero siempre! ❤️'}</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="accepted"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-emerald-950/80 p-6 rounded-2xl border border-emerald-400/50 max-w-md mx-auto space-y-3 shadow-2xl"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-emerald-950 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold font-serif text-white">
                ¡Promesa de Amor Aceptada! 🎉
              </h4>
              <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed font-light">
                {yesResponseSubtitle || '¡Prometo llenar tus días de sonrisas, abrazos y sorpresas inolvidables! 💖✨'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
