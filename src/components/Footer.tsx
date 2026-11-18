interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-stone-200 bg-[#1C1917] text-stone-300">
      <div className="mx-auto max-w-[1280px] px-5 py-12 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-8 border-b border-stone-800 pb-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="font-serif text-2xl font-semibold text-[#FBF9F5]">
              ArtVibe Gallery
            </span>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-stone-400">
              Platform pameran digital, pusat edukasi sejarah seni rupa dunia, dan ruang apresiasi publik yang menghadirkan mahakarya klasik secara lebih dekat.
            </p>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D8B979]">
              Navigasi Kuratorial
            </h3>
            <ul className="mt-3 space-y-2 text-xs text-stone-400">
              {[
                { id: 'beranda', label: 'Beranda & Sorotan Minggu Ini' },
                { id: 'galeri', label: 'Galeri Koleksi & Sejarah Lukisan' },
                { id: 'edukasi', label: 'Ruang Edukasi & Kuis Seni' },
                { id: 'ulasan', label: 'Rating & Ulasan Pengunjung' },
                { id: 'tentang', label: 'Kerja Sama Seniman Lokal' },
              ].map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(link.id);
                    }}
                    className="hover:text-[#FBF9F5] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D8B979]">
              Kurasi &amp; Edukasi
            </h3>
            <p className="mt-3 text-xs leading-relaxed text-stone-400">
              Arsip Digital Terbuka · Tur Audio Narasi · Pratinjau Ruang Virtual
            </p>
            <p className="mt-2 text-xs text-stone-500">
              Korespondensi Kuratorial: kurator@artvibegallery.id
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ArtVibe Gallery. Seluruh hak cipta kurasi dan edukasi dilindungi.</p>
          <p>Dirancang untuk Apresiasi Seni Klasik &amp; Modern</p>
        </div>
      </div>
    </footer>
  );
}
