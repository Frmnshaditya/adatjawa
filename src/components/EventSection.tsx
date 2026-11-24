import React from 'react';
import { Calendar, Clock, MapPin, Navigation } from 'lucide-react';
import { motion } from 'motion/react';
import { EventSchedule, ThemeDefinition, WeddingConfig } from '../types/wedding';
import { buildGoogleMapsUrl, formatIndonesianDate } from '../utils/urlAndTime';
import { ThemeDivider } from './ThemeOrnaments';

interface EventSectionProps {
  config: WeddingConfig;
  theme: ThemeDefinition;
}

export const EventSection: React.FC<EventSectionProps> = ({ config, theme }) => {
  const events: Array<{ key: string; label: string; item: EventSchedule }> = [
    { key: 'akad', label: 'Prosesi Pertama', item: config.akad },
    { key: 'resepsi', label: 'Prosesi Kedua', item: config.resepsi },
  ];

  return (
    <section
      id="acara"
      className="py-14 sm:py-20 px-5 sm:px-8"
      style={{ backgroundColor: theme.palette.surfaceAltBg }}
      aria-label="Informasi Acara Pernikahan"
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
            Rangkaian Acara
          </p>
          <h2
            className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-balance"
            style={{ color: theme.palette.textPrimary }}
          >
            Waktu &amp; Pelaksanaan
          </h2>
          <ThemeDivider theme={theme} className="mt-4 mb-0" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {events.map(({ key, label, item }, index) => {
            const mapsUrl = buildGoogleMapsUrl(
              item.mapsQuery,
              item.locationName,
              item.address
            );

            return (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -3 }}
                className="flex flex-col justify-between rounded-2xl p-6 sm:p-8 transition-shadow hover:shadow-md"
                style={{
                  backgroundColor: theme.palette.surfaceBg,
                  border: `1px solid ${theme.palette.borderHairline}`,
                }}
              >
                <div>
                  <p
                    className="text-xs uppercase tracking-[0.2em] font-medium mb-2"
                    style={{ color: theme.palette.accentInk }}
                  >
                    {label}
                  </p>
                  <h3
                    className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight mb-5"
                    style={{ color: theme.palette.textPrimary }}
                  >
                    {item.title}
                  </h3>

                  <div
                    className="h-px w-full mb-6"
                    style={{ backgroundColor: theme.palette.borderHairline }}
                    aria-hidden="true"
                  />

                  <dl className="space-y-4 text-sm sm:text-base">
                    <div className="flex items-start gap-3">
                      <Calendar
                        className="w-4 h-4 mt-1 shrink-0"
                        style={{ color: theme.palette.accentInk }}
                        aria-hidden="true"
                      />
                      <div>
                        <dt
                          className="text-xs uppercase tracking-wider mb-0.5"
                          style={{ color: theme.palette.textMuted }}
                        >
                          Hari &amp; Tanggal
                        </dt>
                        <dd
                          className="font-medium"
                          style={{ color: theme.palette.textPrimary }}
                        >
                          {formatIndonesianDate(item.date)}
                        </dd>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock
                        className="w-4 h-4 mt-1 shrink-0"
                        style={{ color: theme.palette.accentInk }}
                        aria-hidden="true"
                      />
                      <div>
                        <dt
                          className="text-xs uppercase tracking-wider mb-0.5"
                          style={{ color: theme.palette.textMuted }}
                        >
                          Waktu Acara
                        </dt>
                        <dd
                          className="font-medium tabular-nums"
                          style={{ color: theme.palette.textPrimary }}
                        >
                          {item.timeLabel}
                        </dd>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin
                        className="w-4 h-4 mt-1 shrink-0"
                        style={{ color: theme.palette.accentInk }}
                        aria-hidden="true"
                      />
                      <div>
                        <dt
                          className="text-xs uppercase tracking-wider mb-0.5"
                          style={{ color: theme.palette.textMuted }}
                        >
                          Lokasi Acara
                        </dt>
                        <dd
                          className="font-semibold mb-1"
                          style={{ color: theme.palette.textPrimary }}
                        >
                          {item.locationName}
                        </dd>
                        <dd
                          className="text-sm leading-relaxed"
                          style={{ color: theme.palette.textSecondary }}
                        >
                          {item.address}
                        </dd>
                      </div>
                    </div>
                  </dl>
                </div>

                <div className="mt-7 pt-5" style={{ borderTop: `1px solid ${theme.palette.borderHairline}` }}>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-90 active:scale-[0.99] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{
                      backgroundColor: theme.palette.accent,
                      color: theme.palette.accentText,
                    }}
                  >
                    <Navigation className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Lihat Lokasi</span>
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
