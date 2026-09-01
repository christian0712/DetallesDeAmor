'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Rocket, Orbit, Stars, CheckCircle2 } from 'lucide-react';
import canvasConfetti from 'canvas-confetti';

interface GalaxyProposalProps {
  questionTitle: string;
  yesButtonText: string;
  yesResponseSubtitle: string;
  senderName: string;
  recipientName: string;
}

export const GalaxyProposal: React.FC<GalaxyProposalProps> = ({
  questionTitle,
  yesButtonText,
  yesResponseSubtitle,
  senderName,
  recipientName,
}) => {
  const [accepted, setAccepted] = useState(false);

  const handleYes = () => {
    setAccepted(true);

    // Launch cosmic starburst confetti!
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#22d3ee', '#c084fc', '#f472b6', '#fbbf24', '#ffffff'],
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
      <div className="bg-gradient-to-b from-[#130730]/90 to-[#070114]/90 rounded-3xl p-8 sm:p-12 border border-cyan-500/40 backdrop-blur-xl shadow-[0_0_60px_rgba(34,211,238,0.15)] relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-3xl pointer-events-none rounded-full" />

        {!accepted ? (
          <div className="space-y-6 relative z-10">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 flex items-center justify-center mx-auto shadow-xl shadow-cyan-500/30">
              <Orbit className="w-8 h-8 text-white animate-spin" style={{ animationDuration: '8s' }} />
            </div>

            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white max-w-xl mx-auto leading-tight">
              {questionTitle}
            </h2>

            <p className="text-xs sm:text-sm text-cyan-200/70 font-light max-w-md mx-auto">
              Nuestra historia no tiene fin. ¿Me das el honor de seguir explorando las estrellas juntos?
            </p>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleYes}
              className="px-10 py-5 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-extrabold text-lg sm:text-xl shadow-[0_0_35px_rgba(34,211,238,0.5)] border border-white/30 flex items-center gap-3 mx-auto cursor-pointer transition duration-300"
            >
              <Sparkles className="w-6 h-6 text-yellow-300" />
              <span>{yesButtonText}</span>
              <Rocket className="w-6 h-6 text-cyan-300" />
            </motion.button>
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-6 relative z-10 py-4"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/40 animate-bounce">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-gradient-cyan">
              ¡Nuestra Galaxia Es Eterna! 🌌✨
            </h2>

            <p className="text-base sm:text-xl text-cyan-100 font-light max-w-md mx-auto">
              {yesResponseSubtitle}
            </p>

            <div className="pt-4 text-xs font-mono text-cyan-300/80">
              🚀 Próxima parada: Toda una vida juntos escribiendo historias bajo las estrellas.
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
