'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, Sparkles, CheckCircle2, Lock, Clock, Calendar, Heart, ShieldAlert, Check, AlertCircle } from 'lucide-react';
import { LoveVoucherItem } from '@/types';
import confetti from 'canvas-confetti';

export interface TimedVoucherItem extends LoveVoucherItem {
  unlockDate?: string; // ISO format YYYY-MM-DD
}

interface GiftBoxVouchersProps {
  vouchers?: LoveVoucherItem[];
  recipientName: string;
}

const defaultTimedVouchers: TimedVoucherItem[] = [
  {
    id: 'v1',
    title: 'Cena Romántica Especial 🍽️',
    description: 'Válido por una cena preparada por mí con tu platillo favorito, velas y vino.',
    icon: '🍽️',
    unlockDate: '2026-09-04', // Disponible hoy
  },
  {
    id: 'v2',
    title: 'Maratón de Pelis & Helado 🍿',
    description: 'Válido por una tarde/noche completa eligiendo tus películas favoritas sin interrupciones.',
    icon: '🍿',
    unlockDate: '2026-09-10', // Disponible en unos días
  },
  {
    id: 'v3',
    title: 'Masaje Relajante de 30 Min 💆‍♂️',
    description: 'Válido por una sesión de masajes relajantes con música suave y aromas.',
    icon: '💆‍♀️',
    unlockDate: '2026-09-18',
  },
  {
    id: 'v4',
    title: 'Un Deseo Libre Concedido ✨',
    description: 'Válido por cualquier deseo especial que quieras pedirme sin excusas.',
    icon: '✨',
    unlockDate: '2026-09-25',
  },
];

export const GiftBoxVouchers: React.FC<GiftBoxVouchersProps> = ({
  vouchers = defaultTimedVouchers,
  recipientName,
}) => {
  const list = vouchers.length > 0 ? (vouchers as TimedVoucherItem[]) : defaultTimedVouchers;
  const [redeemedIds, setRedeemedIds] = useState<Record<string, boolean>>({});
  const [unlockedNowIds, setUnlockedNowIds] = useState<Record<string, boolean>>({});
  const [now, setNow] = useState<Date>(new Date());

  // Live ticker for countdowns
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRedeem = (id: string) => {
    setRedeemedIds((prev) => ({ ...prev, [id]: true }));
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#10b981', '#f59e0b', '#ec4899', '#3b82f6'],
    });
  };

  const handleEarlyUnlock = (id: string) => {
    setUnlockedNowIds((prev) => ({ ...prev, [id]: true }));
  };

  // Helper to get fallback target date if unlockDate is not provided
  const getTargetDateStr = (item: TimedVoucherItem, idx: number): string => {
    if (item.unlockDate) return item.unlockDate;
    // Fallback: staggered future dates (+0, +4, +10, +18 days)
    const offsetDays = [0, 4, 10, 18][idx % 4];
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split('T')[0];
  };

  // Helper to format remaining time
  const getRemainingTime = (targetDateStr: string) => {
    const target = new Date(targetDateStr + 'T00:00:00');
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  // Summary Metrics
  const totalCount = list.length;
  const redeemedCount = Object.keys(redeemedIds).length;
  const lockedCount = list.filter((item, idx) => {
    if (redeemedIds[item.id]) return false;
    if (unlockedNowIds[item.id]) return false;
    const targetStr = getTargetDateStr(item, idx);
    const rem = getRemainingTime(targetStr);
    return rem !== null;
  }).length;
  const availableCount = totalCount - redeemedCount - lockedCount;

  return (
    <div className="w-full max-w-4xl mx-auto my-12 px-4 relative font-sans">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2 border border-emerald-500/40 backdrop-blur-md">
          <Ticket className="w-4 h-4 text-emerald-400" />
          <span>Talonario de Cupones Temporizados</span>
        </div>
        <h3 className="text-2xl md:text-4xl font-serif font-bold text-white tracking-wide">
          Vales de Amor con Contador Regresivo 🎟️⏳
        </h3>
        <p className="text-xs sm:text-sm text-emerald-200/80 mt-1 max-w-md mx-auto">
          {recipientName}, las fechas de apertura de cada cupón son programables. Revisa la cuenta regresiva en vivo.
        </p>
      </div>

      {/* Control / Tracker Dashboard Bar */}
      <div className="bg-[#091b15]/90 border border-emerald-500/30 rounded-2xl p-4 mb-8 backdrop-blur-xl shadow-lg grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="bg-[#0f2a20] p-3 rounded-xl border border-emerald-500/20">
          <span className="block text-xs text-emerald-200/70 font-semibold uppercase">Total Cupones</span>
          <span className="text-xl font-bold text-white font-mono">{totalCount}</span>
        </div>
        <div className="bg-[#0f2a20] p-3 rounded-xl border border-emerald-500/20">
          <span className="block text-xs text-emerald-400 font-semibold uppercase">Canjeados</span>
          <span className="text-xl font-bold text-emerald-300 font-mono">{redeemedCount}</span>
        </div>
        <div className="bg-[#0f2a20] p-3 rounded-xl border border-emerald-500/20">
          <span className="block text-xs text-teal-300 font-semibold uppercase">Disponibles Hoy</span>
          <span className="text-xl font-bold text-teal-200 font-mono">{availableCount}</span>
        </div>
        <div className="bg-[#0f2a20] p-3 rounded-xl border border-amber-500/30">
          <span className="block text-xs text-amber-300 font-semibold uppercase">Bloqueados ⏳</span>
          <span className="text-xl font-bold text-amber-300 font-mono">{lockedCount}</span>
        </div>
      </div>

      {/* Grid of Vouchers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {list.map((item, idx) => {
          const isRedeemed = redeemedIds[item.id];
          const isManuallyUnlocked = unlockedNowIds[item.id];
          const targetDateStr = getTargetDateStr(item, idx);
          const remaining = getRemainingTime(targetDateStr);
          const isTimeLocked = remaining !== null && !isManuallyUnlocked;

          // Secret mystery text until unlocked/redeemed
          const displayIcon = isRedeemed ? (item.icon || '🎁') : isTimeLocked ? '🔒' : '🎁';
          const displayTitle = isRedeemed
            ? item.title
            : isTimeLocked
            ? `Cupón Sorpresa Misterioso #${idx + 1} 🔒`
            : `¡Cupón Sorpresa #${idx + 1} Listo! 🎁✨`;
          const displayDescription = isRedeemed
            ? item.description
            : isTimeLocked
            ? '🔒 El contenido de este cupón es un secreto reservado para ti. ¡Revisa la cuenta regresiva para desbloquear y descubrir la sorpresa!'
            : '✨ ¡Ha llegado la fecha esperada! Toca el botón para destapar este vale y descubrir tu regalo especial.';

          return (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative rounded-3xl p-6 border-2 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between ${
                isRedeemed
                  ? 'bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-950 border-emerald-400'
                  : isTimeLocked
                  ? 'bg-[#101714]/90 border-amber-500/40 opacity-95'
                  : 'bg-[#0f1d18]/90 border-emerald-500/40 hover:border-emerald-400/80 shadow-emerald-500/10'
              }`}
            >
              {/* Ticket Edge Notches */}
              <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 rounded-full bg-[#07140e] border-r border-emerald-500/30" />
              <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full bg-[#07140e] border-l border-emerald-500/30" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
                    <span>{displayIcon}</span>
                    <span>CUPÓN #{idx + 1}</span>
                  </span>

                  {isRedeemed ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-500 text-emerald-950 font-extrabold text-xs flex items-center gap-1 shadow-lg animate-bounce">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>REVELADO & CANJEADO</span>
                    </span>
                  ) : isTimeLocked ? (
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-400/40 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-amber-400" />
                      <span>SORPRESA OCULTA 🔒</span>
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-400/40 flex items-center gap-1 animate-pulse">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      <span>¡LISTO PARA ABRIR! 🔓</span>
                    </span>
                  )}
                </div>

                <h4 className="text-xl font-bold font-serif text-white mb-2 flex items-center gap-2">
                  {displayTitle}
                </h4>
                <p className="text-emerald-200/80 text-xs sm:text-sm leading-relaxed mb-4 font-light">
                  {displayDescription}
                </p>

                {/* Countdown Timer Display for Locked Vouchers */}
                {isTimeLocked && remaining && (
                  <div className="bg-[#192721] p-3.5 rounded-2xl border border-amber-500/30 space-y-2.5 mb-4 shadow-inner">
                    <div className="flex items-center justify-between text-xs text-amber-300 font-semibold">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                        <span>Desbloqueo disponible el:</span>
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                        {targetDateStr}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-1.5 text-center font-mono">
                      <div className="bg-black/70 p-2 rounded-xl border border-amber-500/30 shadow">
                        <span className="block text-base font-bold text-amber-300">{remaining.days}</span>
                        <span className="text-[9px] text-amber-200/60 uppercase tracking-wider">Días</span>
                      </div>
                      <div className="bg-black/70 p-2 rounded-xl border border-amber-500/30 shadow">
                        <span className="block text-base font-bold text-amber-300">{String(remaining.hours).padStart(2, '0')}</span>
                        <span className="text-[9px] text-amber-200/60 uppercase tracking-wider">Horas</span>
                      </div>
                      <div className="bg-black/70 p-2 rounded-xl border border-amber-500/30 shadow">
                        <span className="block text-base font-bold text-amber-300">{String(remaining.minutes).padStart(2, '0')}</span>
                        <span className="text-[9px] text-amber-200/60 uppercase tracking-wider">Min</span>
                      </div>
                      <div className="bg-black/70 p-2 rounded-xl border border-amber-500/30 shadow">
                        <span className="block text-base font-bold text-amber-300">{String(remaining.seconds).padStart(2, '0')}</span>
                        <span className="text-[9px] text-amber-200/60 uppercase tracking-wider">Seg</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => handleRedeem(item.id)}
                  disabled={isRedeemed || isTimeLocked}
                  className={`w-full py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                    isRedeemed
                      ? 'bg-emerald-500/20 text-emerald-300 cursor-default border border-emerald-500/40'
                      : isTimeLocked
                      ? 'bg-amber-950/40 text-amber-300/50 cursor-not-allowed border border-amber-500/20'
                      : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/30 active:scale-95'
                  }`}
                >
                  {isRedeemed ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Premio Revelado & Canjeado ❤️</span>
                    </>
                  ) : isTimeLocked ? (
                    <>
                      <Lock className="w-4 h-4 text-amber-400" />
                      <span>Sorpresa Oculta por Fecha 🔒</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-emerald-200 animate-spin" />
                      <span>Destapar & Revelar Sorpresa 🎁✨</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

