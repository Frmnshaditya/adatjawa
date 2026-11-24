import React, { useState } from 'react';
import { Check, Copy, Link2, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import { ThemeDefinition, WeddingConfig } from '../types/wedding';
import {
  buildLivePreviewUrl,
  buildWhatsAppShareUrl,
} from '../utils/urlAndTime';

interface ShareSectionProps {
  config: WeddingConfig;
  theme: ThemeDefinition;
  currentGuestName: string;
}

export const ShareSection: React.FC<ShareSectionProps> = ({
  config,
  theme,
  currentGuestName,
}) => {
  const [targetGuest, setTargetGuest] = useState<string>(
    currentGuestName === config.defaultGuestName ? '' : currentGuestName
  );
  const [copied, setCopied] = useState<boolean>(false);

  const activeShareUrl = buildLivePreviewUrl(config.slug, targetGuest);
  const whatsappUrl = buildWhatsAppShareUrl(activeShareUrl);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeShareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback jika clipboard API dibatasi browser
      const input = document.createElement('input');
      input.value = activeShareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section
      id="bagikan"
      className="py-14 sm:py-20 px-5 sm:px-8"
      style={{ backgroundColor: theme.palette.surfaceAltBg }}
      aria-label="Bagikan Undangan"
    >
      <div className="max-w-2xl mx-auto">
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
          <p
            className="text-xs uppercase tracking-[0.22em] font-medium mb-2"
            style={{ color: theme.palette.accentInk }}
          >
            Bagikan Kabar Bahagia
          </p>
          <h2
            className="font-serif text-3xl sm:text-4xl font-medium tracking-tight mb-3 text-balance"
            style={{ color: theme.palette.textPrimary }}
          >
            Kirim Link Undangan
          </h2>
          <p
            className="text-sm leading-relaxed mb-6"
            style={{ color: theme.palette.textSecondary }}
          >
            Bagikan undangan pernikahan melalui WhatsApp atau salin tautan untuk
            dikirimkan kepada kerabat dan sahabat.
          </p>

          {/* Input Nama Tamu Opsional */}
          <div className="text-left mb-4">
            <label
              htmlFor="share-guest-name"
              className="block text-xs font-medium uppercase tracking-wider mb-1.5"
              style={{ color: theme.palette.textMuted }}
            >
              Nama Tamu Tujuan (Opsional)
            </label>
            <input
              id="share-guest-name"
              type="text"
              value={targetGuest}
              onChange={(e) => setTargetGuest(e.target.value)}
              placeholder="Contoh: Bapak Budi Santoso"
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg text-sm outline-none transition-colors"
              style={{
                backgroundColor: theme.palette.canvasBg,
                border: `1px solid ${theme.palette.borderHairline}`,
                color: theme.palette.textPrimary,
              }}
            />
          </div>

          {/* Preview Box Link */}
          <div
            className="flex items-center gap-2 rounded-lg px-3.5 py-3 mb-6 text-left"
            style={{
              backgroundColor: theme.palette.canvasBg,
              border: `1px solid ${theme.palette.borderHairline}`,
            }}
          >
            <Link2
              className="w-4 h-4 shrink-0"
              style={{ color: theme.palette.accentInk }}
              aria-hidden="true"
            />
            <span
              className="text-xs sm:text-sm truncate select-all flex-1"
              style={{ color: theme.palette.textSecondary }}
            >
              {activeShareUrl}
            </span>
          </div>

          {/* Tombol Aksi Berbagi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-lg text-sm font-medium transition-opacity hover:opacity-90 whitespace-nowrap"
              style={{
                backgroundColor: theme.palette.accent,
                color: theme.palette.accentText,
              }}
            >
              <Share2 className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Bagikan via WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer"
              style={{
                backgroundColor: theme.palette.surfaceBg,
                color: theme.palette.textPrimary,
                border: `1px solid ${theme.palette.borderAccent}`,
              }}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Link Tersalin</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Salin Link Undangan</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
