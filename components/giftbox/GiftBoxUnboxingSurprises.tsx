'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Heart, CheckCircle, PackageOpen, HelpCircle, X, Check, Lock, AlertCircle } from 'lucide-react';
import { GiftBoxSurpriseItem } from '@/types';
import confetti from 'canvas-confetti';

interface GiftBoxUnboxingSurprisesProps {
  recipientName?: string;
  surprises?: GiftBoxSurpriseItem[];
}

const DEFAULT_SURPRISES: GiftBoxSurpriseItem[] = [
  {
    id: 's1',
    title: 'Caja Misteriosa #1 🎁',
    question: '¿Cuál es mi color favorito? 🎨',
    options: ['Verde Esmeralda 💚', 'Azul Noche 💙', 'Rosa Pastel 🩷'],
    correctAnswerIndex: 0,
    surpriseText: '¡Correcto mi amor! 🎉 Ganaste un vale por 1,000 besos acumulables + una cena romántica a la luz de las velas ❤️',
    icon: '💋',
  },
  {
    id: 's2',
    title: 'Caja Misteriosa #2 🍿',
    question: '¿Qué prefiero disfrutar juntos un fin de semana? 🌧️☀️',
    options: ['Lluvia, maratón de películas & helado 🌧️🍿', 'Día soleado en la playa ☀️🏖️', 'Ir a correr a las 6 AM 🏃‍♂️'],
    correctAnswerIndex: 0,
    surpriseText: '¡Adivinaste perfectamente! 🍿 Tienes un Pase VIP para elegir películas, bebidas y snacks todo el fin de semana 🎟️',
    icon: '🎬',
  },
  {
    id: 's3',
    title: 'Caja Misteriosa #3 ✈️',
    question: '¿Cuál es nuestra comida favorita para compartir? 🍕🍣',
    options: ['Hamburguesa gigante con papas 🍔', 'Pizza artesanal bien calientita 🍕', 'Sushi variado con salsa agridulce 🍣'],
    correctAnswerIndex: 1,
    surpriseText: '¡Exacto preciosa! 🍕 Ganaste un viaje sorpresa planeado para nuestro próximo aniversario juntos 🗺️💖',
    icon: '🗺️',
  },
];

export const GiftBoxUnboxingSurprises: React.FC<GiftBoxUnboxingSurprisesProps> = ({
  recipientName = 'Camila',
  surprises = DEFAULT_SURPRISES,
}) => {
  const items = surprises.length > 0 ? surprises : DEFAULT_SURPRISES;

  // Track opened states and selected trivia box
  const [openedBoxIds, setOpenedBoxIds] = useState<Record<string, boolean>>({});
  const [activeQuizBox, setActiveQuizBox] = useState<GiftBoxSurpriseItem | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleBoxClick = (box: GiftBoxSurpriseItem) => {
    // If already opened, view the prize directly
    if (openedBoxIds[box.id]) {
      setActiveQuizBox(box);
      return;
    }
    // Open trivia challenge
    setActiveQuizBox(box);
    setSelectedOption(null);
    setErrorMessage(null);
  };

  const handleVerifyAnswer = () => {
    if (!activeQuizBox || selectedOption === null) return;

    if (selectedOption === activeQuizBox.correctAnswerIndex) {
      // Correct!
      setOpenedBoxIds((prev) => ({ ...prev, [activeQuizBox.id]: true }));
      setErrorMessage(null);
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10b981', '#ec4899', '#f59e0b', '#3b82f6'],
      });
    } else {
      // Incorrect hint
      setErrorMessage('¡Ups mi amor! 😜 Esa no es la respuesta correcta... ¡Piensa bien e inténtalo otra vez! 💕');
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 relative font-sans">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-b from-[#0b2118]/90 via-[#071811]/90 to-[#040e0a]/90 rounded-3xl p-6 sm:p-10 border border-emerald-500/30 backdrop-blur-2xl shadow-[0_0_60px_rgba(16,185,129,0.15)] relative overflow-hidden text-white"
      >
        {/* Glow background */}
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-80 h-40 bg-emerald-500/15 blur-3xl pointer-events-none rounded-full" />

        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-600 to-emerald-700 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/30 border border-emerald-300/40">
            <PackageOpen className="w-6 h-6 text-white animate-bounce" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-2">
            Cajas Misteriosas Unboxing 🎁❓
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200/70 font-light max-w-md mx-auto">
            {recipientName}, responde la pregunta romántica correctamente para desbloquear la tapa de cada regalo sorpresa.
          </p>
        </div>

        {/* Grid of Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
          {items.map((box, idx) => {
            const isOpened = openedBoxIds[box.id];

            return (
              <motion.div
                key={box.id || idx}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleBoxClick(box)}
                className={`cursor-pointer rounded-3xl p-6 border text-center transition-all duration-300 relative overflow-hidden flex flex-col items-center justify-between min-h-[230px] shadow-xl ${
                  isOpened
                    ? 'bg-[#0f2d22] border-emerald-400 shadow-emerald-500/20'
                    : 'bg-[#0a1e16]/90 border-emerald-500/30 hover:border-emerald-400/70'
                }`}
              >
                <div className="text-5xl mb-2 transition-transform duration-300 hover:rotate-6">
                  {isOpened ? (box.icon || '💋') : '🎁'}
                </div>

                <div>
                  <h3 className="font-serif font-bold text-lg text-white mb-1">
                    {box.title}
                  </h3>
                  <p className="text-xs text-emerald-200/80 font-light line-clamp-2">
                    {isOpened ? box.surpriseText : box.question}
                  </p>
                </div>

                <div className="mt-4">
                  {isOpened ? (
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-300 font-bold bg-emerald-950/90 px-3.5 py-1.5 rounded-full border border-emerald-500/40">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> ¡Sorpresa Revelada! ✨
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 px-4 py-2 rounded-full shadow-md hover:brightness-110">
                      <HelpCircle className="w-3.5 h-3.5" /> Responder & Abrir 🎁
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal / Challenge Dialog */}
        <AnimatePresence>
          {activeQuizBox && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 20 }}
                className="bg-[#0b1f17] border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white relative shadow-2xl overflow-hidden"
              >
                {/* Modal Ambient Glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 blur-3xl pointer-events-none" />

                {/* Close Button */}
                <button
                  onClick={() => setActiveQuizBox(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full bg-emerald-950/60 border border-emerald-500/30"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* If already opened: Show prize */}
                {openedBoxIds[activeQuizBox.id] ? (
                  <div className="text-center space-y-4 py-4">
                    <div className="text-6xl animate-bounce">
                      {activeQuizBox.icon || '🎉'}
                    </div>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-400/40">
                      ¡Regalo Desbloqueado Exitosamente! ✨
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-white">
                      {activeQuizBox.title}
                    </h3>
                    <div className="bg-[#071610] p-4 rounded-2xl border border-emerald-500/30 text-emerald-200 text-sm leading-relaxed font-light shadow-inner">
                      {activeQuizBox.surpriseText}
                    </div>
                    <button
                      onClick={() => setActiveQuizBox(null)}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/30"
                    >
                      ¡Guardar mi Sorpresa! ❤️
                    </button>
                  </div>
                ) : (
                  /* Trivia Challenge */
                  <div className="space-y-5">
                    <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold bg-emerald-950/70 border border-emerald-500/30 px-3 py-1 rounded-full w-fit">
                      <HelpCircle className="w-4 h-4 text-emerald-400" />
                      <span>DESAFÍO TRIVIA ROMÁNTICA</span>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
                        {activeQuizBox.question}
                      </h3>
                      <p className="text-xs text-emerald-200/70 font-light">
                        Elige la opción correcta para levantar la tapa de la caja de regalo:
                      </p>
                    </div>

                    {/* Options list */}
                    <div className="space-y-3">
                      {activeQuizBox.options.map((opt, oIdx) => {
                        const isSelected = selectedOption === oIdx;
                        return (
                          <motion.button
                            key={oIdx}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setSelectedOption(oIdx);
                              setErrorMessage(null);
                            }}
                            className={`w-full p-4 rounded-2xl text-left text-sm font-semibold transition-all duration-200 border flex items-center justify-between ${
                              isSelected
                                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 border-emerald-300 text-white shadow-lg shadow-emerald-500/30'
                                : 'bg-[#091812] border-emerald-500/20 text-emerald-100 hover:border-emerald-400/50 hover:bg-[#0e241b]'
                            }`}
                          >
                            <span>{opt}</span>
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-white bg-white text-emerald-700' : 'border-emerald-500/40'
                            }`}>
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Error Feedback */}
                    {errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2"
                      >
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>{errorMessage}</span>
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <button
                      onClick={handleVerifyAnswer}
                      disabled={selectedOption === null}
                      className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                        selectedOption === null
                          ? 'bg-emerald-950/50 text-emerald-400/40 border border-emerald-500/10 cursor-not-allowed'
                          : 'bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-slate-950 shadow-lg shadow-emerald-400/30 hover:brightness-110 active:scale-95'
                      }`}
                    >
                      <Gift className="w-4 h-4" />
                      <span>Verificar Respuesta & Abrir Regalo 🎁</span>
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
