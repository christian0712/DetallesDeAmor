'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Stamp, CheckCircle, Heart, Sparkles, Send } from 'lucide-react';

interface VintageTelegramProposalProps {
  questionTitle?: string;
  yesButtonText?: string;
  yesResponseSubtitle?: string;
  senderName?: string;
  recipientName?: string;
}

export const VintageTelegramProposal: React.FC<VintageTelegramProposalProps> = ({
  questionTitle = '¿Te gustaría seguir escribiendo nuestra historia juntos por siempre?',
  yesButtonText = '¡Sí, acepto el telegrama de amor! 💌❤️',
  yesResponseSubtitle = '¡Respuesta registrada con éxito en el Registro de Amor Eterno! 📸✨',
  senderName = 'Carlos',
  recipientName = 'Sofía',
}) => {
  const [accepted, setAccepted] = useState(false);

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 relative font-serif">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-b from-[#2b1c10] via-[#21140a] to-[#170c05] rounded-3xl p-6 sm:p-10 border-2 border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.15)] relative overflow-hidden text-amber-100"
      >
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-600/15 blur-3xl pointer-events-none rounded-full" />

        {/* Section Header */}
        <div className="text-center mb-8 relative z-10 font-sans">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 to-amber-800 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-900/40 border border-amber-300/40">
            <Mail className="w-6 h-6 text-amber-100 animate-bounce" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100 mb-2">
            Telegrama URGENTE de Amor 💌
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/70 font-light max-w-md mx-auto">
            Servicio Postal de Amor: Se ha recibido una propuesta oficial dirigida a {recipientName}.
          </p>
        </div>

        {/* Vintage Telegram Document */}
        <div className="max-w-2xl mx-auto bg-[#f6eee0] text-slate-900 rounded-2xl border-4 border-[#6b472a] p-6 sm:p-10 shadow-2xl relative z-10 space-y-6">
          {/* Official Telegram Header Bar */}
          <div className="border-b-2 border-amber-900/30 pb-4 flex items-center justify-between font-mono">
            <div>
              <span className="text-sm sm:text-base font-bold text-amber-950 block tracking-widest">
                TELEGRAMA OFICIAL VINTAGE
              </span>
              <span className="text-[10px] text-amber-800/80">
                ORIGEN: CORAZÓN DE {senderName.toUpperCase()} — DESTINO: {recipientName.toUpperCase()}
              </span>
            </div>
            <div className="w-12 h-12 rounded-full bg-rose-900 text-white font-bold text-[10px] flex items-center justify-center text-center p-1 border-2 border-amber-400 shadow-md transform rotate-12">
              SELLO POSTAL 📮
            </div>
          </div>

          {/* Telegram Body Text */}
          <div className="bg-[#ede1ce] p-6 rounded-xl border border-amber-900/20 space-y-4">
            <p className="font-mono text-xs text-amber-900 uppercase tracking-widest">
              MENSAJE URGENTE // LEER DETENIDAMENTE:
            </p>
            <p className="font-serif text-lg sm:text-2xl font-bold text-[#3d2412] leading-relaxed">
              "{questionTitle}"
            </p>
          </div>

          {/* Acceptance Button or Official Stamp */}
          <div className="text-center pt-4">
            {!accepted ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAccepted(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-600 via-amber-700 to-rose-700 hover:from-amber-700 hover:to-rose-800 text-white font-serif font-bold text-sm sm:text-base shadow-2xl shadow-amber-900/60 border-2 border-amber-300/50 flex items-center justify-center gap-3 transition-all"
              >
                <Stamp className="w-5 h-5 text-amber-200 animate-pulse" />
                <span>{yesButtonText}</span>
              </motion.button>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-6 bg-gradient-to-r from-amber-900 via-rose-950 to-amber-900 text-amber-100 rounded-2xl border-2 border-amber-400/60 shadow-xl space-y-2"
              >
                <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-400 text-green-400 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-serif font-bold text-amber-200">
                  ¡TELEGRAMA FIRMADO Y ACEPTADO CON ÉXITO! 💖
                </h3>
                <p className="text-xs sm:text-sm text-amber-100/90 font-light">
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
