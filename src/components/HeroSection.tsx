import { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Headphones } from 'lucide-react';
import { Painting } from '../types/gallery';
import { SafeArtworkImage } from './SafeArtworkImage';

interface HeroSectionProps {
  spotlights: Painting[];
  onSelectPainting: (painting: Painting) => void;
  onExploreGallery: () => void;
}

export function HeroSection({
  spotlights,
  onSelectPainting,
  onExploreGallery,
}: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = spotlights[activeIndex] ?? spotlights[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + spotlights.length) % spotlights.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % spotlights.length);
  };

  return (
    <section id="beranda" className="border-b border-stone-200 bg-[#FBF9F5]">
      <div className="mx-auto max-w-[1280px] px-5 pt-10 pb-12 sm:px-8 lg:px-12 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Editorial Column */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#9E7B3B]">
                Sorotan Kuratorial Minggu Ini · {current.movement}
              </p>

              <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-[#1C1917] sm:text-5xl lg:text-[3.5rem]">
                Menyingkap Kisah Abadi di Balik Mahakarya Dunia
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-stone-600">
                ArtVibe Gallery menghadirkan pameran digital bergaya museum untuk mempelajari sejarah, teknik warna, dan cerita rahasia dari lukisan-lukisan terpenting dalam peradaban seni rupa.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={onExploreGallery}
                  className="inline-flex min-h-[44px] items-center gap-2.5 bg-[#1C1917] px-6 py-3 text-sm font-medium text-[#FBF9F5] transition-colors duration-150 hover:bg-[#9E7B3B] whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9E7B3B]"
                >
                  <span>Jelajahi Galeri Sejarah</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => onSelectPainting(current)}
                  className="inline-flex min-h-[44px] items-center gap-2 border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-[#1C1917] transition-colors duration-150 hover:border-[#9E7B3B] hover:text-[#9E7B3B] whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9E7B3B]"
                >
                  <Headphones className="h-4 w-4 text-[#9E7B3B]" aria-hidden="true" />
                  <span>Bedah Karya Sorotan</span>
                </button>
              </div>
            </div>

            {/* Maestro Quote Block with subtle top & bottom hairlines (no left bar) */}
            <figure className="mt-10 border-t border-b border-stone-200 py-5">
              <blockquote className="font-serif text-xl italic leading-relaxed text-[#292524] sm:text-2xl">
                “{current.quote}”
              </blockquote>
              <figcaption className="mt-2.5 text-xs uppercase tracking-[0.14em] text-stone-500">
                — {current.quoteAttribution}
              </figcaption>
            </figure>
          </div>

          {/* Featured Spotlight Artwork Frame */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div className="relative flex flex-1 flex-col border border-stone-200 bg-white p-4 sm:p-5">
              <div className="flex items-center justify-between gap-4 pb-3 border-b border-stone-100">
                <span className="text-xs font-medium uppercase tracking-[0.16em] text-stone-500 tabular-nums">
                  {current.accessionNumber}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Sorotan lukisan sebelumnya"
                    className="inline-flex h-8 w-8 items-center justify-center border border-stone-200 text-stone-700 transition-colors hover:border-[#9E7B3B] hover:text-[#9E7B3B] cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="px-2 text-xs text-stone-500 tabular-nums">
                    {activeIndex + 1} / {spotlights.length}
                  </span>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Sorotan lukisan berikutnya"
                    className="inline-flex h-8 w-8 items-center justify-center border border-stone-200 text-stone-700 transition-colors hover:border-[#9E7B3B] hover:text-[#9E7B3B] cursor-pointer"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectPainting(current)}
                className="group relative mt-4 block w-full overflow-hidden bg-[#F2EDE4] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#9E7B3B]"
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <SafeArtworkImage
                    src={current.imageUrl}
                    alt={`${current.title} oleh ${current.artist}`}
                    title={current.title}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>
              </button>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-[#1C1917]">
                    {current.title}
                  </h2>
                  <p className="mt-0.5 text-sm text-stone-600">
                    {current.artist} <span aria-hidden="true">·</span>{' '}
                    <span className="tabular-nums">{current.yearDisplay}</span>{' '}
                    <span aria-hidden="true">·</span> {current.museumLocation}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectPainting(current)}
                  className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9E7B3B] hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-end py-1"
                >
                  Buka Arsip & Ruang Virtual →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Institutional Operational Utility Ribbon */}
        <div className="mt-10 grid grid-cols-1 gap-4 border-t border-stone-200 pt-6 text-xs text-stone-600 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-0.5">
            <span className="uppercase tracking-[0.15em] text-stone-400">Koleksi Digital</span>
            <span className="font-medium text-[#1C1917] tabular-nums">8 Mahakarya Maestro Dunia</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="uppercase tracking-[0.15em] text-stone-400">Fitur Kuratorial</span>
            <span className="font-medium text-[#1C1917]">Audio Guide &amp; Palet Pigmen</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="uppercase tracking-[0.15em] text-stone-400">Simulasi Interior</span>
            <span className="font-medium text-[#1C1917]">Pratinjau Ruang Virtual Interaktif</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="uppercase tracking-[0.15em] text-stone-400">Edukasi &amp; Apresiasi</span>
            <span className="font-medium text-[#1C1917]">Artikel Sejarah, Kuis &amp; Rating Pengunjung</span>
          </div>
        </div>
      </div>
    </section>
  );
}
