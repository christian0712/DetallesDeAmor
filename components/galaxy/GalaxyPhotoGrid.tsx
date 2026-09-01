'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhotoItem } from '@/types';
import { Sparkles, Eye, X, Stars } from 'lucide-react';

interface GalaxyPhotoGridProps {
  photos: PhotoItem[];
}

export const GalaxyPhotoGrid: React.FC<GalaxyPhotoGridProps> = ({ photos }) => {
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
          <Stars className="w-4 h-4 text-purple-400" />
          <span>Galería de Momentos Estelares</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-2">
          Nuestras Estrellas Más Brillantes 📸✨
        </h2>
        <p className="text-xs sm:text-sm text-cyan-200/70">
          Haz clic en cualquier fotografía para expandir el recuerdo.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {photos.map((photo, idx) => (
          <motion.div
            key={photo.id || idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => setActivePhoto(photo)}
            className="group relative bg-[#0e0724] rounded-3xl overflow-hidden border border-cyan-500/30 shadow-xl cursor-pointer transform hover:-translate-y-2 hover:border-cyan-400 transition-all duration-300"
          >
            <div className="aspect-[4/5] overflow-hidden relative">
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090317] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-[#0d0421]/90 backdrop-blur-md border border-cyan-500/20 text-xs text-white">
                <p className="font-semibold truncate">{photo.caption}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Zoom */}
      <AnimatePresence>
        {activePhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl w-full bg-[#13072b] rounded-3xl p-6 border border-cyan-500/40 shadow-2xl text-white overflow-hidden"
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 text-cyan-300 hover:text-white p-2 rounded-full hover:bg-cyan-500/20 transition z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="rounded-2xl overflow-hidden mb-4 aspect-[4/3] bg-black">
                <img
                  src={activePhoto.url}
                  alt={activePhoto.caption}
                  className="w-full h-full object-contain"
                />
              </div>

              <p className="text-center text-sm font-serif font-semibold text-cyan-200">
                {activePhoto.caption}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
