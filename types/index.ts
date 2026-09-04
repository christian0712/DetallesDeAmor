export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
}

export interface MemoryItem {
  id: string;
  date: string;
  title: string;
  description: string;
  icon?: string;
}

export interface LoveVoucherItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
  redeemed?: boolean;
  unlockDate?: string;
}

export interface GiftBoxSurpriseItem {
  id: string;
  title: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  surpriseText: string;
  icon?: string;
}

export interface RomanticPageData {
  id: string;
  recipientName: string;
  senderName: string;
  coupleTitle: string; // e.g. "Carlos & Sofía"
  anniversaryDate: string; // ISO date format "YYYY-MM-DD"
  envelopeTitle: string; // e.g. "Para el amor de mi vida"
  envelopeSubtitle: string; // e.g. "Haz clic para abrir este mensaje especial"
  loveLetterTitle: string; // e.g. "Mi amor verdadero"
  loveLetterBody: string;
  questionTitle: string; // e.g. "¿Te gustaría seguir escribiendo nuestra historia juntos?"
  yesButtonText: string; // e.g. "¡Sí, mi amor, siempre! ❤️"
  yesResponseSubtitle: string; // e.g. "¡Prometo hacerte sonreír cada uno de mis días!"
  audioTitle: string;
  audioArtist: string;
  audioUrl: string; // MP3 URL or audio source
  photos: PhotoItem[];
  memories: MemoryItem[];
  vouchers?: LoveVoucherItem[];
  giftSurprises?: GiftBoxSurpriseItem[];
  themeColor: 'rose' | 'wine' | 'purple' | 'gold' | 'emerald';
}

export interface TemplateInfo {
  id: string;
  title: string;
  description: string;
  tag: string;
  thumbnailUrl: string;
  demoUrl: string;
  popular?: boolean;
}

export type PaymentMethod = 'qr_bolivia' | 'bank_transfer' | 'binance_pay';
export type OrderStatus = 'PENDIENTE' | 'APROBADO' | 'RECHAZADO';

export interface AdminSong {
  id: string;
  title: string;
  artist: string;
  youtubeUrl: string;
  category?: string;
  coverUrl?: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder?: string;
  accountType?: string;
}

export interface PaymentMethodsConfig {
  priceBs: number;
  priceUsdt: number;
  qrBolivia: {
    enabled: boolean;
    qrValue: string;
    qrImageUrl?: string;
    holder: string;
    instructions: string;
  };
  bankTransfer: {
    enabled: boolean;
    instructions: string;
    accounts: BankAccount[];
  };
  binancePay: {
    enabled: boolean;
    payId: string;
    usdtAddress: string;
    network: string;
  };
}

export interface Order {
  id: string;
  slug: string;
  clientCode?: string;
  coupleTitle: string;
  recipientName: string;
  senderName: string;
  phoneNumber: string;
  paymentMethod: PaymentMethod;
  receiptUrl?: string;
  status: OrderStatus;
  createdAt: string;
  approvedAt?: string;
  pageData: RomanticPageData;
  qrUrl?: string;
  amountBs: number;
  amountUsdt: number;
}
