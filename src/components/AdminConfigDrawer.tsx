import React, { useState } from 'react';
import {
  Check,
  Copy,
  Download,
  RotateCcw,
  Share2,
  Upload,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { DEFAULT_WEDDING_CONFIG } from '../config/weddingData';
import { ThemeDefinition, WeddingConfig } from '../types/wedding';
import {
  buildCustomMyIdUrl,
  buildLivePreviewUrl,
  buildWhatsAppShareUrl,
} from '../utils/urlAndTime';
import { ThemeSelector } from './ThemeSelector';

interface AdminConfigDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: WeddingConfig;
  theme: ThemeDefinition;
  guestName: string;
  onUpdateConfig: (next: WeddingConfig) => void;
  onUpdateGuestName: (nextGuestName: string) => void;
  onResetConfig: () => void;
}

type AdminTab = 'umum' | 'mempelai' | 'acara' | 'tamu';

export const AdminConfigDrawer: React.FC<AdminConfigDrawerProps> = ({
  isOpen,
  onClose,
  config,
  theme,
  guestName,
  onUpdateConfig,
  onUpdateGuestName,
  onResetConfig,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('umum');
  const [copiedMyId, setCopiedMyId] = useState(false);
  const [copiedLive, setCopiedLive] = useState(false);

  const handleFileUpload = (
    file: File | undefined,
    onResult: (dataUrl: string) => void
  ) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onResult(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `undangan-${config.slug || 'data'}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const myIdUrl = buildCustomMyIdUrl(config.domain, config.slug, guestName);
  const liveUrl = buildLivePreviewUrl(config.slug, guestName);

  const copyText = async (text: string, which: 'myid' | 'live') => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const input = document.createElement('input');
      input.value = text;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
    if (which === 'myid') {
      setCopiedMyId(true);
      window.setTimeout(() => setCopiedMyId(false), 2000);
    } else {
      setCopiedLive(true);
      window.setTimeout(() => setCopiedLive(false), 2000);
    }
  };

  const inputStyle: React.CSSProperties = {
    backgroundColor: theme.palette.canvasBg,
    border: `1px solid ${theme.palette.borderHairline}`,
    color: theme.palette.textPrimary,
  };

  const labelClass = 'block text-xs font-medium uppercase tracking-wider mb-1.5';

  const tabs: Array<{ id: AdminTab; label: string }> = [
    { id: 'umum', label: 'Umum & Tema' },
    { id: 'mempelai', label: 'Mempelai' },
    { id: 'acara', label: 'Acara & Maps' },
    { id: 'tamu', label: 'Tamu & Link' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="admin-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label="Pengaturan Data Undangan"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            key="admin-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl h-full flex flex-col shadow-2xl overflow-hidden"
            style={{
              backgroundColor: theme.palette.surfaceBg,
              color: theme.palette.textPrimary,
            }}
          >
        {/* Header Drawer */}
        <div
          className="flex items-center justify-between gap-4 px-5 py-4 shrink-0"
          style={{ borderBottom: `1px solid ${theme.palette.borderHairline}` }}
        >
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold leading-tight">
              Pengaturan Data Undangan
            </h2>
            <p className="text-xs mt-0.5" style={{ color: theme.palette.textMuted }}>
              Perubahan tersimpan otomatis dan langsung tampil pada undangan.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup pengaturan"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg transition-colors cursor-pointer"
            style={{
              backgroundColor: theme.palette.canvasBg,
              color: theme.palette.textPrimary,
            }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div
          className="flex items-center gap-1 px-5 py-2.5 overflow-x-auto shrink-0"
          style={{
            backgroundColor: theme.palette.canvasBg,
            borderBottom: `1px solid ${theme.palette.borderHairline}`,
          }}
        >
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className="min-h-[40px] px-3.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                style={{
                  backgroundColor: active ? theme.palette.accent : 'transparent',
                  color: active
                    ? theme.palette.accentText
                    : theme.palette.textSecondary,
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Body Form */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {activeTab === 'umum' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold mb-3">
                  Pilih Tema &amp; Adat Pernikahan
                </h3>
                <ThemeSelector
                  selectedThemeId={config.theme}
                  activeTheme={theme}
                  onSelectTheme={(nextTheme) =>
                    onUpdateConfig({ ...config, theme: nextTheme })
                  }
                />
              </div>

              <div
                className="h-px"
                style={{ backgroundColor: theme.palette.borderHairline }}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="cfg-domain"
                    className={labelClass}
                    style={{ color: theme.palette.textMuted }}
                  >
                    Domain Undangan (.my.id)
                  </label>
                  <input
                    id="cfg-domain"
                    type="text"
                    value={config.domain}
                    onChange={(e) =>
                      onUpdateConfig({ ...config, domain: e.target.value })
                    }
                    placeholder="undangankita.my.id"
                    className="w-full min-h-[44px] px-3.5 py-2 rounded-lg text-sm"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label
                    htmlFor="cfg-slug"
                    className={labelClass}
                    style={{ color: theme.palette.textMuted }}
                  >
                    Slug URL Mempelai
                  </label>
                  <input
                    id="cfg-slug"
                    type="text"
                    value={config.slug}
                    onChange={(e) =>
                      onUpdateConfig({ ...config, slug: e.target.value })
                    }
                    placeholder="naufal-amanda"
                    className="w-full min-h-[44px] px-3.5 py-2 rounded-lg text-sm"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="cfg-main-date"
                  className={labelClass}
                  style={{ color: theme.palette.textMuted }}
                >
                  Tanggal Pernikahan Utama
                </label>
                <input
                  id="cfg-main-date"
                  type="date"
                  value={config.mainDate}
                  onChange={(e) =>
                    onUpdateConfig({ ...config, mainDate: e.target.value })
                  }
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-lg text-sm"
                  style={inputStyle}
                />
              </div>

              <div>
                <label
                  htmlFor="cfg-opening"
                  className={labelClass}
                  style={{ color: theme.palette.textMuted }}
                >
                  Kalimat Pembuka Romantis
                </label>
                <textarea
                  id="cfg-opening"
                  rows={3}
                  value={config.openingText}
                  onChange={(e) =>
                    onUpdateConfig({ ...config, openingText: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg text-sm leading-relaxed"
                  style={inputStyle}
                />
              </div>

              {/* Foto Cover & Foto Hero */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="cfg-cover-photo"
                    className={labelClass}
                    style={{ color: theme.palette.textMuted }}
                  >
                    Foto Sampul (Cover)
                  </label>
                  <input
                    id="cfg-cover-photo"
                    type="text"
                    value={config.coverPhoto}
                    onChange={(e) =>
                      onUpdateConfig({ ...config, coverPhoto: e.target.value })
                    }
                    className="w-full min-h-[44px] px-3 py-2 rounded-lg text-xs mb-2"
                    style={inputStyle}
                  />
                  <label
                    className="inline-flex items-center gap-2 min-h-[40px] px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer"
                    style={{
                      backgroundColor: theme.palette.surfaceAltBg,
                      color: theme.palette.textPrimary,
                    }}
                  >
                    <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Unggah Foto Cover</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) =>
                        handleFileUpload(e.target.files?.[0], (url) =>
                          onUpdateConfig({ ...config, coverPhoto: url })
                        )
                      }
                    />
                  </label>
                </div>

                <div>
                  <label
                    htmlFor="cfg-hero-photo"
                    className={labelClass}
                    style={{ color: theme.palette.textMuted }}
                  >
                    Foto Utama (Hero)
                  </label>
                  <input
                    id="cfg-hero-photo"
                    type="text"
                    value={config.heroPhoto}
                    onChange={(e) =>
                      onUpdateConfig({ ...config, heroPhoto: e.target.value })
                    }
                    className="w-full min-h-[44px] px-3 py-2 rounded-lg text-xs mb-2"
                    style={inputStyle}
                  />
                  <label
                    className="inline-flex items-center gap-2 min-h-[40px] px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer"
                    style={{
                      backgroundColor: theme.palette.surfaceAltBg,
                      color: theme.palette.textPrimary,
                    }}
                  >
                    <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Unggah Foto Utama</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) =>
                        handleFileUpload(e.target.files?.[0], (url) =>
                          onUpdateConfig({ ...config, heroPhoto: url })
                        )
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'mempelai' && (
            <div className="space-y-8">
              {/* Mempelai Pria */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-semibold">
                  Informasi Mempelai Pria
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="groom-fullname"
                      className={labelClass}
                      style={{ color: theme.palette.textMuted }}
                    >
                      Nama Lengkap Pria
                    </label>
                    <input
                      id="groom-fullname"
                      type="text"
                      value={config.groom.fullName}
                      onChange={(e) =>
                        onUpdateConfig({
                          ...config,
                          groom: { ...config.groom, fullName: e.target.value },
                        })
                      }
                      className="w-full min-h-[44px] px-3.5 py-2 rounded-lg text-sm"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="groom-nickname"
                      className={labelClass}
                      style={{ color: theme.palette.textMuted }}
                    >
                      Nama Panggilan Pria
                    </label>
                    <input
                      id="groom-nickname"
                      type="text"
                      value={config.groom.nickname}
                      onChange={(e) =>
                        onUpdateConfig({
                          ...config,
                          groom: { ...config.groom, nickname: e.target.value },
                        })
                      }
                      className="w-full min-h-[44px] px-3.5 py-2 rounded-lg text-sm"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="groom-father"
                      className={labelClass}
                      style={{ color: theme.palette.textMuted }}
                    >
                      Nama Ayah Pria
                    </label>
                    <input
                      id="groom-father"
                      type="text"
                      value={config.groom.fatherName}
                      onChange={(e) =>
                        onUpdateConfig({
                          ...config,
                          groom: { ...config.groom, fatherName: e.target.value },
                        })
                      }
                      className="w-full min-h-[44px] px-3.5 py-2 rounded-lg text-sm"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="groom-mother"
                      className={labelClass}
                      style={{ color: theme.palette.textMuted }}
                    >
                      Nama Ibu Pria
                    </label>
                    <input
                      id="groom-mother"
                      type="text"
                      value={config.groom.motherName}
                      onChange={(e) =>
                        onUpdateConfig({
                          ...config,
                          groom: { ...config.groom, motherName: e.target.value },
                        })
                      }
                      className="w-full min-h-[44px] px-3.5 py-2 rounded-lg text-sm"
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="groom-photo"
                    className={labelClass}
                    style={{ color: theme.palette.textMuted }}
                  >
                    URL / Upload Foto Pria
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <input
                      id="groom-photo"
                      type="text"
                      value={config.groom.photo}
                      onChange={(e) =>
                        onUpdateConfig({
                          ...config,
                          groom: { ...config.groom, photo: e.target.value },
                        })
                      }
                      className="flex-1 min-w-[200px] min-h-[44px] px-3 py-2 rounded-lg text-xs"
                      style={inputStyle}
                    />
                    <label
                      className="inline-flex items-center gap-2 min-h-[44px] px-3.5 py-2 rounded-lg text-xs font-medium cursor-pointer"
                      style={{
                        backgroundColor: theme.palette.surfaceAltBg,
                        color: theme.palette.textPrimary,
                      }}
                    >
                      <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Unggah</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) =>
                          handleFileUpload(e.target.files?.[0], (url) =>
                            onUpdateConfig({
                              ...config,
                              groom: { ...config.groom, photo: url },
                            })
                          )
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div
                className="h-px"
                style={{ backgroundColor: theme.palette.borderHairline }}
              />

              {/* Mempelai Wanita */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-semibold">
                  Informasi Mempelai Wanita
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="bride-fullname"
                      className={labelClass}
                      style={{ color: theme.palette.textMuted }}
                    >
                      Nama Lengkap Wanita
                    </label>
                    <input
                      id="bride-fullname"
                      type="text"
                      value={config.bride.fullName}
                      onChange={(e) =>
                        onUpdateConfig({
                          ...config,
                          bride: { ...config.bride, fullName: e.target.value },
                        })
                      }
                      className="w-full min-h-[44px] px-3.5 py-2 rounded-lg text-sm"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="bride-nickname"
                      className={labelClass}
                      style={{ color: theme.palette.textMuted }}
                    >
                      Nama Panggilan Wanita
                    </label>
                    <input
                      id="bride-nickname"
                      type="text"
                      value={config.bride.nickname}
                      onChange={(e) =>
                        onUpdateConfig({
                          ...config,
                          bride: { ...config.bride, nickname: e.target.value },
                        })
                      }
                      className="w-full min-h-[44px] px-3.5 py-2 rounded-lg text-sm"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="bride-father"
                      className={labelClass}
                      style={{ color: theme.palette.textMuted }}
                    >
                      Nama Ayah Wanita
                    </label>
                    <input
                      id="bride-father"
                      type="text"
                      value={config.bride.fatherName}
                      onChange={(e) =>
                        onUpdateConfig({
                          ...config,
                          bride: { ...config.bride, fatherName: e.target.value },
                        })
                      }
                      className="w-full min-h-[44px] px-3.5 py-2 rounded-lg text-sm"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="bride-mother"
                      className={labelClass}
                      style={{ color: theme.palette.textMuted }}
                    >
                      Nama Ibu Wanita
                    </label>
                    <input
                      id="bride-mother"
                      type="text"
                      value={config.bride.motherName}
                      onChange={(e) =>
                        onUpdateConfig({
                          ...config,
                          bride: { ...config.bride, motherName: e.target.value },
                        })
                      }
                      className="w-full min-h-[44px] px-3.5 py-2 rounded-lg text-sm"
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="bride-photo"
                    className={labelClass}
                    style={{ color: theme.palette.textMuted }}
                  >
                    URL / Upload Foto Wanita
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <input
                      id="bride-photo"
                      type="text"
                      value={config.bride.photo}
                      onChange={(e) =>
                        onUpdateConfig({
                          ...config,
                          bride: { ...config.bride, photo: e.target.value },
                        })
                      }
                      className="flex-1 min-w-[200px] min-h-[44px] px-3 py-2 rounded-lg text-xs"
                      style={inputStyle}
                    />
                    <label
                      className="inline-flex items-center gap-2 min-h-[44px] px-3.5 py-2 rounded-lg text-xs font-medium cursor-pointer"
                      style={{
                        backgroundColor: theme.palette.surfaceAltBg,
                        color: theme.palette.textPrimary,
                      }}
                    >
                      <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Unggah</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) =>
                          handleFileUpload(e.target.files?.[0], (url) =>
                            onUpdateConfig({
                              ...config,
                              bride: { ...config.bride, photo: url },
                            })
                          )
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'acara' && (
            <div className="space-y-8">
              {/* Akad Nikah */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-semibold">Akad Nikah</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label
                      htmlFor="akad-date"
                      className={labelClass}
                      style={{ color: theme.palette.textMuted }}
                    >
                      Tanggal Akad
                    </label>
                    <input
                      id="akad-date"
                      type="date"
                      value={config.akad.date}
                      onChange={(e) =>
                        onUpdateConfig({
                          ...config,
                          akad: { ...config.akad, date: e.target.value },
                        })
                      }
                      className="w-full min-h-[44px] px-3 py-2 rounded-lg text-sm"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="akad-start"
                      className={labelClass}
                      style={{ color: theme.palette.textMuted }}
                    >
                      Jam Mulai (WIB)
                    </label>
                    <input
                      id="akad-start"
                      type="time"
                      value={config.akad.startTime24}
                      onChange={(e) =>
                        onUpdateConfig({
                          ...config,
                          akad: { ...config.akad, startTime24: e.target.value },
                        })
                      }
                      className="w-full min-h-[44px] px-3 py-2 rounded-lg text-sm"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="akad-label"
                      className={labelClass}
                      style={{ color: theme.palette.textMuted }}
                    >
                      Teks Jam Acara
                    </label>
                    <input
                      id="akad-label"
                      type="text"
                      value={config.akad.timeLabel}
                      onChange={(e) =>
                        onUpdateConfig({
                          ...config,
                          akad: { ...config.akad, timeLabel: e.target.value },
                        })
                      }
                      className="w-full min-h-[44px] px-3 py-2 rounded-lg text-sm"
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="akad-loc"
                    className={labelClass}
                    style={{ color: theme.palette.textMuted }}
                  >
                    Nama Lokasi Akad
                  </label>
                  <input
                    id="akad-loc"
                    type="text"
                    value={config.akad.locationName}
                    onChange={(e) =>
                      onUpdateConfig({
                        ...config,
                        akad: { ...config.akad, locationName: e.target.value },
                      })
                    }
                    className="w-full min-h-[44px] px-3.5 py-2 rounded-lg text-sm"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label
                    htmlFor="akad-addr"
                    className={labelClass}
                    style={{ color: theme.palette.textMuted }}
                  >
                    Alamat Lengkap Akad
                  </label>
                  <textarea
                    id="akad-addr"
                    rows={2}
                    value={config.akad.address}
                    onChange={(e) =>
                      onUpdateConfig({
                        ...config,
                        akad: { ...config.akad, address: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-lg text-sm"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label
                    htmlFor="akad-maps"
                    className={labelClass}
                    style={{ color: theme.palette.textMuted }}
                  >
                    Link Google Maps / Koordinat Akad
                  </label>
                  <input
                    id="akad-maps"
                    type="text"
                    value={config.akad.mapsQuery}
                    onChange={(e) =>
                      onUpdateConfig({
                        ...config,
                        akad: { ...config.akad, mapsQuery: e.target.value },
                      })
                    }
                    placeholder="URL Google Maps atau -6.244179,106.798505"
                    className="w-full min-h-[44px] px-3.5 py-2 rounded-lg text-xs"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div
                className="h-px"
                style={{ backgroundColor: theme.palette.borderHairline }}
              />

              {/* Resepsi */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-semibold">
                  Resepsi Pernikahan
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label
                      htmlFor="resepsi-date"
                      className={labelClass}
                      style={{ color: theme.palette.textMuted }}
                    >
                      Tanggal Resepsi
                    </label>
                    <input
                      id="resepsi-date"
                      type="date"
                      value={config.resepsi.date}
                      onChange={(e) =>
                        onUpdateConfig({
                          ...config,
                          resepsi: { ...config.resepsi, date: e.target.value },
                        })
                      }
                      className="w-full min-h-[44px] px-3 py-2 rounded-lg text-sm"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="resepsi-start"
                      className={labelClass}
                      style={{ color: theme.palette.textMuted }}
                    >
                      Jam Mulai (WIB)
                    </label>
                    <input
                      id="resepsi-start"
                      type="time"
                      value={config.resepsi.startTime24}
                      onChange={(e) =>
                        onUpdateConfig({
                          ...config,
                          resepsi: {
                            ...config.resepsi,
                            startTime24: e.target.value,
                          },
                        })
                      }
                      className="w-full min-h-[44px] px-3 py-2 rounded-lg text-sm"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="resepsi-label"
                      className={labelClass}
                      style={{ color: theme.palette.textMuted }}
                    >
                      Teks Jam Acara
                    </label>
                    <input
                      id="resepsi-label"
                      type="text"
                      value={config.resepsi.timeLabel}
                      onChange={(e) =>
                        onUpdateConfig({
                          ...config,
                          resepsi: {
                            ...config.resepsi,
                            timeLabel: e.target.value,
                          },
                        })
                      }
                      className="w-full min-h-[44px] px-3 py-2 rounded-lg text-sm"
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="resepsi-loc"
                    className={labelClass}
                    style={{ color: theme.palette.textMuted }}
                  >
                    Nama Lokasi Resepsi
                  </label>
                  <input
                    id="resepsi-loc"
                    type="text"
                    value={config.resepsi.locationName}
                    onChange={(e) =>
                      onUpdateConfig({
                        ...config,
                        resepsi: {
                          ...config.resepsi,
                          locationName: e.target.value,
                        },
                      })
                    }
                    className="w-full min-h-[44px] px-3.5 py-2 rounded-lg text-sm"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label
                    htmlFor="resepsi-addr"
                    className={labelClass}
                    style={{ color: theme.palette.textMuted }}
                  >
                    Alamat Lengkap Resepsi
                  </label>
                  <textarea
                    id="resepsi-addr"
                    rows={2}
                    value={config.resepsi.address}
                    onChange={(e) =>
                      onUpdateConfig({
                        ...config,
                        resepsi: {
                          ...config.resepsi,
                          address: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-lg text-sm"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label
                    htmlFor="resepsi-maps"
                    className={labelClass}
                    style={{ color: theme.palette.textMuted }}
                  >
                    Link Google Maps / Koordinat Resepsi
                  </label>
                  <input
                    id="resepsi-maps"
                    type="text"
                    value={config.resepsi.mapsQuery}
                    onChange={(e) =>
                      onUpdateConfig({
                        ...config,
                        resepsi: {
                          ...config.resepsi,
                          mapsQuery: e.target.value,
                        },
                      })
                    }
                    placeholder="URL Google Maps atau -6.244179,106.798505"
                    className="w-full min-h-[44px] px-3.5 py-2 rounded-lg text-xs"
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tamu' && (
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="cfg-guest-preview"
                  className={labelClass}
                  style={{ color: theme.palette.textMuted }}
                >
                  Nama Tamu Undangan (Preview &amp; Parameter ?to=)
                </label>
                <input
                  id="cfg-guest-preview"
                  type="text"
                  value={guestName}
                  onChange={(e) => onUpdateGuestName(e.target.value)}
                  placeholder="Contoh: Naufal atau Tamu Undangan"
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-lg text-sm"
                  style={inputStyle}
                />
                <p className="text-xs mt-1.5" style={{ color: theme.palette.textMuted }}>
                  Kosongkan untuk menampilkan &ldquo;{DEFAULT_WEDDING_CONFIG.defaultGuestName}&rdquo;.
                </p>
              </div>

              {/* Link Format .my.id */}
              <div
                className="rounded-xl p-4 space-y-3"
                style={{
                  backgroundColor: theme.palette.canvasBg,
                  border: `1px solid ${theme.palette.borderHairline}`,
                }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider">
                  Tautan Domain .my.id Siap Sebar
                </p>
                <p
                  className="text-xs break-all select-all"
                  style={{ color: theme.palette.textSecondary }}
                >
                  {myIdUrl}
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => copyText(myIdUrl, 'myid')}
                    className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-lg text-xs font-medium cursor-pointer"
                    style={{
                      backgroundColor: theme.palette.surfaceBg,
                      border: `1px solid ${theme.palette.borderHairline}`,
                    }}
                  >
                    {copiedMyId ? (
                      <>
                        <Check className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Salin Link .my.id</span>
                      </>
                    )}
                  </button>
                  <a
                    href={buildWhatsAppShareUrl(myIdUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-lg text-xs font-medium"
                    style={{
                      backgroundColor: theme.palette.accent,
                      color: theme.palette.accentText,
                    }}
                  >
                    <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Kirim via WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Link Aktif Preview */}
              <div
                className="rounded-xl p-4 space-y-3"
                style={{
                  backgroundColor: theme.palette.canvasBg,
                  border: `1px solid ${theme.palette.borderHairline}`,
                }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider">
                  Tautan Uji Coba Aktif (Browser Saat Ini)
                </p>
                <p
                  className="text-xs break-all select-all"
                  style={{ color: theme.palette.textSecondary }}
                >
                  {liveUrl}
                </p>
                <button
                  type="button"
                  onClick={() => copyText(liveUrl, 'live')}
                  className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-lg text-xs font-medium cursor-pointer"
                  style={{
                    backgroundColor: theme.palette.surfaceBg,
                    border: `1px solid ${theme.palette.borderHairline}`,
                  }}
                >
                  {copiedLive ? (
                    <>
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Salin Link Preview</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Drawer */}
        <div
          className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 shrink-0"
          style={{
            backgroundColor: theme.palette.canvasBg,
            borderTop: `1px solid ${theme.palette.borderHairline}`,
          }}
        >
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onResetConfig}
              className="inline-flex items-center gap-1.5 min-h-[42px] px-3.5 py-2 rounded-lg text-xs font-medium cursor-pointer"
              style={{
                backgroundColor: theme.palette.surfaceBg,
                border: `1px solid ${theme.palette.borderHairline}`,
                color: theme.palette.textSecondary,
              }}
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset Contoh</span>
            </button>
            <button
              type="button"
              onClick={handleExportJson}
              className="inline-flex items-center gap-1.5 min-h-[42px] px-3.5 py-2 rounded-lg text-xs font-medium cursor-pointer"
              style={{
                backgroundColor: theme.palette.surfaceBg,
                border: `1px solid ${theme.palette.borderHairline}`,
                color: theme.palette.textSecondary,
              }}
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Export JSON</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center min-h-[42px] px-5 py-2 rounded-lg text-xs font-semibold cursor-pointer"
            style={{
              backgroundColor: theme.palette.accent,
              color: theme.palette.accentText,
            }}
          >
            Selesai &amp; Terapkan
          </button>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
