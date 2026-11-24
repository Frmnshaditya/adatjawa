export interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isEventStarted: boolean;
}

const INDONESIAN_DAYS = [
  'Minggu',
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu',
];

const INDONESIAN_MONTHS = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

/**
 * Format YYYY-MM-DD ke format tanggal Indonesia: "Minggu, 20 Desember 2026"
 */
export function formatIndonesianDate(dateStr: string): string {
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr || 'Tanggal Belum Diatur';
  }
  const [year, month, day] = dateStr.split('-').map(Number);
  // Gunakan midday UTC agar tidak bergeser hari karena timezone lokal browser
  const dateObj = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const dayName = INDONESIAN_DAYS[dateObj.getUTCDay()];
  const monthName = INDONESIAN_MONTHS[dateObj.getUTCMonth()];
  return `${dayName}, ${day} ${monthName} ${year}`;
}

/**
 * Hitung mundur real-time berbasis zona waktu Asia/Jakarta (UTC+7).
 */
export function getJakartaCountdown(
  dateStr: string,
  time24Str: string = '08:00'
): CountdownResult {
  const safeDate = /^\d{4}-\d{2}-\d{2}$/.test(dateStr) ? dateStr : '2026-12-20';
  const safeTime = /^\d{2}:\d{2}$/.test(time24Str) ? time24Str : '08:00';

  // Anchor eksplisit ke +07:00 (Asia/Jakarta)
  const targetTimestamp = new Date(`${safeDate}T${safeTime}:00+07:00`).getTime();
  const nowTimestamp = Date.now();
  const diff = targetTimestamp - nowTimestamp;

  if (Number.isNaN(targetTimestamp) || diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isEventStarted: true,
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    isEventStarted: false,
  };
}

/**
 * Mengambil nama tamu dari parameter URL (?to=Nama+Tamu atau ?guest=...).
 * Jika tidak tersedia, mengembalikan fallback ("Tamu Undangan").
 */
export function getGuestNameFromUrl(fallback: string = 'Tamu Undangan'): string {
  if (typeof window === 'undefined') return fallback;
  const params = new URLSearchParams(window.location.search);
  const raw = params.get('to') || params.get('guest') || '';
  const cleaned = raw.trim();
  return cleaned.length > 0 ? cleaned : fallback;
}

/**
 * Membangun URL Google Maps yang valid dan siap dibuka dari smartphone maupun desktop.
 */
export function buildGoogleMapsUrl(
  mapsQuery: string,
  locationName: string,
  address: string
): string {
  const trimmed = (mapsQuery || '').trim();

  if (
    trimmed.startsWith('https://maps.google.com') ||
    trimmed.startsWith('https://www.google.com/maps') ||
    trimmed.startsWith('https://goo.gl/maps') ||
    trimmed.startsWith('https://maps.app.goo.gl')
  ) {
    return trimmed;
  }

  // Jika user memasukkan koordinat misalnya "-6.244179, 106.798505"
  if (/^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/.test(trimmed)) {
    const cleanCoords = trimmed.replace(/\s+/g, '');
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cleanCoords)}`;
  }

  const queryText = trimmed || [locationName, address].filter(Boolean).join(', ');
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(queryText)}`;
}

/**
 * Membuat URL undangan dengan format domain .my.id (contoh: https://undangankita.my.id/aditya-amanda?to=Aditya)
 */
export function buildCustomMyIdUrl(
  domain: string,
  slug: string,
  guestName?: string
): string {
  const cleanDomain = (domain || 'undangankita.my.id')
    .trim()
    .replace(/^https?:\/\//, '')
    .replace(/\/+$/, '');
  const safeDomain = cleanDomain.endsWith('.my.id')
    ? cleanDomain
    : `${cleanDomain}.my.id`;
  const cleanSlug = (slug || 'aditya-amanda')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const base = `https://${safeDomain}/${cleanSlug || 'undangan'}`;
  const cleanGuest = (guestName || '').trim();
  if (!cleanGuest || cleanGuest === 'Tamu Undangan') {
    return base;
  }
  return `${base}?to=${encodeURIComponent(cleanGuest)}`;
}

/**
 * Membuat URL aktif browser saat ini untuk diuji langsung dengan ?to=NamaTamu
 */
export function buildLivePreviewUrl(slug: string, guestName?: string): string {
  if (typeof window === 'undefined') return '';
  const origin = window.location.origin;
  const cleanSlug = (slug || 'aditya-amanda')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  const url = new URL(`${origin}/${cleanSlug}`);
  const cleanGuest = (guestName || '').trim();
  if (cleanGuest && cleanGuest !== 'Tamu Undangan') {
    url.searchParams.set('to', cleanGuest);
  }
  return url.toString();
}

/**
 * Format pesan WhatsApp resmi sesuai spesifikasi produk
 */
export function buildWhatsAppShareUrl(invitationUrl: string): string {
  const message = `Assalamu'alaikum Wr. Wb.

Dengan penuh kebahagiaan, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara pernikahan kami.

Silakan buka undangan melalui link berikut:

${invitationUrl}

Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.

Terima kasih.`;

  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
