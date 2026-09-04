'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhotoItem } from '@/types';
import { Camera, X, Heart, Sparkles, Image as ImageIcon, Stamp } from 'lucide-react';

interface VintagePolaroidGalleryProps {
  photos: PhotoItem[];
}

export const VintagePolaroidGallery: React.FC<VintagePolaroidGalleryProps> = ({ photos }) => {
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);

  // Varied rotations and stamp colors for a handcrafted vintage album look
  const rotations = ['rotate-[-3deg]', 'rotate-[2.5deg]', 'rotate-[-2deg]', 'rotate-[3deg]'];
  const stamps = ['ORIGINAL 1998', 'LOVE PHOTO 📸', 'MEMORIA ETERNA', 'MOMENTOS ❤️'];

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 relative font-serif">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-semibold mb-3 font-sans">
          <Camera className="w-4 h-4 text-amber-400" />
          <span>Álbum de Recuerdos Polaroid Retro</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100 mb-2">
          Galería de Fotos Instantáneas 🎞️
        </h2>
        <p className="text-xs sm:text-sm text-amber-200/70 font-sans">
          Haz clic sobre cualquier fotografía para tomarla del álbum y examinar la nota manuscrita al reverso.
        </p>
      </div>

      {/* Album Page Grid Container */}
      <div className="bg-[#1f130a]/80 p-6 sm:p-10 rounded-3xl border-2 border-amber-800/40 shadow-2xl backdrop-blur-md relative overflow-hidden">
        {/* Background Texture Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 blur-3xl pointer-events-none rounded-full" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-2 relative z-10">
          {photos.map((photo, idx) => {
            const rotationClass = rotations[idx % rotations.length];
            const stampText = stamps[idx % stamps.length];

            return (
              <motion.div
                key={photo.id || idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setActivePhoto(photo)}
                className={`group relative bg-[#fdfbf7] p-4 pt-5 pb-7 rounded-xl shadow-2xl border-2 border-[#e6d5b8] cursor-pointer transform hover:scale-105 hover:rotate-0 hover:z-20 transition-all duration-300 text-slate-800 ${rotationClass}`}
              >
                {/* Photo Mounting Corners (Vintage Photo Album Tabs) */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-900/60 z-20 pointer-events-none" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-900/60 z-20 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-900/60 z-20 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-900/60 z-20 pointer-events-none" />

                {/* Masking Tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#ecdcb8]/90 rotate-1 shadow-sm border border-amber-300/40 rounded-sm font-mono text-[9px] text-amber-900/70 flex items-center justify-center font-bold uppercase tracking-wider">
                  {stampText}
                </div>

                {/* Polaroid Photo Frame */}
                <div className="aspect-[4/4] overflow-hidden rounded-md bg-slate-950 mb-3 border border-amber-200 shadow-inner relative group-hover:brightness-105 transition">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700 filter sepia-[0.15]"
                  />
                  {/* Subtle Grain Overlay Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Handwritten Note Caption */}
                <div className="text-center font-cursive text-[#362111] text-xl font-bold px-1 line-clamp-2 leading-tight">
                  {photo.caption}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Expanded Polaroid Modal */}
      <AnimatePresence>
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setActivePhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -3 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotate: 3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-[#fdfbf7] p-6 pb-8 rounded-3xl border-4 border-[#d8c7a9] shadow-2xl text-slate-900 overflow-hidden"
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 text-amber-900 hover:text-rose-600 p-2 rounded-full hover:bg-amber-200/50 transition z-10 font-bold text-lg"
              >
                ✕
              </button>

              <div className="rounded-2xl overflow-hidden mb-4 aspect-[4/3] bg-black border-2 border-amber-300/50 shadow-lg relative">
                <img
                  src={activePhoto.url}
                  alt={activePhoto.caption}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="text-center space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-800/70 block">
                  — Fotografía N° Polaroid —
                </span>
                <p className="font-cursive text-2xl sm:text-3xl font-bold text-[#3d2412] px-2 leading-tight">
                  "{activePhoto.caption}"
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
