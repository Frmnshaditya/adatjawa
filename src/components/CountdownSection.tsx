import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { ThemeDefinition, WeddingConfig } from '../types/wedding';
import {
  CountdownResult,
  formatIndonesianDate,
  getJakartaCountdown,
} from '../utils/urlAndTime';

interface CountdownSectionProps {
  config: WeddingConfig;
  theme: ThemeDefinition;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({
  config,
  theme,
}) => {
  const targetDate = config.akad.date || config.mainDate;
  const targetTime = config.akad.startTime24 || '08:00';

  const [countdown, setCountdown] = useState<CountdownResult>(() =>
    getJakartaCountdown(targetDate, targetTime)
  );

  useEffect(() => {
    setCountdown(getJakartaCountdown(targetDate, targetTime));
    const timer = window.setInterval(() => {
      setCountdown(getJakartaCountdown(targetDate, targetTime));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [targetDate, targetTime]);

  const units = [
    { label: 'Hari', value: countdown.days },
    { label: 'Jam', value: countdown.hours },
    { label: 'Menit', value: countdown.minutes },
    { label: 'Detik', value: countdown.seconds },
  ];

  const pad = (val: number) => String(val).padStart(2, '0');

  return (
    <section
      id="countdown"
      className="py-14 sm:py-20 px-5 sm:px-8"
      aria-label="Hitung Mundur Pernikahan"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mx-auto text-center"
      >
        <p
          className="text-xs uppercase tracking-[0.22em] font-medium mb-2"
          style={{ color: theme.palette.accentInk }}
        >
          Menuju Hari Bahagia
        </p>
        <h2
          className="font-serif text-3xl sm:text-4xl font-medium tracking-tight mb-3 text-balance"
          style={{ color: theme.palette.textPrimary }}
        >
          Hitung Mundur Acara
        </h2>
        <p
          className="text-sm mb-8"
          style={{ color: theme.palette.textMuted }}
        >
          {formatIndonesianDate(targetDate)} · {targetTime} WIB (Asia/Jakarta)
        </p>

        {countdown.isEventStarted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl px-6 py-8 sm:py-10 max-w-xl mx-auto"
            style={{
              backgroundColor: theme.palette.surfaceBg,
              border: `1px solid ${theme.palette.borderAccent}`,
            }}
          >
            <Clock
              className="w-6 h-6 mx-auto mb-3"
              style={{ color: theme.palette.accentInk }}
              aria-hidden="true"
            />
            <p
              className="font-serif text-2xl sm:text-3xl font-medium leading-snug"
              style={{ color: theme.palette.textPrimary }}
            >
              Alhamdulillah, hari bahagia telah tiba.
            </p>
          </motion.div>
        ) : (
          <div
            className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-xl mx-auto"
            role="timer"
            aria-live="off"
          >
            {units.map((item, idx) => {
              const displayValue =
                item.label === 'Hari' ? String(item.value) : pad(item.value);
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="rounded-xl py-4 sm:py-6 px-2 flex flex-col items-center justify-center overflow-hidden"
                  style={{
                    backgroundColor: theme.palette.surfaceBg,
                    border: `1px solid ${theme.palette.borderHairline}`,
                  }}
                >
                  <div className="relative h-9 sm:h-12 flex items-center justify-center mb-2">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={displayValue}
                        initial={{ y: -8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 8, opacity: 0 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="font-serif text-3xl sm:text-5xl font-semibold tabular-nums leading-none block"
                        style={{ color: theme.palette.textPrimary }}
                      >
                        {displayValue}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <span
                    className="text-[11px] sm:text-xs uppercase tracking-[0.16em] font-medium"
                    style={{ color: theme.palette.textMuted }}
                  >
                    {item.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </section>
  );
};
