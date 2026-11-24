import React from 'react';
import { ExternalLink, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { ThemeDefinition, WeddingConfig } from '../types/wedding';
import { buildGoogleMapsUrl } from '../utils/urlAndTime';

interface LocationSectionProps {
  config: WeddingConfig;
  theme: ThemeDefinition;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  config,
  theme,
}) => {
  const akadMapsUrl = buildGoogleMapsUrl(
    config.akad.mapsQuery,
    config.akad.locationName,
    config.akad.address
  );
  const resepsiMapsUrl = buildGoogleMapsUrl(
    config.resepsi.mapsQuery,
    config.resepsi.locationName,
    config.resepsi.address
  );
  const sameVenue =
    config.akad.locationName === config.resepsi.locationName &&
    config.akad.address === config.resepsi.address;

  return (
    <section
      id="lokasi"
      className="py-14 sm:py-20 px-5 sm:px-8"
      aria-label="Penunjuk Lokasi Google Maps"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl p-6 sm:p-10 text-center"
          style={{
            backgroundColor: theme.palette.surfaceBg,
            border: `1px solid ${theme.palette.borderHairline}`,
          }}
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{
              backgroundColor: theme.palette.surfaceAltBg,
              color: theme.palette.accentInk,
            }}
          >
            <MapPin className="w-5 h-5" aria-hidden="true" />
          </motion.div>

          <p
            className="text-xs uppercase tracking-[0.22em] font-medium mb-2"
            style={{ color: theme.palette.accentInk }}
          >
            Petunjuk Arah
          </p>

          <h2
            className="font-serif text-3xl sm:text-4xl font-medium tracking-tight mb-4 text-balance"
            style={{ color: theme.palette.textPrimary }}
          >
            Lokasi Pernikahan
          </h2>

          {sameVenue ? (
            <>
              <p
                className="text-lg font-semibold mb-1"
                style={{ color: theme.palette.textPrimary }}
              >
                {config.resepsi.locationName}
              </p>
              <p
                className="text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-7"
                style={{ color: theme.palette.textSecondary }}
              >
                {config.resepsi.address}
              </p>
              <a
                href={resepsiMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3 rounded-lg text-sm font-medium transition-opacity hover:opacity-90 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  backgroundColor: theme.palette.accent,
                  color: theme.palette.accentText,
                }}
              >
                <span>Lihat Lokasi di Google Maps</span>
                <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 text-left">
              <div
                className="rounded-xl p-5 flex flex-col justify-between"
                style={{
                  backgroundColor: theme.palette.surfaceAltBg,
                  border: `1px solid ${theme.palette.borderHairline}`,
                }}
              >
                <div className="mb-4">
                  <p
                    className="text-xs uppercase tracking-wider font-medium mb-1"
                    style={{ color: theme.palette.accentInk }}
                  >
                    Lokasi Akad Nikah
                  </p>
                  <p
                    className="font-semibold mb-1"
                    style={{ color: theme.palette.textPrimary }}
                  >
                    {config.akad.locationName}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: theme.palette.textSecondary }}
                  >
                    {config.akad.address}
                  </p>
                </div>
                <a
                  href={akadMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90 whitespace-nowrap"
                  style={{
                    backgroundColor: theme.palette.accent,
                    color: theme.palette.accentText,
                  }}
                >
                  <span>Lihat Lokasi</span>
                  <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>
              </div>

              <div
                className="rounded-xl p-5 flex flex-col justify-between"
                style={{
                  backgroundColor: theme.palette.surfaceAltBg,
                  border: `1px solid ${theme.palette.borderHairline}`,
                }}
              >
                <div className="mb-4">
                  <p
                    className="text-xs uppercase tracking-wider font-medium mb-1"
                    style={{ color: theme.palette.accentInk }}
                  >
                    Lokasi Resepsi
                  </p>
                  <p
                    className="font-semibold mb-1"
                    style={{ color: theme.palette.textPrimary }}
                  >
                    {config.resepsi.locationName}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: theme.palette.textSecondary }}
                  >
                    {config.resepsi.address}
                  </p>
                </div>
                <a
                  href={resepsiMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90 whitespace-nowrap"
                  style={{
                    backgroundColor: theme.palette.accent,
                    color: theme.palette.accentText,
                  }}
                >
                  <span>Lihat Lokasi</span>
                  <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
