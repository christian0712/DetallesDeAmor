'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Stars, Orbit, Compass, Rocket } from 'lucide-react';

interface InteractiveCosmosIntroProps {
  recipientName: string;
  senderName: string;
  envelopeTitle?: string;
  envelopeSubtitle?: string;
  onOpen: () => void;
}

export const InteractiveCosmosIntro: React.FC<InteractiveCosmosIntroProps> = ({
  recipientName,
  senderName,
  envelopeTitle = 'Para mi universo entero:',
  envelopeSubtitle = 'Toca el Núcleo Galáctico para encender nuestra historia estelar 🌌✨',
  onOpen,
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-b from-[#03010a] via-[#0d0526] to-[#03010a]">
      
      {/* Ambient Nebulae Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-600/20 via-cyan-500/20 to-indigo-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      
      {/* Animated Twinkling Constellations */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-ping"
            style={{
              top: `${(i * 17) % 100}%`,
              left: `${(i * 23) % 100}%`,
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              opacity: 0.3 + (i % 5) * 0.15,
              animationDuration: `${2 + (i % 4)}s`,
            }}
          />
        ))}
      </div>

      {/* Main Interactive Cosmic Orb Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center max-w-lg w-full px-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-cyan-300 text-xs font-semibold mb-8 backdrop-blur-xl shadow-lg shadow-cyan-500/10">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
          <span>Experiencia Cósmica de Amor 🌌</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-white mb-3 tracking-wide">
          {envelopeTitle}
        </h1>
        
        <p className="text-xl sm:text-2xl font-cursive text-cyan-300 mb-10">
          {recipientName}
        </p>

        {/* 3D Glowing Orb Core Button */}
        <div className="relative my-8 flex items-center justify-center">
          {/* Outer Pulsing Rings */}
          <div className="absolute w-64 h-64 rounded-full border border-cyan-400/30 animate-spin" style={{ animationDuration: '15s' }} />
          <div className="absolute w-52 h-52 rounded-full border border-purple-500/30 animate-spin" style={{ animationDuration: '10s', animationDirection: 'reverse' }} />
          
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={onOpen}
            className="group relative w-36 h-36 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-1 shadow-[0_0_50px_rgba(34,211,238,0.5)] hover:shadow-[0_0_80px_rgba(168,85,247,0.8)] transition-all duration-500 flex items-center justify-center cursor-pointer"
          >
            <div className="w-full h-full rounded-full bg-[#080214] flex flex-col items-center justify-center p-2 text-center border border-white/20 group-hover:bg-gradient-to-tr group-hover:from-indigo-900 group-hover:to-purple-900 transition">
              <Sparkles className="w-8 h-8 text-cyan-300 mb-1 group-hover:scale-125 transition" />
              <span className="text-[11px] font-bold tracking-wider uppercase text-white font-mono">
                ABRIR GALAXIA
              </span>
            </div>
          </motion.button>
        </div>

        <p className="text-xs sm:text-sm text-indigo-200/70 font-light mt-6 max-w-xs mx-auto leading-relaxed">
          {envelopeSubtitle}
        </p>

        <div className="mt-8 text-[11px] text-cyan-400/60 font-mono flex items-center justify-center gap-1.5">
          <Orbit className="w-3.5 h-3.5" />
          <span>De: {senderName}</span>
        </div>
      </motion.div>
    </div>
  );
};
