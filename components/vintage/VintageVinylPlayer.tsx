'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Disc, Music, Play, Pause, Volume2 } from 'lucide-react';

interface VintageVinylPlayerProps {
  audioTitle: string;
  audioArtist: string;
  isPlaying?: boolean;
}

export const VintageVinylPlayer: React.FC<VintageVinylPlayerProps> = ({
  audioTitle,
  audioArtist,
  isPlaying = true,
}) => {
  return (
    <div className="max-w-md mx-auto my-8 px-4">
      <div className="bg-[#211409]/90 border-2 border-amber-500/40 rounded-3xl p-6 shadow-2xl backdrop-blur-md relative overflow-hidden flex flex-col items-center text-center">
        {/* Vintage Label */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-serif mb-4 border border-amber-500/30">
          <Disc className="w-3.5 h-3.5 text-amber-400" />
          <span>Reproductor de Disco Vinilo Retro 33 RPM</span>
        </div>

        {/* Spinning Vinyl Record Visual */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 my-2 flex items-center justify-center">
          {/* Outer Vinyl Disc */}
          <div
            className={`w-full h-full rounded-full bg-gradient-to-tr from-neutral-950 via-neutral-900 to-neutral-950 border-4 border-amber-900/60 shadow-2xl flex items-center justify-center relative overflow-hidden ${
              isPlaying ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '6s' }}
          >
            {/* Vinyl Grooves */}
            <div className="absolute inset-2 rounded-full border border-neutral-800/80 pointer-events-none" />
            <div className="absolute inset-5 rounded-full border border-neutral-800/80 pointer-events-none" />
            <div className="absolute inset-8 rounded-full border border-neutral-800/80 pointer-events-none" />
            <div className="absolute inset-12 rounded-full border border-neutral-800/80 pointer-events-none" />

            {/* Center Record Label */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-600 via-amber-700 to-rose-700 border-4 border-amber-300 flex flex-col items-center justify-center p-1 text-center shadow-inner z-10">
              <span className="text-[9px] font-bold text-amber-100 font-serif leading-tight truncate w-full px-1">
                {audioTitle || 'Nuestra Canción'}
              </span>
              <span className="text-[7px] text-amber-200/80 font-mono truncate w-full px-1">
                {audioArtist || 'Amor Eterno'}
              </span>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-950 border border-amber-300 mt-0.5" />
            </div>
          </div>

          {/* Tone Arm / Needle */}
          <div
            className={`absolute top-0 right-2 w-16 h-24 origin-top-right transition-transform duration-700 pointer-events-none ${
              isPlaying ? 'rotate-12' : '-rotate-12'
            }`}
          >
            <div className="w-1.5 h-16 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 rounded-full mx-auto shadow-md" />
            <div className="w-4 h-5 bg-amber-200 rounded-sm mx-auto shadow-lg -mt-1 border border-amber-700" />
          </div>
        </div>

        {/* Music Track Info */}
        <div className="mt-4 space-y-1">
          <h4 className="text-base font-serif font-bold text-amber-100 flex items-center justify-center gap-2">
            <Music className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>{audioTitle}</span>
          </h4>
          <p className="text-xs text-amber-300/70 font-mono">{audioArtist}</p>
        </div>
      </div>
    </div>
  );
};
