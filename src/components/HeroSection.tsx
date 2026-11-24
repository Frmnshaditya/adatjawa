import React from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { ThemeDefinition, WeddingConfig } from '../types/wedding';
import { formatIndonesianDate } from '../utils/urlAndTime';
import { ResilientImage } from './ResilientImage';
import { ThemeCrest, ThemeDivider } from './ThemeOrnaments';

interface HeroSectionProps {
  config: WeddingConfig;
  theme: ThemeDefinition;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config, theme }) => {
  const formattedDate = formatIndonesianDate(config.mainDate);

  return (
    <section
      id="beranda"
      className="relative pt-14 pb-16 sm:pt-20 sm:pb-24 px-5 sm:px-8"
      aria-label="Pembukaan Undangan"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <ThemeCrest theme={theme} className="mb-4" />

          <p
            className="text-xs sm:text-sm tracking-[0.2em] uppercase font-medium mb-3"
            style={{ color: theme.palette.accentInk }}
          >
            {theme.culturalGreeting}
          </p>

          <h2
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.12] mb-4 text-balance"
            style={{ color: theme.palette.textPrimary }}
          >
            {config.groom.fullName} &amp; {config.bride.fullName}
          </h2>

          <div
            className="inline-flex items-center justify-center gap-2 text-sm sm:text-base font-medium mb-8"
            style={{ color: theme.palette.textSecondary }}
          >
            <Calendar className="w-4 h-4 shrink-0" style={{ color: theme.palette.accentInk }} aria-hidden="true" />
            <span>{formattedDate}</span>
          </div>
        </motion.div>

        {/* Foto Utama Mempelai */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-3xl mx-auto mb-10 rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/9]"
          style={{
            border: `1px solid ${theme.palette.borderAccent}`,
            backgroundColor: theme.palette.surfaceAltBg,
          }}
        >
          <motion.div
            initial={{ scale: 1.07 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            <ResilientImage
              src={config.heroPhoto}
              alt={`Foto pernikahan ${config.groom.fullName} dan ${config.bride.fullName}`}
              className="w-full h-full object-cover object-center"
              fallbackLabel={`${config.groom.nickname} & ${config.bride.nickname}`}
              accentColor={theme.palette.accentInk}
              surfaceColor={theme.palette.surfaceAltBg}
            />
          </motion.div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-2 sm:inset-3 rounded-xl"
            style={{ border: '1px solid rgba(255, 255, 255, 0.45)' }}
          />
        </motion.div>

        <ThemeDivider theme={theme} />

        {/* Kalimat Pembuka Romantis */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mx-auto font-serif italic text-lg sm:text-xl md:text-2xl leading-relaxed"
          style={{ color: theme.palette.textSecondary }}
        >
          &ldquo;{config.openingText}&rdquo;
        </motion.p>
      </div>
    </section>
  );
};
