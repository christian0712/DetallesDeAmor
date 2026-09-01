import { Order, RomanticPageData, OrderStatus, PaymentMethod, PaymentMethodsConfig, AdminSong } from '@/types';
import { defaultRomanticData } from '@/lib/defaultData';
import {
  saveOrderToSupabase,
  fetchOrderFromSupabase,
  fetchAllOrdersFromSupabase,
  deleteOrderFromSupabase,
  savePaymentConfigToSupabase,
  fetchPaymentConfigFromSupabase,
  saveAdminSongsToSupabase,
  fetchAdminSongsFromSupabase,
  deleteAdminSongFromSupabase,
} from '@/lib/supabase';

const ORDERS_KEY = 'detalles_amor_orders';
const PAYMENT_CONFIG_KEY = 'detalles_amor_payment_config';
const ADMIN_SONGS_KEY = 'detalles_amor_admin_songs';

export const defaultAdminSongs: AdminSong[] = [
  {
    id: 'song-1',
    title: 'Perfect',
    artist: 'Ed Sheeran',
    youtubeUrl: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g',
    category: 'Romántico',
    coverUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'song-2',
    title: 'A Thousand Years',
    artist: 'Christina Perri',
    youtubeUrl: 'https://www.youtube.com/watch?v=rtOvBOTyX03',
    category: 'Acústico',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'song-3',
    title: 'Golden Hour',
    artist: 'JVKE',
    youtubeUrl: 'https://www.youtube.com/watch?v=PEM0Vs8jf1w',
    category: 'Violín',
    coverUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'song-4',
    title: 'Until I Found You',
    artist: 'Stephen Sanchez',
    youtubeUrl: 'https://www.youtube.com/watch?v=G7KNmW9a75Y',
    category: 'Romántico',
    coverUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'song-5',
    title: 'Hasta Ese Día',
    artist: 'Lasso',
    youtubeUrl: 'https://www.youtube.com/watch?v=84hVjJ4_X54',
    category: 'Baladas',
    coverUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=300&q=80',
  },
];

export const getAdminSongs = (): AdminSong[] => {
  if (typeof window === 'undefined') return defaultAdminSongs;
  const stored = localStorage.getItem(ADMIN_SONGS_KEY);
  if (!stored) {
    localStorage.setItem(ADMIN_SONGS_KEY, JSON.stringify(defaultAdminSongs));
    return defaultAdminSongs;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return defaultAdminSongs;
  }
};

export const saveAdminSongs = (songs: AdminSong[]): AdminSong[] => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(ADMIN_SONGS_KEY, JSON.stringify(songs));
    window.dispatchEvent(new Event('admin-songs-updated'));
  }
  saveAdminSongsToSupabase(songs).catch((err) =>
    console.error('Supabase admin songs save error:', err)
  );
  return songs;
};

export const defaultPaymentConfig: PaymentMethodsConfig = {
  priceBs: 49,
  priceUsdt: 7,
  qrBolivia: {
    enabled: true,
    qrValue: 'https://qr.simple.bo/pay/detalles-de-amor-49bs',
    qrImageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80',
    holder: 'Detalles de Amor SRL',
    instructions: 'Escanea el código QR desde cualquier aplicación bancaria de Bolivia (BNB, BCP, Mercantil, Bisa, GanaMóvil)',
  },
  bankTransfer: {
    enabled: true,
    instructions: 'Realiza tu transferencia a cualquiera de nuestras cuentas bancarias:',
    accounts: [
      {
        id: 'bank-1',
        bankName: 'Banco Nacional de Bolivia (BNB)',
        accountNumber: '150-09283741',
        accountHolder: 'Detalles de Amor SRL',
        accountType: 'Cuenta Corriente',
      },
      {
        id: 'bank-2',
        bankName: 'Banco de Crédito (BCP)',
        accountNumber: '201-5091823',
        accountHolder: 'Detalles de Amor SRL',
        accountType: 'Cuenta Corriente',
      },
    ],
  },
  binancePay: {
    enabled: true,
    payId: '89230192',
    usdtAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    network: 'BEP20',
  },
};

export const getPaymentConfig = (): PaymentMethodsConfig => {
  if (typeof window === 'undefined') return defaultPaymentConfig;
  const stored = localStorage.getItem(PAYMENT_CONFIG_KEY);
  if (!stored) {
    localStorage.setItem(PAYMENT_CONFIG_KEY, JSON.stringify(defaultPaymentConfig));
    return defaultPaymentConfig;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return defaultPaymentConfig;
  }
};

export const savePaymentConfig = (config: PaymentMethodsConfig): PaymentMethodsConfig => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(PAYMENT_CONFIG_KEY, JSON.stringify(config));
    window.dispatchEvent(new Event('payment-config-updated'));
  }
  savePaymentConfigToSupabase(config).catch((err) =>
    console.error('Supabase payment config save error:', err)
  );
  return config;
};

// Initial orders list (empty by default for production)
const initialOrders: Order[] = [];

export const getStoredOrders = (): Order[] => {
  if (typeof window === 'undefined') return initialOrders;
  const stored = localStorage.getItem(ORDERS_KEY);
  if (!stored) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(initialOrders));
    return initialOrders;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return initialOrders;
  }
};

export const generateFriendlyUserCode = (senderName: string = ''): string => {
  const cleanName = senderName.trim().toUpperCase().replace(/[^A-Z]/g, '').slice(0, 5) || 'AMOR';
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  return `${cleanName}-${randomNumber}`;
};

export const saveOrder = (
  pageData: RomanticPageData,
  phoneNumber: string,
  paymentMethod: PaymentMethod,
  receiptUrl?: string
): Order => {
  const orders = getStoredOrders();
  const paymentConfig = getPaymentConfig();
  const slug = `${pageData.recipientName.toLowerCase()}-y-${pageData.senderName.toLowerCase()}-${Math.floor(1000 + Math.random() * 9000)}`
    .replace(/[^a-z0-9-]/g, '');

  const clientCode = generateFriendlyUserCode(pageData.senderName);

  const newOrder: Order = {
    id: `ord-${Date.now().toString().slice(-6)}`,
    slug,
    clientCode,
    coupleTitle: pageData.coupleTitle || `${pageData.senderName} & ${pageData.recipientName}`,
    recipientName: pageData.recipientName,
    senderName: pageData.senderName,
    phoneNumber,
    paymentMethod,
    receiptUrl: receiptUrl || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    status: 'PENDIENTE',
    createdAt: new Date().toISOString(),
    amountBs: paymentConfig.priceBs || 49,
    amountUsdt: paymentConfig.priceUsdt || 7,
    pageData,
  };

  const updated = [newOrder, ...orders];
  if (typeof window !== 'undefined') {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
  }

  // Asynchronously sync to Supabase Database
  saveOrderToSupabase(newOrder).catch((err) =>
    console.error('Supabase async save error:', err)
  );

  return newOrder;
};

export const approveOrder = (orderId: string, originHost: string = ''): Order | null => {
  const orders = getStoredOrders();
  const index = orders.findIndex((o) => o.id === orderId);
  if (index === -1) return null;

  const order = orders[index];
  const baseUrl = originHost || (typeof window !== 'undefined' ? window.location.origin : '');
  const qrUrl = `${baseUrl}/p/${order.slug}`;

  const updatedOrder: Order = {
    ...order,
    status: 'APROBADO',
    approvedAt: new Date().toISOString(),
    qrUrl,
  };

  orders[index] = updatedOrder;
  if (typeof window !== 'undefined') {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }

  saveOrderToSupabase(updatedOrder).catch((err) =>
    console.error('Supabase async approve error:', err)
  );

  return updatedOrder;
};

export const rejectOrder = (orderId: string): Order | null => {
  const orders = getStoredOrders();
  const index = orders.findIndex((o) => o.id === orderId);
  if (index === -1) return null;

  const updatedOrder: Order = {
    ...orders[index],
    status: 'RECHAZADO',
  };

  orders[index] = updatedOrder;
  if (typeof window !== 'undefined') {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }

  saveOrderToSupabase(updatedOrder).catch((err) =>
    console.error('Supabase async reject error:', err)
  );

  return updatedOrder;
};

export const getOrderBySlug = (slug: string): Order | undefined => {
  const orders = getStoredOrders();
  return orders.find((o) => o.slug === slug || o.id === slug);
};

export const findOrderByClientCodeOrPhone = async (query: string): Promise<Order | null> => {
  const clean = query.trim();
  const cleanLower = clean.toLowerCase();

  // 1. Search local storage first
  const orders = getStoredOrders();
  const localMatch = orders.find(
    (o) =>
      o.phoneNumber === clean ||
      (o.clientCode && o.clientCode.toLowerCase() === cleanLower) ||
      o.id.toLowerCase() === cleanLower ||
      o.slug.toLowerCase() === cleanLower ||
      o.coupleTitle.toLowerCase().includes(cleanLower) ||
      o.recipientName.toLowerCase().includes(cleanLower) ||
      o.senderName.toLowerCase().includes(cleanLower)
  );

  if (localMatch) return localMatch;

  // 2. Fallback search in Supabase
  const remoteMatch = await fetchOrderFromSupabase(clean);
  return remoteMatch;
};

export const deleteOrder = (orderId: string): void => {
  const orders = getStoredOrders();
  const updated = orders.filter((o) => o.id !== orderId);
  if (typeof window !== 'undefined') {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
  }
  deleteOrderFromSupabase(orderId).catch((err) =>
    console.error('Error deleting order from Supabase:', err)
  );
};

export const syncAllAdminDataFromSupabase = async () => {
  try {
    const remoteOrders = await fetchAllOrdersFromSupabase();
    if (remoteOrders && remoteOrders.length > 0) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(ORDERS_KEY, JSON.stringify(remoteOrders));
      }
    }

    const remoteConfig = await fetchPaymentConfigFromSupabase();
    if (remoteConfig) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(PAYMENT_CONFIG_KEY, JSON.stringify(remoteConfig));
        window.dispatchEvent(new Event('payment-config-updated'));
      }
    }

    const remoteSongs = await fetchAdminSongsFromSupabase();
    if (remoteSongs && remoteSongs.length > 0) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(ADMIN_SONGS_KEY, JSON.stringify(remoteSongs));
        window.dispatchEvent(new Event('admin-songs-updated'));
      }
    }
  } catch (err) {
    console.error('Error syncing data from Supabase:', err);
  }
};


