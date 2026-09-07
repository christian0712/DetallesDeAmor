'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Edit3, ShoppingBag, X, AlertTriangle, ArrowRight } from 'lucide-react';

interface CustomizationWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCustomize: () => void;
  onProceedToCheckout: () => void;
  senderName: string;
  recipientName: string;
}

export const CustomizationWarningModal: React.FC<CustomizationWarningModalProps> = ({
  isOpen,
  onClose,
  onCustomize,
  onProceedToCheckout,
  senderName,
  recipientName,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-[#180a26] rounded-3xl p-6 sm:p-8 border border-amber-500/50 shadow-[0_0_50px_rgba(245,158,11,0.25)] text-white text-center space-y-6 overflow-hidden"
        >
          {/* Top Decorative Ambient Glow */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-32 bg-amber-500/20 blur-3xl pointer-events-none rounded-full" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-rose-300 hover:text-white p-2 rounded-full hover:bg-rose-500/20 transition z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Warning Icon Badge */}
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-500 to-rose-600 border border-amber-300/60 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/30 animate-pulse">
            <AlertTriangle className="w-8 h-8 text-amber-950 font-bold" />
          </div>

          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-500/40 inline-block mb-3">
              ⚠️ Paso Importante Recomenado
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
              ¡Personaliza tu Detalle Antes de Comprar!
            </h3>
            <p className="text-xs sm:text-sm text-rose-200/80 mt-2 leading-relaxed">
              Actualmente la plantilla contiene los nombres de muestra (<strong className="text-white font-bold">{senderName} & {recipientName}</strong>).
              Te recomendamos editar los nombres, fotos de la pareja y tu carta de amor antes de realizar el pago.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => {
                onClose();
                onCustomize();
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-sm shadow-xl shadow-rose-500/40 flex items-center justify-center gap-2 transition active:scale-95 border border-rose-300/30"
            >
              <Edit3 className="w-4 h-4 text-white" />
              <span>🎨 Personalizar Mi Detalle Ahora</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-rose-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-rose-500/20"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Continuar al Pago sin Editar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
