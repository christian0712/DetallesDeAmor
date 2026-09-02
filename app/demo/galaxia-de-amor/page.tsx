'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractiveCosmosIntro } from '@/components/galaxy/InteractiveCosmosIntro';
import { GalaxyAnniversaryCounter } from '@/components/galaxy/GalaxyAnniversaryCounter';
import { GalaxyPhotoGrid } from '@/components/galaxy/GalaxyPhotoGrid';
import { GalaxyLoveLetter } from '@/components/galaxy/GalaxyLoveLetter';
import { GalaxyProposal } from '@/components/galaxy/GalaxyProposal';
import { MemoriesTimeline } from '@/components/romantic/MemoriesTimeline';
import { AudioPlayer } from '@/components/romantic/AudioPlayer';
import { InlineEditorModal } from '@/components/romantic/InlineEditorModal';
import { PaymentCheckoutModal } from '@/components/checkout/PaymentCheckoutModal';
import { defaultGalaxyData } from '@/lib/defaultData';
import { RomanticPageData, Order } from '@/types';
import { Sparkles, Share2, Check, QrCode, Orbit, ArrowLeft } from 'lucide-react';

export default function GalaxyThemePage() {
  const [data, setData] = useState<RomanticPageData>(defaultGalaxyData);
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
    <div className="min-h-screen bg-[#03010a] text-white relative font-sans overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      
      {/* Background Floating Cosmic Stars Particle Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-400/20 animate-pulse"
            style={{
              top: `${(i * 11) % 100}%`,
              left: `${(i * 19) % 100}%`,
              width: `${(i % 4) + 1}px`,
              height: `${(i % 4) + 1}px`,
              animationDuration: `${1.5 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      {/* Top Floating Return Header (Z-50) */}
      <header className="fixed top-4 left-4 z-50">
        <Link
          href="/"
          className="px-4 py-2 rounded-full bg-[#110729]/90 hover:bg-[#1f0e47] text-cyan-300 border border-cyan-500/40 text-xs font-semibold backdrop-blur-md shadow-xl flex items-center gap-2 transition hover:scale-105"
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

      {/* Stage 1: Closed Cosmic Orb Intro */}
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="intro-stage"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
          >
            <InteractiveCosmosIntro
              recipientName={data.recipientName}
              senderName={data.senderName}
              envelopeTitle={data.envelopeTitle}
              envelopeSubtitle={data.envelopeSubtitle}
              onOpen={handleOpen}
            />
          </motion.div>
        ) : (
          /* Stage 2: Main Galaxy Romantic Experience */
          <motion.div
            key="content-stage"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative z-10 pt-16 pb-24 space-y-16"
          >
            {/* Top Galaxy Welcome Banner */}
            <div className="text-center px-4 max-w-3xl mx-auto pt-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-cyan-500/30 border border-cyan-300/40"
              >
                <Orbit className="w-8 h-8 text-cyan-200 animate-spin" style={{ animationDuration: '12s' }} />
              </motion.div>

              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-2">
                Para la estrella de mi vida:{' '}
                <span className="text-gradient-cyan font-cursive text-4xl sm:text-6xl block sm:inline mt-1 sm:mt-0">
                  {data.recipientName}
                </span>
              </h1>

              <p className="text-cyan-200/70 text-sm sm:text-lg font-light max-w-lg mx-auto">
                Bienvenido a nuestro universo personal, creado con amor estelar e infinito.
              </p>
            </div>

            {/* Section 1: Galaxy Live Anniversary Counter */}
            <GalaxyAnniversaryCounter
              startDate={data.anniversaryDate}
              coupleNames={data.coupleTitle}
            />

            {/* Section 2: Photo Galaxy Grid */}
            <GalaxyPhotoGrid photos={data.photos} />

            {/* Section 3: Interstellar Love Letter */}
            <GalaxyLoveLetter
              title={data.loveLetterTitle}
              body={data.loveLetterBody}
              senderName={data.senderName}
              recipientName={data.recipientName}
            />

            {/* Section 4: Cosmic Proposal Question */}
            <GalaxyProposal
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
                className="w-full px-6 py-3.5 rounded-2xl bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-200 font-semibold text-sm border border-cyan-500/30 flex items-center justify-center gap-2 transition backdrop-blur-md"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-green-300">¡Enlace estelar copiado al portapapeles!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-cyan-400" />
                    <span>Compartir Galaxia por WhatsApp / Enlace</span>
                  </>
                )}
              </button>
            </div>

            {/* Bottom Footer */}
            <footer className="text-center text-xs text-cyan-300/50 pt-8 border-t border-cyan-500/20 max-w-3xl mx-auto">
              <p>
                Hecho con amor cósmico ✨ por <span className="text-cyan-300 font-bold">{data.senderName}</span> para{' '}
                <span className="text-cyan-300 font-bold">{data.recipientName}</span>.
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Buttons Bar */}
      <div className="fixed bottom-6 left-6 right-6 z-50 flex items-center justify-between pointer-events-none max-w-xl mx-auto">
        <button
          onClick={() => setIsCheckoutOpen(true)}
          className="pointer-events-auto px-5 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold text-xs sm:text-sm shadow-2xl shadow-cyan-500/50 border border-cyan-300/40 flex items-center gap-2 transform hover:scale-105 active:scale-95 transition-all backdrop-blur-md"
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
