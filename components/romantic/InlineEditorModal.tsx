'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Edit3,
  X,
  Save,
  Sparkles,
  Image as ImageIcon,
  Heart,
  Music,
  Calendar,
  User,
  Disc,
  Loader2,
  Clock,
  Plus,
  Trash2
} from 'lucide-react';
import { RomanticPageData, MemoryItem, StarWishItem, LoveVoucherItem, GiftBoxSurpriseItem } from '@/types';
import { MusicPickerModal } from '@/components/romantic/MusicPickerModal';
import { uploadClientPhotoToSupabase } from '@/lib/supabase';
import { defaultRomanticData, defaultGiftBoxData } from '@/lib/defaultData';

interface InlineEditorModalProps {
  data: RomanticPageData;
  onSave: (newData: RomanticPageData) => void;
  isOpenExternal?: boolean;
  onCloseExternal?: () => void;
}

const DEFAULT_MEMORIES: MemoryItem[] = [
  {
    id: 'm1',
    date: '13 de Abril, 2025',
    title: 'El Día que Comenzó Todo',
    description: 'Nuestra salida juntos donde declare lo que sentia por ti y me dijiste que si, fue el dia mas feliz de mi vida.',
    icon: '✨',
  },
  {
    id: 'm2',
    date: '31 de Diciembre, 2025',
    title: 'Año Nuevo Juntos',
    description: 'Recibimos el año abrazados pidiendo el mismo deseo: seguir siempre unidos y que nunca nos falte el amor el uno del otro',
    icon: '🎆',
  },
  {
    id: 'm3',
    date: '14 de Agosto, 2026',
    title: 'Celebramos tu cumpleaños mi amor ❤️ ',
    description: 'Desde primeras horas de la mañana disfutamos juntos cocinando, compartiendo en familia y comiendo torta.',
    icon: '🌹',
  },
];

export const InlineEditorModal: React.FC<InlineEditorModalProps> = ({
  data,
  onSave,
  isOpenExternal,
  onCloseExternal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMusicPickerOpen, setIsMusicPickerOpen] = useState(false);
  const [formData, setFormData] = useState<RomanticPageData>(data);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isOpenExternal) {
      setIsOpen(true);
    }
  }, [isOpenExternal]);

  const handleClose = () => {
    setIsOpen(false);
    if (onCloseExternal) {
      onCloseExternal();
    }
  };

  useEffect(() => {
    // Ensure memories, vouchers, giftSurprises have defaults if empty
    const initialMemories = data.memories && data.memories.length > 0 ? data.memories : DEFAULT_MEMORIES;
    const initialVouchers = data.vouchers && data.vouchers.length > 0 ? data.vouchers : (defaultGiftBoxData.vouchers || []);
    const initialGiftSurprises = data.giftSurprises && data.giftSurprises.length > 0 ? data.giftSurprises : (defaultGiftBoxData.giftSurprises || []);
    setFormData({
      ...data,
      memories: initialMemories,
      vouchers: initialVouchers,
      giftSurprises: initialGiftSurprises,
      scratchCardPrize: data.scratchCardPrize || defaultGiftBoxData.scratchCardPrize || '¡Válido por una torta especial + regalo sorpresa + velada de celebración inolvidable! 🎂👑❤️',
    });
  }, [data, isOpen]);

  const handleVoucherChange = (index: number, field: keyof LoveVoucherItem, value: any) => {
    const defaultVouchers = defaultGiftBoxData.vouchers || [];
    const current = formData.vouchers && formData.vouchers.length > 0 ? formData.vouchers : defaultVouchers;
    const updated = [...current];
    if (!updated[index]) {
      updated[index] = {
        id: `v${index + 1}`,
        title: '',
        description: '',
        icon: '🎟️',
        unlockDate: '',
      };
    }
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, vouchers: updated }));
  };

  const handleGiftSurpriseChange = (index: number, field: keyof GiftBoxSurpriseItem, value: any) => {
    const defaultSurprises = defaultGiftBoxData.giftSurprises || [];
    const current = formData.giftSurprises && formData.giftSurprises.length > 0 ? formData.giftSurprises : defaultSurprises;
    const updated = [...current];
    if (!updated[index]) {
      updated[index] = {
        id: `s${index + 1}`,
        title: `Caja Misteriosa #${index + 1} 🎁`,
        question: '',
        options: ['', '', ''],
        correctAnswerIndex: 0,
        surpriseText: '',
        icon: '🎁',
      };
    }
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, giftSurprises: updated }));
  };

  const handleGiftSurpriseOptionChange = (surpriseIndex: number, optionIndex: number, value: string) => {
    const defaultSurprises = defaultGiftBoxData.giftSurprises || [];
    const current = formData.giftSurprises && formData.giftSurprises.length > 0 ? formData.giftSurprises : defaultSurprises;
    const updated = [...current];
    const item = { ...updated[surpriseIndex] };
    const newOptions = [...(item.options || ['', '', ''])];
    newOptions[optionIndex] = value;
    item.options = newOptions;
    updated[surpriseIndex] = item;
    setFormData((prev) => ({ ...prev, giftSurprises: updated }));
  };

  const handleInputChange = (field: keyof RomanticPageData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoUrlChange = (index: number, newUrl: string) => {
    const updatedPhotos = [...formData.photos];
    updatedPhotos[index] = { ...updatedPhotos[index], url: newUrl };
    setFormData((prev) => ({ ...prev, photos: updatedPhotos }));
  };

  const handlePhotoCaptionChange = (index: number, caption: string) => {
    const updatedPhotos = [...formData.photos];
    updatedPhotos[index] = { ...updatedPhotos[index], caption };
    setFormData((prev) => ({ ...prev, photos: updatedPhotos }));
  };

  const handleFileUpload = async (index: number, file: File) => {
    setUploadingIndex(index);
    try {
      const publicUrl = await uploadClientPhotoToSupabase(file, 'personalizar', `photo-${index + 1}-${Date.now()}.jpg`);
      handlePhotoUrlChange(index, publicUrl);
    } catch (err) {
      console.error('Error al subir foto:', err);
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleMemoryChange = (index: number, field: keyof MemoryItem, value: string) => {
    const updated = [...(formData.memories || [])];
    if (!updated[index]) {
      updated[index] = {
        id: `m${index + 1}`,
        date: '',
        title: '',
        description: '',
        icon: '❤️',
      };
    }
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, memories: updated }));
  };

  const handleStarWishChange = (index: number, field: keyof StarWishItem, value: any) => {
    const defaultStars: StarWishItem[] = [
      { id: 'sw1', title: 'Mirar las Estrellas & Cenar Rico 🍕🌌', wish: 'Irnos a un lugar tranquilo de noche a recostarnos en una manta a mirar las estrellas, llevando nuestra pizza o comida favorita y brindando bajo la luna.', icon: '🌌', unlockDate: '2026-09-01', caught: false },
      { id: 'sw2', title: 'Picnic al Atardecer & Fotos 🧺🌅', wish: 'Preparar una canastita con jugos, frutas y nuestros postres favoritos para ver la caída del sol juntos mientras capturamos fotos hermosas.', icon: '🌠', unlockDate: '2026-09-10', caught: false },
      { id: 'sw3', title: 'Maratón de Pelis & Chocolates 🎬🍿', wish: 'Una noche entera acurrucados con colchas calientitas, palomitas de maíz, chocolates y nuestras series favoritas sin preocuparnos por el reloj.', icon: '💫', unlockDate: '2026-09-18', caught: false },
      { id: 'sw4', title: 'Escapada Sorpresa de Fin de Semana 🚀🏖️', wish: 'Hacer maletas y escaparnos un fin de semana a un lugar nuevo donde el único plan sea disfrutar de nuestro amor y desconectarnos del mundo.', icon: '⭐', unlockDate: '2026-09-25', caught: false },
    ];
    const current = formData.starWishes && formData.starWishes.length > 0 ? formData.starWishes : defaultStars;
    const updated = [...current];
    if (!updated[index]) {
      updated[index] = {
        id: `sw${index + 1}`,
        title: '',
        wish: '',
        icon: '🌠',
        unlockDate: '',
        caught: false,
      };
    }
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, starWishes: updated }));
  };

  const handleSelectSongFromPicker = (song: { title: string; artist: string; url: string }) => {
    setFormData((prev) => ({
      ...prev,
      audioUrl: song.url,
      audioTitle: song.title,
      audioArtist: song.artist,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    handleClose();
  };

  return (
    <>
      {/* Editor Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#180a24] rounded-3xl p-6 sm:p-8 border border-rose-500/40 shadow-2xl text-white max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-rose-300 hover:text-white p-2 rounded-full hover:bg-rose-500/20 transition"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Title Header */}
              <div className="flex items-center gap-2 mb-6 border-b border-rose-500/20 pb-4">
                <Sparkles className="w-6 h-6 text-rose-400" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                    Editar Tu Detalle Romántico
                  </h3>
                  <p className="text-xs text-rose-300/70">
                    Modifica los nombres, textos, fotos, momentos especiales y música en tiempo real.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. NOMBRES PRINCIPALES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-rose-300 mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-rose-400" />
                      Nombre de tu Pareja (Destinatario)
                    </label>
                    <input
                      type="text"
                      value={formData.recipientName}
                      onChange={(e) => handleInputChange('recipientName', e.target.value)}
                      className="w-full bg-[#28133b] border border-rose-500/30 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-rose-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-rose-300 mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-rose-400" />
                      Tu Nombre (Remitente)
                    </label>
                    <input
                      type="text"
                      value={formData.senderName}
                      onChange={(e) => handleInputChange('senderName', e.target.value)}
                      className="w-full bg-[#28133b] border border-rose-500/30 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-rose-400"
                      required
                    />
                  </div>
                </div>

                {/* 2. TEXTOS DE PORTADA & CARTA */}
                <div className="bg-[#1c0a2c] p-5 rounded-2xl border border-rose-500/30 space-y-4">
                  <div className="border-b border-rose-500/20 pb-2">
                    <span className="text-xs font-bold text-rose-200 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-rose-400" />
                      <span>Textos de Portada & Carta de Amor</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-rose-300 mb-1">
                        Título de Portada / Presentación
                      </label>
                      <input
                        type="text"
                        value={formData.envelopeTitle || ''}
                        onChange={(e) => handleInputChange('envelopeTitle', e.target.value)}
                        placeholder="Ej: Para el amor de mi vida:"
                        className="w-full bg-[#28133b] border border-rose-500/30 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-rose-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-rose-300 mb-1">
                        Subtítulo / Frase de Apertura
                      </label>
                      <input
                        type="text"
                        value={formData.envelopeSubtitle || ''}
                        onChange={(e) => handleInputChange('envelopeSubtitle', e.target.value)}
                        placeholder="Ej: Toca el sello para abrir nuestra carta 💌"
                        className="w-full bg-[#28133b] border border-rose-500/30 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-rose-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-rose-300 mb-1">
                      Título de la Carta de Amor
                    </label>
                    <input
                      type="text"
                      value={formData.loveLetterTitle || ''}
                      onChange={(e) => handleInputChange('loveLetterTitle', e.target.value)}
                      placeholder="Ej: Mi Amor Eterno"
                      className="w-full bg-[#28133b] border border-rose-500/30 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-rose-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-rose-300 mb-1">
                      Cuerpo de la Carta de Amor
                    </label>
                    <textarea
                      rows={4}
                      value={formData.loveLetterBody || ''}
                      onChange={(e) => handleInputChange('loveLetterBody', e.target.value)}
                      className="w-full bg-[#28133b] border border-rose-500/30 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-rose-400 leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-rose-300 mb-1">
                        Pregunta Especial / Pregunta en el Cofre Secreto 🗝️
                      </label>
                      <input
                        type="text"
                        value={formData.questionTitle || ''}
                        onChange={(e) => handleInputChange('questionTitle', e.target.value)}
                        placeholder="Ej: ¿Te gustaría guardar nuestra historia de amor en este cofre por siempre?"
                        className="w-full bg-[#28133b] border border-rose-500/30 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-rose-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-rose-300 mb-1">
                        Texto del Botón "Sí"
                      </label>
                      <input
                        type="text"
                        value={formData.yesButtonText || ''}
                        onChange={(e) => handleInputChange('yesButtonText', e.target.value)}
                        placeholder="Ej: ¡Sí, mi amor siempre! ❤️"
                        className="w-full bg-[#28133b] border border-rose-500/30 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-rose-400"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. SECCIÓN MÚSICA ESTILO HISTORIAS */}
                <div className="bg-gradient-to-r from-[#210c33] via-[#2d1145] to-[#210c33] p-5 rounded-2xl border border-rose-500/40 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between border-b border-rose-500/20 pb-2">
                    <div className="flex items-center gap-2 text-rose-200 text-xs font-bold">
                      <Music className="w-4 h-4 text-rose-400 animate-bounce" />
                      <span>Música de Fondo (Estilo Historias)</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsMusicPickerOpen(true)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-xs shadow-lg flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Elegir Canción Directa</span>
                    </button>
                  </div>

                  {/* Active Selected Song Card Preview */}
                  <div className="bg-[#170829] p-3 rounded-xl border border-rose-500/30 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-300 shrink-0">
                        <Disc className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-xs font-bold text-white truncate">
                          {formData.audioTitle || 'Canción Elegida'}
                        </span>
                        <span className="block text-[11px] text-rose-300/70 truncate">
                          {formData.audioArtist || 'Artista'}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsMusicPickerOpen(true)}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-rose-200 font-semibold text-xs transition shrink-0"
                    >
                      Cambiar 🎵
                    </button>
                  </div>
                </div>

                {/* 4. FOTOS GALERÍA Y LEYENDAS */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-rose-300 flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-rose-400" />
                      Fotos de la Galería & Leyendas (Subida Segura)
                    </label>
                    <span className="text-[10px] text-rose-300/70">
                      Subida directa y segura ☁️
                    </span>
                  </div>

                  <div className="space-y-3">
                    {formData.photos.map((photo, idx) => (
                      <div key={photo.id || idx} className="p-3.5 bg-[#210e30] rounded-2xl border border-rose-500/20 space-y-3">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            {photo.url ? (
                              <img src={photo.url} alt={`Foto ${idx + 1}`} className="w-12 h-12 object-cover rounded-xl border border-rose-400/50 shadow-md shrink-0" />
                            ) : (
                              <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-300 font-bold shrink-0">
                                <ImageIcon className="w-5 h-5 text-rose-400" />
                              </div>
                            )}
                            <div className="min-w-0">
                              <span className="text-xs font-bold text-white block">
                                Foto #{idx + 1}
                              </span>
                              <span className="text-[11px] text-rose-300/70 block truncate">
                                {photo.url ? '✓ Foto guardada' : 'Sin foto cargada todavía'}
                              </span>
                            </div>
                          </div>

                          <label className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs cursor-pointer border border-rose-400/40 flex items-center gap-1.5 shrink-0 shadow-lg active:scale-95 transition">
                            {uploadingIndex === idx ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>Subiendo...</span>
                              </>
                            ) : (
                              <>
                                <span>{photo.url ? 'Cambiar Foto 📸' : 'Subir Foto 📸'}</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      handleFileUpload(idx, file);
                                    }
                                  }}
                                />
                              </>
                            )}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. CUPONES DE AMOR (SI TIENE LA PLANTILLA CAJA DE REGALO) */}
                {(formData.vouchers && formData.vouchers.length > 0) || formData.themeColor === 'emerald' ? (
                  <div className="bg-[#1c0a2c] p-5 rounded-2xl border border-rose-500/30 space-y-4">
                    <div className="border-b border-rose-500/20 pb-2">
                      <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        <span>Cupones de Amor Canjeables (Talonario de Vales con Fechas) 🎟️📅</span>
                      </span>
                    </div>

                    <div className="space-y-3">
                      {(formData.vouchers && formData.vouchers.length > 0 ? formData.vouchers : (defaultGiftBoxData.vouchers || [])).map((voucher, idx) => (
                        <div key={voucher.id || idx} className="p-3.5 bg-[#250d3a] rounded-xl border border-rose-500/20 space-y-2.5">
                          <span className="text-xs font-bold text-emerald-300 block font-serif">Cupón #{idx + 1}</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] text-rose-300/80 mb-0.5">Título del Cupón:</label>
                              <input
                                type="text"
                                value={voucher.title || ''}
                                onChange={(e) => handleVoucherChange(idx, 'title', e.target.value)}
                                placeholder="Ej: Cena Romántica Especial 🍽️"
                                className="w-full bg-[#190829] border border-rose-500/30 rounded-lg px-3 py-1.5 text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-rose-300/80 mb-0.5">Fecha de Desbloqueo (Opcional):</label>
                              <input
                                type="date"
                                value={voucher.unlockDate || ''}
                                onChange={(e) => handleVoucherChange(idx, 'unlockDate', e.target.value)}
                                className="w-full bg-[#190829] border border-rose-500/30 rounded-lg px-3 py-1.5 text-xs text-white"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[10px] text-rose-300/80 mb-0.5">Descripción del Cupón:</label>
                            <input
                              type="text"
                              value={voucher.description || ''}
                              onChange={(e) => handleVoucherChange(idx, 'description', e.target.value)}
                              placeholder="Ej: Válido por una cena preparada por mí..."
                              className="w-full bg-[#190829] border border-rose-500/30 rounded-lg px-3 py-1.5 text-xs text-white"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* 5b. CAJAS MISTERIOSAS (TRIVIA & REGALOS UNBOXING) */}
                {(formData.giftSurprises && formData.giftSurprises.length > 0) || formData.themeColor === 'emerald' ? (
                  <div className="bg-[#0b2118] p-5 rounded-2xl border border-emerald-500/40 space-y-4">
                    <div className="border-b border-emerald-500/20 pb-2">
                      <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        <span>Cajas Misteriosas Sorpresa (3 Cajas de Trivia & Regalos) 🎁❓</span>
                      </span>
                    </div>

                    <div className="space-y-4">
                      {[0, 1, 2].map((idx) => {
                        const surprise = formData.giftSurprises?.[idx] || {
                          id: `s${idx + 1}`,
                          title: `Caja Misteriosa #${idx + 1} 🎁`,
                          question: '',
                          options: ['', '', ''],
                          correctAnswerIndex: 0,
                          surpriseText: '',
                          icon: '🎁',
                        };
                        const options = surprise.options || ['', '', ''];

                        return (
                          <div key={idx} className="p-3.5 bg-[#102b20] rounded-xl border border-emerald-500/30 space-y-3">
                            <span className="text-xs font-bold text-emerald-300 block font-serif">
                              Caja Misteriosa #{idx + 1}
                            </span>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[11px] text-emerald-200/80 mb-1 font-semibold">
                                  Título de la Caja:
                                </label>
                                <input
                                  type="text"
                                  value={surprise.title || ''}
                                  onChange={(e) => handleGiftSurpriseChange(idx, 'title', e.target.value)}
                                  placeholder="Ej: Caja Misteriosa #1 🎁"
                                  className="w-full bg-[#081812] border border-emerald-500/30 rounded-lg px-3 py-1.5 text-xs text-white"
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] text-emerald-200/80 mb-1 font-semibold">
                                  Pregunta / Trivia para Desbloquear:
                                </label>
                                <input
                                  type="text"
                                  value={surprise.question || ''}
                                  onChange={(e) => handleGiftSurpriseChange(idx, 'question', e.target.value)}
                                  placeholder="Ej: ¿Cuál es mi color favorito? 🎨"
                                  className="w-full bg-[#081812] border border-emerald-500/30 rounded-lg px-3 py-1.5 text-xs text-white"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[11px] text-emerald-200/80 mb-1 font-semibold">
                                3 Opciones de Respuesta:
                              </label>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                {[0, 1, 2].map((optIdx) => (
                                  <input
                                    key={optIdx}
                                    type="text"
                                    value={options[optIdx] || ''}
                                    onChange={(e) => handleGiftSurpriseOptionChange(idx, optIdx, e.target.value)}
                                    placeholder={`Opción #${optIdx + 1}`}
                                    className="w-full bg-[#081812] border border-emerald-500/30 rounded-lg px-2.5 py-1.5 text-xs text-white"
                                  />
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[11px] text-emerald-200/80 mb-1 font-semibold">
                                  Opción Correcta:
                                </label>
                                <select
                                  value={surprise.correctAnswerIndex ?? 0}
                                  onChange={(e) => handleGiftSurpriseChange(idx, 'correctAnswerIndex', parseInt(e.target.value, 10))}
                                  className="w-full bg-[#081812] border border-emerald-500/30 rounded-lg px-3 py-1.5 text-xs text-white"
                                >
                                  <option value={0}>Opción 1 es la correcta</option>
                                  <option value={1}>Opción 2 es la correcta</option>
                                  <option value={2}>Opción 3 es la correcta</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-[11px] text-emerald-200/80 mb-1 font-semibold">
                                  Premio / Mensaje Oculto Revelado:
                                </label>
                                <input
                                  type="text"
                                  value={surprise.surpriseText || ''}
                                  onChange={(e) => handleGiftSurpriseChange(idx, 'surpriseText', e.target.value)}
                                  placeholder="Ej: ¡Ganaste 1,000 besos acumulables! ❤️"
                                  className="w-full bg-[#081812] border border-emerald-500/30 rounded-lg px-3 py-1.5 text-xs text-white"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                {/* 5c. TARJETA RASPA Y GANA DE CUMPLETIEMPO */}
                {formData.themeColor === 'emerald' || formData.scratchCardPrize !== undefined ? (
                  <div className="bg-[#0b2118] p-5 rounded-2xl border border-emerald-500/40 space-y-3">
                    <div className="border-b border-emerald-500/20 pb-2">
                      <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        <span>Tarjeta Raspa y Gana Sorpresa 🎂🎰</span>
                      </span>
                    </div>

                    <div>
                      <label className="block text-[11px] text-emerald-200/80 mb-1 font-semibold">
                        Premio Oculto Bajo la Lámina de Raspa y Gana:
                      </label>
                      <textarea
                        rows={2}
                        value={formData.scratchCardPrize || ''}
                        onChange={(e) => handleInputChange('scratchCardPrize', e.target.value)}
                        placeholder="Ej: Válido por una torta especial + regalo sorpresa + velada de celebración inolvidable."
                        className="w-full bg-[#081812] border border-emerald-500/30 rounded-lg px-3 py-2 text-xs text-white leading-relaxed focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>
                ) : null}

                {/* 6. CÁPSULA DE ESTRELLAS FUGACES (PLANTILLA GALAXIA) O HISTORIA EN FECHAS */}
                {formData.templateId === 'galaxia-de-amor' || (formData.starWishes && formData.starWishes.length > 0) ? (
                  <div className="bg-[#1c0a2c] p-5 rounded-2xl border border-indigo-500/30 space-y-4">
                    <div className="flex items-center justify-between border-b border-indigo-500/20 pb-2">
                      <div className="flex items-center gap-2 text-indigo-200 text-xs font-bold">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>Cápsula de Estrellas Fugaces (4 Deseos con Fechas de Desbloqueo) 🌠✨</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[0, 1, 2, 3].map((idx) => {
                        const star = formData.starWishes?.[idx] || {
                          id: `sw${idx + 1}`,
                          title: `Estrella Fugaz #${idx + 1}`,
                          wish: '',
                          icon: '🌠',
                          unlockDate: '',
                          caught: false,
                        };

                        return (
                          <div key={idx} className="p-3.5 bg-[#250d3a] rounded-xl border border-indigo-500/30 space-y-2.5">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-indigo-300 font-serif flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                                Estrella Fugaz #{idx + 1}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] text-indigo-200/80 font-semibold">Icono Elegido:</span>
                                <span className="text-base px-2 py-0.5 rounded-lg bg-indigo-500/20 border border-indigo-500/40 text-white font-bold">
                                  {star.icon || '🌠'}
                                </span>
                              </div>
                            </div>

                            {/* Icon selection */}
                            <div>
                              <span className="block text-[11px] text-indigo-200/80 mb-1 font-semibold">
                                Selecciona un icono para la estrella:
                              </span>
                              <div className="flex flex-wrap gap-1.5 p-2 bg-[#190829] rounded-xl border border-indigo-500/30">
                                {['🌠', '💫', '🌌', '⭐', '✨', '🪐', '🚀', '🌙', '❤️', '💎', '🎉', '🎁'].map((ico) => (
                                  <button
                                    key={ico}
                                    type="button"
                                    onClick={() => handleStarWishChange(idx, 'icon', ico)}
                                    className={`w-7 h-7 rounded-lg text-sm flex items-center justify-center transition-all ${
                                      (star.icon || '🌠') === ico
                                        ? 'bg-gradient-to-tr from-indigo-500 to-purple-600 text-white scale-110 shadow-md border border-white'
                                        : 'bg-indigo-950/40 hover:bg-indigo-500/30 text-white'
                                    }`}
                                  >
                                    {ico}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[11px] text-indigo-200/80 mb-1 font-semibold">
                                  Título del Deseo / Promesa:
                                </label>
                                <input
                                  type="text"
                                  value={star.title}
                                  onChange={(e) => handleStarWishChange(idx, 'title', e.target.value)}
                                  placeholder="Ej: Deseo de Amor Eterno"
                                  className="w-full bg-[#190829] border border-indigo-500/30 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-400"
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] text-indigo-200/80 mb-1 font-semibold">
                                  Fecha de Desbloqueo (Se liberará este día):
                                </label>
                                <input
                                  type="date"
                                  value={star.unlockDate || ''}
                                  onChange={(e) => handleStarWishChange(idx, 'unlockDate', e.target.value)}
                                  className="w-full bg-[#190829] border border-indigo-500/30 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-400 text-white"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[11px] text-indigo-200/80 mb-1 font-semibold">
                                Mensaje / Deseo Oculto:
                              </label>
                              <textarea
                                rows={2}
                                value={star.wish}
                                onChange={(e) => handleStarWishChange(idx, 'wish', e.target.value)}
                                placeholder="Ej: Que cada día a tu lado sea una nueva aventura..."
                                className="w-full bg-[#190829] border border-indigo-500/30 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-400 leading-relaxed"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#1c0a2c] p-5 rounded-2xl border border-rose-500/30 space-y-4">
                    <div className="flex items-center justify-between border-b border-rose-500/20 pb-2">
                      <div className="flex items-center gap-2 text-rose-200 text-xs font-bold">
                        <Clock className="w-4 h-4 text-rose-400" />
                        <span>Nuestra Historia en Fechas (3 Fechas / Momentos Especiales) 🗓️❤️</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[0, 1, 2].map((idx) => {
                        const memory = formData.memories?.[idx] || {
                          id: `m${idx + 1}`,
                          date: '',
                          title: '',
                          description: '',
                          icon: '❤️',
                        };

                        return (
                          <div key={idx} className="p-3.5 bg-[#250d3a] rounded-xl border border-rose-500/20 space-y-2.5">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-rose-300 font-serif">
                                Fecha Importante #{idx + 1}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] text-rose-300/80 font-semibold">Icono Elegido:</span>
                                <span className="text-base px-2 py-0.5 rounded-lg bg-rose-500/20 border border-rose-500/40 text-white font-bold">
                                  {memory.icon || '❤️'}
                                </span>
                              </div>
                            </div>

                            {/* Interactive Palette Selection */}
                            <div>
                              <span className="block text-[11px] text-rose-300/80 mb-1 font-semibold">
                                Selecciona un icono de la paleta:
                              </span>
                              <div className="flex flex-wrap gap-1.5 p-2 bg-[#190829] rounded-xl border border-rose-500/30 max-h-28 overflow-y-auto">
                                {['❤️', '✨', '💍', '🌹', '🎆', '☕', '📜', '📸', '🌌', '🚀', '🎁', '🍾', '✈️', '🎶', '💌', '⭐', '🥳', '🍦', '🥂', '🏖️', '🎬', '🎟️'].map((ico) => (
                                  <button
                                    key={ico}
                                    type="button"
                                    onClick={() => handleMemoryChange(idx, 'icon', ico)}
                                    className={`w-7 h-7 rounded-lg text-sm flex items-center justify-center transition-all ${
                                      (memory.icon || '❤️') === ico
                                        ? 'bg-gradient-to-tr from-rose-500 to-pink-600 text-white scale-110 shadow-md border border-white'
                                        : 'bg-rose-950/40 hover:bg-rose-500/30 text-white'
                                    }`}
                                  >
                                    {ico}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[11px] text-rose-300/80 mb-1">
                                  Fecha (ej: 15 de Mayo, 2023):
                                </label>
                                <input
                                  type="text"
                                  value={memory.date}
                                  onChange={(e) => handleMemoryChange(idx, 'date', e.target.value)}
                                  placeholder="Ej: 15 de Mayo, 2023"
                                  className="w-full bg-[#190829] border border-rose-500/30 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-400"
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] text-rose-300/80 mb-1">
                                  Título del Recuerdo:
                                </label>
                                <input
                                  type="text"
                                  value={memory.title}
                                  onChange={(e) => handleMemoryChange(idx, 'title', e.target.value)}
                                  placeholder="Ej: El Día que Comenzó Todo"
                                  className="w-full bg-[#190829] border border-rose-500/30 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-400"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[11px] text-rose-300/80 mb-1">
                                Descripción / Recuerdo:
                              </label>
                              <textarea
                                rows={2}
                                value={memory.description}
                                onChange={(e) => handleMemoryChange(idx, 'description', e.target.value)}
                                placeholder="Ej: Nuestra primera salida juntos donde nos quedamos hablando por horas..."
                                className="w-full bg-[#190829] border border-rose-500/30 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-400 leading-relaxed"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-rose-500/20">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-rose-200 text-sm font-semibold transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-sm shadow-lg shadow-rose-500/40 flex items-center gap-2 transition active:scale-95"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar Cambios</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Facebook/Instagram Stories Style Music Picker Modal */}
      <MusicPickerModal
        isOpen={isMusicPickerOpen}
        onClose={() => setIsMusicPickerOpen(false)}
        currentAudioUrl={formData.audioUrl}
        onSelectSong={handleSelectSongFromPicker}
      />
    </>
  );
};
