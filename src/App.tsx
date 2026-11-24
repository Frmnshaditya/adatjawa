import { useEffect, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { AdminConfigDrawer } from './components/AdminConfigDrawer';
import { CountdownSection } from './components/CountdownSection';
import { CoupleSection } from './components/CoupleSection';
import { CoverSection } from './components/CoverSection';
import { EventSection } from './components/EventSection';
import { HeroSection } from './components/HeroSection';
import { LocationSection } from './components/LocationSection';
import { ShareSection } from './components/ShareSection';
import {
  ThemeAmbientParticles,
  ThemeCrest,
  ThemePatternBackdrop,
} from './components/ThemeOrnaments';
import { WEDDING_THEMES } from './config/themes';
import { DEFAULT_WEDDING_CONFIG } from './config/weddingData';
import { WeddingConfig } from './types/wedding';
import { isRootDomainAccess } from './utils/urlAndTime';

const STORAGE_KEY = 'sakinah_basic_invitation_config_v2';

function loadSavedConfig(): WeddingConfig {
  if (typeof window === 'undefined') return DEFAULT_WEDDING_CONFIG;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_WEDDING_CONFIG;
    const parsed = JSON.parse(raw) as Partial<WeddingConfig>;
    return {
      ...DEFAULT_WEDDING_CONFIG,
      ...parsed,
      groom: {
        ...DEFAULT_WEDDING_CONFIG.groom,
        ...(parsed.groom || {}),
      },
      bride: {
        ...DEFAULT_WEDDING_CONFIG.bride,
        ...(parsed.bride || {}),
      },
      akad: {
        ...DEFAULT_WEDDING_CONFIG.akad,
        ...(parsed.akad || {}),
      },
      resepsi: {
        ...DEFAULT_WEDDING_CONFIG.resepsi,
        ...(parsed.resepsi || {}),
      },
    };
  } catch {
    return DEFAULT_WEDDING_CONFIG;
  }
}

export default function App() {
  const [config, setConfig] = useState<WeddingConfig>(loadSavedConfig);
  const [rawGuestName, setRawGuestName] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    const params = new URLSearchParams(window.location.search);
    return (params.get('to') || params.get('guest') || '').trim();
  });
  const guestName = rawGuestName.trim() || config.defaultGuestName;
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [showShareFeature, setShowShareFeature] = useState<boolean>(() =>
    isRootDomainAccess()
  );
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('admin') === '1';
  });

  const activeTheme =
    WEDDING_THEMES[config.theme] || WEDDING_THEMES['modern-minimalist'];

  useEffect(() => {
    const handlePopState = () => {
      setShowShareFeature(isRootDomainAccess());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // Abaikan jika penyimpanan lokal penuh (misal gambar base64 besar)
    }
  }, [config]);

  useEffect(() => {
    document.title = `The Wedding of ${config.groom.nickname} & ${config.bride.nickname}`;
  }, [config.groom.nickname, config.bride.nickname]);

  const handleOpenInvitation = () => {
    setIsOpened(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateGuestName = (nextName: string) => {
    setRawGuestName(nextName);
  };

  const handleResetConfig = () => {
    setConfig(DEFAULT_WEDDING_CONFIG);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div
      className="min-h-screen w-full relative transition-colors duration-300"
      style={{
        backgroundColor: activeTheme.palette.canvasBg,
        color: activeTheme.palette.textPrimary,
      }}
    >
      <ThemePatternBackdrop theme={activeTheme} />
      <ThemeAmbientParticles theme={activeTheme} />

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <CoverSection
            key="cover"
            config={config}
            theme={activeTheme}
            guestName={guestName}
            onOpenInvitation={handleOpenInvitation}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        ) : (
          <motion.div
            key="main-invitation"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col min-h-screen"
          >
            {/* Top Bar Contract: Brand wordmark — 4 single-line nav links — 1 primary action */}
            <header
              className="sticky top-0 z-30 h-14 backdrop-blur-md transition-colors"
              style={{
                backgroundColor: `${activeTheme.palette.canvasBg}EB`,
                borderBottom: `1px solid ${activeTheme.palette.borderHairline}`,
              }}
            >
              <div className="max-w-5xl mx-auto h-full px-4 sm:px-8 flex items-center justify-between gap-8">
                <a
                  href="#beranda"
                  className="font-serif text-lg sm:text-xl font-semibold tracking-tight whitespace-nowrap shrink-0"
                  style={{ color: activeTheme.palette.textPrimary }}
                >
                  {config.groom.nickname} &amp; {config.bride.nickname}
                </a>

                <nav
                  className="hidden md:flex items-center gap-6 text-xs font-medium uppercase tracking-[0.14em]"
                  aria-label="Navigasi Undangan"
                >
                  <a
                    href="#mempelai"
                    className="hover:opacity-75 transition-opacity whitespace-nowrap shrink-0"
                    style={{ color: activeTheme.palette.textSecondary }}
                  >
                    Mempelai
                  </a>
                  <a
                    href="#acara"
                    className="hover:opacity-75 transition-opacity whitespace-nowrap shrink-0"
                    style={{ color: activeTheme.palette.textSecondary }}
                  >
                    Acara
                  </a>
                  <a
                    href="#lokasi"
                    className="hover:opacity-75 transition-opacity whitespace-nowrap shrink-0"
                    style={{ color: activeTheme.palette.textSecondary }}
                  >
                    Lokasi
                  </a>
                  {showShareFeature && (
                    <a
                      href="#bagikan"
                      className="hover:opacity-75 transition-opacity whitespace-nowrap shrink-0"
                      style={{ color: activeTheme.palette.textSecondary }}
                    >
                      Bagikan
                    </a>
                  )}
                </nav>

                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(true)}
                  className="inline-flex items-center gap-1.5 min-h-[38px] px-3.5 py-1.5 rounded-lg text-xs font-medium transition-opacity hover:opacity-90 whitespace-nowrap shrink-0 cursor-pointer"
                  style={{
                    backgroundColor: activeTheme.palette.accent,
                    color: activeTheme.palette.accentText,
                  }}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>Tema &amp; Data</span>
                </button>
              </div>
            </header>

            <main className="flex-1">
              <HeroSection config={config} theme={activeTheme} />
              <CoupleSection config={config} theme={activeTheme} />
              <CountdownSection config={config} theme={activeTheme} />
              <EventSection config={config} theme={activeTheme} />
              <LocationSection config={config} theme={activeTheme} />
              {showShareFeature && (
                <ShareSection
                  config={config}
                  theme={activeTheme}
                  currentGuestName={guestName}
                />
              )}
            </main>

            <footer
              className="py-10 px-5 text-center"
              style={{
                borderTop: `1px solid ${activeTheme.palette.borderHairline}`,
                backgroundColor: activeTheme.palette.canvasBg,
              }}
            >
              <div className="max-w-xl mx-auto">
                <ThemeCrest theme={activeTheme} className="mb-3 opacity-80" />
                <p
                  className="font-serif text-2xl sm:text-3xl font-medium mb-2"
                  style={{ color: activeTheme.palette.textPrimary }}
                >
                  {config.groom.nickname} &amp; {config.bride.nickname}
                </p>
                <p
                  className="text-xs sm:text-sm leading-relaxed mb-4"
                  style={{ color: activeTheme.palette.textSecondary }}
                >
                  Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
                  Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
                </p>
                <p className="text-xs" style={{ color: activeTheme.palette.textMuted }}>
                  {config.domain}/{config.slug}
                </p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <AdminConfigDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={config}
        theme={activeTheme}
        guestName={rawGuestName}
        onUpdateConfig={setConfig}
        onUpdateGuestName={handleUpdateGuestName}
        onResetConfig={handleResetConfig}
      />
    </div>
  );
}
