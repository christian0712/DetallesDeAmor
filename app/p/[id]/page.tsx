'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { findOrderByClientCodeOrPhone } from '@/lib/store';
import { defaultRomanticData, defaultGalaxyData, defaultVintageData, defaultGiftBoxData } from '@/lib/defaultData';
import { Order, RomanticPageData } from '@/types';

// Romantic Envelope Components
import { InteractiveEnvelope } from '@/components/romantic/InteractiveEnvelope';
import { AnniversaryCounter } from '@/components/romantic/AnniversaryCounter';
import { PhotoSlider } from '@/components/romantic/PhotoSlider';
import { LoveLetter } from '@/components/romantic/LoveLetter';
import { ProposalQuestion } from '@/components/romantic/ProposalQuestion';
import { MemoriesTimeline } from '@/components/romantic/MemoriesTimeline';

// Galaxy Components
import { InteractiveCosmosIntro } from '@/components/galaxy/InteractiveCosmosIntro';
import { GalaxyReasonsConstellation } from '@/components/galaxy/GalaxyReasonsConstellation';
import { GalaxyPhotoGrid } from '@/components/galaxy/GalaxyPhotoGrid';
import { GalaxyLoveLetter } from '@/components/galaxy/GalaxyLoveLetter';
import { GalaxyShootingStarWishes } from '@/components/galaxy/GalaxyShootingStarWishes';
import { GalaxyProposal } from '@/components/galaxy/GalaxyProposal';

// Vintage Components
import { InteractivePolaroidIntro } from '@/components/vintage/InteractivePolaroidIntro';
import { VintageVinylPlayer } from '@/components/vintage/VintageVinylPlayer';
import { VintageSlideProjector } from '@/components/vintage/VintageSlideProjector';
import { VintagePolaroidGallery } from '@/components/vintage/VintagePolaroidGallery';
import { VintageLoveLetter } from '@/components/vintage/VintageLoveLetter';
import { VintageLockboxProposal } from '@/components/vintage/VintageLockboxProposal';

// Gift Box Components
import { InteractiveGiftBoxIntro } from '@/components/giftbox/InteractiveGiftBoxIntro';
import { GiftBoxVouchers } from '@/components/giftbox/GiftBoxVouchers';
import { GiftBoxUnboxingSurprises } from '@/components/giftbox/GiftBoxUnboxingSurprises';
import { GiftBoxPhotoString } from '@/components/giftbox/GiftBoxPhotoString';
import { GiftBoxScratchCard } from '@/components/giftbox/GiftBoxScratchCard';
import { GiftBoxProposal } from '@/components/giftbox/GiftBoxProposal';

import { AudioPlayer } from '@/components/romantic/AudioPlayer';
import { Heart, Clock, Orbit, Camera, Gift, Sparkles, Share2, Check } from 'lucide-react';

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
          // Fallback demo matching
          if (slug.includes('caja') || slug.includes('regalo') || slug.includes('sorpresa')) {
            setData({ ...defaultGiftBoxData, coupleTitle: slug.replace(/-/g, ' ').toUpperCase() });
          } else if (slug.includes('galaxia') || slug.includes('universo')) {
            setData({ ...defaultGalaxyData, coupleTitle: slug.replace(/-/g, ' ').toUpperCase() });
          } else if (slug.includes('polaroid') || slug.includes('vintage')) {
            setData({ ...defaultVintageData, coupleTitle: slug.replace(/-/g, ' ').toUpperCase() });
          } else {
            setData({ ...defaultRomanticData, coupleTitle: slug.replace(/-/g, ' ').toUpperCase() });
          }
        }
      }
      setIsLoaded(true);
    }
    fetchOrderData();
  }, [slug]);

  const handleOpen = () => {
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

  const isGiftBox = data.themeColor === 'emerald';
  const isGalaxy = data.themeColor === 'purple';
  const isVintage = data.themeColor === 'gold';

  // Render Theme 4: Gift Box 3D & Love Vouchers
  if (isGiftBox) {
    return (
      <div className="min-h-screen bg-[#07140e] text-white relative font-sans overflow-x-hidden selection:bg-emerald-500 selection:text-slate-950">
        <AudioPlayer
          audioUrl={data.audioUrl}
          audioTitle={data.audioTitle}
          audioArtist={data.audioArtist}
          autoPlayTrigger={isOpened}
        />
        {!isOpened ? (
          <InteractiveGiftBoxIntro
            recipientName={data.recipientName}
            senderName={data.senderName}
            envelopeTitle={data.envelopeTitle}
            envelopeSubtitle={data.envelopeSubtitle}
            onOpen={handleOpen}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 pt-16 pb-24 space-y-16"
          >
            <div className="text-center px-4 max-w-3xl mx-auto pt-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-600 to-emerald-700 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-emerald-500/40 border border-emerald-300/40">
                <Gift className="w-8 h-8 text-white animate-bounce" />
              </div>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-2">
                Un Regalo Inolvidable Para: <span className="text-gradient-rose font-cursive text-4xl sm:text-6xl">{data.recipientName}</span>
              </h1>
              <p className="text-emerald-200/80 text-sm sm:text-lg font-light max-w-lg mx-auto">
                Este espacio fue creado especialmente para sorprenderte.
              </p>
            </div>
            <GiftBoxVouchers vouchers={data.vouchers} recipientName={data.recipientName} />
            <GiftBoxUnboxingSurprises recipientName={data.recipientName} surprises={data.giftSurprises} />
            <GiftBoxPhotoString photos={data.photos} />
            <GiftBoxScratchCard recipientName={data.recipientName} />
            <GiftBoxProposal questionTitle={data.questionTitle} yesButtonText={data.yesButtonText} yesResponseSubtitle={data.yesResponseSubtitle} senderName={data.senderName} recipientName={data.recipientName} />
            <div className="max-w-md mx-auto px-4 text-center">
              <button onClick={handleShareLink} className="w-full px-6 py-3.5 rounded-2xl bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-200 font-semibold text-sm border border-emerald-500/40 flex items-center justify-center gap-2 transition backdrop-blur-md">
                {copiedLink ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4 text-emerald-400" />}
                <span>{copiedLink ? '¡Enlace copiado!' : 'Compartir este Regalo'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  // Render Theme 1: Galaxy Cosmic Theme
  if (isGalaxy) {
    return (
      <div className="min-h-screen bg-[#03010a] text-white relative font-sans overflow-x-hidden selection:bg-cyan-500 selection:text-black">
        <AudioPlayer
          audioUrl={data.audioUrl}
          audioTitle={data.audioTitle}
          audioArtist={data.audioArtist}
          autoPlayTrigger={isOpened}
        />
        {!isOpened ? (
          <InteractiveCosmosIntro
            recipientName={data.recipientName}
            senderName={data.senderName}
            envelopeTitle={data.envelopeTitle}
            envelopeSubtitle={data.envelopeSubtitle}
            onOpen={handleOpen}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 pt-16 pb-24 space-y-16"
          >
            <div className="text-center px-4 max-w-3xl mx-auto pt-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-cyan-500/30 border border-cyan-300/40">
                <Orbit className="w-8 h-8 text-cyan-200 animate-spin" style={{ animationDuration: '12s' }} />
              </div>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-2">
                Para la estrella de mi vida: <span className="text-gradient-cyan font-cursive text-4xl sm:text-6xl">{data.recipientName}</span>
              </h1>
              <p className="text-cyan-200/70 text-sm sm:text-lg font-light max-w-lg mx-auto">
                Nuestro universo estelar personal creado para ti.
              </p>
            </div>
            <GalaxyReasonsConstellation recipientName={data.recipientName} />
            <GalaxyPhotoGrid photos={data.photos} />
            <GalaxyLoveLetter title={data.loveLetterTitle} body={data.loveLetterBody} senderName={data.senderName} recipientName={data.recipientName} />
            <GalaxyShootingStarWishes recipientName={data.recipientName} />
            <GalaxyProposal questionTitle={data.questionTitle} yesButtonText={data.yesButtonText} yesResponseSubtitle={data.yesResponseSubtitle} senderName={data.senderName} recipientName={data.recipientName} />
            <div className="max-w-md mx-auto px-4 text-center">
              <button onClick={handleShareLink} className="w-full px-6 py-3.5 rounded-2xl bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-200 font-semibold text-sm border border-cyan-500/30 flex items-center justify-center gap-2 transition backdrop-blur-md">
                {copiedLink ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4 text-cyan-400" />}
                <span>{copiedLink ? '¡Enlace copiado!' : 'Compartir este Detalle'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  // Render Theme 2: Vintage Polaroid Theme
  if (isVintage) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1b120a] via-[#2a1d12] to-[#1b120a] text-amber-100 relative font-sans overflow-x-hidden selection:bg-amber-500 selection:text-slate-900">
        <AudioPlayer
          audioUrl={data.audioUrl}
          audioTitle={data.audioTitle}
          audioArtist={data.audioArtist}
          autoPlayTrigger={isOpened}
        />
        {!isOpened ? (
          <InteractivePolaroidIntro
            recipientName={data.recipientName}
            senderName={data.senderName}
            envelopeTitle={data.envelopeTitle}
            envelopeSubtitle={data.envelopeSubtitle}
            onOpen={handleOpen}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 pt-16 pb-24 space-y-16"
          >
            <div className="text-center px-4 max-w-3xl mx-auto pt-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 via-amber-700 to-rose-700 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-amber-900/40 border-2 border-amber-300/40">
                <Camera className="w-8 h-8 text-amber-100" />
              </div>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100 mb-2">
                Álbum Polaroid de: <span className="font-cursive text-4xl sm:text-6xl text-amber-300">{data.recipientName}</span>
              </h1>
              <p className="text-amber-200/80 text-sm sm:text-lg font-light max-w-lg mx-auto">
                Nuestras memorias capturadas en papel retro.
              </p>
            </div>
            <VintageVinylPlayer audioTitle={data.audioTitle} audioArtist={data.audioArtist} isPlaying={isOpened} />
            <VintageSlideProjector recipientName={data.recipientName} senderName={data.senderName} />
            <VintagePolaroidGallery photos={data.photos} />
            <VintageLoveLetter title={data.loveLetterTitle} body={data.loveLetterBody} senderName={data.senderName} recipientName={data.recipientName} />
            <VintageLockboxProposal questionTitle={data.questionTitle} yesButtonText={data.yesButtonText} yesResponseSubtitle={data.yesResponseSubtitle} senderName={data.senderName} recipientName={data.recipientName} />
            <div className="max-w-md mx-auto px-4 text-center">
              <button onClick={handleShareLink} className="w-full px-6 py-3.5 rounded-2xl bg-[#352314]/80 hover:bg-[#48301d] text-amber-200 font-semibold text-sm border border-amber-500/30 flex items-center justify-center gap-2 transition backdrop-blur-md">
                {copiedLink ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4 text-amber-400" />}
                <span>{copiedLink ? '¡Enlace copiado!' : 'Compartir este Detalle'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  // Render Theme 3: Default Romantic Envelope Theme
  return (
    <div className="min-h-screen bg-[#0b0512] text-white relative font-sans overflow-x-hidden selection:bg-rose-500 selection:text-white">
      <AudioPlayer
        audioUrl={data.audioUrl}
        audioTitle={data.audioTitle}
        audioArtist={data.audioArtist}
        autoPlayTrigger={isOpened}
      />
      {!isOpened ? (
        <InteractiveEnvelope
          recipientName={data.recipientName}
          senderName={data.senderName}
          envelopeTitle={data.envelopeTitle}
          envelopeSubtitle={data.envelopeSubtitle}
          onOpen={handleOpen}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 pt-16 pb-24 space-y-16"
        >
          <div className="text-center px-4 max-w-3xl mx-auto pt-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 to-pink-600 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-rose-500/40">
              <Heart className="w-8 h-8 text-white fill-white animate-heart-beat" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-2">
              Para el amor de mi vida: <span className="text-gradient-rose font-cursive text-4xl sm:text-6xl">{data.recipientName}</span>
            </h1>
            <p className="text-rose-200/80 text-sm sm:text-lg font-light max-w-lg mx-auto">
              Este rincón fue creado especialmente para ti con todo mi amor.
            </p>
          </div>
          <AnniversaryCounter startDate={data.anniversaryDate} coupleNames={data.coupleTitle} />
          <PhotoSlider photos={data.photos} />
          <LoveLetter title={data.loveLetterTitle} body={data.loveLetterBody} senderName={data.senderName} recipientName={data.recipientName} />
          <ProposalQuestion questionTitle={data.questionTitle} yesButtonText={data.yesButtonText} yesResponseSubtitle={data.yesResponseSubtitle} senderName={data.senderName} recipientName={data.recipientName} />
          <MemoriesTimeline memories={data.memories} />
          <div className="max-w-md mx-auto px-4 text-center">
            <button onClick={handleShareLink} className="w-full px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-rose-200 font-semibold text-sm border border-rose-500/30 flex items-center justify-center gap-2 transition backdrop-blur-md">
              {copiedLink ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4 text-rose-400" />}
              <span>{copiedLink ? '¡Enlace copiado!' : 'Compartir este Detalle'}</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
