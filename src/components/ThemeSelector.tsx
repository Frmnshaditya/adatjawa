import React from 'react';
import { Check } from 'lucide-react';
import { THEME_LIST } from '../config/themes';
import { ThemeDefinition, ThemeId } from '../types/wedding';

interface ThemeSelectorProps {
  selectedThemeId: ThemeId;
  activeTheme: ThemeDefinition;
  onSelectTheme: (id: ThemeId) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  selectedThemeId,
  activeTheme,
  onSelectTheme,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Pilih Tema Undangan">
      {THEME_LIST.map((item) => {
        const isSelected = item.id === selectedThemeId;
        return (
          <button
            key={item.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelectTheme(item.id)}
            className="text-left rounded-xl p-3.5 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              backgroundColor: isSelected
                ? activeTheme.palette.surfaceAltBg
                : activeTheme.palette.surfaceBg,
              border: isSelected
                ? `2px solid ${activeTheme.palette.accent}`
                : `1px solid ${activeTheme.palette.borderHairline}`,
            }}
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div>
                <p
                  className="text-sm font-semibold leading-tight"
                  style={{ color: activeTheme.palette.textPrimary }}
                >
                  {item.name}
                </p>
                <p
                  className="text-[11px] mt-0.5"
                  style={{ color: activeTheme.palette.textMuted }}
                >
                  {item.categoryLabel}
                </p>
              </div>
              {isSelected && (
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: activeTheme.palette.accent,
                    color: activeTheme.palette.accentText,
                  }}
                >
                  <Check className="w-3 h-3" aria-hidden="true" />
                </span>
              )}
            </div>

            <p
              className="text-xs leading-relaxed mb-3"
              style={{ color: activeTheme.palette.textSecondary }}
            >
              {item.shortDescription}
            </p>

            {/* Color Swatches */}
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {item.swatchColors.map((hex, idx) => (
                <span
                  key={idx}
                  className="w-4 h-4 rounded-full border border-black/15"
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
          </button>
        );
      })}
    </div>
  );
};
