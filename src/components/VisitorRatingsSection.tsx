import { FormEvent, useEffect, useMemo, useState } from 'react';
import { CheckCircle2, MessageSquareQuote, Star } from 'lucide-react';
import { Painting, VisitorReview } from '../types/gallery';
import { SafeArtworkImage } from './SafeArtworkImage';

interface VisitorRatingsSectionProps {
  paintings: Painting[];
  reviews: VisitorReview[];
  preselectedPaintingId: string | null;
  onAddReview: (review: Omit<VisitorReview, 'id' | 'dateLabel'>) => void;
  onSelectPainting: (painting: Painting) => void;
}

const RATING_LABELS: Record<number, string> = {
  1: '1 / 5 — Kurang Mengesankan',
  2: '2 / 5 — Cukup Menarik',
  3: '3 / 5 — Bagus',
  4: '4 / 5 — Sangat Mengagumkan',
  5: '5 / 5 — Mahakarya Abadi',
};

export function VisitorRatingsSection({
  paintings,
  reviews,
  preselectedPaintingId,
  onAddReview,
  onSelectPainting,
}: VisitorRatingsSectionProps) {
  const [filterPaintingId, setFilterPaintingId] = useState<string>('all');

  // Form states
  const [formPaintingId, setFormPaintingId] = useState<string>(paintings[0]?.id ?? 'starry-night');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerRole, setReviewerRole] = useState('');
  const [comment, setComment] = useState('');
  const [formError, setFormError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Sync preselected painting when triggered from PaintingDetailModal
  useEffect(() => {
    if (preselectedPaintingId) {
      setFormPaintingId(preselectedPaintingId);
      setFilterPaintingId(preselectedPaintingId);
      setSubmitSuccess(false);
    }
  }, [preselectedPaintingId]);

  const paintingMap = useMemo(() => {
    const map = new Map<string, Painting>();
    paintings.forEach((p) => map.set(p.id, p));
    return map;
  }, [paintings]);

  const filteredReviews = useMemo(() => {
    if (filterPaintingId === 'all') return reviews;
    return reviews.filter((r) => r.paintingId === filterPaintingId);
  }, [reviews, filterPaintingId]);

  const stats = useMemo(() => {
    const total = reviews.length;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const average = total > 0 ? sum / total : 0;
    const counts = [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: reviews.filter((r) => r.rating === star).length,
    }));
    return { total, average, counts };
  }, [reviews]);

  const paintingRatingSummary = useMemo(() => {
    const result = new Map<string, { avg: number; count: number }>();
    paintings.forEach((p) => {
      const matched = reviews.filter((r) => r.paintingId === p.id);
      const count = matched.length;
      const avg = count > 0 ? matched.reduce((s, r) => s + r.rating, 0) / count : 0;
      result.set(p.id, { avg, count });
    });
    return result;
  }, [paintings, reviews]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !comment.trim()) {
      setFormError('Mohon isi nama Anda serta ulasan atau kesan terhadap lukisan.');
      return;
    }

    onAddReview({
      paintingId: formPaintingId,
      reviewerName: reviewerName.trim(),
      reviewerRole: reviewerRole.trim() || 'Pengunjung Galeri',
      rating,
      comment: comment.trim(),
    });

    setFilterPaintingId(formPaintingId);
    setReviewerName('');
    setReviewerRole('');
    setComment('');
    setRating(5);
    setFormError('');
    setSubmitSuccess(true);
    window.setTimeout(() => setSubmitSuccess(false), 3500);
  };

  const displayedStar = hoverRating ?? rating;

  return (
    <section id="ulasan" className="border-b border-stone-200 bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        {/* Section Header + Overall Rating Summary */}
        <div className="grid grid-cols-1 gap-8 border-b border-stone-200 pb-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#9E7B3B]">
              Suara Pengunjung &amp; Apresiasi
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#1C1917] sm:text-4xl">
              Rating &amp; Ulasan Pengunjung Galeri
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-base">
              Lihat bagaimana para penikmat seni, pelajar, dan kurator menilai setiap mahakarya dalam koleksi kami, lalu bagikan penilaian bintang serta kesan Anda sendiri.
            </p>
          </div>

          {/* Aggregate Rating Card */}
          <div className="lg:col-span-5 border border-stone-200 bg-[#FBF9F5] p-5">
            <div className="flex items-center justify-between gap-6">
              <div>
                <span className="text-xs uppercase tracking-[0.14em] text-stone-500">
                  Skor Apresiasi Koleksi
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-serif text-4xl font-semibold text-[#1C1917] tabular-nums">
                    {stats.average.toFixed(1)}
                  </span>
                  <span className="text-sm text-stone-400 tabular-nums">/ 5.0</span>
                </div>
                <div className="mt-1.5 flex items-center gap-1" aria-label={`Rata-rata ${stats.average.toFixed(1)} dari 5 bintang`}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-3.5 w-3.5 ${
                        star <= Math.round(stats.average)
                          ? 'fill-[#9E7B3B] text-[#9E7B3B]'
                          : 'text-stone-300'
                      }`}
                    />
                  ))}
                  <span className="ml-1.5 text-xs text-stone-600 tabular-nums">
                    ({stats.total} ulasan)
                  </span>
                </div>
              </div>

              <div className="flex-1 max-w-[190px] space-y-1">
                {stats.counts.map(({ star, count }) => {
                  const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                  return (
                    <div key={star} className="flex items-center gap-2 text-[11px] text-stone-600 tabular-nums">
                      <span className="w-6 text-right">{star}★</span>
                      <div className="h-1.5 flex-1 bg-stone-200 overflow-hidden">
                        <div
                          className="h-full bg-[#9E7B3B]"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-5 text-stone-400">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Painting Filter Strip */}
        <div
          role="tablist"
          aria-label="Filter ulasan berdasarkan lukisan"
          className="mt-8 flex flex-wrap gap-1.5 border-b border-stone-200 pb-5"
        >
          <button
            type="button"
            role="tab"
            aria-selected={filterPaintingId === 'all'}
            onClick={() => setFilterPaintingId('all')}
            className={`min-h-[36px] px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
              filterPaintingId === 'all'
                ? 'bg-[#1C1917] text-[#FBF9F5]'
                : 'border border-stone-200 bg-[#FBF9F5] text-stone-600 hover:border-[#9E7B3B] hover:text-[#1C1917]'
            }`}
          >
            Semua Lukisan ({reviews.length})
          </button>

          {paintings.map((painting) => {
            const active = filterPaintingId === painting.id;
            const summary = paintingRatingSummary.get(painting.id);
            return (
              <button
                key={painting.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilterPaintingId(painting.id)}
                className={`min-h-[36px] px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-[#1C1917] text-[#FBF9F5]'
                    : 'border border-stone-200 bg-[#FBF9F5] text-stone-600 hover:border-[#9E7B3B] hover:text-[#1C1917]'
                }`}
              >
                <span>{painting.title}</span>
                {summary && summary.count > 0 && (
                  <span className={`ml-1.5 tabular-nums ${active ? 'text-[#E5D3A8]' : 'text-[#9E7B3B]'}`}>
                    ★ {summary.avg.toFixed(1)}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Main Content Grid: Reviews List + Rating Submission Form */}
        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
          {/* Left 7 Cols: Reviews List */}
          <div className="lg:col-span-7 space-y-4">
            {filteredReviews.length === 0 ? (
              <div className="border border-stone-200 bg-[#FBF9F5] p-10 text-center">
                <MessageSquareQuote className="mx-auto h-8 w-8 text-stone-300" strokeWidth={1.5} />
                <p className="mt-3 font-serif text-xl font-medium text-[#1C1917]">
                  Belum ada ulasan untuk lukisan ini
                </p>
                <p className="mt-1 text-sm text-stone-500">
                  Jadilah pengunjung pertama yang memberikan rating dan catatan apresiasi melalui formulir di samping.
                </p>
              </div>
            ) : (
              filteredReviews.map((review) => {
                const painting = paintingMap.get(review.paintingId);
                return (
                  <article
                    key={review.id}
                    className="border border-stone-200 bg-[#FBF9F5] p-5 sm:p-6 transition-colors hover:border-[#9E7B3B]"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      {/* Artwork Mini Anchor */}
                      {painting && (
                        <button
                          type="button"
                          onClick={() => onSelectPainting(painting)}
                          className="group flex items-center gap-3.5 text-left cursor-pointer"
                        >
                          <div className="h-14 w-14 shrink-0 overflow-hidden border border-stone-300 bg-[#EAE3D5]">
                            <SafeArtworkImage
                              src={painting.imageUrl}
                              alt={painting.title}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <div>
                            <h3 className="font-serif text-lg font-semibold text-[#1C1917] group-hover:text-[#9E7B3B] transition-colors">
                              {painting.title}
                            </h3>
                            <p className="text-xs text-stone-500">
                              {painting.artist} <span aria-hidden="true">·</span> {painting.yearDisplay}
                            </p>
                          </div>
                        </button>
                      )}

                      {/* Explicit Star Rating + Numeric Value */}
                      <div className="flex items-center gap-2 self-start shrink-0">
                        <div className="flex items-center gap-0.5" aria-hidden="true">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`h-3.5 w-3.5 ${
                                s <= review.rating
                                  ? 'fill-[#9E7B3B] text-[#9E7B3B]'
                                  : 'text-stone-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-semibold text-[#1C1917] tabular-nums">
                          {review.rating}.0 / 5
                        </span>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-stone-700">
                      “{review.comment}”
                    </p>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-stone-200/80 pt-3 text-xs text-stone-500">
                      <span>
                        <strong className="font-medium text-[#1C1917]">{review.reviewerName}</strong>
                        <span aria-hidden="true" className="mx-1.5">·</span>
                        <span>{review.reviewerRole}</span>
                      </span>
                      <span className="tabular-nums">{review.dateLabel}</span>
                    </div>
                  </article>
                );
              })
            )}
          </div>

          {/* Right 5 Cols: Interactive Rating Submission Form */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="border border-stone-200 bg-[#FBF9F5] p-6 sm:p-7 space-y-4"
            >
              <div className="border-b border-stone-200 pb-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#9E7B3B]">
                  Buku Tamu Kuratorial
                </p>
                <h3 className="mt-1 font-serif text-2xl font-semibold text-[#1C1917]">
                  Beri Rating &amp; Ulasan Anda
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-stone-600">
                  Bagikan penilaian Anda terhadap karya, audio guide, atau kisah sejarah di galeri ini.
                </p>
              </div>

              {submitSuccess && (
                <div
                  role="status"
                  className="flex items-center gap-2 border border-emerald-700/30 bg-emerald-50 px-3.5 py-2.5 text-xs text-emerald-900"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                  <span>Terima kasih! Rating dan ulasan Anda telah ditampilkan.</span>
                </div>
              )}

              {formError && (
                <div
                  role="alert"
                  className="border border-rose-300 bg-rose-50 px-3.5 py-2.5 text-xs text-rose-900"
                >
                  {formError}
                </div>
              )}

              {/* Choose Painting */}
              <div>
                <label htmlFor="rating-painting-select" className="block text-xs font-medium text-stone-700 mb-1.5">
                  Pilih Lukisan yang Dinilai *
                </label>
                <select
                  id="rating-painting-select"
                  value={formPaintingId}
                  onChange={(e) => setFormPaintingId(e.target.value)}
                  className="w-full min-h-[42px] border border-stone-300 bg-white px-3.5 py-2 text-sm text-[#1C1917] focus:border-[#9E7B3B] focus:outline-none cursor-pointer"
                >
                  {paintings.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} — {p.artist}
                    </option>
                  ))}
                </select>
              </div>

              {/* Interactive Star Picker */}
              <div>
                <span className="block text-xs font-medium text-stone-700 mb-1.5">
                  Penilaian Bintang *
                </span>
                <div className="flex items-center justify-between gap-3 border border-stone-300 bg-white px-3.5 py-2.5">
                  <div className="flex items-center gap-1" role="radiogroup" aria-label="Pilih rating 1 sampai 5 bintang">
                    {[1, 2, 3, 4, 5].map((starValue) => {
                      const active = starValue <= displayedStar;
                      return (
                        <button
                          key={starValue}
                          type="button"
                          role="radio"
                          aria-checked={rating === starValue}
                          aria-label={`Beri ${starValue} bintang`}
                          onMouseEnter={() => setHoverRating(starValue)}
                          onMouseLeave={() => setHoverRating(null)}
                          onClick={() => setRating(starValue)}
                          className="p-1 transition-transform hover:scale-110 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#9E7B3B]"
                        >
                          <Star
                            className={`h-5 w-5 transition-colors ${
                              active
                                ? 'fill-[#9E7B3B] text-[#9E7B3B]'
                                : 'text-stone-300'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-xs font-medium text-[#9E7B3B] tabular-nums">
                    {RATING_LABELS[displayedStar]}
                  </span>
                </div>
              </div>

              {/* Reviewer Name & Role */}
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div>
                  <label htmlFor="reviewer-name" className="block text-xs font-medium text-stone-700 mb-1.5">
                    Nama Anda *
                  </label>
                  <input
                    id="reviewer-name"
                    type="text"
                    required
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="cth. Kirana Larasati"
                    className="w-full min-h-[42px] border border-stone-300 bg-white px-3.5 py-2 text-sm text-[#1C1917] focus:border-[#9E7B3B] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="reviewer-role" className="block text-xs font-medium text-stone-700 mb-1.5">
                    Profesi / Kota (Opsional)
                  </label>
                  <input
                    id="reviewer-role"
                    type="text"
                    value={reviewerRole}
                    onChange={(e) => setReviewerRole(e.target.value)}
                    placeholder="cth. Mahasiswa · Bandung"
                    className="w-full min-h-[42px] border border-stone-300 bg-white px-3.5 py-2 text-sm text-[#1C1917] focus:border-[#9E7B3B] focus:outline-none"
                  />
                </div>
              </div>

              {/* Review Comment */}
              <div>
                <label htmlFor="reviewer-comment" className="block text-xs font-medium text-stone-700 mb-1.5">
                  Kesan &amp; Ulasan Singkat *
                </label>
                <textarea
                  id="reviewer-comment"
                  rows={4}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Apa yang paling berkesan dari lukisan, palet warna, atau kisah sejarahnya?"
                  className="w-full border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-[#1C1917] focus:border-[#9E7B3B] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="flex min-h-[44px] w-full items-center justify-center gap-2 bg-[#1C1917] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#FBF9F5] transition-colors hover:bg-[#9E7B3B] cursor-pointer"
              >
                <Star className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Kirim Rating &amp; Ulasan</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
