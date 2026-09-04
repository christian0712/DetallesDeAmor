'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronLeft, ChevronRight, Bookmark, Feather, Heart } from 'lucide-react';

interface JournalPage {
  pageNumber: number;
  chapterTitle: string;
  dateStr: string;
  content: string;
  quote: string;
}

const JOURNAL_PAGES: JournalPage[] = [
  {
    pageNumber: 1,
    chapterTitle: 'Página 1: El Primer Encuentro',
    dateStr: 'Capítulo I',
    content: 'Guardo en este diario el recuerdo exacto de la primera vez que escuché tu voz. Tuve la certeza de que el destino había tramado algo hermoso para nosotros dos.',
    quote: '«Hay miradas que escriben historias en segundos.»',
  },
  {
    pageNumber: 2,
    chapterTitle: 'Página 2: Pequeños Detalles',
    dateStr: 'Capítulo II',
    content: 'Me enamoro de las cosas sencillas: cómo te ríes cuando te cuento una tontería, la forma en que sostienes tu taza de café y tu manía de acariciar mi mano.',
    quote: '«En lo simple vive nuestro universo más grande.»',
  },
  {
    pageNumber: 3,
    chapterTitle: 'Página 3: Tu Lugar Seguro',
    dateStr: 'Capítulo III',
    content: 'En un mundo que a veces gira demasiado rápido, tú eres mi calma, mi puerto seguro y el abrazo al que siempre quiero regresar al final del día.',
    quote: '«Donde tú estás, ahí es mi hogar.»',
  },
  {
    pageNumber: 4,
    chapterTitle: 'Página 4: Promesas en Tinta',
    dateStr: 'Capítulo IV',
    content: 'Escribo con tinta indeleble que seguiré cuidándote, respetándote y amándote con la misma intensidad cada mañana del resto de nuestra historia.',
    quote: '«Un amor escrito para durar toda la vida.»',
  },
];

interface VintageSecretJournalProps {
  recipientName?: string;
  senderName?: string;
}

export const VintageSecretJournal: React.FC<VintageSecretJournalProps> = ({
  recipientName = 'Sofía',
  senderName = 'Carlos',
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);

  const currentPage = JOURNAL_PAGES[currentPageIndex];

  const handleNextPage = () => {
    if (currentPageIndex < JOURNAL_PAGES.length - 1) {
      setCurrentPageIndex((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 relative font-serif">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-b from-[#2b1c10] via-[#21140a] to-[#170c05] rounded-3xl p-6 sm:p-10 border-2 border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.15)] relative overflow-hidden text-amber-100"
      >
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-36 bg-amber-600/15 blur-3xl pointer-events-none rounded-full" />

        {/* Section Header */}
        <div className="text-center mb-8 relative z-10 font-sans">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 to-amber-800 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-900/40 border border-amber-300/40">
            <Feather className="w-6 h-6 text-amber-100 animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100 mb-2">
            Diario Secreto de Recuerdos 📔
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/70 font-light max-w-md mx-auto">
            Hojas escritas a mano por {senderName} dedicadas al amor de su vida, {recipientName}.
          </p>
        </div>

        {/* Journal Book Container */}
        <div className="max-w-xl mx-auto bg-[#f8f1e5] text-slate-900 rounded-2xl border-4 border-[#5c3e27] p-6 sm:p-8 shadow-2xl relative z-10 min-h-[340px] flex flex-col justify-between">
          {/* Top Journal Bookmark Header */}
          <div className="flex items-center justify-between border-b-2 border-amber-900/20 pb-3">
            <span className="text-xs font-mono font-bold text-amber-900 flex items-center gap-1.5">
              <Bookmark className="w-4 h-4 text-amber-700" />
              {currentPage.dateStr}
            </span>
            <span className="text-xs font-mono text-amber-800/80">
              Página {currentPage.pageNumber} de {JOURNAL_PAGES.length}
            </span>
          </div>

          {/* Animated Page Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage.pageNumber}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="py-4 space-y-4 my-auto"
            >
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#4a2e18]">
                {currentPage.chapterTitle}
              </h3>

              <p className="text-sm sm:text-base leading-relaxed text-[#362111] font-cursive text-lg sm:text-xl">
                {currentPage.content}
              </p>

              <div className="bg-[#ede0ce] p-3.5 rounded-xl border-l-4 border-amber-700 text-xs sm:text-sm text-amber-950 font-serif italic">
                {currentPage.quote}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Book Controls & Page Turner */}
          <div className="flex items-center justify-between pt-4 border-t-2 border-amber-900/20 font-sans">
            <button
              onClick={handlePrevPage}
              disabled={currentPageIndex === 0}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition ${
                currentPageIndex === 0
                  ? 'opacity-40 cursor-not-allowed text-amber-900'
                  : 'bg-[#5c3e27] text-white hover:bg-[#432c1b]'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Página anterior</span>
            </button>

            <button
              onClick={handleNextPage}
              disabled={currentPageIndex === JOURNAL_PAGES.length - 1}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition ${
                currentPageIndex === JOURNAL_PAGES.length - 1
                  ? 'opacity-40 cursor-not-allowed text-amber-900'
                  : 'bg-[#5c3e27] text-white hover:bg-[#432c1b]'
              }`}
            >
              <span>Página siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
