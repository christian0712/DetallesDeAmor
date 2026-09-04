'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, Gift, RefreshCw, Calendar, Cake, CheckCircle2, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GiftBoxScratchCardProps {
  recipientName?: string;
}

export const GiftBoxScratchCard: React.FC<GiftBoxScratchCardProps> = ({
  recipientName = 'Camila',
}) => {
  const [birthdayDay, setBirthdayDay] = useState<string>('14');
  const [birthdayMonth, setBirthdayMonth] = useState<string>('Agosto');
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [isScratched, setIsScratched] = useState<boolean>(false);

  const handleUnlockScratch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUnlocked(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#10b981', '#ec4899'],
    });
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 relative font-sans">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-b from-[#0a2017]/90 via-[#061811]/90 to-[#030d09]/90 rounded-3xl p-6 sm:p-10 border border-emerald-500/30 backdrop-blur-2xl shadow-[0_0_60px_rgba(16,185,129,0.15)] relative overflow-hidden text-white"
      >
        {/* Glow ambient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500/10 blur-3xl pointer-events-none rounded-full" />

        {/* Section Header */}
        <div className="text-center mb-8 relative z-10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/30 border border-emerald-300/40">
            <Cake className="w-6 h-6 text-white animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-2">
            Raspa y Gana de Cumpleaños 🎂🎰
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200/70 font-light max-w-md mx-auto">
            Ingresa la fecha de cumpleaños especial de {recipientName} para desbloquear la tarjeta de Raspa y Gana.
          </p>
        </div>

        {/* Scratch Card Frame Container */}
        <div className="max-w-md mx-auto relative z-10 bg-gradient-to-tr from-[#0e3023] to-[#164232] rounded-3xl p-6 sm:p-8 border-2 border-emerald-400/40 shadow-2xl text-center space-y-6">
          <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3">
            <span className="text-xs font-mono font-bold text-emerald-300 flex items-center gap-1.5">
              <Cake className="w-4 h-4 text-emerald-400" />
              EDICIÓN CUMPLE-LOVE
            </span>
            <span className="text-xs font-bold text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-400/40">
              PREMIO CUMPLEAÑOS 🏆
            </span>
          </div>

          {!isUnlocked ? (
            /* STEP 1: Birthday Form Input to Unlock */
            <form onSubmit={handleUnlockScratch} className="space-y-4 py-2">
              <div className="p-4 bg-[#071912] rounded-2xl border border-emerald-500/30 space-y-3">
                <label className="block text-xs font-semibold text-emerald-200 flex items-center justify-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>Anota tu Día y Mes de Cumpleaños:</span>
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="block text-[10px] text-emerald-300/70 mb-1 font-mono">Día:</span>
                    <select
                      value={birthdayDay}
                      onChange={(e) => setBirthdayDay(e.target.value)}
                      className="w-full bg-[#112d21] border border-emerald-500/40 rounded-xl px-3 py-2 text-white text-xs font-bold text-center focus:outline-none focus:border-emerald-400"
                    >
                      {[...Array(31)].map((_, i) => (
                        <option key={i + 1} value={String(i + 1)}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <span className="block text-[10px] text-emerald-300/70 mb-1 font-mono">Mes:</span>
                    <select
                      value={birthdayMonth}
                      onChange={(e) => setBirthdayMonth(e.target.value)}
                      className="w-full bg-[#112d21] border border-emerald-500/40 rounded-xl px-3 py-2 text-white text-xs font-bold text-center focus:outline-none focus:border-emerald-400"
                    >
                      {['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs sm:text-sm shadow-xl border border-emerald-300/40 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-200 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Verificar Cumpleaños ({birthdayDay} de {birthdayMonth}) 🎂</span>
              </motion.button>
            </form>
          ) : (
            /* STEP 2: Scratch Foil Card Area */
            <div className="space-y-4">
              <div className="text-xs text-emerald-300 font-semibold flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Cumpleaños ({birthdayDay} de {birthdayMonth}) Confirmado ✓</span>
              </div>

              <div className="relative h-44 rounded-2xl overflow-hidden border-2 border-dashed border-emerald-400/50 flex items-center justify-center bg-[#071710]">
                {/* Hidden Birthday Prize Revealed Underneath */}
                <div className="p-6 text-center space-y-2">
                  <div className="text-4xl animate-bounce">🎂👑❤️</div>
                  <h3 className="text-lg font-serif font-bold text-amber-300">
                    ¡PREMIO MAYOR DE CUMPLETIEMPO!
                  </h3>
                  <p className="text-xs text-emerald-100 font-light leading-relaxed">
                    "Válido por una torta especial + regalo sorpresa + velada de celebración inolvidable."
                  </p>
                </div>

                {/* Silver Scratch Foil Overlay */}
                {!isScratched && (
                  <motion.div
                    onClick={() => setIsScratched(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="absolute inset-0 bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-700 cursor-pointer flex flex-col items-center justify-center text-slate-950 p-4 shadow-inner group"
                  >
                    <Sparkles className="w-8 h-8 text-slate-900 mb-1 animate-spin" style={{ animationDuration: '6s' }} />
                    <span className="font-bold font-serif text-sm tracking-wide">
                      TOCA AQUÍ PARA RASPAR TU PREMIO 🪙
                    </span>
                    <span className="text-[10px] text-slate-900/80 font-mono mt-1">
                      (Remueve la lámina brillante de cumpleaños)
                    </span>
                  </motion.div>
                )}
              </div>

              {isScratched && (
                <button
                  onClick={() => setIsScratched(false)}
                  className="text-xs text-emerald-300 hover:text-white font-semibold flex items-center justify-center gap-1.5 mx-auto transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Volver a cubrir tarjeta</span>
                </button>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};
