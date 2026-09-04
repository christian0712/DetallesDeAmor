'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Star, Compass, CheckCircle2 } from 'lucide-react';

interface Wish {
  id: number;
  title: string;
  wish: string;
  icon: string;
  caught: boolean;
}

const INITIAL_WISHES: Wish[] = [
  {
    id: 1,
    title: 'Viaje a las Estrellas ✈️',
    wish: 'Mi deseo es conocer juntos un nuevo país y ver auroras boreales tomados de la mano.',
    icon: '🌠',
    caught: false,
  },
  {
    id: 2,
    title: 'Noches de Fogata & Chocoflan ☕',
    wish: 'Prometo incontables noches acurrucados conversando de todo y de nada.',
    icon: '✨',
    caught: false,
  },
  {
    id: 3,
    title: 'Construir Nuestro Hogar 🏡',
    wish: 'Llenar un espacio propio con nuestras fotos, risas, plantas y recuerdos inolvidables.',
    icon: '💫',
    caught: false,
  },
  {
    id: 4,
    title: 'Amor Eterno e Incondicional ❤️',
    wish: 'Elegirte hoy, mañana y en cada una de las vidas que volvamos a coincidir.',
    icon: '🌌',
    caught: false,
  },
];

interface GalaxyShootingStarWishesProps {
  recipientName?: string;
}

export const GalaxyShootingStarWishes: React.FC<GalaxyShootingStarWishesProps> = ({
  recipientName = 'mi amor',
}) => {
  const [wishes, setWishes] = useState<Wish[]>(INITIAL_WISHES);
  const [activeWish, setActiveWish] = useState<Wish | null>(null);

  const handleCatchWish = (wish: Wish) => {
    setWishes((prev) =>
      prev.map((item) => (item.id === wish.id ? { ...item, caught: true } : item))
    );
    setActiveWish({ ...wish, caught: true });
  };

  const caughtCount = wishes.filter((w) => w.caught).length;

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-b from-[#13072e]/90 via-[#0e0424]/90 to-[#070114]/90 rounded-3xl p-6 sm:p-10 border border-purple-500/30 backdrop-blur-2xl shadow-[0_0_60px_rgba(168,85,247,0.15)] relative overflow-hidden text-white"
      >
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/20 blur-3xl pointer-events-none rounded-full" />

        {/* Section Header */}
        <div className="text-center mb-8 relative z-10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-purple-500/30 border border-purple-300/40">
            <Sparkles className="w-6 h-6 text-purple-200 animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-2">
            Cápsula de Estrellas Fugaces 💫
          </h2>
          <p className="text-xs sm:text-sm text-purple-200/70 font-light max-w-md mx-auto">
            Captura las 4 estrellas fugaces que cruzan el universo para revelar los deseos y promesas de nuestro futuro juntos.
          </p>

          <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-xs text-purple-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Estrellas atrapadas: {caughtCount} de 4</span>
          </div>
        </div>

        {/* Wishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
          {wishes.map((wish) => (
            <motion.div
              key={wish.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleCatchWish(wish)}
              className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex items-center gap-4 ${
                wish.caught
                  ? 'bg-gradient-to-r from-purple-900/60 to-indigo-900/60 border-cyan-400/50 shadow-lg shadow-cyan-500/10'
                  : 'bg-[#180938]/60 border-purple-500/20 hover:border-purple-400/60'
              }`}
            >
              <div className="text-3xl shrink-0 p-3 bg-purple-950/80 rounded-xl border border-purple-500/30 shadow-inner">
                {wish.icon}
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="text-sm sm:text-base font-bold text-white mb-1 flex items-center gap-2">
                  <span>{wish.title}</span>
                  {wish.caught && <span className="text-xs text-cyan-400 font-mono">✓ Atrapada</span>}
                </h4>
                <p className="text-xs text-purple-200/70 line-clamp-2">
                  {wish.caught ? wish.wish : 'Toca para atrapar esta estrella fugaz...'}
                </p>
              </div>

              {!wish.caught && (
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300/80 px-2 py-1 bg-purple-500/20 rounded-md border border-purple-500/40">
                  Atrapar 🌠
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Popup Card Preview */}
        <AnimatePresence>
          {activeWish && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mt-6 p-5 bg-gradient-to-r from-cyan-950/80 via-purple-950/90 to-cyan-950/80 rounded-2xl border border-cyan-400/40 text-center space-y-2 relative z-10 shadow-2xl"
            >
              <div className="text-3xl">{activeWish.icon}</div>
              <h3 className="text-lg font-serif font-bold text-white">
                {activeWish.title}
              </h3>
              <p className="text-xs sm:text-sm text-cyan-100/90 font-light max-w-lg mx-auto">
                "{activeWish.wish}"
              </p>
              <span className="inline-block text-[11px] text-cyan-300 font-mono pt-1">
                ✨ Deseo guardado en nuestro universo para {recipientName} ✨
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
