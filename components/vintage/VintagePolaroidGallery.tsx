'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhotoItem } from '@/types';
import { Camera, X, Heart } from 'lucide-react';

interface VintagePolaroidGalleryProps {
  photos: PhotoItem[];
}

export const VintagePolaroidGallery: React.FC<VintagePolaroidGalleryProps> = ({ photos }) => {
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);

  // Slight random rotation angles for polaroid album feel
  const rotations = ['rotate-[-3deg]', 'rotate-[2deg]', 'rotate-[-2deg]', 'rotate-[3deg]'];

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-semibold mb-3">
          <Camera className="w-4 h-4 text-amber-400" />
          <span>Álbum de Fotos Polaroid Instantáneas</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100 mb-2">
          Nuestros Mejores Recuerdos 📸
        </h2>
        <p className="text-xs sm:text-sm text-amber-200/70">
          Haz clic sobre cualquier fotografía para tomarla y ver la nota a mano.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-2">
        {photos.map((photo, idx) => {
          const rotationClass = rotations[idx % rotations.length];

          return (
            <motion.div
              key={photo.id || idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setActivePhoto(photo)}
              className={`group relative bg-[#faf6ee] p-4 pt-4 pb-6 rounded-2xl shadow-2xl border border-amber-300/40 cursor-pointer transform hover:scale-105 hover:rotate-0 hover:z-20 transition-all duration-300 text-slate-800 ${rotationClass}`}
            >
              {/* Masking Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#e6d7be]/80 rotate-1 shadow-sm border border-amber-300/40 rounded-sm" />

              {/* Photo Square Frame */}
              <div className="aspect-[4/4] overflow-hidden rounded-lg bg-slate-900 mb-3 border border-amber-200">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
              </div>

              {/* Handwritten Note Caption */}
              <div className="text-center font-cursive text-amber-950 text-xl font-bold px-1 line-clamp-2">
                {photo.caption}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded Photo Modal */}
      <AnimatePresence>
        {activePhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-lg w-full bg-[#fbf7f0] p-6 pb-8 rounded-3xl border-4 border-[#d8c7a9] shadow-2xl text-slate-900 overflow-hidden"
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 text-amber-900 hover:text-rose-600 p-2 rounded-full hover:bg-amber-200/50 transition z-10 font-bold text-lg"
              >
                ✕
              </button>

              <div className="rounded-xl overflow-hidden mb-4 aspect-[4/3] bg-black border-2 border-amber-300/50 shadow-md">
                <img
                  src={activePhoto.url}
                  alt={activePhoto.caption}
                  className="w-full h-full object-contain"
                />
              </div>

              <p className="text-center font-cursive text-2xl font-bold text-amber-950 px-2">
                {activePhoto.caption}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
