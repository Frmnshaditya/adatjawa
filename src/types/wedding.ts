export type ThemeId =
  | 'modern-minimalist'
  | 'adat-jawa'
  | 'adat-sunda'
  | 'adat-minang'
  | 'elegant-luxury'
  | 'floral-romantic';

export interface CoupleMember {
  fullName: string;
  nickname: string;
  fatherName: string;
  motherName: string;
  childOrderText: string;
  photo: string;
}

export interface EventSchedule {
  title: string;
  date: string; // YYYY-MM-DD
  timeLabel: string; // e.g. "08:00 - 10:00 WIB"
  startTime24: string; // HH:mm in Asia/Jakarta
  locationName: string;
  address: string;
  mapsQuery: string; // Full Google Maps URL, coordinates "lat,lng", or address
}

export interface WeddingConfig {
  id: string;
  theme: ThemeId;
  domain: string; // e.g. "undangankita.my.id"
  slug: string; // e.g. "aditya-amanda"
  mainDate: string; // YYYY-MM-DD
  coverPhoto: string;
  heroPhoto: string;
  openingText: string;
  groom: CoupleMember;
  bride: CoupleMember;
  akad: EventSchedule;
  resepsi: EventSchedule;
  defaultGuestName: string;
}

export type FrameStyle =
  | 'minimal-arch'
  | 'jawa-joglo'
  | 'sunda-arch'
  | 'minang-gonjong'
  | 'luxury-double'
  | 'floral-oval';

export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  categoryLabel: string;
  shortDescription: string;
  frameStyle: FrameStyle;
  culturalGreeting: string;
  palette: {
    canvasBg: string; // 60% background
    surfaceBg: string; // 30% card/section surface
    surfaceAltBg: string; // subtle alternating band
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    accent: string; // 10% primary button/CTA background
    accentHover: string;
    accentText: string; // text on accent CTA
    accentInk: string; // readable gold/accent ink on light canvas
    borderHairline: string;
    borderAccent: string;
    patternColor: string;
    coverOverlay: string;
  };
  swatchColors: [string, string, string];
}
