'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, Sparkles, CheckCircle2, Heart, Utensils, Tv, HeartHandshake, Gift } from 'lucide-react';
import { LoveVoucherItem } from '@/types';
import confetti from 'canvas-confetti';

interface GiftBoxVouchersProps {
  vouchers?: LoveVoucherItem[];
  recipientName: string;
}

const defaultVouchers: LoveVoucherItem[] = [
  {
    id: 'v1',
    title: 'Cena Romántica Especial 🍽️',
    description: 'Válido por una cena preparada por mí con tu platillo favorito, velas y vino.',
    icon: '🍽️',
  },
  {
    id: 'v2',
    title: 'Maratón de Pelis & Helado 🍿',
    description: 'Válido por una tarde/noche completa eligiendo tus películas favoritas sin interrupciones.',
    icon: '🍿',
  },
  {
    id: 'v3',
    title: 'Masaje Relajante de 30 Min 💆‍♂️',
    description: 'Válido por una sesión de masajes relajantes con música suave y aromas.',
    icon: '💆‍♀️',
  },
  {
    id: 'v4',
    title: 'Un Deseo Libre Concedido ✨',
    description: 'Válido por cualquier deseo especial que quieras pedirme sin excusas.',
    icon: '✨',
  },
];

export const GiftBoxVouchers: React.FC<GiftBoxVouchersProps> = ({
  vouchers = defaultVouchers,
  recipientName,
}) => {
  const list = vouchers.length > 0 ? vouchers : defaultVouchers;
  const [redeemedIds, setRedeemedIds] = useState<Record<string, boolean>>({});

  const handleRedeem = (id: string) => {
    setRedeemedIds((prev) => ({ ...prev, [id]: true }));
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#10b981', '#f59e0b', '#ec4899'],
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-12 px-4 relative">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2 border border-emerald-500/40 backdrop-blur-md">
          <Ticket className="w-4 h-4 text-emerald-400" />
          <span>Talonario de Vales de Amor</span>
        </div>
        <h3 className="text-2xl md:text-4xl font-serif font-bold text-white tracking-wide">
          Cupones Románticos Para Canjear 🎟️💖
        </h3>
        <p className="text-xs sm:text-sm text-emerald-200/80 mt-1">
          {recipientName}, estos vales son 100% reales. Haz clic para canjearlos cuando quieras.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {list.map((item, idx) => {
          const isRedeemed = redeemedIds[item.id];
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
                  : 'bg-[#0f1d18]/90 border-emerald-500/30 hover:border-emerald-400/70'
              }`}
            >
              {/* Ticket Edge Design Notch */}
              <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0b0512] border-r border-emerald-500/30" />
              <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0b0512] border-l border-emerald-500/30" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
                    <span>{item.icon || '🎟️'}</span>
                    <span>CUPÓN #{idx + 1}</span>
                  </span>

                  {isRedeemed && (
                    <span className="px-3 py-1 rounded-full bg-emerald-500 text-emerald-950 font-extrabold text-xs flex items-center gap-1 shadow-lg animate-bounce">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>¡CANJEADO!</span>
                    </span>
                  )}
                </div>

                <h4 className="text-xl font-bold font-serif text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-emerald-200/80 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                  {item.description}
                </p>
              </div>

              <div>
                <button
                  onClick={() => handleRedeem(item.id)}
                  disabled={isRedeemed}
                  className={`w-full py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                    isRedeemed
                      ? 'bg-emerald-500/20 text-emerald-300 cursor-default border border-emerald-500/40'
                      : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/30 active:scale-95'
                  }`}
                >
                  {isRedeemed ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Cupón Canjeado Exitosamente ❤️</span>
                    </>
                  ) : (
                    <>
                      <Ticket className="w-4 h-4" />
                      <span>Tocar para Canjear Cupón 🎟️</span>
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
