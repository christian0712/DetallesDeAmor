'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Orbit, Sparkles, Sun, Star } from 'lucide-react';

interface GalaxyAnniversaryCounterProps {
  startDate: string;
  coupleNames: string;
}

export const GalaxyAnniversaryCounter: React.FC<GalaxyAnniversaryCounterProps> = ({
  startDate,
  coupleNames,
}) => {
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0,
    solarOrbits: '0.00',
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const difference = Math.max(0, now - start);

      const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));
      const years = Math.floor(totalDays / 365);
      const months = Math.floor((totalDays % 365) / 30);
      const days = totalDays % 30;

      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const solarOrbits = (totalDays / 365.25).toFixed(2);

      setTimeElapsed({ years, months, days, hours, minutes, seconds, totalDays, solarOrbits });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [startDate]);

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 relative">
      <div className="bg-[#0b061c]/80 rounded-3xl p-6 sm:p-10 border border-cyan-500/30 backdrop-blur-xl shadow-[0_0_40px_rgba(6,182,212,0.15)] text-center relative overflow-hidden">
        
        {/* Glowing Background Light */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-4">
          <Orbit className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
          <span>Tiempo en Nuestro Universo Juntos</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-2">
          {coupleNames}
        </h2>
        
        <p className="text-xs sm:text-sm text-cyan-200/70 mb-8 font-light">
          Orbitando juntos alrededor del amor desde el{' '}
          <span className="font-mono text-cyan-300 font-semibold">
            {new Date(startDate).toLocaleDateString()}
          </span>
        </p>

        {/* Counter Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-8">
          {[
            { label: 'Años', value: timeElapsed.years },
            { label: 'Meses', value: timeElapsed.months },
            { label: 'Días', value: timeElapsed.days },
            { label: 'Horas', value: timeElapsed.hours },
            { label: 'Minutos', value: timeElapsed.minutes },
            { label: 'Segundos', value: timeElapsed.seconds },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-[#140b2e]/90 p-3 sm:p-4 rounded-2xl border border-cyan-500/20 shadow-lg flex flex-col items-center justify-center"
            >
              <span className="text-2xl sm:text-4xl font-bold font-mono text-gradient-cyan">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-cyan-200/60 uppercase tracking-wider mt-1">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Orbit Fact Banner */}
        <div className="bg-[#170a38] p-4 rounded-2xl border border-purple-500/30 inline-flex flex-col sm:flex-row items-center gap-3 text-xs text-purple-200">
          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
            <Sun className="w-4 h-4 text-amber-300" />
          </div>
          <span>
            Hemos completado <strong className="text-amber-300 font-mono text-sm">{timeElapsed.solarOrbits} vueltas al Sol</strong> juntos ({timeElapsed.totalDays} días iluminando mi vida).
          </span>
        </div>
      </div>
    </section>
  );
};
