import { createClient } from '@supabase/supabase-js';
import { Order, RomanticPageData, PaymentMethodsConfig, AdminSong } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Uploads a photo file (File object or Data URL) to Supabase Storage bucket 'detalles-fotos'
 * under folder `client-[clientCode]/[filename]`.
 * Returns public URL on success, or fallback string.
 */
export async function uploadClientPhotoToSupabase(
  fileOrBase64: File | string,
  clientCode: string,
  filename?: string
): Promise<string> {
  if (!supabase || !isSupabaseConfigured) {
    if (typeof fileOrBase64 === 'string') return fileOrBase64;
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(fileOrBase64 as File);
    });
  }

  try {
    const bucket = 'detalles-fotos';
    const cleanClientFolder = clientCode.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanFileName = filename || `photo-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.jpg`;
    const path = `${cleanClientFolder}/${cleanFileName}`;

    let fileBody: File | Blob;

    if (typeof fileOrBase64 === 'string') {
      if (fileOrBase64.startsWith('http://') || fileOrBase64.startsWith('https://')) {
        return fileOrBase64; // Already remote URL
      }
      // Convert Data URL / Base64 to Blob
      const res = await fetch(fileOrBase64);
      fileBody = await res.blob();
    } else {
      fileBody = fileOrBase64;
    }

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, fileBody, {
        upsert: true,
        contentType: fileBody.type || 'image/jpeg',
      });

    if (error) {
      console.warn('Supabase storage upload error:', error.message);
      return typeof fileOrBase64 === 'string' ? fileOrBase64 : '';
    }

    const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(path);
    return publicUrlData.publicUrl;
  } catch (err) {
    console.error('Failed to upload photo to Supabase:', err);
    return typeof fileOrBase64 === 'string' ? fileOrBase64 : '';
  }
}

/**
 * Saves or updates an order in Supabase database table 'orders'
 */
export async function saveOrderToSupabase(order: Order): Promise<boolean> {
  if (!supabase || !isSupabaseConfigured) {
    return false;
  }

  try {
    const payload = {
      id: order.id,
      slug: order.slug,
      client_code: order.clientCode,
      couple_title: order.coupleTitle,
      recipient_name: order.recipientName,
      sender_name: order.senderName,
      phone_number: order.phoneNumber,
      payment_method: order.paymentMethod,
      receipt_url: order.receiptUrl,
      status: order.status,
      created_at: order.createdAt,
      approved_at: order.approvedAt,
      qr_url: order.qrUrl,
      amount_bs: order.amountBs,
      amount_usdt: order.amountUsdt,
      page_data: order.pageData,
    };

    const { error } = await supabase.from('orders').upsert(payload, { onConflict: 'id' });
    if (error) {
      console.warn('Supabase database order insert warning:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error saving order to Supabase:', err);
    return false;
  }
}

/**
 * Fetches order by clientCode, phoneNumber or slug from Supabase
 */
export async function fetchOrderFromSupabase(query: string): Promise<Order | null> {
  if (!supabase || !isSupabaseConfigured) {
    return null;
  }

  try {
    const clean = query.trim();
    const cleanLower = clean.toLowerCase();

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .or(`client_code.eq.${clean},phone_number.eq.${clean},slug.eq.${cleanLower},id.eq.${clean}`)
      .limit(1);

    if (error || !data || data.length === 0) {
      return null;
    }

    const item = data[0];
    return mapSupabaseOrder(item);
  } catch (err) {
    console.error('Error fetching order from Supabase:', err);
    return null;
  }
}

/**
 * Fetches all orders from Supabase DB (for Admin panel)
 */
export async function fetchAllOrdersFromSupabase(): Promise<Order[]> {
  if (!supabase || !isSupabaseConfigured) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      return [];
    }

    return data.map(mapSupabaseOrder);
  } catch (err) {
    console.error('Error fetching all orders from Supabase:', err);
    return [];
  }
}

/**
 * Deletes an order from Supabase DB
 */
export async function deleteOrderFromSupabase(orderId: string): Promise<boolean> {
  if (!supabase || !isSupabaseConfigured) {
    return false;
  }

  try {
    const { error } = await supabase.from('orders').delete().eq('id', orderId);
    return !error;
  } catch (err) {
    console.error('Error deleting order from Supabase:', err);
    return false;
  }
}

/**
 * Saves payment configuration to Supabase table 'payment_config'
 */
export async function savePaymentConfigToSupabase(config: PaymentMethodsConfig): Promise<boolean> {
  if (!supabase || !isSupabaseConfigured) {
    return false;
  }

  try {
    const payload = {
      id: 'default',
      config,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('payment_config').upsert(payload, { onConflict: 'id' });
    if (error) {
      console.warn('Supabase payment config save error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error saving payment config to Supabase:', err);
    return false;
  }
}

/**
 * Fetches payment configuration from Supabase DB
 */
export async function fetchPaymentConfigFromSupabase(): Promise<PaymentMethodsConfig | null> {
  if (!supabase || !isSupabaseConfigured) {
    return null;
  }

  try {
    const { data, error } = await supabase.from('payment_config').select('*').eq('id', 'default').limit(1);
    if (error || !data || data.length === 0) return null;
    return data[0].config as PaymentMethodsConfig;
  } catch (err) {
    console.error('Error fetching payment config from Supabase:', err);
    return null;
  }
}

/**
 * Saves admin music songs catalog to Supabase table 'admin_songs'
 */
export async function saveAdminSongsToSupabase(songs: AdminSong[]): Promise<boolean> {
  if (!supabase || !isSupabaseConfigured) {
    return false;
  }

  try {
    const payload = songs.map((s) => ({
      id: s.id,
      title: s.title,
      artist: s.artist,
      youtube_url: s.youtubeUrl,
      category: s.category,
      cover_url: s.coverUrl,
    }));

    const { error } = await supabase.from('admin_songs').upsert(payload, { onConflict: 'id' });
    if (error) {
      console.warn('Supabase admin songs save error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error saving admin songs to Supabase:', err);
    return false;
  }
}

/**
 * Fetches admin music songs catalog from Supabase DB
 */
export async function fetchAdminSongsFromSupabase(): Promise<AdminSong[]> {
  if (!supabase || !isSupabaseConfigured) {
    return [];
  }

  try {
    const { data, error } = await supabase.from('admin_songs').select('*').order('created_at', { ascending: true });
    if (error || !data || data.length === 0) return [];
    return data.map((item) => ({
      id: item.id,
      title: item.title,
      artist: item.artist,
      youtubeUrl: item.youtube_url,
      category: item.category,
      coverUrl: item.cover_url,
    }));
  } catch (err) {
    console.error('Error fetching admin songs from Supabase:', err);
    return [];
  }
}

/**
 * Deletes a song from admin music catalog in Supabase DB
 */
export async function deleteAdminSongFromSupabase(songId: string): Promise<boolean> {
  if (!supabase || !isSupabaseConfigured) {
    return false;
  }

  try {
    const { error } = await supabase.from('admin_songs').delete().eq('id', songId);
    return !error;
  } catch (err) {
    console.error('Error deleting song from Supabase:', err);
    return false;
  }
}

// Helper mapper function
function mapSupabaseOrder(item: any): Order {
  return {
    id: item.id,
    slug: item.slug,
    clientCode: item.client_code,
    coupleTitle: item.couple_title,
    recipientName: item.recipient_name,
    senderName: item.sender_name,
    phoneNumber: item.phone_number,
    paymentMethod: item.payment_method,
    receiptUrl: item.receipt_url,
    status: item.status,
    createdAt: item.created_at,
    approvedAt: item.approved_at,
    qrUrl: item.qr_url,
    amountBs: item.amount_bs,
    amountUsdt: item.amount_usdt,
    pageData: item.page_data,
  };
}
