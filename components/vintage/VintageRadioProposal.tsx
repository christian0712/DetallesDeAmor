'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Volume2, Sparkles, Heart, CheckCircle2, Sliders } from 'lucide-react';

interface VintageRadioProposalProps {
  questionTitle?: string;
  yesButtonText?: string;
  yesResponseSubtitle?: string;
  senderName?: string;
  recipientName?: string;
}

export const VintageRadioProposal: React.FC<VintageRadioProposalProps> = ({
  questionTitle = '¿Te gustaría seguir sintonizando nuestra historia de amor por siempre?',
  yesButtonText = '¡Sí, sintonizar por siempre! 📻❤️',
  yesResponseSubtitle = '¡Frecuencia sintonizada con éxito! Transmitiendo amor en directo los 365 días del año. ✨',
  senderName = 'Carlos',
  recipientName = 'Sofía',
}) => {
  const [frequency, setFrequency] = useState<number>(88.0);
  const [isTuned, setIsTuned] = useState<boolean>(false);

  const TARGET_FREQ = 104.3;

  const handleTuneIn = () => {
    setFrequency(TARGET_FREQ);
    setIsTuned(true);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 relative font-serif">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-b from-[#2b1c10] via-[#21140a] to-[#170c05] rounded-3xl p-6 sm:p-10 border-2 border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.15)] relative overflow-hidden text-amber-100"
      >
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-36 bg-amber-600/15 blur-3xl pointer-events-none rounded-full" />

        {/* Section Header */}
        <div className="text-center mb-8 relative z-10 font-sans">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 to-amber-800 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-900/40 border border-amber-300/40">
            <Radio className="w-6 h-6 text-amber-100 animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100 mb-2">
            Radio Antigua: Frecuencia del Corazón 📻
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/70 font-light max-w-md mx-auto">
            Gira la perilla sintonizadora para conectar con la emisora secreta de {senderName} para {recipientName}.
          </p>
        </div>

        {/* Vintage Radio Casing */}
        <div className="max-w-2xl mx-auto bg-gradient-to-b from-[#3b2413] via-[#261509] to-[#170c05] rounded-3xl border-4 border-[#5c3e27] p-6 sm:p-10 shadow-2xl relative z-10 space-y-6 text-center">
          {/* Radio Brand Header */}
          <div className="flex items-center justify-between border-b-2 border-amber-900/40 pb-3 font-mono text-xs text-amber-300">
            <span className="font-bold flex items-center gap-1.5">
              <Radio className="w-4 h-4 text-amber-400" />
              RADIO PHILIPS VINTAGE 1954
            </span>
            <span className="text-[10px] bg-amber-950 px-2.5 py-0.5 rounded border border-amber-800 text-amber-400">
              EMISORA AMOR 104.3 FM
            </span>
          </div>

          {/* Radio Frequency Dial Display */}
          <div className="bg-[#0f0703] rounded-2xl border-2 border-amber-800/60 p-5 shadow-inner relative overflow-hidden space-y-3">
            {/* Frequency Numbers Scale */}
            <div className="flex justify-between font-mono text-[11px] text-amber-500/70 px-2 border-b border-amber-900/40 pb-2">
              <span>88 MHz</span>
              <span>92 MHz</span>
              <span>96 MHz</span>
              <span>100 MHz</span>
              <span className="text-amber-300 font-bold">104.3 MHz ❤️</span>
              <span>108 MHz</span>
            </div>

            {/* Glowing Frequency Needle Bar */}
            <div className="relative h-6 bg-[#1b0d05] rounded-lg overflow-hidden border border-amber-950 flex items-center px-1">
              <motion.div
                animate={{ left: isTuned ? '75%' : `${((frequency - 88) / 20) * 100}%` }}
                transition={{ type: 'spring', stiffness: 100 }}
                className="absolute top-0 bottom-0 w-1.5 bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,1)] z-10"
              />
              <div className="w-full h-0.5 bg-amber-900/40" />
            </div>

            {/* Tuning Status Readout */}
            <div className="text-xs font-mono text-amber-300 flex items-center justify-center gap-2">
              <Volume2 className={`w-4 h-4 ${isTuned ? 'text-amber-400 animate-pulse' : 'text-amber-800'}`} />
              <span>
                {isTuned
                  ? '📻 EMISORA SINTONIZADA: 104.3 FM (TRANSMITIENDO EN DIRECTO)'
                  : `📻 SINTONIZANDO: ${frequency.toFixed(1)} FM (RUIDO DE FONDO)`}
              </span>
            </div>
          </div>

          {/* Proposal Message Screen */}
          <div className="bg-[#f6eee0] text-slate-900 p-6 rounded-2xl border-2 border-[#5c3e27] shadow-lg space-y-4">
            <p className="font-mono text-xs text-amber-900 uppercase tracking-widest">
              — MENSAJE EN TRANSMISIÓN ESPECIAL —
            </p>

            <p className="font-serif text-lg sm:text-2xl font-bold text-[#3d2412] leading-relaxed">
              "{questionTitle}"
            </p>

            {!isTuned ? (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleTuneIn}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-600 via-amber-700 to-rose-700 hover:from-amber-700 hover:to-rose-800 text-white font-serif font-bold text-sm sm:text-base shadow-xl border-2 border-amber-300/40 flex items-center justify-center gap-2 mx-auto transition active:scale-95"
              >
                <Sliders className="w-4 h-4 text-amber-200" />
                <span>{yesButtonText}</span>
              </motion.button>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-4 bg-gradient-to-r from-amber-900 via-rose-950 to-amber-900 text-amber-100 rounded-xl border border-amber-400/50 shadow-md space-y-1"
              >
                <div className="flex items-center justify-center gap-1.5 text-green-400 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>¡RESPUESTA REGISTRADA EN LA EMISORA!</span>
                </div>
                <p className="text-xs text-amber-100/90 font-light">
                  {yesResponseSubtitle}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
