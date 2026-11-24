import React from 'react';
import { MailOpen, SlidersHorizontal } from 'lucide-react';
import { motion } from 'motion/react';
import { ThemeDefinition, WeddingConfig } from '../types/wedding';
import { formatIndonesianDate } from '../utils/urlAndTime';
import { ResilientImage } from './ResilientImage';
import { ThemeCrest, ThemePhotoFrame } from './ThemeOrnaments';

interface CoverSectionProps {
  config: WeddingConfig;
  theme: ThemeDefinition;
  guestName: string;
  onOpenInvitation: () => void;
  onOpenSettings: () => void;
}

export const CoverSection: React.FC<CoverSectionProps> = ({
  config,
  theme,
  guestName,
  onOpenInvitation,
  onOpenSettings,
}) => {
  const formattedDate = formatIndonesianDate(config.mainDate);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03, y: -16 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-screen w-full flex flex-col items-center justify-between px-5 py-8 sm:py-12 overflow-hidden"
      style={{
        backgroundColor: theme.palette.canvasBg,
        color: theme.palette.textPrimary,
      }}
      aria-label="Halaman Pembuka Undangan"
    >
      {/* Background Foto Halus */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <ResilientImage
          src={config.coverPhoto}
          alt={`Foto ${config.groom.nickname} dan ${config.bride.nickname}`}
          className="w-full h-full object-cover opacity-20 scale-105"
          accentColor={theme.palette.accentInk}
          surfaceColor={theme.palette.surfaceAltBg}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${theme.palette.coverOverlay} 0%, ${theme.palette.canvasBg} 65%, ${theme.palette.coverOverlay} 100%)`,
          }}
        />
      </motion.div>

      {/* Bingkai Halus Tepi */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 sm:inset-6 rounded-2xl z-10"
        style={{ border: `1px solid ${theme.palette.borderHairline}` }}
      />

      {/* Top Spacer / Quick Theme & Config Trigger untuk Admin/Penjual */}
      <div className="relative z-20 w-full max-w-4xl flex items-center justify-end">
        <button
          type="button"
          onClick={onOpenSettings}
          className="inline-flex items-center gap-2 min-h-[44px] px-3.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{
            color: theme.palette.textSecondary,
            backgroundColor: theme.palette.surfaceBg,
            border: `1px solid ${theme.palette.borderHairline}`,
          }}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Tema &amp; Pengaturan</span>
        </button>
      </div>

      {/* Konten Utama Cover */}
      <div className="relative z-20 w-full max-w-lg mx-auto flex flex-col items-center text-center my-auto py-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <ThemeCrest theme={theme} className="mb-3" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-sm uppercase tracking-[0.26em] font-medium mb-3"
          style={{ color: theme.palette.accentInk }}
        >
          The Wedding Of
        </motion.p>

        {/* Foto Preview Mempelai di Cover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          <ThemePhotoFrame theme={theme} className="w-40 h-52 sm:w-48 sm:h-60 mb-5">
            <ResilientImage
              src={config.coverPhoto}
              alt={`Potret ${config.groom.nickname} dan ${config.bride.nickname}`}
              className="w-full h-full object-cover object-center"
              fallbackLabel={`${config.groom.nickname} & ${config.bride.nickname}`}
              accentColor={theme.palette.accentInk}
              surfaceColor={theme.palette.surfaceAltBg}
            />
          </ThemePhotoFrame>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.1] mb-2 text-balance"
          style={{ color: theme.palette.textPrimary }}
        >
          {config.groom.nickname} &amp; {config.bride.nickname}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base font-normal tracking-wide mb-6"
          style={{ color: theme.palette.textSecondary }}
        >
          {formattedDate}
        </motion.p>

        {/* Kotak Kepada Yth. Tamu Undangan */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm rounded-xl px-6 py-4 mb-6"
          style={{
            backgroundColor: theme.palette.surfaceBg,
            border: `1px solid ${theme.palette.borderHairline}`,
          }}
        >
          <p
            className="text-xs leading-relaxed mb-1"
            style={{ color: theme.palette.textMuted }}
          >
            Kepada Yth. Bapak/Ibu/Saudara/i
          </p>
          <p
            className="font-serif text-xl sm:text-2xl font-semibold tracking-tight break-words"
            style={{ color: theme.palette.textPrimary }}
          >
            {guestName}
          </p>
        </motion.div>

        <motion.button
          type="button"
          onClick={onOpenInvitation}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-7 py-3 rounded-lg text-sm font-medium tracking-wide transition-shadow duration-200 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 shadow-sm hover:shadow-md"
          style={{
            backgroundColor: theme.palette.accent,
            color: theme.palette.accentText,
          }}
        >
          <MailOpen className="w-4 h-4" aria-hidden="true" />
          <span>Buka Undangan</span>
        </motion.button>
      </div>

      {/* Footer kecil pada cover */}
      <div className="relative z-20 text-center pt-2">
        <p className="text-xs" style={{ color: theme.palette.textMuted }}>
          {config.domain}/{config.slug}
        </p>
      </div>
    </motion.section>
  );
};
