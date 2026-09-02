'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractiveEnvelope } from '@/components/romantic/InteractiveEnvelope';
import { AnniversaryCounter } from '@/components/romantic/AnniversaryCounter';
import { PhotoSlider } from '@/components/romantic/PhotoSlider';
import { LoveLetter } from '@/components/romantic/LoveLetter';
import { ProposalQuestion } from '@/components/romantic/ProposalQuestion';
import { MemoriesTimeline } from '@/components/romantic/MemoriesTimeline';
import { AudioPlayer } from '@/components/romantic/AudioPlayer';
import { InlineEditorModal } from '@/components/romantic/InlineEditorModal';
import { PaymentCheckoutModal } from '@/components/checkout/PaymentCheckoutModal';
import { defaultRomanticData } from '@/lib/defaultData';
import { RomanticPageData, Order } from '@/types';
import { Heart, Sparkles, Share2, Check, QrCode, ArrowLeft } from 'lucide-react';

export default function RomanticEnvelopePage() {
  const [data, setData] = useState<RomanticPageData>(defaultRomanticData);
  const [isOpened, setIsOpened] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  const handleEnvelopeOpen = () => {
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
    <div className="min-h-screen bg-[#0b0512] text-white relative font-sans overflow-x-hidden selection:bg-rose-500 selection:text-white">
      
      {/* Background Floating Hearts Particle Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-rose-500/15 text-2xl animate-float-slow"
            style={{
              top: `${(i * 7) % 100}%`,
              left: `${(i * 13) % 100}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Top Floating Return Header (Z-50) */}
      <header className="fixed top-4 left-4 z-50">
        <Link
          href="/"
          className="px-4 py-2 rounded-full bg-[#180a24]/90 hover:bg-[#28133b] text-rose-200 border border-rose-500/40 text-xs font-semibold backdrop-blur-md shadow-xl flex items-center gap-2 transition hover:scale-105"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-rose-400" />
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

      {/* Stage 1: Closed Envelope Intro */}
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="envelope-stage"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
          >
            <InteractiveEnvelope
              recipientName={data.recipientName}
              senderName={data.senderName}
              envelopeTitle={data.envelopeTitle}
              envelopeSubtitle={data.envelopeSubtitle}
              onOpen={handleEnvelopeOpen}
            />
          </motion.div>
        ) : (
          /* Stage 2: Main Romantic Experience */
          <motion.div
            key="content-stage"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative z-10 pt-16 pb-24 space-y-16"
          >
            {/* Top Romantic Welcome Banner */}
            <div className="text-center px-4 max-w-3xl mx-auto pt-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 to-pink-600 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-rose-500/40"
              >
                <Heart className="w-8 h-8 text-white fill-white animate-heart-beat" />
              </motion.div>

              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-2">
                Para el amor de mi vida:{' '}
                <span className="text-gradient-rose font-cursive text-4xl sm:text-6xl block sm:inline mt-1 sm:mt-0">
                  {data.recipientName}
                </span>
              </h1>

              <p className="text-rose-200/80 text-sm sm:text-lg font-light max-w-lg mx-auto">
                He creado este espacio con todo mi corazón para recordarte lo especial que eres para mí.
              </p>
            </div>

            {/* Section 1: Anniversary Live Counter */}
            <AnniversaryCounter
              startDate={data.anniversaryDate}
              coupleNames={data.coupleTitle}
            />

            {/* Section 2: Photo Carousel */}
            <PhotoSlider photos={data.photos} />

            {/* Section 3: Open Love Letter */}
            <LoveLetter
              title={data.loveLetterTitle}
              body={data.loveLetterBody}
              senderName={data.senderName}
              recipientName={data.recipientName}
            />

            {/* Section 4: Interactive Proposal Question (Exploding Hearts) */}
            <ProposalQuestion
              questionTitle={data.questionTitle}
              yesButtonText={data.yesButtonText}
              yesResponseSubtitle={data.yesResponseSubtitle}
              senderName={data.senderName}
              recipientName={data.recipientName}
            />

            {/* Section 5: Memories Timeline */}
            <MemoriesTimeline memories={data.memories} />

            {/* Share / Copy Link Banner */}
            <div className="max-w-md mx-auto px-4 text-center">
              <button
                onClick={handleShareLink}
                className="w-full px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-rose-200 font-semibold text-sm border border-rose-500/30 flex items-center justify-center gap-2 transition backdrop-blur-md"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-green-300">¡Enlace copiado al portapapeles!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-rose-400" />
                    <span>Compartir este Detalle por WhatsApp / Enlace</span>
                  </>
                )}
              </button>
            </div>

            {/* Bottom Footer */}
            <footer className="text-center text-xs text-rose-300/50 pt-8 border-t border-rose-500/20 max-w-3xl mx-auto">
              <p>
                Hecho con mucho ❤️ por <span className="text-rose-300 font-bold">{data.senderName}</span> para{' '}
                <span className="text-rose-300 font-bold">{data.recipientName}</span>.
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Buttons Bar */}
      <div className="fixed bottom-6 left-6 right-6 z-50 flex items-center justify-between pointer-events-none max-w-xl mx-auto">
        <button
          onClick={() => setIsCheckoutOpen(true)}
          className="pointer-events-auto px-5 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs sm:text-sm shadow-2xl shadow-emerald-500/50 border border-emerald-300/40 flex items-center gap-2 transform hover:scale-105 active:scale-95 transition-all backdrop-blur-md"
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
