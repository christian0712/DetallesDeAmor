'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractivePolaroidIntro } from '@/components/vintage/InteractivePolaroidIntro';
import { VintageAnniversaryCounter } from '@/components/vintage/VintageAnniversaryCounter';
import { VintagePolaroidGallery } from '@/components/vintage/VintagePolaroidGallery';
import { VintageLoveLetter } from '@/components/vintage/VintageLoveLetter';
import { VintageProposal } from '@/components/vintage/VintageProposal';
import { VintageMemoriesTimeline } from '@/components/vintage/VintageMemoriesTimeline';
import { VintageVinylPlayer } from '@/components/vintage/VintageVinylPlayer';
import { AudioPlayer } from '@/components/romantic/AudioPlayer';
import { InlineEditorModal } from '@/components/romantic/InlineEditorModal';
import { PaymentCheckoutModal } from '@/components/checkout/PaymentCheckoutModal';
import { defaultVintageData } from '@/lib/defaultData';
import { RomanticPageData, Order } from '@/types';
import { Sparkles, Share2, Check, QrCode, ArrowLeft, Camera } from 'lucide-react';

export default function PolaroidThemePage() {
  const [data, setData] = useState<RomanticPageData>(defaultVintageData);
  const [isOpened, setIsOpened] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  const handleOpen = () => {
    setIsOpened(true);
  };

  const handleSaveData = (newData: RomanticPageData) => {
    setData(newData);
  };

  const handleShareLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1b120a] via-[#2a1d12] to-[#1b120a] text-amber-100 relative font-sans overflow-x-hidden selection:bg-amber-500 selection:text-slate-900">
      
      {/* Background Vintage Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-amber-500/15 text-xl animate-float-slow"
            style={{
              top: `${(i * 13) % 100}%`,
              left: `${(i * 17) % 100}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            📸
          </div>
        ))}
      </div>

      {/* Top Floating Return Header (Z-50) */}
      <header className="fixed top-4 left-4 z-50">
        <Link
          href="/"
          className="px-4 py-2 rounded-full bg-[#2a1a0c]/90 hover:bg-[#3d2713] text-amber-200 border border-amber-500/40 text-xs font-semibold backdrop-blur-md shadow-xl flex items-center gap-2 transition hover:scale-105"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al inicio / Elegir otra plantilla</span>
        </Link>
      </header>

      {/* Persistent Audio Player */}
      <AudioPlayer
        audioUrl={data.audioUrl}
        audioTitle={data.audioTitle}
        audioArtist={data.audioArtist}
        autoPlayTrigger={isOpened}
      />

      {/* Stage 1: Closed Polaroid Camera Intro */}
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="intro-stage"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
          >
            <InteractivePolaroidIntro
              recipientName={data.recipientName}
              senderName={data.senderName}
              envelopeTitle={data.envelopeTitle}
              envelopeSubtitle={data.envelopeSubtitle}
              onOpen={handleOpen}
            />
          </motion.div>
        ) : (
          /* Stage 2: Main Vintage Polaroid Album Experience */
          <motion.div
            key="content-stage"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative z-10 pt-16 pb-24 space-y-16"
          >
            {/* Top Vintage Welcome Banner */}
            <div className="text-center px-4 max-w-3xl mx-auto pt-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 via-amber-700 to-rose-700 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-amber-900/40 border-2 border-amber-300/40"
              >
                <Camera className="w-8 h-8 text-amber-100" />
              </motion.div>

              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100 mb-2">
                Álbum de Recuerdos de:{' '}
                <span className="font-cursive text-4xl sm:text-6xl text-amber-300 block sm:inline mt-1 sm:mt-0">
                  {data.recipientName}
                </span>
              </h1>

              <p className="text-amber-200/80 text-sm sm:text-lg font-light max-w-lg mx-auto">
                Cada fotografía guarda un pedazo de nuestra alma y de nuestro amor.
              </p>
            </div>

            {/* Section 1: Vinyl Disc Player */}
            <VintageVinylPlayer
              audioTitle={data.audioTitle}
              audioArtist={data.audioArtist}
              isPlaying={isOpened}
            />

            {/* Section 2: Vintage Anniversary Live Counter */}
            <VintageAnniversaryCounter
              startDate={data.anniversaryDate}
              coupleNames={data.coupleTitle}
            />

            {/* Section 3: Polaroid Photo Gallery */}
            <VintagePolaroidGallery photos={data.photos} />

            {/* Section 4: Vintage Love Letter */}
            <VintageLoveLetter
              title={data.loveLetterTitle}
              body={data.loveLetterBody}
              senderName={data.senderName}
              recipientName={data.recipientName}
            />

            {/* Section 5: Vintage Proposal Question */}
            <VintageProposal
              questionTitle={data.questionTitle}
              yesButtonText={data.yesButtonText}
              yesResponseSubtitle={data.yesResponseSubtitle}
              senderName={data.senderName}
              recipientName={data.recipientName}
            />

            {/* Section 6: Vintage Memories Timeline */}
            <VintageMemoriesTimeline memories={data.memories} />

            {/* Share / Copy Link Banner */}
            <div className="max-w-md mx-auto px-4 text-center">
              <button
                onClick={handleShareLink}
                className="w-full px-6 py-3.5 rounded-2xl bg-[#352314]/80 hover:bg-[#48301d] text-amber-200 font-semibold text-sm border border-amber-500/30 flex items-center justify-center gap-2 transition backdrop-blur-md"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-green-300">¡Enlace del álbum copiado!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-amber-400" />
                    <span>Compartir este Álbum por WhatsApp / Enlace</span>
                  </>
                )}
              </button>
            </div>

            {/* Bottom Footer */}
            <footer className="text-center text-xs text-amber-300/50 pt-8 border-t border-amber-500/20 max-w-3xl mx-auto">
              <p>
                Álbum de amor capturado con ❤️ por <span className="text-amber-200 font-bold">{data.senderName}</span> para{' '}
                <span className="text-amber-200 font-bold">{data.recipientName}</span>.
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Buttons Bar */}
      <div className="fixed bottom-6 left-6 right-6 z-50 flex items-center justify-between pointer-events-none max-w-xl mx-auto">
        <button
          onClick={() => setIsCheckoutOpen(true)}
          className="pointer-events-auto px-5 py-3 rounded-full bg-gradient-to-r from-amber-600 via-amber-700 to-rose-700 hover:from-amber-700 hover:to-rose-800 text-white font-bold text-xs sm:text-sm shadow-2xl shadow-amber-900/50 border border-amber-300/40 flex items-center gap-2 transform hover:scale-105 active:scale-95 transition-all backdrop-blur-md"
        >
          <QrCode className="w-4 h-4 text-white" />
          <span>Comprar (49bs)</span>
        </button>
      </div>

      {/* Floating Direct Editor Modal */}
      <InlineEditorModal data={data} onSave={handleSaveData} />

      {/* Payment Checkout Modal */}
      <PaymentCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        pageData={data}
        onSuccess={(order) => setActiveOrder(order)}
      />
    </div>
  );
}
