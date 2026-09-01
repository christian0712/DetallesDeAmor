'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, X, Save, Sparkles, Image as ImageIcon, Heart, Music, Calendar, User, Radio, Disc, Search } from 'lucide-react';
import { RomanticPageData } from '@/types';
import { MusicPickerModal } from '@/components/romantic/MusicPickerModal';

interface InlineEditorModalProps {
  data: RomanticPageData;
  onSave: (newData: RomanticPageData) => void;
}

export const InlineEditorModal: React.FC<InlineEditorModalProps> = ({ data, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMusicPickerOpen, setIsMusicPickerOpen] = useState(false);
  const [formData, setFormData] = useState<RomanticPageData>(data);

  const handleInputChange = (field: keyof RomanticPageData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoUrlChange = (index: number, newUrl: string) => {
    const updatedPhotos = [...formData.photos];
    updatedPhotos[index] = { ...updatedPhotos[index], url: newUrl };
    setFormData((prev) => ({ ...prev, photos: updatedPhotos }));
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
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Edit Control Pill */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white font-bold text-sm shadow-2xl shadow-rose-600/50 hover:shadow-rose-600/80 border border-rose-300/40 flex items-center gap-2 transform hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-md"
      >
        <Edit3 className="w-4 h-4 text-white animate-pulse" />
        <span>Personalizar este Diseño</span>
      </button>

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
                onClick={() => setIsOpen(false)}
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
                    Modifica los datos, fotos y música (Estilo Historias) en tiempo real.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nombres */}
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

                {/* Título Pareja & Fecha */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-rose-300 mb-1 flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-rose-400" />
                      Título de la Pareja
                    </label>
                    <input
                      type="text"
                      value={formData.coupleTitle}
                      onChange={(e) => handleInputChange('coupleTitle', e.target.value)}
                      className="w-full bg-[#28133b] border border-rose-500/30 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-rose-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-rose-300 mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-rose-400" />
                      Fecha de Aniversario / Inicio (Solo Fecha)
                    </label>
                    <input
                      type="date"
                      value={formData.anniversaryDate.slice(0, 10)}
                      onChange={(e) => handleInputChange('anniversaryDate', e.target.value)}
                      className="w-full bg-[#28133b] border border-rose-500/30 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-rose-400"
                    />
                  </div>
                </div>

                {/* Mensaje de la Carta */}
                <div>
                  <label className="block text-xs font-semibold text-rose-300 mb-1">
                    Mensaje de la Carta de Amor
                  </label>
                  <textarea
                    rows={4}
                    value={formData.loveLetterBody}
                    onChange={(e) => handleInputChange('loveLetterBody', e.target.value)}
                    className="w-full bg-[#28133b] border border-rose-500/30 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-rose-400 leading-relaxed"
                  />
                </div>

                {/* SECCIÓN MÚSICA ESTILO HISTORIAS (FACEBOOK / INSTAGRAM) */}
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

                {/* Fotos URLs & Supabase Upload */}
                <div>
                  <label className="block text-xs font-semibold text-rose-300 mb-2 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-rose-400" />
                    Fotos de la Galería (Subir o Pegar URL)
                  </label>
                  <div className="space-y-3">
                    {formData.photos.map((photo, idx) => (
                      <div key={photo.id} className="p-3 bg-[#210e30] rounded-xl border border-rose-500/20 space-y-2">
                        <div className="flex gap-2 items-center">
                          <span className="text-xs text-rose-400 font-mono font-bold w-5">{idx + 1}.</span>
                          <input
                            type="text"
                            value={photo.url}
                            onChange={(e) => handlePhotoUrlChange(idx, e.target.value)}
                            placeholder="URL de la imagen"
                            className="flex-1 bg-[#28133b] border border-rose-500/30 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-400"
                          />
                          <label className="px-3 py-1.5 rounded-xl bg-rose-600/30 hover:bg-rose-600/50 text-rose-200 font-bold text-xs cursor-pointer border border-rose-500/30 flex items-center gap-1 shrink-0">
                            <span>Subir 📸</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    handlePhotoUrlChange(idx, reader.result as string);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                        </div>
                        {photo.url && (
                          <div className="flex items-center gap-2 pl-7">
                            <img src={photo.url} alt="Preview" className="w-10 h-10 object-cover rounded-lg border border-rose-500/40" />
                            <span className="text-[10px] text-rose-300/70 truncate">Vista previa cargada</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-rose-500/20">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
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
