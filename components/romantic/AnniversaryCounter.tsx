'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Heart } from 'lucide-react';

interface AnniversaryCounterProps {
  startDate: string; // ISO format "YYYY-MM-DD"
  coupleNames: string;
}

interface TimeDifference {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const AnniversaryCounter: React.FC<AnniversaryCounterProps> = ({
  startDate,
  coupleNames,
}) => {
  const [timeDiff, setTimeDiff] = useState<TimeDifference>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      let diff = Math.max(0, now - start);

      const secondsInMs = 1000;
      const minutesInMs = secondsInMs * 60;
      const hoursInMs = minutesInMs * 60;
      const daysInMs = hoursInMs * 24;
      const monthsInMs = daysInMs * 30.4375; // average month length
      const yearsInMs = daysInMs * 365.25;

      const years = Math.floor(diff / yearsInMs);
      diff -= years * yearsInMs;

      const months = Math.floor(diff / monthsInMs);
      diff -= months * monthsInMs;

      const days = Math.floor(diff / daysInMs);
      diff -= days * daysInMs;

      const hours = Math.floor(diff / hoursInMs);
      diff -= hours * hoursInMs;

      const minutes = Math.floor(diff / minutesInMs);
      diff -= minutes * minutesInMs;

      const seconds = Math.floor(diff / secondsInMs);

      setTimeDiff({ years, months, days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className="w-full max-w-4xl mx-auto my-8 px-4">
      <div className="glass-card-rose rounded-3xl p-6 md:p-10 text-center relative overflow-hidden shadow-2xl border border-rose-500/30">
        
        {/* Glow effect */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-300 text-xs md:text-sm font-semibold mb-4 border border-rose-500/30">
          <Calendar className="w-4 h-4 text-rose-400" />
          <span>Nuestro Tiempo Juntos</span>
        </div>

        <h2 className="text-2xl md:text-4xl font-serif font-bold text-white mb-2">
          {coupleNames}
        </h2>

        <p className="text-rose-200/90 text-sm md:text-base mb-8 max-w-xl mx-auto leading-relaxed">
          Cada segundo a tu lado se convierte en un recuerdo inolvidable...
        </p>

        {/* Counter Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-8">
          {[
            { label: 'Años', value: timeDiff.years },
            { label: 'Meses', value: timeDiff.months },
            { label: 'Días', value: timeDiff.days },
            { label: 'Horas', value: timeDiff.hours },
            { label: 'Minutos', value: timeDiff.minutes },
            { label: 'Segundos', value: timeDiff.seconds },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-[#240c2e]/90 to-[#15061c]/90 rounded-2xl p-4 border border-rose-500/20 shadow-lg flex flex-col items-center justify-center transform hover:scale-105 transition-all duration-300 group"
            >
              <span className="text-2xl md:text-4xl font-bold font-mono text-gradient-rose group-hover:scale-110 transition">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-xs uppercase tracking-widest text-rose-300/70 font-semibold mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Highlight Banner Requested by User */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-950/80 via-rose-900/80 to-rose-950/80 border border-rose-500/40 text-rose-100 font-medium text-sm md:text-lg shadow-inner">
          <Heart className="w-5 h-5 text-rose-400 fill-rose-500 animate-heart-beat inline" />
          <span>
            Han sido los{' '}
            <strong className="text-white font-bold underline decoration-rose-400 decoration-2">
              {timeDiff.years > 0 ? `${timeDiff.years} años, ` : ''}
              {timeDiff.months} meses y {timeDiff.days} días
            </strong>{' '}
            más felices de mi vida.
          </span>
          <Heart className="w-5 h-5 text-rose-400 fill-rose-500 animate-heart-beat inline" />
        </div>
      </div>
    </div>
  );
};
