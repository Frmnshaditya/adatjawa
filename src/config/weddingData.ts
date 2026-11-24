import { WeddingConfig } from '../types/wedding';

export const PRESET_PHOTOS = {
  cover: '/src/assets/images/wedding_couple_cover_1795516301016.jpg',
  hero: '/src/assets/images/wedding_couple_hero_1795516301020.jpg',
  groom: '/src/assets/images/groom_portrait_1795516301997.jpg',
  bride: '/src/assets/images/bride_portrait_1795516302548.jpg',
};

/**
 * Konfigurasi Data Undangan Pelanggan (Terpisah dari komponen UI)
 * Struktur ini siap diintegrasikan langsung dengan database/API dashboard admin
 * maupun diperbarui melalui Panel Pengaturan Undangan di aplikasi.
 */
export const DEFAULT_WEDDING_CONFIG: WeddingConfig = {
  id: 'basic-aditya-amanda',
  theme: 'modern-minimalist',
  domain: 'undangankita.my.id',
  slug: 'aditya-amanda',
  mainDate: '2026-12-20',
  coverPhoto: PRESET_PHOTOS.cover,
  heroPhoto: PRESET_PHOTOS.hero,
  openingText:
    'Atas rahmat Tuhan Yang Maha Esa, kami bermaksud menyelenggarakan pernikahan putra-putri kami.',
  groom: {
    fullName: 'Aditya Firmansah',
    nickname: 'Aditya',
    fatherName: 'Bpk. Hendra Firmansah',
    motherName: 'Ibu Sri Rahayu',
    childOrderText: 'Putra Pertama dari',
    photo: PRESET_PHOTOS.groom,
  },
  bride: {
    fullName: 'Amanda Putri',
    nickname: 'Amanda',
    fatherName: 'Bpk. Darmawan Putra',
    motherName: 'Ibu Ratna Sari',
    childOrderText: 'Putri Kedua dari',
    photo: PRESET_PHOTOS.bride,
  },
  akad: {
    title: 'Akad Nikah',
    date: '2026-12-20',
    timeLabel: '08:00 - 10:00 WIB',
    startTime24: '08:00',
    locationName: 'Gedung Pernikahan',
    address: 'Jl. Melati Raya No. 28, Kebayoran Baru, Jakarta Selatan',
    mapsQuery: 'https://www.google.com/maps/search/?api=1&query=-6.244179,106.798505',
  },
  resepsi: {
    title: 'Resepsi Pernikahan',
    date: '2026-12-20',
    timeLabel: '11:00 - 14:00 WIB',
    startTime24: '11:00',
    locationName: 'Gedung Pernikahan',
    address: 'Jl. Melati Raya No. 28, Kebayoran Baru, Jakarta Selatan',
    mapsQuery: 'https://www.google.com/maps/search/?api=1&query=-6.244179,106.798505',
  },
  defaultGuestName: 'Tamu Undangan',
};
