'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Film, ChevronRight, Sparkles, Heart, RefreshCw } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  photoUrl: string;
  caption: string;
}

const DEFAULT_SLIDES: Slide[] = [
  {
    id: 1,
    title: 'Diapositiva #1 — El Comienzo',
    subtitle: 'Nuestra primera salida juntos',
    photoUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80',
    caption: 'Aquella primera tarde donde conversamos durante horas sin ver el reloj.',
  },
  {
    id: 2,
    title: 'Diapositiva #2 — Atardecer Dorado',
    subtitle: 'Momento inolvidable',
    photoUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
    caption: 'Abrazados mirando cómo el sol se ocultaba en el horizonte.',
  },
  {
    id: 3,
    title: 'Diapositiva #3 — Risas e Incondicionalidad',
    subtitle: 'Complicidad pura',
    photoUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
    caption: 'Tus risas que se convirtieron en la música favorita de mi corazón.',
  },
  {
    id: 4,
    title: 'Diapositiva #4 — Por Siempre',
    subtitle: 'Nuestra mejor historia',
    photoUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80',
    caption: 'Elegirte hoy y todos los días de mi vida.',
  },
];

interface VintageSlideProjectorProps {
  recipientName?: string;
  senderName?: string;
}

export const VintageSlideProjector: React.FC<VintageSlideProjectorProps> = ({
  recipientName = 'Sofía',
  senderName = 'Carlos',
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isClickingLever, setIsClickingLever] = useState<boolean>(false);

  const currentSlide = DEFAULT_SLIDES[currentSlideIndex];

  const handleNextSlide = () => {
    setIsClickingLever(true);
    setTimeout(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % DEFAULT_SLIDES.length);
      setIsClickingLever(false);
    }, 200);
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
            <Film className="w-6 h-6 text-amber-100 animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100 mb-2">
            Proyector de Diapositivas Retro 🎞️
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/70 font-light max-w-md mx-auto">
            Jala la palanca del View-Master vintage para rotar el disco y proyectar cada diapositiva romántica.
          </p>
        </div>

        {/* View-Master Projector Body */}
        <div className="max-w-xl mx-auto bg-[#180e07] rounded-3xl border-4 border-amber-900/60 p-6 sm:p-8 shadow-2xl relative z-10 space-y-6">
          {/* Top Projector Brand Banner */}
          <div className="flex items-center justify-between border-b-2 border-amber-900/40 pb-3 font-mono text-xs text-amber-300">
            <span className="font-bold flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-amber-400" />
              VIEW-MASTER 3D VINTAGE
            </span>
            <span className="text-[10px] bg-amber-950 px-2 py-0.5 rounded border border-amber-800 text-amber-400">
              DISCO DE 4 FOTOS
            </span>
          </div>

          {/* Slide Viewport Screen */}
          <div className="relative aspect-[4/3] bg-black rounded-2xl overflow-hidden border-4 border-[#3b2413] shadow-inner flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(4px)' }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full"
              >
                <img
                  src={currentSlide.photoUrl}
                  alt={currentSlide.title}
                  className="w-full h-full object-cover filter sepia-[0.15]"
                />
                
                {/* Vignette & Grain Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                {/* Slide Overlay Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300/80 block">
                    {currentSlide.subtitle}
                  </span>
                  <p className="font-cursive text-xl sm:text-2xl text-amber-100 font-bold drop-shadow-md">
                    "{currentSlide.caption}"
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Interactive Lever Button */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-xs font-mono text-amber-300/80">
              Diapositiva {currentSlideIndex + 1} de {DEFAULT_SLIDES.length}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextSlide}
              className={`px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-mono font-bold text-xs sm:text-sm border border-amber-300/50 shadow-xl flex items-center gap-2 transition active:translate-y-1 ${
                isClickingLever ? 'translate-y-1 bg-amber-800' : ''
              }`}
            >
              <span>Jalar Palanca (Siguiente Diapositiva)</span>
              <ChevronRight className="w-4 h-4 text-amber-200" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
