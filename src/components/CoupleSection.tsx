import React from 'react';
import { motion } from 'motion/react';
import { ThemeDefinition, WeddingConfig } from '../types/wedding';
import { ResilientImage } from './ResilientImage';
import { ThemeDivider, ThemePhotoFrame } from './ThemeOrnaments';

interface CoupleSectionProps {
  config: WeddingConfig;
  theme: ThemeDefinition;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({ config, theme }) => {
  const members = [
    {
      role: 'Mempelai Pria',
      data: config.groom,
    },
    {
      role: 'Mempelai Wanita',
      data: config.bride,
    },
  ];

  return (
    <section
      id="mempelai"
      className="py-14 sm:py-20 px-5 sm:px-8"
      style={{ backgroundColor: theme.palette.surfaceAltBg }}
      aria-label="Informasi Kedua Mempelai"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 sm:mb-12"
        >
          <p
            className="text-xs uppercase tracking-[0.22em] font-medium mb-2"
            style={{ color: theme.palette.accentInk }}
          >
            Pasangan Mempelai
          </p>
          <h2
            className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-balance"
            style={{ color: theme.palette.textPrimary }}
          >
            Mempelai yang Berbahagia
          </h2>
          <ThemeDivider theme={theme} className="mt-4 mb-0" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {members.map(({ role, data }, index) => (
            <motion.article
              key={role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.14,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex flex-col items-center text-center rounded-2xl p-6 sm:p-8 transition-colors"
              style={{
                backgroundColor: theme.palette.surfaceBg,
                border: `1px solid ${theme.palette.borderHairline}`,
              }}
            >
              <p
                className="text-xs uppercase tracking-[0.2em] font-medium mb-5"
                style={{ color: theme.palette.accentInk }}
              >
                {role}
              </p>

              <ThemePhotoFrame theme={theme} className="w-48 h-60 sm:w-52 sm:h-64 mb-6">
                <ResilientImage
                  src={data.photo}
                  alt={`Foto ${role} ${data.fullName}`}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  fallbackLabel={data.nickname}
                  accentColor={theme.palette.accentInk}
                  surfaceColor={theme.palette.surfaceAltBg}
                />
              </ThemePhotoFrame>

              <h3
                className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight mb-1 text-balance"
                style={{ color: theme.palette.textPrimary }}
              >
                {data.fullName}
              </h3>

              <p
                className="text-xs font-medium tracking-wider uppercase mb-5"
                style={{ color: theme.palette.textMuted }}
              >
                Panggilan: {data.nickname}
              </p>

              <div
                className="w-12 h-px mb-5"
                style={{ backgroundColor: theme.palette.borderHairline }}
                aria-hidden="true"
              />

              <p
                className="text-xs sm:text-sm mb-1"
                style={{ color: theme.palette.textMuted }}
              >
                {data.childOrderText}
              </p>
              <p
                className="text-sm sm:text-base font-medium leading-relaxed"
                style={{ color: theme.palette.textSecondary }}
              >
                {data.fatherName} &amp; {data.motherName}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
