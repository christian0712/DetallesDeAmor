import { RomanticPageData, TemplateInfo } from '@/types';

export const defaultRomanticData: RomanticPageData = {
  id: 'sobre-romantico-demo',
  recipientName: 'Claudia',
  senderName: 'Christian',
  coupleTitle: 'Christian & Claudia',
  envelopeTitle: 'Para el amor de mi vida:',
  envelopeSubtitle: 'Toca el sello para abrir nuestra carta de amor 💌',
  anniversaryDate: '2025-04-13',
  loveLetterTitle: 'Mi Amor Eterno',
  loveLetterBody: `Desde el primer día en que nuestras miradas se cruzaron, supe que mi vida cambiaría para siempre. Cada risa compartida, cada abrazo en los momentos difíciles y cada mirada cómplice me han demostrado que eres mi lugar seguro en este mundo.

Gracias por enseñarme lo hermoso que es amar y sentirse amado. Eres la razón por la que despierto con una sonrisa y el mejor capítulo de toda mi vida. Te amo infinitamente.`,
  questionTitle: '¿Te gustaría seguir escribiendo nuestra historia juntos?',
  yesButtonText: '¡Sí, quiero! ❤️',
  yesResponseSubtitle: '¡Prometo hacerte sonreír todos y cada uno de mis días a tu lado! 💖✨',
  audioTitle: 'Perfect',
  audioArtist: 'Ed Sheeran',
  audioUrl: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g',
  photos: [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80',
      caption: 'Nuestra primera cita bajo el atardecer 🌅',
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
      caption: 'Viaje inolvidable juntos ✈️❤️',
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80',
      caption: 'Abrazos sinceros que abrigan el alma 🤗',
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=1200&q=80',
      caption: 'Risas interminables que llenan mi corazón 💕',
    },
  ],
  memories: [
    {
      id: 'm1',
      date: '15 de Mayo, 2023',
      title: 'El Día que Comenzó Todo',
      description: 'Nuestra primera salida juntos donde nos quedamos hablando por horas.',
      icon: '✨',
    },
    {
      id: 'm2',
      date: '31 de Diciembre, 2023',
      title: 'Año Nuevo Juntos',
      description: 'Recibimos el año abrazados pidiendo el mismo deseo: seguir siempre unidos.',
      icon: '🎆',
    },
    {
      id: 'm3',
      date: '14 de Febrero, 2024',
      title: 'San Valentín Mágico',
      description: 'Una cena romántica bajo la luz de las velas y estrellas.',
      icon: '🌹',
    },
  ],
  themeColor: 'rose',
};

export const availableTemplates: TemplateInfo[] = [
  {
    id: 'sobre-romantico',
    title: 'El Sobre de Amor Animado',
    description: 'Apertura de sobre 3D con sello de cera, música ambiental, contador de aniversario y lluvia masiva de corazones.',
    tag: 'TikTok Viral 🔥',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
    demoUrl: '/demo/sobre-romantico',
    popular: true,
  },
  {
    id: 'galaxia-de-amor',
    title: 'Galaxia de Recuerdos',
    description: 'Fondo estelar interactivo, constelación con las fechas de su historia y carta flotante bajo las estrellas.',
    tag: 'Romántico & Mágico ✨',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80',
    demoUrl: '/demo/galaxia-de-amor',
  },
  {
    id: 'polaroid-memories',
    title: 'Álbum Polaroid Vintage & Vinilo',
    description: 'Cámara Polaroid retro interactiva, fotografías animadas con notas a mano y disco de vinilo.',
    tag: 'Vintage & Retro 📸',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
    demoUrl: '/demo/polaroid-memories',
  },
];
