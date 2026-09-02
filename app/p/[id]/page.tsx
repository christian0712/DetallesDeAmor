'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { getOrderBySlug, findOrderByClientCodeOrPhone } from '@/lib/store';
import { defaultRomanticData } from '@/lib/defaultData';
import { Order, RomanticPageData } from '@/types';
import { InteractiveEnvelope } from '@/components/romantic/InteractiveEnvelope';
import { AnniversaryCounter } from '@/components/romantic/AnniversaryCounter';
import { PhotoSlider } from '@/components/romantic/PhotoSlider';
import { LoveLetter } from '@/components/romantic/LoveLetter';
import { ProposalQuestion } from '@/components/romantic/ProposalQuestion';
import { MemoriesTimeline } from '@/components/romantic/MemoriesTimeline';
import { AudioPlayer } from '@/components/romantic/AudioPlayer';
import { Heart, Clock, Lock, Sparkles, Share2, Check } from 'lucide-react';

export default function PublicQRInvitationPage() {
  const params = useParams();
  const slug = (params?.id as string) || 'carlos-y-sofia';

  const [order, setOrder] = useState<Order | null>(null);
  const [data, setData] = useState<RomanticPageData>(defaultRomanticData);
  const [isOpened, setIsOpened] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchOrderData() {
      if (slug) {
        const found = await findOrderByClientCodeOrPhone(slug);
        if (found) {
          setOrder(found);
          if (found.pageData) {
            setData(found.pageData);
          }
        } else {
          // Fallback to default romantic data for demo
          setData({
            ...defaultRomanticData,
            coupleTitle: slug.replace(/-/g, ' ').toUpperCase(),
          });
        }
      }
      setIsLoaded(true);
    }
    fetchOrderData();
  }, [slug]);

  const handleEnvelopeOpen = () => {
    setIsOpened(true);
  };

  const handleShareLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#0b0512] flex items-center justify-center text-rose-300">
        <Sparkles className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // If order is pending approval
  if (order && order.status === 'PENDIENTE') {
    return (
      <div className="min-h-screen bg-[#0b0512] text-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full glass-card-rose rounded-3xl p-8 border border-rose-500/40 text-center space-y-4 shadow-2xl"
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-400 flex items-center justify-center mx-auto animate-pulse">
            <Clock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-white">
            Detalle en Proceso de Activación
          </h1>
          <p className="text-xs text-rose-200/80 leading-relaxed">
            El detalle romántico para <strong className="text-white">{order.coupleTitle}</strong> ha sido enviado y se encuentra en revisión por el equipo de administración.
          </p>
          <div className="pt-2">
            <a
              href="/admin"
              className="text-xs text-rose-400 hover:text-rose-200 font-semibold underline"
            >
              Acceso Panel de Administración (para aprobar)
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  // Approved Public Romantic Invitation Page
  return (
    <div className="min-h-screen bg-[#0b0512] text-white relative font-sans overflow-x-hidden selection:bg-rose-500 selection:text-white">
      
      {/* Background Floating Hearts */}
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

      {/* Persistent Music Player */}
      <AudioPlayer
        audioUrl={data.audioUrl}
        audioTitle={data.audioTitle}
        audioArtist={data.audioArtist}
        autoPlayTrigger={isOpened}
      />

      {/* Envelope Intro Stage */}
      {!isOpened ? (
        <InteractiveEnvelope
          recipientName={data.recipientName}
          senderName={data.senderName}
          envelopeTitle={data.envelopeTitle}
          envelopeSubtitle={data.envelopeSubtitle}
          onOpen={handleEnvelopeOpen}
        />
      ) : (
        /* Main Interactive Romantic Page */
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative z-10 pt-16 pb-24 space-y-16"
        >
          {/* Header Banner */}
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
              Este rincón fue creado especialmente para ti con todo mi amor.
            </p>
          </div>

          {/* 1. Counter */}
          <AnniversaryCounter
            startDate={data.anniversaryDate}
            coupleNames={data.coupleTitle}
          />

          {/* 2. Photo Carousel */}
          <PhotoSlider photos={data.photos} />

          {/* 3. Love Letter */}
          <LoveLetter
            title={data.loveLetterTitle}
            body={data.loveLetterBody}
            senderName={data.senderName}
            recipientName={data.recipientName}
          />

          {/* 4. Interactive Proposal Question */}
          <ProposalQuestion
            questionTitle={data.questionTitle}
            yesButtonText={data.yesButtonText}
            yesResponseSubtitle={data.yesResponseSubtitle}
            senderName={data.senderName}
            recipientName={data.recipientName}
          />

          {/* 5. Memories */}
          <MemoriesTimeline memories={data.memories} />

          {/* Share */}
          <div className="max-w-md mx-auto px-4 text-center">
            <button
              onClick={handleShareLink}
              className="w-full px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-rose-200 font-semibold text-sm border border-rose-500/30 flex items-center justify-center gap-2 transition backdrop-blur-md"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-green-300">¡Enlace copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-rose-400" />
                  <span>Compartir este Detalle</span>
                </>
              )}
            </button>
          </div>

          {/* Footer */}
          <footer className="text-center text-xs text-rose-300/50 pt-8 border-t border-rose-500/20 max-w-3xl mx-auto">
            <p>
              Con mucho amor de <span className="text-rose-300 font-bold">{data.senderName}</span> para{' '}
              <span className="text-rose-300 font-bold">{data.recipientName}</span>.
            </p>
          </footer>
        </motion.div>
      )}
    </div>
  );
}
