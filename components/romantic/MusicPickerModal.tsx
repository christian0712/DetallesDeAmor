'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Search, Check, Link as LinkIcon, X, Sparkles, Youtube, Play, Pause } from 'lucide-react';
import { getYouTubeVideoId } from '@/lib/musicCatalog';
import { getAdminSongs } from '@/lib/store';
import { fetchAdminSongsFromSupabase } from '@/lib/supabase';
import { AudioPlayer } from '@/components/romantic/AudioPlayer';
import { AdminSong } from '@/types';

interface MusicPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAudioUrl: string;
  onSelectSong: (song: { title: string; artist: string; url: string }) => void;
}

export const MusicPickerModal: React.FC<MusicPickerModalProps> = ({
  isOpen,
  onClose,
  currentAudioUrl,
  onSelectSong,
}) => {
  const [songs, setSongs] = useState<AdminSong[]>(getAdminSongs());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [activeTab, setActiveTab] = useState<'catalog' | 'link'>('catalog');
  const [previewSong, setPreviewSong] = useState<AdminSong | null>(null);

  // Custom link state
  const [customLink, setCustomLink] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [customArtist, setCustomArtist] = useState('');

  useEffect(() => {
    async function loadLatestSongs() {
      const local = getAdminSongs();
      setSongs(local);
      const remoteSongs = await fetchAdminSongsFromSupabase();
      if (remoteSongs && remoteSongs.length > 0) {
        setSongs(remoteSongs);
        if (typeof window !== 'undefined') {
          localStorage.setItem('detalles_amor_admin_songs', JSON.stringify(remoteSongs));
        }
      }
    }
    if (isOpen) {
      loadLatestSongs();
    } else {
      setPreviewSong(null);
    }

    if (typeof window !== 'undefined') {
      const updateSongs = () => setSongs(getAdminSongs());
      window.addEventListener('admin-songs-updated', updateSongs);
      return () => window.removeEventListener('admin-songs-updated', updateSongs);
    }
  }, [isOpen]);

  const categories = ['Todas', ...Array.from(new Set(songs.map((s) => s.category || 'Romántico')))];

  const filteredSongs = songs.filter((song) => {
    const matchesSearch =
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || song.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectSongTrack = (song: AdminSong) => {
    setPreviewSong(null);
    onSelectSong({
      title: song.title,
      artist: song.artist,
      url: song.youtubeUrl,
    });
    onClose();
  };

  const handleApplyCustomLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customLink) return;
    setPreviewSong(null);
    onSelectSong({
      title: customTitle || 'Canción de YouTube / Spotify',
      artist: customArtist || 'Personalizado',
      url: customLink,
    });
    onClose();
  };

  const handleCloseModal = () => {
    setPreviewSong(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      {/* Live Audio Player for Previewing Song Track */}
      {previewSong && (
        <AudioPlayer
          audioUrl={previewSong.youtubeUrl}
          audioTitle={previewSong.title}
          audioArtist={previewSong.artist}
          autoPlayTrigger={true}
        />
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-xl bg-[#150824] rounded-3xl p-6 border border-rose-500/40 shadow-2xl text-white max-h-[88vh] flex flex-col z-10"
      >
        {/* Close Button */}
        <button
          onClick={handleCloseModal}
          className="absolute top-4 right-4 text-rose-300 hover:text-white p-2 rounded-full hover:bg-rose-500/20 transition z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5 shrink-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-semibold mb-2 border border-red-500/30">
            <Youtube className="w-3.5 h-3.5 text-red-400" />
            <span>Escucha previa & Enlaces Personalizados</span>
          </div>
          <h3 className="text-2xl font-serif font-bold text-white">
            Elegir Música de Fondo 🎵
          </h3>
          <p className="text-xs text-rose-200/70 mt-1">
            Prueba cómo suena cada canción antes de elegirla o agrega tu propio enlace.
          </p>
        </div>

        {/* Top Tab Mode (Disponibles / Enlace Propio) */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-[#230d38] rounded-2xl mb-4 shrink-0 border border-rose-500/20">
          <button
            type="button"
            onClick={() => setActiveTab('catalog')}
            className={`py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'catalog'
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md'
                : 'text-rose-300/70 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Canciones Disponibles 🎵</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('link')}
            className={`py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'link'
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md'
                : 'text-rose-300/70 hover:text-white'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Subir Enlace (YouTube / Spotify) 🔗</span>
          </button>
        </div>

        {/* TAB 1: ADMIN CONFIGURED SONGS CATALOG */}
        {activeTab === 'catalog' && (
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {/* Search Input */}
            <div className="relative mb-3 shrink-0">
              <Search className="w-4 h-4 text-rose-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Buscar canción o artista..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#27113e] border border-rose-500/30 rounded-xl pl-10 pr-4 py-2.5 text-white text-xs focus:outline-none focus:border-rose-400"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 shrink-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-rose-500 text-white shadow-sm'
                      : 'bg-[#27113e] text-rose-300/70 hover:text-white border border-rose-500/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Song Cards List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {filteredSongs.length === 0 ? (
                <div className="text-center py-8 text-xs text-rose-300/60">
                  No hay canciones disponibles con este filtro.
                </div>
              ) : (
                filteredSongs.map((song) => {
                  const isSelected = currentAudioUrl === song.youtubeUrl;
                  const isPreviewing = previewSong?.id === song.id;
                  const ytId = getYouTubeVideoId(song.youtubeUrl);
                  const coverUrl =
                    song.coverUrl ||
                    (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80');

                  return (
                    <div
                      key={song.id}
                      className={`p-3 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-rose-900/60 to-pink-900/60 border-rose-400 shadow-lg'
                          : isPreviewing
                          ? 'bg-rose-950/70 border-rose-400 shadow-md'
                          : 'bg-[#220c36] border-rose-500/20 hover:bg-rose-900/30 hover:border-rose-500/40'
                      }`}
                    >
                      {/* Cover Art */}
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-rose-500/30">
                          <img
                            src={coverUrl}
                            alt={song.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <Youtube className="w-5 h-5 text-red-500 fill-red-500" />
                          </div>
                        </div>

                        <div className="min-w-0">
                          <h4 className="font-bold text-xs text-white truncate flex items-center gap-1.5">
                            <span>{song.title}</span>
                            {song.category && (
                              <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 text-[9px] font-mono border border-rose-500/30">
                                {song.category}
                              </span>
                            )}
                          </h4>
                          <p className="text-[11px] text-rose-300/70 truncate mt-0.5">{song.artist}</p>
                        </div>
                      </div>

                      {/* Action Buttons: Escuchar (Preview) + Elegir (Select) */}
                      <div className="shrink-0 flex items-center gap-2">
                        {/* Play / Pause Preview Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isPreviewing) {
                              setPreviewSong(null);
                            } else {
                              setPreviewSong(song);
                            }
                          }}
                          className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                            isPreviewing
                              ? 'bg-red-600 text-white shadow-md animate-pulse border border-red-300'
                              : 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/30'
                          }`}
                          title={isPreviewing ? 'Pausar vista previa' : 'Escuchar canción en vivo'}
                        >
                          {isPreviewing ? (
                            <>
                              <Pause className="w-3.5 h-3.5 fill-white" />
                              <span>Pausar</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5 text-rose-300 fill-rose-300 ml-0.5" />
                              <span>Escuchar</span>
                            </>
                          )}
                        </button>

                        {/* Choose / Selected Button */}
                        {isSelected ? (
                          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-bold text-xs flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" />
                            <span>Seleccionada</span>
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleSelectSongTrack(song)}
                            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs shadow-md transition"
                          >
                            Elegir
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* TAB 2: CUSTOM YOUTUBE / SPOTIFY LINK */}
        {activeTab === 'link' && (
          <form onSubmit={handleApplyCustomLink} className="space-y-4 py-2">
            <div>
              <label className="block text-xs font-semibold text-rose-300 mb-1 flex items-center gap-1.5">
                <LinkIcon className="w-4 h-4 text-rose-400" />
                Pegar Enlace Personalizado (YouTube o Spotify)
              </label>
              <input
                type="text"
                placeholder="Ej: https://www.youtube.com/watch?v=... o https://open.spotify.com/track/..."
                value={customLink}
                onChange={(e) => setCustomLink(e.target.value)}
                className="w-full bg-[#27113e] border border-rose-500/40 rounded-xl px-4 py-2.5 text-white text-xs font-mono focus:outline-none focus:border-rose-400"
              />
              <span className="text-[11px] text-rose-300/60 mt-1 block">
                💡 Copia el enlace de tu canción favorita en YouTube o Spotify y sonará de fondo en tu página romántica.
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">Título de la Canción</label>
                <input
                  type="text"
                  placeholder="Ej: Mi Canción Especial"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full bg-[#27113e] border border-rose-500/30 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">Artista / Detalle</label>
                <input
                  type="text"
                  placeholder="Ej: Artista Favorito"
                  value={customArtist}
                  onChange={(e) => setCustomArtist(e.target.value)}
                  className="w-full bg-[#27113e] border border-rose-500/30 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!customLink}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs shadow-lg transition disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Usar esta Canción</span>
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};
