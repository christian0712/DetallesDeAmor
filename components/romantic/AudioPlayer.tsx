'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Music, Volume2, VolumeX, Play, Pause, Radio, Youtube } from 'lucide-react';
import { getYouTubeVideoId } from '@/lib/musicCatalog';

interface AudioPlayerProps {
  audioUrl: string;
  audioTitle: string;
  audioArtist: string;
  autoPlayTrigger?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  audioTitle,
  audioArtist,
  autoPlayTrigger = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Helper to extract Spotify Embed URL
  const getSpotifyEmbedUrl = (url: string): string | null => {
    if (!url || !url.includes('spotify.com')) return null;
    const match = url.match(/track\/([a-zA-Z0-9]+)/);
    if (match && match[1]) {
      return `https://open.spotify.com/embed/track/${match[1]}?utm_source=generator&theme=0`;
    }
    if (url.includes('/embed/track/')) return url;
    return null;
  };

  const youtubeId = getYouTubeVideoId(audioUrl);
  const spotifyEmbedUrl = getSpotifyEmbedUrl(audioUrl);

  useEffect(() => {
    if (!youtubeId && !spotifyEmbedUrl && autoPlayTrigger && !hasInteracted && audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, [autoPlayTrigger, hasInteracted, spotifyEmbedUrl, youtubeId]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch((err) => console.log('Audio play failed:', err));
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  // If YouTube URL / ID is provided, render YouTube Embedded Background Audio Player
  if (youtubeId) {
    return (
      <div className="fixed top-4 right-4 z-50">
        {/* Hidden / Compact YouTube Player Iframe */}
        <div className="relative glass-card-rose rounded-full px-4 py-2 flex items-center gap-3 shadow-xl backdrop-blur-md border border-rose-500/40 text-white transition-all duration-300 hover:scale-105">
          <div className="hidden">
            <iframe
              width="1"
              height="1"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${autoPlayTrigger || isPlaying ? 1 : 0}&loop=1&playlist=${youtubeId}&controls=0&mute=${isMuted ? 1 : 0}`}
              title="YouTube Audio Player"
              allow="autoplay; encrypted-media"
            />
          </div>

          <button
            onClick={togglePlay}
            className="relative w-9 h-9 rounded-full bg-gradient-to-r from-red-600 to-rose-600 flex items-center justify-center shadow-lg hover:shadow-red-500/50 transition-all active:scale-95 shrink-0"
            title={isPlaying ? 'Pausar música de YouTube' : 'Reproducir música de YouTube'}
          >
            {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            )}
          </button>

          <div className="hidden sm:flex flex-col pr-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-200">
              <Youtube className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span className="max-w-[120px] truncate">{audioTitle}</span>
            </div>
            <span className="text-[10px] text-rose-300/70 max-w-[120px] truncate">{audioArtist}</span>
          </div>

          {/* Sound Wave Visualizer */}
          <div className="flex items-center gap-0.5 h-4 px-1">
            {[0.6, 1, 0.4, 0.8, 0.5].map((scale, i) => (
              <div
                key={i}
                className={`w-0.5 bg-red-400 rounded-full transition-all ${
                  isPlaying ? 'animate-bounce' : 'h-1 opacity-40'
                }`}
                style={{
                  height: isPlaying ? `${scale * 16}px` : '4px',
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>

          <button
            onClick={toggleMute}
            className="text-rose-300 hover:text-rose-100 transition-colors p-1"
            title={isMuted ? 'Activar sonido' : 'Silenciar'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    );
  }

  // If Spotify URL is provided, render Spotify Player
  if (spotifyEmbedUrl) {
    return (
      <div className="fixed top-4 right-4 z-50 max-w-[280px] sm:max-w-[320px] w-full">
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-rose-500/40 bg-[#12071f]/90 backdrop-blur-md p-1.5 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 px-2 py-0.5 text-[11px] text-emerald-400 font-bold font-mono">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Reproductor de Spotify 🎵</span>
          </div>
          <iframe
            src={spotifyEmbedUrl}
            width="100%"
            height="80"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-xl"
          />
        </div>
      </div>
    );
  }

  // Standard Audio Player for MP3 / Direct links
  return (
    <div className="fixed top-4 right-4 z-50">
      <audio ref={audioRef} src={audioUrl} loop preload="auto" />
      <div className="glass-card-rose rounded-full px-4 py-2 flex items-center gap-3 shadow-xl backdrop-blur-md border border-rose-500/30 text-white transition-all duration-300 hover:scale-105">
        <button
          onClick={togglePlay}
          className="relative w-9 h-9 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 flex items-center justify-center shadow-lg hover:shadow-rose-500/50 transition-all active:scale-95"
          title={isPlaying ? 'Pausar música' : 'Reproducir música romántica'}
        >
          {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
          )}
        </button>

        <div className="hidden sm:flex flex-col pr-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-200">
            <Music className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span className="max-w-[120px] truncate">{audioTitle}</span>
          </div>
          <span className="text-[10px] text-rose-300/70 max-w-[120px] truncate">{audioArtist}</span>
        </div>

        {/* Music Sound Wave Visualizer */}
        <div className="flex items-center gap-0.5 h-4 px-1">
          {[0.6, 1, 0.4, 0.8, 0.5].map((scale, i) => (
            <div
              key={i}
              className={`w-0.5 bg-rose-400 rounded-full transition-all ${
                isPlaying ? 'animate-bounce' : 'h-1 opacity-40'
              }`}
              style={{
                height: isPlaying ? `${scale * 16}px` : '4px',
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>

        <button
          onClick={toggleMute}
          className="text-rose-300 hover:text-rose-100 transition-colors p-1"
          title={isMuted ? 'Activar sonido' : 'Silenciar'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
