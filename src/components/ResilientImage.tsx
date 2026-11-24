import React, { useState } from 'react';
import { Heart } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  accentColor?: string;
  surfaceColor?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackLabel,
  accentColor = '#8C6B32',
  surfaceColor = '#F4EFE6',
}) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-6 text-center ${className}`}
        style={{
          background: `linear-gradient(135deg, ${surfaceColor} 0%, #FFFFFF 100%)`,
          color: accentColor,
        }}
        role="img"
        aria-label={alt}
      >
        <Heart className="w-8 h-8 mb-2 opacity-60" strokeWidth={1.25} />
        {fallbackLabel && (
          <span className="font-serif text-base italic tracking-wide opacity-80">
            {fallbackLabel}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
};
