import { FormEvent, useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { GALLERY_INTERIOR_IMAGE } from '../data/paintings';
import { SafeArtworkImage } from './SafeArtworkImage';

export function AboutContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [focus, setFocus] = useState('Pameran Kuratorial Digital');
  const [portfolio, setPortfolio] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Mohon lengkapi nama seniman/studio, alamat email, dan deskripsi karya atau kerja sama.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setCity('');
    setPortfolio('');
    setMessage('');
    setSubmitted(false);
    setErrorMsg('');
  };

  return (
    <section id="tentang" className="bg-[#FBF9F5] py-16 lg:py-20">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left: Preservation Mission & Architectural Gallery Visual */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#9E7B3B]">
                Tentang ArtVibe Gallery
              </p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-[#1C1917] sm:text-4xl">
                Mendekatkan Warisan Seni Dunia &amp; Seniman Nusantara
              </h2>
              <p className="mt-4 text-sm leading-[1.8] text-stone-700 sm:text-base">
                Didirikan dengan keyakinan bahwa apresiasi seni tidak boleh dibatasi oleh jarak geografis maupun dinding museum tertutup, ArtVibe Gallery menggabungkan riset sejarah seni yang akurat dengan pengalaman pameran digital yang imersif.
              </p>
              <p className="mt-3 text-sm leading-[1.8] text-stone-700 sm:text-base">
                Melalui digitalisasi arsip publik, penerbitan materi edukasi berbahasa Indonesia, serta ruang ulasan terbuka bagi penikmat seni, kami berkomitmen mendukung apresiasi karya maestro dunia sekaligus membuka ruang kolaborasi bagi perupa lokal berbakat.
              </p>
            </div>

            <div className="mt-7 overflow-hidden border border-stone-200 bg-white p-3">
              <div className="aspect-[16/9] w-full overflow-hidden bg-[#EAE3D5]">
                <SafeArtworkImage
                  src={GALLERY_INTERIOR_IMAGE}
                  alt="Ruang pameran utama ArtVibe Gallery dengan pencahayaan alami"
                  title="Paviliun Kuratorial ArtVibe Gallery"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-2.5 font-serif text-xs italic text-stone-500">
                Paviliun kuratorial digital ArtVibe — memadukan ketenangan ruang museum klasik dengan teknologi pameran modern.
              </p>
            </div>
          </div>

          {/* Right: Local Artist Collaboration Form */}
          <div className="lg:col-span-6">
            <div className="h-full border border-stone-200 bg-white p-6 sm:p-8 flex flex-col justify-between">
              {submitted ? (
                <div className="my-auto py-8 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center border border-emerald-700/30 bg-emerald-50 text-emerald-800">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-serif text-2xl font-semibold text-[#1C1917]">
                    Proposal Kerja Sama Diterima
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600 max-w-md mx-auto">
                    Terima kasih, <span className="font-semibold text-[#1C1917]">{name}</span>. Tim kuratorial kami telah mencatat pengajuan <span className="font-medium">{focus}</span> Anda dan akan menghubungi melalui <span className="font-medium">{email}</span> dalam 3–5 hari kerja.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-6 inline-flex min-h-[42px] items-center border border-stone-300 px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#1C1917] hover:border-[#9E7B3B] cursor-pointer"
                  >
                    Kirim Pengajuan Lainnya
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="border-b border-stone-200 pb-4">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#9E7B3B]">
                      Program Kemitraan
                    </p>
                    <h3 className="mt-1 font-serif text-2xl font-semibold text-[#1C1917]">
                      Formulir Kerja Sama Seniman Lokal
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-stone-600">
                      Terbuka bagi pelukis kontemporer, ilustrator, dan studio seni lokal untuk pameran digital maupun edisi cetak kuratorial.
                    </p>
                  </div>

                  {errorMsg && (
                    <div
                      role="alert"
                      className="border border-rose-300 bg-rose-50 px-3.5 py-2.5 text-xs text-rose-900"
                    >
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="artist-name" className="block text-xs font-medium text-stone-700 mb-1.5">
                        Nama Seniman / Studio *
                      </label>
                      <input
                        id="artist-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="cth. Studio Larasati"
                        className="w-full min-h-[42px] border border-stone-300 bg-[#FBF9F5] px-3.5 py-2 text-sm text-[#1C1917] focus:border-[#9E7B3B] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="artist-email" className="block text-xs font-medium text-stone-700 mb-1.5">
                        Email Aktif *
                      </label>
                      <input
                        id="artist-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nama@studioanda.id"
                        className="w-full min-h-[42px] border border-stone-300 bg-[#FBF9F5] px-3.5 py-2 text-sm text-[#1C1917] focus:border-[#9E7B3B] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="artist-city" className="block text-xs font-medium text-stone-700 mb-1.5">
                        Kota Asal
                      </label>
                      <input
                        id="artist-city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="cth. Yogyakarta, Bandung, Bali"
                        className="w-full min-h-[42px] border border-stone-300 bg-[#FBF9F5] px-3.5 py-2 text-sm text-[#1C1917] focus:border-[#9E7B3B] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="collab-focus" className="block text-xs font-medium text-stone-700 mb-1.5">
                        Bentuk Kolaborasi
                      </label>
                      <select
                        id="collab-focus"
                        value={focus}
                        onChange={(e) => setFocus(e.target.value)}
                        className="w-full min-h-[42px] border border-stone-300 bg-[#FBF9F5] px-3 py-2 text-sm text-[#1C1917] focus:border-[#9E7B3B] focus:outline-none cursor-pointer"
                      >
                        <option value="Pameran Kuratorial Digital">Pameran Kuratorial Digital</option>
                        <option value="Edisi Reproduksi Terbatas">Edisi Reproduksi Terbatas</option>
                        <option value="Lokakarya & Edukasi Seni">Lokakarya &amp; Edukasi Seni</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="artist-portfolio" className="block text-xs font-medium text-stone-700 mb-1.5">
                      Tautan Portofolio / Instagram (Opsional)
                    </label>
                    <input
                      id="artist-portfolio"
                      type="url"
                      value={portfolio}
                      onChange={(e) => setPortfolio(e.target.value)}
                      placeholder="https://..."
                      className="w-full min-h-[42px] border border-stone-300 bg-[#FBF9F5] px-3.5 py-2 text-sm text-[#1C1917] focus:border-[#9E7B3B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="artist-message" className="block text-xs font-medium text-stone-700 mb-1.5">
                      Deskripsi Aliran Karya &amp; Gagasan Kolaborasi *
                    </label>
                    <textarea
                      id="artist-message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ceritakan medium, tema karya, atau konsep pameran yang ingin Anda ajukan..."
                      className="w-full border border-stone-300 bg-[#FBF9F5] px-3.5 py-2.5 text-sm text-[#1C1917] focus:border-[#9E7B3B] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex min-h-[44px] w-full items-center justify-center gap-2 bg-[#1C1917] px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#FBF9F5] transition-colors hover:bg-[#9E7B3B] cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Kirim Pengajuan Kerja Sama</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
