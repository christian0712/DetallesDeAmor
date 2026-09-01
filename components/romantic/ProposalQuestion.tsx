'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, PartyPopper, CheckCircle2 } from 'lucide-react';

interface ProposalQuestionProps {
  questionTitle: string;
  yesButtonText: string;
  yesResponseSubtitle: string;
  senderName: string;
  recipientName: string;
}

export const ProposalQuestion: React.FC<ProposalQuestionProps> = ({
  questionTitle,
  yesButtonText,
  yesResponseSubtitle,
  senderName,
  recipientName,
}) => {
  const [hasAnswered, setHasAnswered] = useState(false);

  const triggerHeartBurst = () => {
    setHasAnswered(true);

    // Canvas Confetti Heart burst
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#f43f5e', '#fb7185', '#be123c', '#ffd6e0', '#ffffff'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      shapes: ['star', 'circle'],
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-12 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-card-rose rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border-2 border-rose-500/40"
      >
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-rose-600/10 via-pink-600/10 to-rose-600/10 animate-pulse pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-300 text-xs sm:text-sm font-semibold mb-4 border border-rose-500/30">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            <span>Una Pregunta Especial</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-6 leading-snug">
            {questionTitle}
          </h3>

          {!hasAnswered ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
              {/* Primary "YES" Button */}
              <button
                onClick={triggerHeartBurst}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-lg sm:text-xl shadow-xl shadow-rose-500/40 hover:shadow-rose-500/60 transform hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 border border-rose-300/30 group"
              >
                <Heart className="w-6 h-6 text-white fill-white group-hover:scale-125 transition" />
                <span>{yesButtonText}</span>
                <Sparkles className="w-5 h-5 text-rose-200 animate-spin" />
              </button>

              {/* Playful Secondary Button */}
              <button
                onClick={triggerHeartBurst}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-rose-200 font-semibold text-base sm:text-lg backdrop-blur-md border border-rose-400/30 transition hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>¡Obvio que sí! 🥰</span>
              </button>
            </div>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-rose-950/80 rounded-2xl p-6 sm:p-8 border border-rose-500/50 shadow-2xl backdrop-blur-lg"
              >
                <div className="w-16 h-16 rounded-full bg-rose-500/20 border-2 border-rose-400 flex items-center justify-center mx-auto mb-4 text-rose-400 animate-bounce">
                  <CheckCircle2 className="w-10 h-10 text-rose-400" />
                </div>
                <h4 className="text-2xl sm:text-3xl font-cursive font-bold text-rose-300 mb-2">
                  ¡Dijo que sí! ❤️✨
                </h4>
                <p className="text-white text-base sm:text-xl font-medium mb-4">
                  {yesResponseSubtitle}
                </p>
                <div className="inline-flex items-center gap-2 text-rose-300 text-sm font-semibold bg-rose-900/50 px-4 py-2 rounded-full border border-rose-500/30">
                  <PartyPopper className="w-4 h-4 text-rose-400" />
                  <span>{senderName} & {recipientName} por siempre juntos</span>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </div>
  );
};
