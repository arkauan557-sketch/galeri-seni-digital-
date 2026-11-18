import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, Star, X } from 'lucide-react';
import { ArtMovement, Painting, VisitorReview } from '../types/gallery';
import { SafeArtworkImage } from './SafeArtworkImage';

interface MuseumGalleryProps {
  paintings: Painting[];
  reviews: VisitorReview[];
  onSelectPainting: (painting: Painting) => void;
}

const MOVEMENTS: ('Semua Aliran' | ArtMovement)[] = [
  'Semua Aliran',
  'Renaisans',
  'Barok',
  'Impresionisme',
  'Post-Impresionisme',
  'Ukiyo-e',
  'Ekspresionisme',
  'Surealisme',
  'Simbolisme',
];

type SortOption = 'year-asc' | 'year-desc' | 'title-asc';

export function MuseumGallery({
  paintings,
  reviews,
  onSelectPainting,
}: MuseumGalleryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovement, setSelectedMovement] = useState<'Semua Aliran' | ArtMovement>('Semua Aliran');
  const [sortBy, setSortBy] = useState<SortOption>('year-asc');

  const ratingStats = useMemo(() => {
    const map = new Map<string, { avg: number; count: number }>();
    paintings.forEach((p) => {
      const matched = reviews.filter((r) => r.paintingId === p.id);
      const count = matched.length;
      const avg = count > 0 ? matched.reduce((s, r) => s + r.rating, 0) / count : 0;
      map.set(p.id, { avg, count });
    });
    return map;
  }, [paintings, reviews]);

  const filteredPaintings = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const filtered = paintings.filter((item) => {
      const matchesMovement =
        selectedMovement === 'Semua Aliran' || item.movement === selectedMovement;

      if (!matchesMovement) return false;
      if (!q) return true;

      return (
        item.title.toLowerCase().includes(q) ||
        item.englishTitle.toLowerCase().includes(q) ||
        item.artist.toLowerCase().includes(q) ||
        item.yearDisplay.toLowerCase().includes(q) ||
        item.movement.toLowerCase().includes(q)
      );
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'year-asc') return a.year - b.year;
      if (sortBy === 'year-desc') return b.year - a.year;
      return a.title.localeCompare(b.title, 'id');
    });
  }, [paintings, searchQuery, selectedMovement, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedMovement('Semua Aliran');
    setSortBy('year-asc');
  };

  return (
    <section id="galeri" className="border-b border-stone-200 bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="flex flex-col gap-4 border-b border-stone-200 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#9E7B3B]">
              Koleksi Permanen Museum
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#1C1917] sm:text-4xl">
              Galeri Koleksi &amp; Sejarah Lukisan
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-base">
              Pilih salah satu lukisan di bawah untuk membaca kisah sejarah di balik penciptaannya, mendengarkan tur audio kuratorial, melihat palet warna asli, serta mencoba pratinjau ruang virtual.
            </p>
          </div>
          <div className="text-xs font-medium uppercase tracking-[0.16em] text-stone-500 tabular-nums shrink-0">
            Menampilkan {filteredPaintings.length} dari {paintings.length} Karya
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="mt-8 flex flex-col gap-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari judul lukisan, pelukis, atau tahun (mis. 1889)..."
                aria-label="Cari karya seni berdasarkan judul, pelukis, atau tahun"
                className="w-full min-h-[44px] border border-stone-300 bg-[#FBF9F5] pl-10 pr-10 py-2.5 text-sm text-[#1C1917] placeholder:text-stone-400 focus:border-[#9E7B3B] focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Hapus pencarian"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-[#1C1917] cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Sort Control */}
            <div className="flex items-center gap-2.5 self-start sm:self-auto">
              <SlidersHorizontal className="h-4 w-4 text-stone-500" aria-hidden="true" />
              <label htmlFor="gallery-sort" className="text-xs font-medium uppercase tracking-[0.12em] text-stone-500 whitespace-nowrap">
                Urutkan:
              </label>
              <select
                id="gallery-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="min-h-[40px] border border-stone-300 bg-[#FBF9F5] px-3 py-1.5 text-sm text-[#1C1917] focus:border-[#9E7B3B] focus:outline-none cursor-pointer"
              >
                <option value="year-asc">Tahun Terlama ke Terbaru</option>
                <option value="year-desc">Tahun Terbaru ke Terlama</option>
                <option value="title-asc">Judul (A – Z)</option>
              </select>
            </div>
          </div>

          {/* Interactive Art Movement Filter Bar */}
          <div
            role="tablist"
            aria-label="Filter aliran seni"
            className="flex flex-wrap items-center gap-1.5 border-b border-stone-200 pb-5"
          >
            {MOVEMENTS.map((movement) => {
              const isSelected = selectedMovement === movement;
              return (
                <button
                  key={movement}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedMovement(movement)}
                  className={`min-h-[36px] px-3.5 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#9E7B3B] ${
                    isSelected
                      ? 'bg-[#1C1917] text-[#FBF9F5]'
                      : 'bg-[#FBF9F5] text-stone-600 border border-stone-200 hover:border-[#9E7B3B] hover:text-[#1C1917]'
                  }`}
                >
                  {movement}
                </button>
              );
            })}
          </div>
        </div>

        {/* Paintings Grid */}
        {filteredPaintings.length === 0 ? (
          <div className="mt-12 border border-stone-200 bg-[#FBF9F5] p-12 text-center">
            <p className="font-serif text-2xl font-medium text-[#1C1917]">
              Tidak ada karya yang cocok dengan pencarian Anda
            </p>
            <p className="mt-2 text-sm text-stone-600">
              Coba kata kunci lain seperti nama pelukis (Vermeer, Monet, Dalí) atau kembalikan filter ke semua aliran.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 inline-flex min-h-[42px] items-center bg-[#1C1917] px-5 py-2 text-xs font-medium uppercase tracking-[0.14em] text-[#FBF9F5] hover:bg-[#9E7B3B] transition-colors cursor-pointer"
            >
              Reset Filter Galeri
            </button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {filteredPaintings.map((painting) => (
              <article
                key={painting.id}
                className="group flex flex-col justify-between border border-stone-200 bg-[#FBF9F5] transition-colors duration-200 hover:border-[#9E7B3B]"
              >
                <div>
                  <button
                    type="button"
                    onClick={() => onSelectPainting(painting)}
                    className="block w-full overflow-hidden bg-[#EAE3D5] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#9E7B3B]"
                  >
                    <div className="aspect-[4/5] w-full overflow-hidden">
                      <SafeArtworkImage
                        src={painting.imageUrl}
                        alt={`${painting.title} oleh ${painting.artist}`}
                        title={painting.title}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                  </button>

                  <div className="p-5">
                    {/* Unboxed Clean Metadata with typographic separators */}
                    <p className="text-xs text-stone-500">
                      <span>{painting.movement}</span>
                      <span aria-hidden="true" className="mx-1.5">·</span>
                      <span className="tabular-nums">{painting.yearDisplay}</span>
                    </p>

                    <h3 className="mt-1.5 font-serif text-xl font-semibold leading-snug text-[#1C1917]">
                      <button
                        type="button"
                        onClick={() => onSelectPainting(painting)}
                        className="text-left hover:text-[#9E7B3B] transition-colors cursor-pointer"
                      >
                        {painting.title}
                      </button>
                    </h3>

                    <p className="mt-1 text-sm font-medium text-stone-700">
                      {painting.artist}
                    </p>

                    <p className="mt-2.5 text-xs leading-relaxed text-stone-600 line-clamp-3">
                      {painting.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-stone-200 px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1" aria-label="Palet warna utama">
                      {painting.palette.slice(0, 4).map((swatch) => (
                        <span
                          key={swatch.hex}
                          title={`${swatch.name} (${swatch.hex})`}
                          className="h-3 w-3 rounded-full border border-stone-300"
                          style={{ backgroundColor: swatch.hex }}
                        />
                      ))}
                    </div>
                    {(() => {
                      const stat = ratingStats.get(painting.id);
                      if (!stat || stat.count === 0) return null;
                      return (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-stone-600 tabular-nums">
                          <Star className="h-3 w-3 fill-[#9E7B3B] text-[#9E7B3B]" aria-hidden="true" />
                          <span>{stat.avg.toFixed(1)}</span>
                        </span>
                      );
                    })()}
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectPainting(painting)}
                    className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9E7B3B] hover:text-[#1C1917] transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Pelajari Karya →
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
