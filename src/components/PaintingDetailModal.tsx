import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Check,
  Copy,
  Eye,
  Headphones,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  Sofa,
  Star,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { WALL_PRESETS } from '../data/paintings';
import { FrameStyleId, Painting, VisitorReview } from '../types/gallery';
import { formatAudioTime } from '../utils/format';
import { SafeArtworkImage } from './SafeArtworkImage';

interface PaintingDetailModalProps {
  painting: Painting | null;
  reviews: VisitorReview[];
  onClose: () => void;
  onRatePainting: (paintingId: string) => void;
}

const FRAME_STYLES: { id: FrameStyleId; label: string; borderClass: string; innerMatClass: string }[] = [
  {
    id: 'gold',
    label: 'Emas Klasik',
    borderClass: 'border-[10px] border-[#9E7B3B] shadow-[0_18px_38px_rgba(0,0,0,0.34),inset_0_0_0_2px_#C6A259]',
    innerMatClass: 'p-2.5 bg-[#F7F3EA]',
  },
  {
    id: 'walnut',
    label: 'Kayu Walnut',
    borderClass: 'border-[10px] border-[#4A3222] shadow-[0_18px_38px_rgba(0,0,0,0.34),inset_0_0_0_2px_#6B4932]',
    innerMatClass: 'p-2.5 bg-[#F7F3EA]',
  },
  {
    id: 'charcoal',
    label: 'Hitam Minimalis',
    borderClass: 'border-[8px] border-[#1C1917] shadow-[0_18px_38px_rgba(0,0,0,0.34)]',
    innerMatClass: 'p-2 bg-white',
  },
];

export function PaintingDetailModal({
  painting,
  reviews,
  onClose,
  onRatePainting,
}: PaintingDetailModalProps) {
  const [viewMode, setViewMode] = useState<'artwork' | 'room'>('artwork');
  const [isZoomed, setIsZoomed] = useState(false);

  // Virtual Room Preview states
  const [wallColor, setWallColor] = useState(WALL_PRESETS[0].hex);
  const [frameStyle, setFrameStyle] = useState<FrameStyleId>('gold');
  const [roomScale, setRoomScale] = useState<'sm' | 'md' | 'lg'>('md');
  const [spotlightOn, setSpotlightOn] = useState(true);

  // Audio Guide states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState<1 | 1.25>(1);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  // Palette copy feedback
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const lastSpokenSegmentRef = useRef<number>(-1);

  // Reset modal internal state when painting changes
  useEffect(() => {
    setViewMode('artwork');
    setIsZoomed(false);
    setIsPlaying(false);
    setCurrentTime(0);
    lastSpokenSegmentRef.current = -1;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [painting?.id]);

  // Close on Escape key & lock body scroll
  useEffect(() => {
    if (!painting) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [painting, onClose]);

  const activeSegmentIndex = useMemo(() => {
    if (!painting) return 0;
    let idx = 0;
    painting.audioGuide.segments.forEach((seg, i) => {
      if (currentTime >= seg.timeSeconds) {
        idx = i;
      }
    });
    return idx;
  }, [painting, currentTime]);

  // Audio timer progression + optional Web Speech narration
  useEffect(() => {
    if (!painting || !isPlaying) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    const duration = painting.audioGuide.durationSeconds;
    const interval = window.setInterval(() => {
      setCurrentTime((prev) => {
        const next = prev + 0.5 * playbackRate;
        if (next >= duration) {
          setIsPlaying(false);
          return duration;
        }
        return next;
      });
    }, 500);

    return () => window.clearInterval(interval);
  }, [painting, isPlaying, playbackRate]);

  // Speak current segment via Web Speech API if supported & enabled
  useEffect(() => {
    if (!painting || !isPlaying || !voiceEnabled) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (lastSpokenSegmentRef.current !== activeSegmentIndex) {
      lastSpokenSegmentRef.current = activeSegmentIndex;
      const segment = painting.audioGuide.segments[activeSegmentIndex];
      if (segment) {
        try {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(segment.transcript);
          utterance.lang = 'id-ID';
          utterance.rate = playbackRate;
          window.speechSynthesis.speak(utterance);
        } catch {
          // Graceful silence if speechSynthesis is blocked in sandbox
        }
      }
    }
  }, [painting, isPlaying, voiceEnabled, activeSegmentIndex, playbackRate]);

  if (!painting) return null;

  const activeFrame = FRAME_STYLES.find((f) => f.id === frameStyle) ?? FRAME_STYLES[0];
  const paintingReviews = reviews.filter((r) => r.paintingId === painting.id);
  const avgRating =
    paintingReviews.length > 0
      ? paintingReviews.reduce((sum, r) => sum + r.rating, 0) / paintingReviews.length
      : 0;
  const latestReview = paintingReviews[0];

  const activePreset = WALL_PRESETS.find(
    (p) => p.hex.toLowerCase() === wallColor.toLowerCase()
  );
  const isDarkWall = activePreset
    ? activePreset.isDark
    : (() => {
        const hex = wallColor.replace('#', '');
        if (hex.length !== 6) return false;
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return (r * 299 + g * 587 + b * 114) / 1000 < 130;
      })();

  const handleTogglePlay = () => {
    if (currentTime >= painting.audioGuide.durationSeconds) {
      setCurrentTime(0);
      lastSpokenSegmentRef.current = -1;
    }
    setIsPlaying((prev) => !prev);
  };

  const handleSeekSegment = (timeSeconds: number, index: number) => {
    setCurrentTime(timeSeconds);
    lastSpokenSegmentRef.current = index - 1;
    if (!isPlaying) setIsPlaying(true);
  };

  const handleResetAudio = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    lastSpokenSegmentRef.current = -1;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const handleCopyHex = (hex: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(hex).catch(() => {});
    }
    setCopiedHex(hex);
    window.setTimeout(() => setCopiedHex(null), 1600);
  };

  const progressPercent = Math.min(
    100,
    (currentTime / painting.audioGuide.durationSeconds) * 100
  );

  const scaleWidthClass =
    roomScale === 'sm'
      ? 'w-36 sm:w-44'
      : roomScale === 'md'
        ? 'w-48 sm:w-56'
        : 'w-60 sm:w-72';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-6 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-painting-title"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden border border-stone-300 bg-[#FBF9F5] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="flex items-center justify-between gap-4 border-b border-stone-200 bg-white px-5 py-3.5 sm:px-7">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-[#9E7B3B] tabular-nums whitespace-nowrap">
              {painting.accessionNumber}
            </span>
            <span aria-hidden="true" className="text-stone-300">/</span>
            <span className="truncate text-xs font-medium text-stone-500">
              {painting.movement} · {painting.yearDisplay}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup detail lukisan"
            className="inline-flex h-9 w-9 items-center justify-center border border-stone-200 text-stone-600 transition-colors hover:border-[#1C1917] hover:text-[#1C1917] cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="grid flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-12">
          {/* Left Column: Artwork Viewer + Virtual Room Preview */}
          <div className="border-b border-stone-200 bg-[#F2EDE4] p-5 sm:p-7 lg:col-span-6 lg:border-r lg:border-b-0">
            {/* Mode Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
              <div className="inline-flex border border-stone-300 bg-white p-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode('artwork')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    viewMode === 'artwork'
                      ? 'bg-[#1C1917] text-[#FBF9F5]'
                      : 'text-stone-600 hover:text-[#1C1917]'
                  }`}
                >
                  <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Tampilan Karya</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('room');
                    setIsZoomed(false);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    viewMode === 'room'
                      ? 'bg-[#1C1917] text-[#FBF9F5]'
                      : 'text-stone-600 hover:text-[#1C1917]'
                  }`}
                >
                  <Sofa className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Pratinjau Ruang Virtual</span>
                </button>
              </div>

              {viewMode === 'artwork' && (
                <button
                  type="button"
                  onClick={() => setIsZoomed((z) => !z)}
                  className="inline-flex items-center gap-1.5 border border-stone-300 bg-white px-3 py-2 text-xs font-medium text-stone-700 hover:border-[#9E7B3B] cursor-pointer"
                >
                  {isZoomed ? (
                    <>
                      <Minimize2 className="h-3.5 w-3.5" />
                      <span>Ukuran Normal</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="h-3.5 w-3.5" />
                      <span>Perbesar Detail</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Viewer Canvas */}
            {viewMode === 'artwork' ? (
              <div className="flex flex-col items-center">
                <div className="w-full overflow-hidden border border-stone-300 bg-white p-4 sm:p-6 shadow-sm">
                  <div className="overflow-hidden bg-[#1C1917]">
                    <SafeArtworkImage
                      src={painting.imageUrl}
                      alt={`${painting.title} oleh ${painting.artist}`}
                      title={painting.title}
                      className={`mx-auto max-h-[430px] w-full object-contain transition-transform duration-500 ease-out cursor-zoom-in ${
                        isZoomed ? 'scale-125 cursor-zoom-out' : 'scale-100'
                      }`}
                    />
                  </div>
                </div>
                <p className="mt-3 text-center font-serif text-xs italic text-stone-600">
                  {painting.title} ({painting.yearDisplay}) — {painting.medium}, {painting.dimensions}.
                </p>
              </div>
            ) : (
              /* Virtual Room Preview Simulator */
              <div className="flex flex-col gap-4">
                <div
                  className="relative flex min-h-[360px] sm:min-h-[410px] flex-col items-center justify-between overflow-hidden border border-stone-300 transition-colors duration-300"
                  style={{ backgroundColor: wallColor }}
                >
                  {/* Gallery Track Spotlight Beam */}
                  {spotlightOn && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          'radial-gradient(circle at 50% 24%, rgba(255, 246, 224, 0.34) 0%, rgba(255, 246, 224, 0.08) 42%, rgba(0, 0, 0, 0.16) 100%)',
                      }}
                    />
                  )}

                  {/* Ceiling Trim */}
                  <div className="relative z-10 flex w-full items-center justify-between px-4 pt-3 text-[11px] font-medium">
                    <span className={isDarkWall ? 'text-stone-300' : 'text-stone-600'}>
                      Simulasi Dinding: {activePreset ? activePreset.name : wallColor.toUpperCase()}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSpotlightOn((s) => !s)}
                      className={`border px-2.5 py-1 text-[11px] transition-colors cursor-pointer ${
                        isDarkWall
                          ? 'border-stone-500/60 bg-black/25 text-stone-200 hover:border-stone-300'
                          : 'border-stone-400/50 bg-white/70 text-stone-700 hover:border-stone-700'
                      }`}
                    >
                      {spotlightOn ? 'Lampu Galeri: Nyala' : 'Lampu Galeri: Redup'}
                    </button>
                  </div>

                  {/* Mounted Framed Painting */}
                  <div className="relative z-10 my-auto py-6">
                    <div
                      className={`${scaleWidthClass} transition-all duration-300 ${activeFrame.borderClass} ${activeFrame.innerMatClass}`}
                    >
                      <SafeArtworkImage
                        src={painting.imageUrl}
                        alt={`Pratinjau ruang virtual ${painting.title}`}
                        title={painting.title}
                        className="w-full h-auto block object-cover"
                      />
                    </div>
                  </div>

                  {/* Architectural Wainscoting / Museum Credenza Sill */}
                  <div className="relative z-10 w-full">
                    <div className="mx-auto flex w-4/5 max-w-md items-end justify-center gap-6">
                      <div className="h-7 w-full border-t-2 border-[#C8B9A2] bg-[#D8CBB8]/90 shadow-inner flex items-center justify-between px-4">
                        <span className="h-1.5 w-10 bg-[#A89880]" />
                        <span className="text-[10px] uppercase tracking-[0.18em] text-[#5B4F40]">
                          Galeri Hunian
                        </span>
                        <span className="h-1.5 w-10 bg-[#A89880]" />
                      </div>
                    </div>
                    <div className="h-6 w-full border-t border-black/10 bg-[#C7B39B]" />
                  </div>
                </div>

                {/* Room Customization Controls */}
                <div className="border border-stone-200 bg-white p-4 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-700">
                      1. Warna Cat Dinding
                    </span>
                    <label className="flex items-center gap-2 text-xs text-stone-600 cursor-pointer">
                      <span>Warna Kustom:</span>
                      <input
                        type="color"
                        value={wallColor}
                        onChange={(e) => setWallColor(e.target.value)}
                        aria-label="Pilih warna cat dinding kustom"
                        className="h-6 w-8 cursor-pointer border border-stone-300 bg-transparent p-0"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {WALL_PRESETS.map((preset) => {
                      const active = wallColor.toLowerCase() === preset.hex.toLowerCase();
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => setWallColor(preset.hex)}
                          className={`flex flex-col items-center gap-1.5 border p-2 text-center transition-colors cursor-pointer ${
                            active
                              ? 'border-[#9E7B3B] bg-[#FBF9F5]'
                              : 'border-stone-200 hover:border-stone-400'
                          }`}
                        >
                          <span
                            className="h-5 w-full border border-stone-300"
                            style={{ backgroundColor: preset.hex }}
                          />
                          <span className="text-[11px] leading-tight text-stone-700 line-clamp-1">
                            {preset.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2">
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-stone-700 mb-2">
                        2. Jenis Bingkai
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {FRAME_STYLES.map((frame) => (
                          <button
                            key={frame.id}
                            type="button"
                            onClick={() => setFrameStyle(frame.id)}
                            className={`px-2.5 py-1.5 text-xs font-medium border transition-colors cursor-pointer ${
                              frameStyle === frame.id
                                ? 'border-[#1C1917] bg-[#1C1917] text-white'
                                : 'border-stone-200 text-stone-700 hover:border-[#9E7B3B]'
                            }`}
                          >
                            {frame.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-stone-700 mb-2">
                        3. Skala di Dinding
                      </span>
                      <div className="flex gap-1.5">
                        {[
                          { id: 'sm' as const, label: 'Kecil' },
                          { id: 'md' as const, label: 'Sedang' },
                          { id: 'lg' as const, label: 'Besar' },
                        ].map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setRoomScale(s.id)}
                            className={`flex-1 py-1.5 text-xs font-medium border transition-colors cursor-pointer ${
                              roomScale === s.id
                                ? 'border-[#1C1917] bg-[#1C1917] text-white'
                                : 'border-stone-200 text-stone-700 hover:border-[#9E7B3B]'
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Color Palette Inspector */}
            <div className="mt-6 border border-stone-200 bg-white p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-stone-100">
                <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
                  Palet Warna &amp; Pigmen Utama
                </h3>
                <span className="text-[11px] text-stone-500">Klik warna untuk salin HEX</span>
              </div>

              <div className="mt-3.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {painting.palette.map((swatch) => {
                  const isCopied = copiedHex === swatch.hex;
                  return (
                    <button
                      key={swatch.hex}
                      type="button"
                      onClick={() => handleCopyHex(swatch.hex)}
                      className="flex items-center gap-3 border border-stone-200 p-2.5 text-left transition-colors hover:border-[#9E7B3B] cursor-pointer"
                    >
                      <span
                        className="h-9 w-9 shrink-0 border border-stone-300"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="truncate text-xs font-semibold text-[#1C1917]">
                            {swatch.name}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-stone-500 tabular-nums shrink-0">
                            {isCopied ? (
                              <>
                                <Check className="h-3 w-3 text-[#9E7B3B]" />
                                <span className="text-[#9E7B3B]">Disalin</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-2.5 w-2.5" />
                                <span>{swatch.hex}</span>
                              </>
                            )}
                          </span>
                        </div>
                        <p className="mt-0.5 truncate text-[11px] text-stone-500">
                          {swatch.pigmentNote}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Accession Data, Audio Guide, History Story, Purchase */}
          <div className="p-5 sm:p-8 lg:col-span-6 space-y-8">
            {/* Title & Accession Metadata */}
            <div>
              <h2
                id="modal-painting-title"
                className="font-serif text-3xl font-semibold text-[#1C1917] sm:text-4xl"
              >
                {painting.title}
              </h2>
              <p className="mt-1 text-sm italic text-stone-500">
                {painting.englishTitle}
              </p>

              <dl className="mt-5 grid grid-cols-1 gap-y-2.5 border-t border-b border-stone-200 py-4 text-sm sm:grid-cols-2 sm:gap-x-6">
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-stone-400">Pelukis</dt>
                  <dd className="mt-0.5 font-medium text-[#1C1917]">
                    {painting.artist} ({painting.artistLifespan})
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-stone-400">Tahun &amp; Aliran</dt>
                  <dd className="mt-0.5 font-medium text-[#1C1917] tabular-nums">
                    {painting.yearDisplay} · {painting.movement}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-stone-400">Medium &amp; Dimensi</dt>
                  <dd className="mt-0.5 text-stone-700">
                    {painting.medium} ({painting.dimensions})
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-stone-400">Lokasi Museum</dt>
                  <dd className="mt-0.5 text-stone-700">{painting.museumLocation}</dd>
                </div>
              </dl>
            </div>

            {/* Simulated Audio Guide Player */}
            <div className="border border-stone-200 bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <Headphones className="h-4 w-4 text-[#9E7B3B]" aria-hidden="true" />
                  <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
                    Simulasi Audio Guide Kuratorial
                  </h3>
                </div>
                <span className="text-xs text-stone-500">{painting.audioGuide.narrator}</span>
              </div>

              {/* Player Controls */}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  aria-label={isPlaying ? 'Jeda audio guide' : 'Putar audio guide'}
                  className="inline-flex h-10 w-10 items-center justify-center bg-[#1C1917] text-[#FBF9F5] transition-colors hover:bg-[#9E7B3B] cursor-pointer shrink-0"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                </button>

                <button
                  type="button"
                  onClick={handleResetAudio}
                  aria-label="Ulang audio dari awal"
                  className="inline-flex h-10 w-10 items-center justify-center border border-stone-200 text-stone-600 hover:border-[#9E7B3B] hover:text-[#1C1917] cursor-pointer shrink-0"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>

                {/* Scrubber */}
                <div className="flex-1 min-w-[160px]">
                  <div className="flex justify-between text-[11px] font-mono text-stone-500 tabular-nums mb-1.5">
                    <span>{formatAudioTime(currentTime)}</span>
                    <span>{formatAudioTime(painting.audioGuide.durationSeconds)}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={painting.audioGuide.durationSeconds}
                    step={1}
                    value={currentTime}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setCurrentTime(val);
                      lastSpokenSegmentRef.current = -1;
                    }}
                    aria-label="Progres audio narasi"
                    className="h-1.5 w-full cursor-pointer accent-[#9E7B3B] bg-stone-200"
                  />
                  <div className="mt-1 h-0.5 w-full bg-stone-100 overflow-hidden">
                    <div
                      className="h-full bg-[#9E7B3B] transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Speed & Voice Toggle */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setPlaybackRate((r) => (r === 1 ? 1.25 : 1))}
                    className="min-h-[34px] border border-stone-200 px-2.5 text-xs font-mono text-stone-700 hover:border-[#9E7B3B] tabular-nums cursor-pointer"
                  >
                    {playbackRate}x
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setVoiceEnabled((v) => !v);
                      if (voiceEnabled && typeof window !== 'undefined' && 'speechSynthesis' in window) {
                        window.speechSynthesis.cancel();
                      }
                    }}
                    aria-label={voiceEnabled ? 'Matikan suara narator' : 'Aktifkan suara narator'}
                    title={voiceEnabled ? 'Suara Narator Aktif' : 'Mode Teks Tanpa Suara'}
                    className="inline-flex h-[34px] w-[34px] items-center justify-center border border-stone-200 text-stone-700 hover:border-[#9E7B3B] cursor-pointer"
                  >
                    {voiceEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

              {/* Segment Selector & Synchronized Transcript */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {painting.audioGuide.segments.map((seg, i) => (
                  <button
                    key={seg.label}
                    type="button"
                    onClick={() => handleSeekSegment(seg.timeSeconds, i)}
                    className={`px-2.5 py-1 text-xs font-medium border transition-colors cursor-pointer ${
                      activeSegmentIndex === i
                        ? 'border-[#9E7B3B] bg-[#FBF9F5] text-[#9E7B3B]'
                        : 'border-stone-200 text-stone-600 hover:text-[#1C1917]'
                    }`}
                  >
                    {seg.label}
                  </button>
                ))}
              </div>

              <p className="mt-3 border-t border-stone-100 pt-3 text-xs leading-relaxed text-stone-700 italic">
                “{painting.audioGuide.segments[activeSegmentIndex]?.transcript}”
              </p>
            </div>

            {/* Dedicated Section: Cerita & Sejarah di Balik Lukisan */}
            <article className="space-y-5">
              <div className="border-b border-stone-200 pb-2">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#9E7B3B]">
                  Catatan Kuratorial
                </p>
                <h3 className="mt-1 font-serif text-2xl font-semibold text-[#1C1917]">
                  Cerita &amp; Sejarah di Balik Lukisan
                </h3>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                  Latar Belakang Penciptaan
                </h4>
                <p className="mt-2 text-sm leading-[1.8] text-stone-700 first-letter:float-left first-letter:mr-2.5 first-letter:mt-1 first-letter:font-serif first-letter:text-4xl first-letter:font-semibold first-letter:leading-none first-letter:text-[#9E7B3B]">
                  {painting.history.background}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                  Makna Simbolis &amp; Komposisi
                </h4>
                <p className="mt-1.5 text-sm leading-[1.75] text-stone-700">
                  {painting.history.symbolism}
                </p>
              </div>

              <div className="border border-stone-200 bg-white p-4">
                <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9E7B3B]">
                  Misteri &amp; Fakta Unik
                </h4>
                <p className="mt-1.5 text-sm leading-[1.75] text-stone-700">
                  {painting.history.mysteryAndFacts}
                </p>
              </div>
            </article>

            {/* Community Visitor Rating Summary Box */}
            <div className="border border-stone-300 bg-white p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-stone-500">
                    Apresiasi Pengunjung Galeri
                  </span>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="font-serif text-2xl font-semibold text-[#1C1917] tabular-nums">
                      {paintingReviews.length > 0 ? avgRating.toFixed(1) : '—'}
                    </span>
                    <div className="flex items-center gap-0.5" aria-hidden="true">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`h-3.5 w-3.5 ${
                            s <= Math.round(avgRating)
                              ? 'fill-[#9E7B3B] text-[#9E7B3B]'
                              : 'text-stone-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-stone-500 tabular-nums">
                      ({paintingReviews.length} ulasan)
                    </span>
                  </div>
                </div>
              </div>

              {latestReview && (
                <p className="mt-3 border-t border-stone-100 pt-3 text-xs leading-relaxed text-stone-600 italic">
                  “{latestReview.comment}” — <span className="not-italic font-medium text-stone-800">{latestReview.reviewerName}</span>
                </p>
              )}

              <button
                type="button"
                onClick={() => onRatePainting(painting.id)}
                className="mt-4 flex min-h-[44px] w-full items-center justify-center gap-2 bg-[#1C1917] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#FBF9F5] transition-colors hover:bg-[#9E7B3B] cursor-pointer"
              >
                <Star className="h-4 w-4" aria-hidden="true" />
                <span>Beri Rating &amp; Ulasan untuk Karya Ini</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
