'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Sparkles, Image as ImageIcon } from 'lucide-react';
import { PhotoItem } from '@/types';

interface PhotoSliderProps {
  photos: PhotoItem[];
}

export const PhotoSlider: React.FC<PhotoSliderProps> = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!photos || photos.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 px-4">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold mb-2 border border-rose-500/30">
          <Sparkles className="w-4 h-4 text-rose-400" />
          <span>Nuestras Fotos Favoritas</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">
          Momentos Inolvidables ❤️
        </h3>
      </div>

      <div className="relative group w-full aspect-[4/3] md:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border-2 border-rose-500/30 glass-card">
        {/* Active Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full"
          >
            <img
              src={photos[currentIndex].url}
              alt={photos[currentIndex].caption || 'Foto de novios'}
              className="w-full h-full object-cover object-center"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Caption */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white z-10">
              <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 max-w-md">
                <p className="text-sm md:text-base font-medium flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-500 shrink-0" />
                  <span>{photos[currentIndex].caption}</span>
                </p>
              </div>
              <span className="text-xs font-mono bg-rose-600/80 px-3 py-1.5 rounded-full font-bold">
                {currentIndex + 1} / {photos.length}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-rose-600/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 z-20"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-rose-600/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 z-20"
          aria-label="Foto siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {photos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                idx === currentIndex
                  ? 'w-8 bg-rose-500 shadow-lg shadow-rose-500/50'
                  : 'bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
