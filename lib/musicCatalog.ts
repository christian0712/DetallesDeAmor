export interface SongTrack {
  id: string;
  title: string;
  artist: string;
  category: 'Piano' | 'Acústico' | 'Baladas' | 'Violín' | 'Romántico';
  coverUrl: string;
  audioUrl: string;
  duration: string;
  youtubeId?: string;
}

export const getYouTubeVideoId = (url: string): string | null => {
  if (!url) return null;
  // Match standard watch?v=, embed/, v/, shorts/, youtu.be/, music.youtube.com
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  if (match && match[1]) return match[1];
  
  // Fallback 11-char extract for direct IDs or dirty URLs
  const fallback = url.match(/([a-zA-Z0-9_-]{11})/);
  if (url.includes('youtube') || url.includes('youtu.be')) {
    return fallback ? fallback[1] : null;
  }
  return null;
};

export const romanticMusicCatalog: SongTrack[] = [
  {
    id: 'song-1',
    title: 'Perfect',
    artist: 'Ed Sheeran',
    category: 'Romántico',
    coverUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=300&q=80',
    audioUrl: 'https://www.youtube.com/watch?v=cNGjD0VG4R8',
    youtubeId: 'cNGjD0VG4R8',
    duration: '4:23',
  },
  {
    id: 'song-2',
    title: 'Yo Te Amo',
    artist: 'Chayanne',
    category: 'Romántico',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80',
    audioUrl: 'https://www.youtube.com/watch?v=XXeoQXXDUMk',
    youtubeId: 'XXeoQXXDUMk',
    duration: '4:45',
  },
  {
    id: 'song-3',
    title: 'Golden Hour',
    artist: 'JVKE',
    category: 'Violín',
    coverUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=300&q=80',
    audioUrl: 'https://www.youtube.com/watch?v=PEM0Vs8jf1w',
    youtubeId: 'PEM0Vs8jf1w',
    duration: '3:29',
  },
  {
    id: 'song-4',
    title: 'Until I Found You',
    artist: 'Stephen Sanchez',
    category: 'Romántico',
    coverUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=300&q=80',
    audioUrl: 'https://www.youtube.com/watch?v=GhQxrCrVSyw',
    youtubeId: 'GhQxrCrVSyw',
    duration: '2:57',
  },
  {
    id: 'song-5',
    title: 'Hasta Ese Día',
    artist: 'Lasso',
    category: 'Baladas',
    coverUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=300&q=80',
    audioUrl: 'https://www.youtube.com/watch?v=84hVjJ4_X54',
    youtubeId: '84hVjJ4_X54',
    duration: '3:35',
  },
  {
    id: 'song-6',
    title: 'All of Me',
    artist: 'John Legend',
    category: 'Piano',
    coverUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=300&q=80',
    audioUrl: 'https://www.youtube.com/watch?v=450p7goxZqg',
    youtubeId: '450p7goxZqg',
    duration: '4:30',
  },
  {
    id: 'song-7',
    title: 'Can\'t Help Falling In Love',
    artist: 'Elvis Presley / Kina Grannis',
    category: 'Piano',
    coverUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=300&q=80',
    audioUrl: 'https://www.youtube.com/watch?v=vGJTaP6anOU',
    youtubeId: 'vGJTaP6anOU',
    duration: '3:20',
  },
  {
    id: 'song-8',
    title: 'Thinking Out Loud',
    artist: 'Ed Sheeran',
    category: 'Baladas',
    coverUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=300&q=80',
    audioUrl: 'https://www.youtube.com/watch?v=lp-EO5I60KA',
    youtubeId: 'lp-EO5I60KA',
    duration: '4:41',
  },
];
