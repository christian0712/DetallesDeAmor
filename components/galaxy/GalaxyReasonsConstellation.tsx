'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles, Heart, X, Orbit } from 'lucide-react';

interface ReasonStar {
  id: number;
  x: number; // percentage
  y: number; // percentage
  title: string;
  reason: string;
  constellationName: string;
  color: string;
}

const DEFAULT_REASONS: ReasonStar[] = [
  {
    id: 1,
    x: 20,
    y: 30,
    title: 'Estrella de tu Sonrisa',
    reason: 'Tu risa tiene el poder mágico de iluminar incluso mis días más oscuros en el universo.',
    constellationName: 'Constelación Alfa',
    color: 'from-amber-400 to-yellow-300',
  },
  {
    id: 2,
    x: 45,
    y: 20,
    title: 'Estrella de tu Mirada',
    reason: 'Cada vez que me miras, siento que el tiempo se detiene y orbitamos solo tú y yo.',
    constellationName: 'Constelación Polaris',
    color: 'from-cyan-400 to-blue-400',
  },
  {
    id: 3,
    x: 75,
    y: 35,
    title: 'Estrella de tu Bondad',
    reason: 'Tu corazón noble y paciente es la luz guía más hermosa de mi cielo entero.',
    constellationName: 'Constelación Lyra',
    color: 'from-purple-400 to-pink-400',
  },
  {
    id: 4,
    x: 30,
    y: 70,
    title: 'Estrella de Nuestras Risas',
    reason: 'Nuestras ocurrencias y chistes compartidos son mi refugio favorito en todo el cosmos.',
    constellationName: 'Constelación Sirius',
    color: 'from-emerald-400 to-teal-300',
  },
  {
    id: 5,
    x: 60,
    y: 75,
    title: 'Estrella de tus Abrazos',
    reason: 'En tus brazos encuentro la gravedad perfecta donde mi alma descansa en paz.',
    constellationName: 'Constelación Orion',
    color: 'from-rose-400 to-pink-500',
  },
  {
    id: 6,
    x: 85,
    y: 65,
    title: 'Estrella del Futuro Juntos',
    reason: 'Soñar a tu lado con lo que vendrá es el viaje estelar más emocionante de mi vida.',
    constellationName: 'Constelación Cassiopeia',
    color: 'from-indigo-400 to-cyan-300',
  },
];

interface GalaxyReasonsConstellationProps {
  recipientName?: string;
}

export const GalaxyReasonsConstellation: React.FC<GalaxyReasonsConstellationProps> = ({
  recipientName = 'mi amor',
}) => {
  const [selectedStar, setSelectedStar] = useState<ReasonStar | null>(null);

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-b from-[#0e0622]/90 via-[#150a36]/90 to-[#0b041a]/90 rounded-3xl p-6 sm:p-10 border border-cyan-500/30 backdrop-blur-2xl shadow-[0_0_60px_rgba(6,182,212,0.15)] relative overflow-hidden text-white"
      >
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-3xl pointer-events-none rounded-full" />

        {/* Section Header */}
        <div className="text-center mb-8 relative z-10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-cyan-500/30 border border-cyan-300/40">
            <Orbit className="w-6 h-6 text-cyan-200 animate-spin" style={{ animationDuration: '15s' }} />
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-2">
            Constelación de Amor ✨
          </h2>
          <p className="text-xs sm:text-sm text-cyan-200/70 font-light max-w-md mx-auto">
            Toca las estrellas brillantes en nuestro firmamento para descubrir por qué eres única para mí, {recipientName}.
          </p>
        </div>

        {/* Interactive Constellation Canvas */}
        <div className="relative w-full h-[320px] sm:h-[400px] bg-[#070214]/80 rounded-2xl border border-cyan-500/20 overflow-hidden shadow-inner flex items-center justify-center">
          {/* SVG Constellation Lines Connecting Stars */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-cyan-400/30 stroke-[1.5] stroke-dasharray-[4_4]">
            {/* Line 1 -> 2 */}
            <line x1="20%" y1="30%" x2="45%" y2="20%" />
            {/* Line 2 -> 3 */}
            <line x1="45%" y1="20%" x2="75%" y2="35%" />
            {/* Line 1 -> 4 */}
            <line x1="20%" y1="30%" x2="30%" y2="70%" />
            {/* Line 4 -> 5 */}
            <line x1="30%" y1="70%" x2="60%" y2="75%" />
            {/* Line 5 -> 6 */}
            <line x1="60%" y1="75%" x2="85%" y2="65%" />
            {/* Line 3 -> 6 */}
            <line x1="75%" y1="35%" x2="85%" y2="65%" />
          </svg>

          {/* Interactive Stars */}
          {DEFAULT_REASONS.map((star) => (
            <motion.button
              key={star.id}
              onClick={() => setSelectedStar(star)}
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 0.9 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer focus:outline-none"
            >
              {/* Outer Pulsing Glow */}
              <div className="absolute -inset-3 bg-cyan-400/30 rounded-full blur-md animate-pulse group-hover:bg-pink-500/50" />
              
              {/* Star Icon Core */}
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr ${star.color} flex items-center justify-center shadow-lg shadow-cyan-400/50 border border-white/60 relative z-10 transition-transform`}>
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 fill-slate-950" />
              </div>

              {/* Star Label Hover Tooltip */}
              <span className="absolute left-1/2 -translate-x-1/2 top-11 px-2.5 py-1 bg-black/80 text-cyan-200 text-[10px] font-mono rounded-full border border-cyan-500/40 whitespace-nowrap opacity-90 group-hover:opacity-100 transition shadow-md">
                {star.title}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Modal / Card Popover when star is tapped */}
        <AnimatePresence>
          {selectedStar && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
              onClick={() => setSelectedStar(null)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-md w-full bg-gradient-to-b from-[#190a36] via-[#12062b] to-[#0a031c] p-6 sm:p-8 rounded-3xl border border-cyan-400/40 shadow-2xl text-center space-y-4"
              >
                <button
                  onClick={() => setSelectedStar(null)}
                  className="absolute top-4 right-4 text-cyan-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className={`w-14 h-14 rounded-full bg-gradient-to-tr ${selectedStar.color} flex items-center justify-center mx-auto shadow-xl shadow-cyan-400/40 border border-white`}>
                  <Sparkles className="w-7 h-7 text-slate-950" />
                </div>

                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300/80 block">
                  ✨ {selectedStar.constellationName} ✨
                </span>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  {selectedStar.title}
                </h3>

                <p className="text-sm text-cyan-100/90 leading-relaxed font-light bg-[#1c0c3b]/60 p-4 rounded-2xl border border-cyan-500/20">
                  "{selectedStar.reason}"
                </p>

                <button
                  onClick={() => setSelectedStar(null)}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white text-xs font-bold shadow-lg transition active:scale-95"
                >
                  Guardar esta Estrella ✨
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
