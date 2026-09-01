'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Mail, Lock } from 'lucide-react';

interface InteractiveEnvelopeProps {
  recipientName: string;
  senderName: string;
  envelopeTitle: string;
  envelopeSubtitle: string;
  onOpen: () => void;
}

export const InteractiveEnvelope: React.FC<InteractiveEnvelopeProps> = ({
  recipientName,
  senderName,
  envelopeTitle,
  envelopeSubtitle,
  onOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEnvelopeClick = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden bg-gradient-to-b from-[#0d0714] via-[#1a0927] to-[#0d0714]">
      {/* Floating background heart particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-rose-500/20 text-2xl animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 4}s`,
              transform: `scale(${0.5 + Math.random() * 1.5})`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Top Header message */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 z-10 px-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm font-medium mb-3 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-rose-400 animate-spin" />
          <span>Tienes un detalle muy especial</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-wide drop-shadow-lg">
          {envelopeTitle}{' '}
          <span className="font-cursive text-4xl md:text-6xl text-rose-400 block sm:inline mt-1 sm:mt-0">
            {recipientName}
          </span>
        </h1>
        <p className="text-rose-200/70 text-sm md:text-base mt-2 max-w-md mx-auto">
          {envelopeSubtitle}
        </p>
      </motion.div>

      {/* Interactive 3D Envelope */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        onClick={handleEnvelopeClick}
        className="relative cursor-pointer group z-20 w-full max-w-lg aspect-[4/3] perspective-1000"
      >
        {/* Outer Glow */}
        <div className="absolute -inset-2 bg-gradient-to-r from-rose-600 to-pink-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-500 group-hover:scale-105" />

        {/* Envelope Base Container */}
        <div className="relative w-full h-full bg-[#2a1334] rounded-2xl shadow-2xl border border-rose-500/30 overflow-hidden flex flex-col justify-end">
          
          {/* Inside Letter peek */}
          <motion.div
            initial={{ y: 50, opacity: 0.8 }}
            animate={isOpen ? { y: -180, opacity: 1 } : { y: 50, opacity: 0.8 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="absolute left-6 right-6 top-8 bottom-4 bg-[#fffaf0] rounded-xl p-6 shadow-inner text-gray-800 font-handwritten flex flex-col justify-between border border-amber-200 z-10"
          >
            <div>
              <div className="flex justify-between items-center border-b border-rose-200 pb-2 mb-3">
                <span className="text-rose-700 font-bold text-lg">Para: {recipientName}</span>
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-bounce" />
              </div>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed line-clamp-4">
                "Han pasado tantos momentos increíbles a tu lado... gracias por llenar mi vida de alegría."
              </p>
            </div>
            <div className="text-right text-xs text-rose-800 font-bold">
              Con todo mi amor, <br />
              <span className="text-sm text-rose-600 font-cursive">{senderName}</span>
            </div>
          </motion.div>

          {/* Envelope Pocket Body (Front pocket overlay) */}
          <div 
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 0, 50% 50%)',
              background: 'linear-gradient(185deg, #3d1b4b 0%, #1e0b29 100%)',
              borderTop: '1px solid rgba(244,63,94,0.3)',
            }}
          />

          {/* Top Flap (Opens upwards) */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 30 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top center' }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#4d235c] to-[#341640] rounded-t-2xl border-b border-rose-400/40 shadow-lg flex items-center justify-center pointer-events-none"
          >
            {/* Flap details */}
            <div 
              className="w-full h-full" 
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                background: 'linear-gradient(180deg, #481d57 0%, #351341 100%)',
              }}
            />
          </motion.div>

          {/* Center Wax Seal Button */}
          <div className="absolute inset-0 flex items-center justify-center z-40">
            <AnimatePresence>
              {!isOpen && (
                <motion.button
                  exit={{ scale: 0, opacity: 0, rotate: 180 }}
                  transition={{ duration: 0.4 }}
                  className="relative group/seal focus:outline-none"
                  aria-label="Abrir sobre de amor"
                >
                  <div className="absolute -inset-3 bg-amber-500/30 rounded-full blur-md group-hover/seal:bg-amber-500/60 transition" />
                  
                  {/* Wax Seal Design */}
                  <div className="relative w-20 h-20 md:w-24 md:y-24 rounded-full bg-gradient-to-br from-red-600 via-rose-700 to-amber-900 shadow-2xl border-4 border-amber-400/80 flex flex-col items-center justify-center text-amber-200 transform group-hover/seal:scale-110 transition duration-300 active:scale-95">
                    <Heart className="w-8 h-8 md:w-10 md:h-10 text-amber-200 fill-amber-300/80 drop-shadow-md animate-pulse" />
                    <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase mt-0.5 text-amber-100">
                      Toca aquí
                    </span>
                  </div>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Card Footer */}
          <div className="p-4 text-center z-30 bg-[#170a21]/90 border-t border-rose-500/20 backdrop-blur-sm">
            <p className="text-xs text-rose-300/80 font-medium flex items-center justify-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-rose-400" />
              Haz clic en el sobre para desplegar la magia
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
