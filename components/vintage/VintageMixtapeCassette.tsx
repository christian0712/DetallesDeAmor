'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Disc, Play, Pause, Radio, Volume2, Sparkles, Heart, Music } from 'lucide-react';

interface MixtapeTrack {
  side: 'A' | 'B';
  number: number;
  title: string;
  note: string;
  duration: string;
}

const CASSETTE_TRACKS: MixtapeTrack[] = [
  {
    side: 'A',
    number: 1,
    title: 'Track 01: La Canción que me Recuerda a Ti 🎵',
    note: 'Cada vez que suena los acordes de esta canción, imagino tus ojos brillando bajo las luces de la noche.',
    duration: '3:45',
  },
  {
    side: 'A',
    number: 2,
    title: 'Track 02: El Secreto de Nuestro Primer Café ☕',
    note: 'Aquella tarde llovió fuerte y no queríamos que terminara la plática ni la taza caliente.',
    duration: '4:12',
  },
  {
    side: 'B',
    number: 3,
    title: 'Track 03: PromesaGrabadaEnCinta 📼',
    note: 'Grabé en este casete el compromiso sincero de hacerte sonreír todos los días de mi vida.',
    duration: '3:20',
  },
  {
    side: 'B',
    number: 4,
    title: 'Track 04: Amor en Alta Fidelidad ❤️',
    note: 'Sin filtros, en analógico puro y verdadero: Eres lo mejor de todos mis tiempos.',
    duration: '5:01',
  },
];

interface VintageMixtapeCassetteProps {
  recipientName?: string;
  senderName?: string;
}

export const VintageMixtapeCassette: React.FC<VintageMixtapeCassetteProps> = ({
  recipientName = 'Sofía',
  senderName = 'Carlos',
}) => {
  const [activeSide, setActiveSide] = useState<'A' | 'B'>('A');
  const [selectedTrack, setSelectedTrack] = useState<MixtapeTrack>(CASSETTE_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const filteredTracks = CASSETTE_TRACKS.filter((t) => t.side === activeSide);

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 relative font-sans">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-b from-[#2b1c10] via-[#21140a] to-[#170c05] rounded-3xl p-6 sm:p-10 border-2 border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.15)] relative overflow-hidden text-amber-100"
      >
        {/* Glow Ambient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-36 bg-amber-600/15 blur-3xl pointer-events-none rounded-full" />

        {/* Section Header */}
        <div className="text-center mb-8 relative z-10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 to-amber-800 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-900/40 border border-amber-300/40">
            <Radio className="w-6 h-6 text-amber-100 animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100 mb-2">
            Mixtape Romántico de Cassette 📻
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/70 font-light max-w-md mx-auto">
            Una cinta analógica grabada especialmente a mano por {senderName} para {recipientName}.
          </p>
        </div>

        {/* Cassette Tape Deck Visual Component */}
        <div className="max-w-xl mx-auto bg-[#180e07] rounded-3xl border-4 border-amber-900/60 p-6 shadow-2xl relative z-10 space-y-6">
          {/* Cassette Label Header */}
          <div className="bg-amber-100 text-slate-900 p-3 rounded-xl border border-amber-300 flex items-center justify-between shadow-inner font-mono">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-amber-900 text-white font-bold text-xs flex items-center justify-center">
                {activeSide}
              </span>
              <span className="text-xs font-bold truncate">
                C-90: DEDICADO A {recipientName.toUpperCase()}
              </span>
            </div>
            <span className="text-[10px] bg-amber-950 text-amber-200 px-2 py-0.5 rounded">
              STEREO HI-FI
            </span>
          </div>

          {/* Cassette Tape Window with Spinning Reels */}
          <div className="h-32 bg-[#0c0603] rounded-2xl border-2 border-amber-800/40 p-4 flex items-center justify-between relative overflow-hidden shadow-inner">
            {/* Left Reel */}
            <div className="relative w-20 h-20 rounded-full border-4 border-amber-700/60 bg-[#1d1007] flex items-center justify-center shadow-lg">
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                className="w-full h-full rounded-full border-2 border-dashed border-amber-400/80 flex items-center justify-center"
              >
                <div className="w-6 h-6 rounded-full bg-amber-950 border border-amber-500/60" />
              </motion.div>
            </div>

            {/* Middle Tape Strip Window */}
            <div className="flex-1 px-4 text-center space-y-1">
              <div className="h-2 bg-amber-950 rounded-full overflow-hidden border border-amber-700/40">
                <motion.div
                  animate={{ x: isPlaying ? ['-100%', '100%'] : '0%' }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                  className="w-1/2 h-full bg-amber-500/60 rounded-full"
                />
              </div>
              <span className="text-[10px] font-mono text-amber-400/80 block">
                {isPlaying ? '▶ REPRODUCIENDO CINTA...' : '⏸ CINTA EN PAUSA'}
              </span>
            </div>

            {/* Right Reel */}
            <div className="relative w-20 h-20 rounded-full border-4 border-amber-700/60 bg-[#1d1007] flex items-center justify-center shadow-lg">
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                className="w-full h-full rounded-full border-2 border-dashed border-amber-400/80 flex items-center justify-center"
              >
                <div className="w-6 h-6 rounded-full bg-amber-950 border border-amber-500/60" />
              </motion.div>
            </div>
          </div>

          {/* Side Selector Buttons */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setActiveSide('A')}
              className={`px-5 py-2 rounded-xl text-xs font-mono font-bold border transition ${
                activeSide === 'A'
                  ? 'bg-amber-600 text-white border-amber-300 shadow-lg shadow-amber-600/40'
                  : 'bg-amber-950/60 text-amber-300/60 border-amber-800/40 hover:text-amber-200'
              }`}
            >
              LADO A (Recuerdos)
            </button>
            <button
              onClick={() => setActiveSide('B')}
              className={`px-5 py-2 rounded-xl text-xs font-mono font-bold border transition ${
                activeSide === 'B'
                  ? 'bg-amber-600 text-white border-amber-300 shadow-lg shadow-amber-600/40'
                  : 'bg-amber-950/60 text-amber-300/60 border-amber-800/40 hover:text-amber-200'
              }`}
            >
              LADO B (Promesas)
            </button>
          </div>
        </div>

        {/* Tracks List */}
        <div className="mt-8 space-y-3 max-w-xl mx-auto relative z-10">
          {filteredTracks.map((track) => (
            <motion.div
              key={track.number}
              whileHover={{ scale: 1.01 }}
              onClick={() => {
                setSelectedTrack(track);
                setIsPlaying(true);
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                selectedTrack.number === track.number
                  ? 'bg-[#3b2413] border-amber-400 text-white shadow-lg'
                  : 'bg-[#1b1008]/60 border-amber-800/30 text-amber-200/70 hover:border-amber-500/50'
              }`}
            >
              <div className="flex items-center justify-between font-serif font-bold text-sm sm:text-base">
                <span>{track.title}</span>
                <span className="text-xs font-mono text-amber-400">{track.duration}</span>
              </div>
              <p className="text-xs text-amber-100/80 font-light mt-1 leading-relaxed">
                "{track.note}"
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
