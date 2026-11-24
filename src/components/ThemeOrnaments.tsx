import React from 'react';
import { motion } from 'motion/react';
import { ThemeDefinition } from '../types/wedding';

interface OrnamentProps {
  theme: ThemeDefinition;
  className?: string;
}

/**
 * Partikel halus dekoratif (kelopak bunga / kilau emas) yang bergerak sangat pelan
 */
export const ThemeAmbientParticles: React.FC<{ theme: ThemeDefinition }> = ({
  theme,
}) => {
  const particles = [
    { left: '8%', top: '18%', size: 6, duration: 9, delay: 0 },
    { left: '22%', top: '65%', size: 5, duration: 11, delay: 1.5 },
    { left: '42%', top: '28%', size: 4, duration: 10, delay: 0.8 },
    { left: '68%', top: '20%', size: 6, duration: 12, delay: 2.1 },
    { left: '84%', top: '52%', size: 5, duration: 9.5, delay: 0.4 },
    { left: '91%', top: '80%', size: 6, duration: 11.5, delay: 1.8 },
    { left: '15%', top: '86%', size: 4, duration: 10.5, delay: 2.6 },
    { left: '56%', top: '74%', size: 5, duration: 12.5, delay: 1.1 },
  ];

  const isFloral =
    theme.id === 'floral-romantic' || theme.id === 'adat-sunda';

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {particles.map((p, idx) => (
        <motion.span
          key={idx}
          className="absolute block"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: isFloral ? p.size * 1.4 : p.size,
            borderRadius: isFloral ? '60% 40% 60% 40%' : '9999px',
            backgroundColor: theme.palette.borderAccent,
            opacity: 0.22,
          }}
          animate={{
            y: [0, -18, 0],
            x: [0, idx % 2 === 0 ? 8 : -8, 0],
            opacity: [0.12, 0.28, 0.12],
            rotate: isFloral ? [0, 35, 0] : [0, 0, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

/**
 * Pola latar belakang halus yang menyesuaikan identitas budaya / gaya masing-masing tema
 */
export const ThemePatternBackdrop: React.FC<OrnamentProps> = ({ theme }) => {
  const color = theme.palette.patternColor;

  if (theme.id === 'adat-jawa') {
    // Motif Batik Kawung geometris halus
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.045]"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'>
              <g fill='none' stroke='${color}' stroke-width='1'>
                <ellipse cx='32' cy='16' rx='8' ry='14'/>
                <ellipse cx='32' cy='48' rx='8' ry='14'/>
                <ellipse cx='16' cy='32' rx='14' ry='8'/>
                <ellipse cx='48' cy='32' rx='14' ry='8'/>
                <circle cx='32' cy='32' r='3'/>
              </g>
            </svg>`
          )}")`,
          backgroundSize: '64px 64px',
        }}
      />
    );
  }

  if (theme.id === 'adat-sunda') {
    // Motif Kembang Melati / Mega Mendung lembut
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.045]"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'>
              <g fill='none' stroke='${color}' stroke-width='1'>
                <path d='M36 14 C42 22, 42 30, 36 36 C30 30, 30 22, 36 14Z'/>
                <path d='M36 36 C42 42, 42 50, 36 58 C30 50, 30 42, 36 36Z'/>
                <path d='M14 36 C22 30, 30 30, 36 36 C30 42, 22 42, 14 36Z'/>
                <path d='M36 36 C42 30, 50 30, 58 36 C50 42, 42 42, 36 36Z'/>
                <circle cx='36' cy='36' r='2.5'/>
              </g>
            </svg>`
          )}")`,
          backgroundSize: '72px 72px',
        }}
      />
    );
  }

  if (theme.id === 'adat-minang') {
    // Motif Songket Pucuk Rebung / Belah Ketupat Minangkabau
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.045]"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'>
              <g fill='none' stroke='${color}' stroke-width='1'>
                <polygon points='28,4 52,28 28,52 4,28'/>
                <polygon points='28,13 43,28 28,43 13,28'/>
                <line x1='28' y1='4' x2='28' y2='13'/>
                <line x1='28' y1='43' x2='28' y2='52'/>
                <line x1='4' y1='28' x2='13' y2='28'/>
                <line x1='43' y1='28' x2='52' y2='28'/>
              </g>
            </svg>`
          )}")`,
          backgroundSize: '56px 56px',
        }}
      />
    );
  }

  if (theme.id === 'floral-romantic') {
    // Motif garis botani lembut
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'>
              <g fill='none' stroke='${color}' stroke-width='0.9'>
                <circle cx='40' cy='40' r='5'/>
                <path d='M40 24 Q46 32 40 35 Q34 32 40 24Z'/>
                <path d='M40 56 Q46 48 40 45 Q34 48 40 56Z'/>
                <path d='M24 40 Q32 34 35 40 Q32 46 24 40Z'/>
                <path d='M56 40 Q48 34 45 40 Q48 46 56 40Z'/>
              </g>
            </svg>`
          )}")`,
          backgroundSize: '80px 80px',
        }}
      />
    );
  }

  if (theme.id === 'elegant-luxury') {
    // Motif grid berlian halus bergaya art-deco klasik
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'>
              <g fill='none' stroke='${color}' stroke-width='0.75'>
                <path d='M24 0 L48 24 L24 48 L0 24 Z'/>
                <circle cx='24' cy='24' r='2'/>
              </g>
            </svg>`
          )}")`,
          backgroundSize: '48px 48px',
        }}
      />
    );
  }

  // Modern Minimalist: Clean organic paper grain / subtle hairlines
  return null;
};

/**
 * Ornamen puncak (Crest) unik per tema dengan animasi bernapas ringan
 */
export const ThemeCrest: React.FC<OrnamentProps> = ({ theme, className = '' }) => {
  const stroke = theme.palette.borderAccent;

  const renderSvg = () => {
    if (theme.id === 'adat-jawa') {
      return (
        <svg
          viewBox="0 0 120 72"
          className={`w-24 h-14 mx-auto ${className}`}
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M60 6 C72 20, 92 38, 96 62 L24 62 C28 38, 48 20, 60 6 Z"
            stroke={stroke}
            strokeWidth="1.4"
          />
          <path
            d="M60 15 C68 26, 80 40, 84 58 L36 58 C40 40, 52 26, 60 15 Z"
            stroke={stroke}
            strokeWidth="1"
            opacity="0.7"
          />
          <line x1="60" y1="18" x2="60" y2="62" stroke={stroke} strokeWidth="1" />
          <path d="M46 46 Q60 36 74 46" stroke={stroke} strokeWidth="1" />
          <path d="M50 34 Q60 27 70 34" stroke={stroke} strokeWidth="1" />
          <circle cx="60" cy="6" r="2.2" fill={stroke} />
        </svg>
      );
    }

    if (theme.id === 'adat-sunda') {
      return (
        <svg
          viewBox="0 0 140 60"
          className={`w-28 h-12 mx-auto ${className}`}
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M16 48 Q40 44 55 24 Q60 10 70 8 Q80 10 85 24 Q100 44 124 48"
            stroke={stroke}
            strokeWidth="1.4"
          />
          <path
            d="M32 48 Q52 44 70 20 Q88 44 108 48"
            stroke={stroke}
            strokeWidth="1"
            opacity="0.75"
          />
          <circle cx="70" cy="8" r="2.5" fill={stroke} />
          <circle cx="54" cy="24" r="1.8" fill={stroke} />
          <circle cx="86" cy="24" r="1.8" fill={stroke} />
          <path d="M36 52 H104" stroke={stroke} strokeWidth="0.9" opacity="0.6" />
        </svg>
      );
    }

    if (theme.id === 'adat-minang') {
      return (
        <svg
          viewBox="0 0 140 60"
          className={`w-28 h-12 mx-auto ${className}`}
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M14 14 Q36 44 70 30 Q104 44 126 14"
            stroke={stroke}
            strokeWidth="1.5"
          />
          <path
            d="M28 20 Q48 48 70 36 Q92 48 112 20"
            stroke={stroke}
            strokeWidth="1"
            opacity="0.7"
          />
          <polygon points="70,12 76,20 70,28 64,20" stroke={stroke} strokeWidth="1.2" />
          <path d="M32 48 H108" stroke={stroke} strokeWidth="1" opacity="0.7" />
        </svg>
      );
    }

    if (theme.id === 'floral-romantic') {
      return (
        <svg
          viewBox="0 0 140 52"
          className={`w-28 h-11 mx-auto ${className}`}
          fill="none"
          aria-hidden="true"
        >
          <path d="M24 34 Q46 28 62 28" stroke={stroke} strokeWidth="1" />
          <path d="M116 34 Q94 28 78 28" stroke={stroke} strokeWidth="1" />
          <circle cx="70" cy="26" r="6" stroke={stroke} strokeWidth="1.2" />
          <path d="M70 14 C75 18, 75 23, 70 26 C65 23, 65 18, 70 14Z" stroke={stroke} strokeWidth="1" />
          <path d="M56 26 C60 21, 64 21, 67 26 C64 31, 60 31, 56 26Z" stroke={stroke} strokeWidth="1" />
          <path d="M84 26 C80 21, 76 21, 73 26 C76 31, 80 31, 84 26Z" stroke={stroke} strokeWidth="1" />
          <path d="M38 30 Q43 22 48 27" stroke={stroke} strokeWidth="1" />
          <path d="M102 30 Q97 22 92 27" stroke={stroke} strokeWidth="1" />
        </svg>
      );
    }

    if (theme.id === 'elegant-luxury') {
      return (
        <svg
          viewBox="0 0 140 48"
          className={`w-28 h-10 mx-auto ${className}`}
          fill="none"
          aria-hidden="true"
        >
          <line x1="16" y1="24" x2="54" y2="24" stroke={stroke} strokeWidth="1" />
          <line x1="86" y1="24" x2="124" y2="24" stroke={stroke} strokeWidth="1" />
          <polygon points="70,10 84,24 70,38 56,24" stroke={stroke} strokeWidth="1.2" />
          <polygon points="70,16 78,24 70,32 62,24" stroke={stroke} strokeWidth="0.9" opacity="0.7" />
          <circle cx="70" cy="24" r="2" fill={stroke} />
        </svg>
      );
    }

    return (
      <svg
        viewBox="0 0 120 32"
        className={`w-24 h-7 mx-auto ${className}`}
        fill="none"
        aria-hidden="true"
      >
        <line x1="12" y1="16" x2="48" y2="16" stroke={stroke} strokeWidth="1" />
        <polygon points="60,9 67,16 60,23 53,16" stroke={stroke} strokeWidth="1.1" />
        <line x1="72" y1="16" x2="108" y2="16" stroke={stroke} strokeWidth="1" />
      </svg>
    );
  };

  return (
    <motion.div
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {renderSvg()}
    </motion.div>
  );
};

/**
 * Pembatas antar bagian (Section Divider) sesuai tema dengan animasi muncul halus
 */
export const ThemeDivider: React.FC<OrnamentProps> = ({ theme, className = '' }) => {
  const stroke = theme.palette.borderAccent;
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.85 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-center justify-center gap-3 my-6 ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-12 sm:w-20" style={{ backgroundColor: theme.palette.borderHairline }} />
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        {theme.id === 'floral-romantic' || theme.id === 'adat-sunda' ? (
          <path
            d="M12 4 C14.5 7.5, 14.5 10.5, 12 12 C9.5 10.5, 9.5 7.5, 12 4 Z M12 12 C14.5 13.5, 14.5 16.5, 12 20 C9.5 16.5, 9.5 13.5, 12 12 Z M4 12 C7.5 9.5, 10.5 9.5, 12 12 C10.5 14.5, 7.5 14.5, 4 12 Z M12 12 C13.5 9.5, 16.5 9.5, 20 12 C16.5 14.5, 13.5 14.5, 12 12 Z"
            stroke={stroke}
            strokeWidth="1.2"
          />
        ) : (
          <polygon points="12,4 20,12 12,20 4,12" stroke={stroke} strokeWidth="1.2" />
        )}
      </svg>
      <span className="h-px w-12 sm:w-20" style={{ backgroundColor: theme.palette.borderHairline }} />
    </motion.div>
  );
};

/**
 * Bingkai Foto Tematik — mengubah bentuk & aksen frame foto berdasarkan tema aktif
 */
export const ThemePhotoFrame: React.FC<{
  theme: ThemeDefinition;
  children: React.ReactNode;
  className?: string;
}> = ({ theme, children, className = '' }) => {
  const borderColor = theme.palette.borderAccent;

  const radiusClass = (() => {
    switch (theme.frameStyle) {
      case 'minimal-arch':
      case 'sunda-arch':
        return 'rounded-t-full rounded-b-2xl';
      case 'floral-oval':
        return 'rounded-full';
      case 'jawa-joglo':
        return 'rounded-t-[48%] rounded-b-lg';
      case 'minang-gonjong':
        return 'rounded-t-3xl rounded-b-xl';
      case 'luxury-double':
        return 'rounded-t-[120px] rounded-b-md';
      default:
        return 'rounded-2xl';
    }
  })();

  return (
    <div className={`relative p-2 sm:p-2.5 ${className}`}>
      {/* Outer hairline / double border */}
      <div
        className={`relative overflow-hidden ${radiusClass} transition-all duration-300`}
        style={{
          border: `1px solid ${borderColor}`,
          boxShadow:
            theme.frameStyle === 'luxury-double'
              ? `0 0 0 4px ${theme.palette.canvasBg}, 0 0 0 5px ${theme.palette.borderHairline}`
              : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
};
