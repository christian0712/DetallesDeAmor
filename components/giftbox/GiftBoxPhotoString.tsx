'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Sparkles, Heart, X } from 'lucide-react';
import { PhotoItem } from '@/types';

interface GiftBoxPhotoStringProps {
  photos: PhotoItem[];
}

export const GiftBoxPhotoString: React.FC<GiftBoxPhotoStringProps> = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  if (!photos || photos.length === 0) return null;

  return (
    <div className="w-full max-w-5xl mx-auto my-12 px-4 relative">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2 border border-emerald-500/40 backdrop-blur-md">
          <Camera className="w-4 h-4 text-emerald-400" />
          <span>Mural de Recuerdos con Luces LED</span>
        </div>
        <h3 className="text-2xl md:text-4xl font-serif font-bold text-white tracking-wide">
          Fotos Colgadas en Nuestra Historia 📸💡
        </h3>
        <p className="text-xs sm:text-sm text-emerald-200/80 mt-1">
          Toca cualquier foto colgada para verla en tamaño gigante con su dedicatoria.
        </p>
      </div>

      {/* Hanging LED String Visual Line */}
      <div className="relative pt-6 pb-12">
        <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500/30 via-amber-300/80 to-emerald-500/30 rounded-full shadow-[0_0_15px_rgba(252,211,77,0.8)] z-0" />
        
        {/* LED Bulbs */}
        <div className="flex justify-between absolute top-7 left-4 right-4 z-0 pointer-events-none">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-amber-300 animate-pulse shadow-[0_0_10px_#fde047]"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        {/* Photos Hanging Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 relative z-10 pt-6">
          {photos.map((photo, index) => {
            const rotations = [-3, 2, -2, 4, -4];
            const rot = rotations[index % rotations.length];

            return (
              <motion.div
                key={photo.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.08, rotate: 0 }}
                onClick={() => setSelectedPhoto(photo)}
                className="cursor-pointer group flex flex-col items-center"
                style={{ transform: `rotate(${rot}deg)` }}
              >
                {/* Wooden Peg Clip */}
                <div className="w-4 h-6 bg-amber-700 rounded-sm border border-amber-900 shadow-md -mb-3 z-20" />

                {/* Photo Frame Card */}
                <div className="bg-white p-2.5 rounded-2xl shadow-2xl border border-emerald-500/20 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition duration-300 w-full">
                  <div className="aspect-square rounded-xl overflow-hidden bg-slate-900 relative">
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>
                  <p className="text-[11px] text-slate-800 font-semibold font-serif mt-2 text-center truncate px-1">
                    {photo.caption || 'Recuerdo ❤️'}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Photo Modal Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-[#121c17] rounded-3xl p-4 sm:p-6 border border-emerald-500/40 shadow-2xl text-center"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 text-emerald-300 hover:text-white p-2 rounded-full bg-black/50"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 border border-emerald-500/30">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  className="w-full h-full object-cover"
                />
              </div>

              <h4 className="text-lg font-serif font-bold text-white flex items-center justify-center gap-2">
                <Heart className="w-5 h-5 text-emerald-400 fill-emerald-400" />
                <span>{selectedPhoto.caption}</span>
              </h4>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
