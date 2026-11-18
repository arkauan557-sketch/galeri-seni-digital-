import { useState } from 'react';
import { Frame } from 'lucide-react';

interface SafeArtworkImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
}

export function SafeArtworkImage({
  src,
  alt,
  title,
  className = 'w-full h-full object-cover',
}: SafeArtworkImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F2EDE4] via-[#EAE3D5] to-[#DFD5C3] p-6 text-center text-[#57534E] ${className}`}
        role="img"
        aria-label={alt}
      >
        <Frame className="h-8 w-8 text-[#9E7B3B] mb-2" strokeWidth={1.5} />
        <span className="font-serif text-base font-medium text-[#1C1917] line-clamp-2">
          {title || alt}
        </span>
        <span className="mt-1 text-xs text-[#78716C]">Arsip Visual ArtVibe</span>
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
}
