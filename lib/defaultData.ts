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
  audioUrl: 'https://www.youtube.com/watch?v=cNGjD0VG4R8',
  photos: [
    {
      id: '1',
      url: '/demo-photos/foto1.jpg',
      caption: 'Almorzando juntos ❤️',
    },
    {
      id: '2',
      url: '/demo-photos/foto2.jpg',
      caption: 'Momentos mágicos a tu lado ✈️❤️',
    },
    {
      id: '3',
      url: '/demo-photos/foto3.jpg',
      caption: 'Disfrutando de un aniversario juntos ❤️',
    },
    {
      id: '4',
      url: '/demo-photos/foto4.jpg',
      caption: 'Risas interminables que llenan mi corazón 💕',
    },
    {
      id: '5',
      url: '/demo-photos/foto5.jpg',
      caption: 'Juntos por siempre, mi amor 💖✨',
    },
  ],
  memories: [
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
  ],
  themeColor: 'rose',
};

export const defaultGalaxyData: RomanticPageData = {
  id: 'galaxia-de-amor-demo',
  recipientName: 'Valeria',
  senderName: 'Mateo',
  coupleTitle: 'Mateo & Valeria',
  envelopeTitle: 'Para la estrella más brillante de mi universo:',
  envelopeSubtitle: 'Toca el Núcleo Galáctico para iniciar el viaje por nuestras estrellas 🌌✨',
  anniversaryDate: '2024-09-18',
  loveLetterTitle: 'Nuestro Amor Escrito en las Estrellas',
  loveLetterBody: `Si cada estrella en el firmamento representara un motivo por el cual te amo, no alcanzaría el universo entero para contar nuestras razones.

Desde el día en que nuestras constelaciones se cruzaron, supe que mi destino era orbitar siempre a tu lado. Gracias por iluminar mi mundo incluso en las noches más oscuras. Te amo hasta el infinito y más allá.`,
  questionTitle: '¿Te gustaría seguir explorando el universo a mi lado para siempre?',
  yesButtonText: '¡Sí, mi universo entero! 🚀💖',
  yesResponseSubtitle: '¡Prometo iluminar cada uno de tus días bajo este hermoso cielo estrellado! ✨🌌',
  audioTitle: 'Golden Hour',
  audioArtist: 'JVKE',
  audioUrl: 'https://www.youtube.com/watch?v=PEM0Vs8jf1w',
  photos: [
    {
      id: 'g1',
      url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
      caption: 'Bajo el cielo estrellado de nuestra primera noche ✨',
    },
    {
      id: 'g2',
      url: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=80',
      caption: 'Nuestra galaxia de recuerdos infinitos 🌌',
    },
    {
      id: 'g3',
      url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
      caption: 'Abrazados viendo una lluvia de estrellas fugaces 🌠',
    },
    {
      id: 'g4',
      url: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1200&q=80',
      caption: 'Nuestra mejor hora dorada juntos 🌅✨',
    },
    {
      id: 'g5',
      url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80',
      caption: 'Contemplando la luna y soñando juntos 🌙💖',
    },
  ],
  memories: [
    {
      id: 'gm1',
      date: '18 de Septiembre, 2024',
      title: 'El Eclipse de Nuestras Miradas',
      description: 'La noche en que miramos las estrellas y decidimos empezar nuestro viaje juntos.',
      icon: '🌌',
    },
    {
      id: 'gm2',
      date: '31 de Diciembre, 2024',
      title: 'Deseos Bajo el Cielo Estrellado',
      description: 'Pedimos exactamente el mismo deseo a una estrella fugaz: no separarnos jamás.',
      icon: '⭐',
    },
    {
      id: 'gm3',
      date: '14 de Febrero, 2025',
      title: 'Noche de Astrología & Amor',
      description: 'Una velada mágica observando la luna con chocolate caliente y abrazos infinitos.',
      icon: '🚀',
    },
  ],
  themeColor: 'purple',
};

export const defaultVintageData: RomanticPageData = {
  id: 'polaroid-memories-demo',
  recipientName: 'Sofía',
  senderName: 'Carlos',
  coupleTitle: 'Carlos & Sofía',
  envelopeTitle: 'Álbum Polaroid Vintage de:',
  envelopeSubtitle: 'Toca el obturador de la cámara retro para revelar nuestras fotos inolvidables 📸✨',
  anniversaryDate: '2023-11-05',
  loveLetterTitle: 'Carta Guardada en el Álbum Retro',
  loveLetterBody: `Mirar nuestras fotografías en papel es como volver a vivir cada sonrisa, cada abrazo y cada momento mágico capturado en el tiempo.

Dicen que una imagen vale más que mil palabras, pero nuestro amor va mucho más allá de lo que cualquier lente puede capturar. Gracias por ser la protagonista de mi mejor historia. Te amo infinitamente.`,
  questionTitle: '¿Te gustaría seguir llenando este álbum de fotos a mi lado?',
  yesButtonText: '¡Sí, mi amor para siempre! 📸❤️',
  yesResponseSubtitle: '¡Prometo capturar los mejores momentos de nuestra vida juntos cada día! 📸✨',
  audioTitle: 'Completamente Enamorados',
  audioArtist: 'Chayanne',
  audioUrl: 'https://www.youtube.com/watch?v=XXeoQXXDUMk',
  photos: [
    {
      id: 'v1',
      url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
      caption: 'Nuestra primera captura Polaroid retro 📸',
    },
    {
      id: 'v2',
      url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80',
      caption: 'Paseo vintage de tarde en el parque ☕📜',
    },
    {
      id: 'v3',
      url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80',
      caption: 'Notas a mano grabadas en el alma 💌',
    },
    {
      id: 'v4',
      url: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=1200&q=80',
      caption: 'Risas capturadas en sepia y sol ☀️🎞️',
    },
    {
      id: 'v5',
      url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
      caption: 'Escuchando vinilos y recordando momentos 🎵💿',
    },
  ],
  memories: [
    {
      id: 'vm1',
      date: '05 de Noviembre, 2023',
      title: 'La Primera Foto Polaroid',
      description: 'Nos tomamos nuestra primera foto instantánea y escribimos la fecha al reverso.',
      icon: '📸',
    },
    {
      id: 'vm2',
      date: '25 de Diciembre, 2023',
      title: 'Navidad con Aroma a Café & Vinilos',
      description: 'Pusimos discos antiguos y bailamos suavemente en la sala.',
      icon: '☕',
    },
    {
      id: 'vm3',
      date: '14 de Febrero, 2024',
      title: 'Cartas Escritas a Máquina',
      description: 'Nos regalamos cartas en papel antiguo atadas con hilo rojo.',
      icon: '📜',
    },
  ],
  themeColor: 'gold',
};

export const defaultGiftBoxData: RomanticPageData = {
  id: 'caja-sorpresa-demo',
  recipientName: 'Camila',
  senderName: 'Gabriel',
  coupleTitle: 'Gabriel & Camila',
  envelopeTitle: 'Un Regalo Especial Para:',
  envelopeSubtitle: 'Desata el lazo de la caja para descubrir tu sorpresa de amor 🎁✨',
  anniversaryDate: '2024-05-20',
  loveLetterTitle: 'Carta Escondida en tu Caja de Regalo',
  loveLetterBody: `Esta caja de regalo guarda solo una pequeña parte de todo lo que siento por ti. Cada día a tu lado es una sorpresa llena de risas, complicidad y momentos que jamás olvidaré.

Gracias por hacerme el hombre más afortunado del mundo. Te amo infinitamente y prometo seguir llenando tu vida de regalos, detalles y amor verdadero.`,
  questionTitle: '¿Te gustaría seguir abriendo juntos cada regalo que la vida nos prepare?',
  yesButtonText: '¡Sí, mi regalo eterno! 🎁❤️',
  yesResponseSubtitle: '¡Prometo sorprenderte y hacerte sonreír todos y cada uno de mis días! 💖✨',
  audioTitle: 'Until I Found You',
  audioArtist: 'Stephen Sanchez',
  audioUrl: 'https://www.youtube.com/watch?v=GxldQ9eX2wo',
  photos: [
    {
      id: 'gb1',
      url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
      caption: 'Nuestra primera sorpresa juntos 🎁',
    },
    {
      id: 'gb2',
      url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80',
      caption: 'Abrazos bajo las luces festivas ✨',
    },
    {
      id: 'gb3',
      url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
      caption: 'Celebrando el mejor regalo de mi vida: Tú ❤️',
    },
    {
      id: 'gb4',
      url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80',
      caption: 'Risas sin parar y felicidad pura ✨',
    },
    {
      id: 'gb5',
      url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80',
      caption: 'Un amor que crece cada segundo 💖',
    },
  ],
  memories: [
    {
      id: 'gbm1',
      date: '20 de Mayo, 2024',
      title: 'El Día del Primer Regalo',
      description: 'Nos encontramos para tomar café y nos dimos cuenta de que estábamos hechos el uno para el otro.',
      icon: '🎁',
    },
    {
      id: 'gbm2',
      date: '14 de Febrero, 2025',
      title: 'Sorpresa con Globos & Luces',
      description: 'Una noche inolvidable cenando bajo una lluvia de fuegos artificiales.',
      icon: '🎆',
    },
    {
      id: 'gbm3',
      date: '20 de Mayo, 2025',
      title: 'Nuestro Aniversario Especial',
      description: 'Celebrando nuestro primer año juntos canjeando cupones de amor.',
      icon: '🎟️',
    },
  ],
  vouchers: [
    {
      id: 'v1',
      title: 'Cena Romántica Especial 🍽️',
      description: 'Válido por una cena preparada por mí con tu platillo favorito, velas y vino.',
      icon: '🍽️',
    },
    {
      id: 'v2',
      title: 'Maratón de Pelis & Helado 🍿',
      description: 'Válido por una tarde/noche completa eligiendo tus películas favoritas sin interrupciones.',
      icon: '🍿',
    },
    {
      id: 'v3',
      title: 'Masaje Relajante de 30 Min 💆‍♂️',
      description: 'Válido por una sesión de masajes relajantes con música suave y aromas.',
      icon: '💆‍♀️',
    },
    {
      id: 'v4',
      title: 'Un Deseo Libre Concedido ✨',
      description: 'Válido por cualquier deseo especial que quieras pedirme sin excusas.',
      icon: '✨',
    },
  ],
  themeColor: 'emerald',
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
  {
    id: 'caja-sorpresa',
    title: 'Caja de Regalo 3D & Vales de Amor',
    description: 'Caja sorpresa 3D con lazo desatable, fuegos artificiales, talonario de cupones de amor canjeables y fotos colgadas de luces LED.',
    tag: 'Nuevo & Sorprendente 🎁',
    thumbnailUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
    demoUrl: '/demo/caja-sorpresa',
  },
];
