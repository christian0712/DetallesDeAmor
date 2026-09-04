'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, Lock, Unlock, Sparkles, Heart, CheckCircle2, Package } from 'lucide-react';

interface VintageLockboxProposalProps {
  questionTitle?: string;
  yesButtonText?: string;
  yesResponseSubtitle?: string;
  senderName?: string;
  recipientName?: string;
}

export const VintageLockboxProposal: React.FC<VintageLockboxProposalProps> = ({
  questionTitle = '¿Te gustaría guardar nuestra historia de amor en este cofre por siempre?',
  yesButtonText = '¡Sí, girar llave y guardar para siempre! 🗝️❤️',
  yesResponseSubtitle = '¡Cofre sellado con éxito! El pacto de amor eterno ha sido resguardado bajo llave. ✨',
  senderName = 'Carlos',
  recipientName = 'Sofía',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  const handleTurnKey = () => {
    setIsOpen(true);
  };

  const handleAcceptProposal = () => {
    setIsAccepted(true);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 relative font-serif">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-b from-[#2b1c10] via-[#21140a] to-[#170c05] rounded-3xl p-6 sm:p-10 border-2 border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.15)] relative overflow-hidden text-amber-100"
      >
        {/* Glow ambient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-36 bg-amber-600/15 blur-3xl pointer-events-none rounded-full" />

        {/* Section Header */}
        <div className="text-center mb-8 relative z-10 font-sans">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 to-amber-800 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-900/40 border border-amber-300/40">
            <Key className="w-6 h-6 text-amber-100 animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100 mb-2">
            Cofre Secreto del Amor 🗝️
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/70 font-light max-w-md mx-auto">
            Gira la llave dorada para abrir el cofre de latón antiguo guardado por {senderName} para {recipientName}.
          </p>
        </div>

        {/* Antique Wooden & Brass Lockbox Container */}
        <div className="max-w-2xl mx-auto bg-gradient-to-b from-[#3d2715] via-[#2a1a0d] to-[#1a0f07] rounded-3xl border-4 border-[#5c3e27] p-6 sm:p-10 shadow-2xl relative z-10 text-center space-y-6">
          {/* Top Lockbox Brass Header */}
          <div className="flex items-center justify-between border-b-2 border-amber-900/40 pb-3 font-mono text-xs text-amber-300">
            <span className="font-bold flex items-center gap-1.5">
              <Key className="w-4 h-4 text-amber-400" />
              COFRE VINTAGE DE MADERA Y LATÓN
            </span>
            <span className="text-[10px] bg-amber-950 px-2.5 py-0.5 rounded border border-amber-800 text-amber-400">
              {isOpen ? '🔓 ABRIENDO CANDADO' : '🔒 CANDADO BLOQUEADO'}
            </span>
          </div>

          {/* Lock & Box Visual Stage */}
          <div className="relative p-6 sm:p-8 rounded-2xl bg-[#0f0703] border-2 border-amber-800/60 shadow-inner flex flex-col items-center justify-center min-h-[220px]">
            {!isOpen ? (
              /* Closed State: Lockbox with Brass Keyhole */
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="space-y-4"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-700 p-1 mx-auto shadow-2xl shadow-amber-500/30 border-2 border-amber-200 flex items-center justify-center relative group cursor-pointer"
                  onClick={handleTurnKey}
                >
                  <Lock className="w-9 h-9 text-slate-950 animate-bounce" />
                  <div className="absolute -bottom-2 -right-2 bg-amber-950 p-2 rounded-full border border-amber-400 text-amber-300 shadow-md">
                    <Key className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg text-amber-200">
                    Cofre Cerrado Bajo Llave
                  </h3>
                  <p className="text-xs text-amber-300/70 font-sans">
                    Haz clic en el botón para meter la llave dorada en la cerradura y girarla.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleTurnKey}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs sm:text-sm shadow-xl flex items-center gap-2 mx-auto font-sans"
                >
                  <Key className="w-4 h-4" />
                  <span>Girar Llave Dorada 🗝️</span>
                </motion.button>
              </motion.div>
            ) : (
              /* Opened State: Chest Lid Opens Revealing Romantic Proposal Inside */
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full space-y-5"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/40 border-2 border-white">
                  <Unlock className="w-8 h-8" />
                </div>

                <div className="bg-[#f6eee0] text-slate-900 p-6 rounded-2xl border-2 border-[#5c3e27] shadow-lg space-y-4">
                  <p className="font-mono text-xs text-amber-900 uppercase tracking-widest">
                    — PROPUESTA REVELADA DENTRO DEL COFRE —
                  </p>

                  <p className="font-serif text-lg sm:text-2xl font-bold text-[#3d2412] leading-relaxed">
                    "{questionTitle}"
                  </p>

                  {!isAccepted ? (
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleAcceptProposal}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-600 via-amber-700 to-rose-700 hover:from-amber-700 hover:to-rose-800 text-white font-serif font-bold text-sm sm:text-base shadow-xl border-2 border-amber-300/40 flex items-center justify-center gap-2 mx-auto transition active:scale-95 font-sans"
                    >
                      <Sparkles className="w-4 h-4 text-amber-200" />
                      <span>{yesButtonText}</span>
                    </motion.button>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-4 bg-gradient-to-r from-amber-900 via-rose-950 to-amber-900 text-amber-100 rounded-xl border border-amber-400/50 shadow-md space-y-1 font-sans"
                    >
                      <div className="flex items-center justify-center gap-1.5 text-green-400 font-bold text-sm">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>¡PACTO DE AMOR SELLADO EN EL COFRE! 💖</span>
                      </div>
                      <p className="text-xs text-amber-100/90 font-light">
                        {yesResponseSubtitle}
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
