'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractiveGiftBoxIntro } from '@/components/giftbox/InteractiveGiftBoxIntro';
import { GiftBoxVouchers } from '@/components/giftbox/GiftBoxVouchers';
import { GiftBoxPhotoString } from '@/components/giftbox/GiftBoxPhotoString';
import { GiftBoxProposal } from '@/components/giftbox/GiftBoxProposal';
import { AnniversaryCounter } from '@/components/romantic/AnniversaryCounter';
import { LoveLetter } from '@/components/romantic/LoveLetter';
import { MemoriesTimeline } from '@/components/romantic/MemoriesTimeline';
import { AudioPlayer } from '@/components/romantic/AudioPlayer';
import { InlineEditorModal } from '@/components/romantic/InlineEditorModal';
import { PaymentCheckoutModal } from '@/components/checkout/PaymentCheckoutModal';
import { defaultGiftBoxData } from '@/lib/defaultData';
import { RomanticPageData, Order } from '@/types';
import { Gift, Sparkles, Share2, Check, QrCode, ArrowLeft } from 'lucide-react';

export default function GiftBoxThemePage() {
  const [data, setData] = useState<RomanticPageData>(defaultGiftBoxData);
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
    <div className="min-h-screen bg-[#07140e] text-white relative font-sans overflow-x-hidden selection:bg-emerald-500 selection:text-slate-950">
      {/* Background Floating Sparkle Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-emerald-400/20 animate-pulse"
            style={{
              top: `${(i * 13) % 100}%`,
              left: `${(i * 17) % 100}%`,
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              animationDuration: `${2 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      {/* Top Return Header */}
      <header className="fixed top-4 left-4 z-50">
        <Link
          href="/"
          className="px-4 py-2 rounded-full bg-[#0e241b]/90 hover:bg-[#15382a] text-emerald-200 border border-emerald-500/40 text-xs font-semibold backdrop-blur-md shadow-xl flex items-center gap-2 transition hover:scale-105"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-emerald-400" />
          <span>Volver al inicio / Elegir otra plantilla</span>
        </Link>
      </header>

      {/* Persistent Music Player */}
      <AudioPlayer
        audioUrl={data.audioUrl}
        audioTitle={data.audioTitle}
        audioArtist={data.audioArtist}
        autoPlayTrigger={isOpened}
      />

      {/* Stage 1: Closed Gift Box Intro */}
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="intro-stage"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
          >
            <InteractiveGiftBoxIntro
              recipientName={data.recipientName}
              senderName={data.senderName}
              envelopeTitle={data.envelopeTitle}
              envelopeSubtitle={data.envelopeSubtitle}
              onOpen={handleOpen}
            />
          </motion.div>
        ) : (
          /* Stage 2: Main Gift Box Romantic Experience */
          <motion.div
            key="content-stage"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative z-10 pt-16 pb-24 space-y-16"
          >
            {/* Top Welcome Banner */}
            <div className="text-center px-4 max-w-3xl mx-auto pt-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-600 to-emerald-700 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-emerald-500/40 border border-emerald-300/40"
              >
                <Gift className="w-8 h-8 text-white animate-bounce" />
              </motion.div>

              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-2">
                Un Regalo Inolvidable Para:{' '}
                <span className="text-gradient-rose font-cursive text-4xl sm:text-6xl block sm:inline mt-1 sm:mt-0">
                  {data.recipientName}
                </span>
              </h1>

              <p className="text-emerald-200/80 text-sm sm:text-lg font-light max-w-lg mx-auto">
                Este regalo fue preparado con amor, regalos y sorpresas para hacerte sonreír.
              </p>
            </div>

            {/* 1. Live Anniversary Counter */}
            <AnniversaryCounter
              startDate={data.anniversaryDate}
              coupleNames={data.coupleTitle}
            />

            {/* 2. Interactive Love Vouchers / Cupones de Amor */}
            <GiftBoxVouchers
              vouchers={data.vouchers}
              recipientName={data.recipientName}
            />

            {/* 3. Photo String LED Lights Gallery */}
            <GiftBoxPhotoString photos={data.photos} />

            {/* 4. Hidden Love Letter */}
            <LoveLetter
              title={data.loveLetterTitle}
              body={data.loveLetterBody}
              senderName={data.senderName}
              recipientName={data.recipientName}
            />

            {/* 5. Fireworks Proposal Question */}
            <GiftBoxProposal
              questionTitle={data.questionTitle}
              yesButtonText={data.yesButtonText}
              yesResponseSubtitle={data.yesResponseSubtitle}
              senderName={data.senderName}
              recipientName={data.recipientName}
            />

            {/* 6. Memories Timeline */}
            <MemoriesTimeline memories={data.memories} />

            {/* Share / Copy Link Banner */}
            <div className="max-w-md mx-auto px-4 text-center">
              <button
                onClick={handleShareLink}
                className="w-full px-6 py-3.5 rounded-2xl bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-200 font-semibold text-sm border border-emerald-500/40 flex items-center justify-center gap-2 transition backdrop-blur-md"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-green-300">¡Enlace del regalo copiado!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-emerald-400" />
                    <span>Compartir este Regalo por WhatsApp / Enlace</span>
                  </>
                )}
              </button>
            </div>

            {/* Bottom Footer */}
            <footer className="text-center text-xs text-emerald-300/50 pt-8 border-t border-emerald-500/20 max-w-3xl mx-auto">
              <p>
                Regalo de amor creado con ❤️ por <span className="text-emerald-300 font-bold">{data.senderName}</span> para{' '}
                <span className="text-emerald-300 font-bold">{data.recipientName}</span>.
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Buttons Bar */}
      <div className="fixed bottom-6 left-6 right-6 z-50 flex items-center justify-between pointer-events-none max-w-xl mx-auto">
        <button
          onClick={() => setIsCheckoutOpen(true)}
          className="pointer-events-auto px-5 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs sm:text-sm shadow-2xl shadow-emerald-500/50 border border-emerald-300/40 flex items-center gap-2 transform hover:scale-105 active:scale-95 transition-all backdrop-blur-md"
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
