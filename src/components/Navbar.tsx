import { useState } from 'react';
import { Menu, Star, X } from 'lucide-react';

interface NavbarProps {
  reviewCount: number;
  onRateClick: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const NAV_LINKS = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'galeri', label: 'Galeri' },
  { id: 'edukasi', label: 'Edukasi' },
  { id: 'ulasan', label: 'Ulasan' },
  { id: 'tentang', label: 'Tentang' },
];

export function Navbar({
  reviewCount,
  onRateClick,
  activeSection,
  onNavigate,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/90 bg-[#FBF9F5]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-8 px-5 py-3.5 sm:px-8 lg:px-12">
        {/* Zone 1: Brand Title */}
        <a
          href="#beranda"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('beranda');
          }}
          className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#1C1917] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9E7B3B]"
        >
          ArtVibe Gallery
        </a>

        {/* Zone 2: Navigation Links */}
        <nav
          aria-label="Navigasi Utama"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600"
        >
          {NAV_LINKS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.id);
                }}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9E7B3B] ${
                  isActive
                    ? 'text-[#1C1917]'
                    : 'text-stone-600 hover:text-[#1C1917]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-px bg-[#9E7B3B] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onRateClick}
            aria-label={`Beri rating karya, saat ini ada ${reviewCount} ulasan`}
            className="inline-flex min-h-[40px] items-center gap-2 border border-[#1C1917] bg-[#1C1917] px-4 py-2 text-xs font-medium tracking-wide text-[#FBF9F5] transition-colors duration-150 hover:bg-[#9E7B3B] hover:border-[#9E7B3B] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9E7B3B]"
          >
            <Star className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Beri Rating</span>
            <span className="tabular-nums text-[#E5D3A8]">({reviewCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={mobileMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center border border-stone-300 text-[#1C1917] md:hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-[#9E7B3B]"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Navigasi Seluler"
          className="border-t border-stone-200 bg-[#FBF9F5] px-5 py-4 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.id);
                }}
                className={`flex min-h-[44px] items-center justify-between border-b border-stone-200/60 py-2.5 text-sm font-medium ${
                  activeSection === item.id
                    ? 'text-[#9E7B3B]'
                    : 'text-[#1C1917]'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs text-stone-400">→</span>
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
