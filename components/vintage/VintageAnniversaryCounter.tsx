'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Disc, Heart } from 'lucide-react';

interface VintageAnniversaryCounterProps {
  startDate: string;
  coupleNames: string;
}

export const VintageAnniversaryCounter: React.FC<VintageAnniversaryCounterProps> = ({
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

      setTimeElapsed({ years, months, days, hours, minutes, seconds, totalDays });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [startDate]);

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 relative">
      <div className="bg-[#f7f0e1] text-slate-800 rounded-3xl p-6 sm:p-10 border-4 border-[#d8c7a9] shadow-2xl text-center relative overflow-hidden">
        
        {/* Masking tape details on top corners */}
        <div className="absolute -top-3 left-8 w-24 h-6 bg-[#e6d7be]/90 rotate-[-4deg] shadow-sm border border-amber-300/40 rounded-sm pointer-events-none" />
        <div className="absolute -top-3 right-8 w-24 h-6 bg-[#e6d7be]/90 rotate-[4deg] shadow-sm border border-amber-300/40 rounded-sm pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-200/60 border border-amber-400/40 text-amber-900 text-xs font-semibold mb-4">
          <Clock className="w-4 h-4 text-amber-700" />
          <span>Nuestro Registro de Tiempo Vintage</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-amber-950 mb-2">
          {coupleNames}
        </h2>
        
        <p className="text-xs sm:text-sm text-amber-900/70 mb-8 font-light">
          Escribiendo nuestra historia de amor desde el{' '}
          <span className="font-mono text-amber-900 font-bold bg-amber-200/50 px-2 py-0.5 rounded">
            {new Date(startDate).toLocaleDateString()}
          </span>
        </p>

        {/* Vintage Flip Clock Cards */}
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
              className="bg-[#2c1d11] text-amber-100 p-3 sm:p-4 rounded-2xl border-2 border-amber-500/30 shadow-lg flex flex-col items-center justify-center font-mono"
            >
              <span className="text-2xl sm:text-4xl font-bold text-amber-300">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-amber-200/70 uppercase tracking-wider mt-1 font-sans">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Vintage Badge */}
        <div className="bg-[#eaddca] p-3 rounded-2xl border border-amber-400/40 inline-flex items-center gap-2 text-xs text-amber-950 font-serif">
          <Disc className="w-4 h-4 text-amber-800 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Un total de <strong className="font-mono text-amber-900 text-sm font-bold">{timeElapsed.totalDays} días inolvidables</strong> grabados en el disco de nuestras vidas.</span>
        </div>
      </div>
    </section>
  );
};
