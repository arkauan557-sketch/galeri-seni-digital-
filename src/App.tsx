/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AboutContactSection } from './components/AboutContactSection';
import { EducationQuizSection } from './components/EducationQuizSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { MuseumGallery } from './components/MuseumGallery';
import { Navbar } from './components/Navbar';
import { PaintingDetailModal } from './components/PaintingDetailModal';
import { VisitorRatingsSection } from './components/VisitorRatingsSection';
import { PAINTINGS } from './data/paintings';
import { INITIAL_REVIEWS } from './data/reviews';
import { Painting, VisitorReview } from './types/gallery';

const SECTION_IDS = ['beranda', 'galeri', 'edukasi', 'ulasan', 'tentang'];

export default function App() {
  const [selectedPainting, setSelectedPainting] = useState<Painting | null>(null);
  const [activeSection, setActiveSection] = useState('beranda');
  const [preselectedRatingPaintingId, setPreselectedRatingPaintingId] = useState<string | null>(null);
  const [reviews, setReviews] = useState<VisitorReview[]>(() => {
    try {
      const saved = localStorage.getItem('artvibe_reviews_v1');
      return saved ? (JSON.parse(saved) as VisitorReview[]) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('artvibe_reviews_v1', JSON.stringify(reviews));
    } catch {
      // Ignore storage quota errors in restricted sandboxes
    }
  }, [reviews]);

  // Track visible section in viewport for top nav active underline
  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.1, 0.35] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const spotlights = useMemo(
    () => PAINTINGS.filter((p) => p.featuredWeekly),
    []
  );

  const handleNavigate = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleRatePainting = useCallback(
    (paintingId: string) => {
      setSelectedPainting(null);
      setPreselectedRatingPaintingId(paintingId);
      handleNavigate('ulasan');
    },
    [handleNavigate]
  );

  const handleAddReview = useCallback(
    (incoming: Omit<VisitorReview, 'id' | 'dateLabel'>) => {
      const dateLabel = new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date());

      const newReview: VisitorReview = {
        ...incoming,
        id: `rev-${Date.now()}`,
        dateLabel,
      };
      setReviews((prev) => [newReview, ...prev]);
    },
    []
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917]">
      <Navbar
        reviewCount={reviews.length}
        onRateClick={() => handleNavigate('ulasan')}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        <HeroSection
          spotlights={spotlights.length > 0 ? spotlights : PAINTINGS.slice(0, 3)}
          onSelectPainting={setSelectedPainting}
          onExploreGallery={() => handleNavigate('galeri')}
        />

        <MuseumGallery
          paintings={PAINTINGS}
          reviews={reviews}
          onSelectPainting={setSelectedPainting}
        />

        <EducationQuizSection />

        <VisitorRatingsSection
          paintings={PAINTINGS}
          reviews={reviews}
          preselectedPaintingId={preselectedRatingPaintingId}
          onAddReview={handleAddReview}
          onSelectPainting={setSelectedPainting}
        />

        <AboutContactSection />
      </main>

      <Footer onNavigate={handleNavigate} />

      <PaintingDetailModal
        painting={selectedPainting}
        reviews={reviews}
        onClose={() => setSelectedPainting(null)}
        onRatePainting={handleRatePainting}
      />
    </div>
  );
}
