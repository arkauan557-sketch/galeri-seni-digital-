import { useState } from 'react';
import { Award, BookOpen, CheckCircle2, HelpCircle, RotateCcw, XCircle } from 'lucide-react';
import { ERA_ARTICLES, QUIZ_QUESTIONS } from '../data/education';
import { SafeArtworkImage } from './SafeArtworkImage';

export function EducationQuizSection() {
  const [selectedEraId, setSelectedEraId] = useState(ERA_ARTICLES[0].id);

  // Quiz state
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const activeArticle =
    ERA_ARTICLES.find((a) => a.id === selectedEraId) ?? ERA_ARTICLES[0];

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIdx];
  const hasAnswered = selectedOption !== null;
  const isCorrect = selectedOption === currentQuestion.correctIndex;

  const handleChooseOption = (optionIndex: number) => {
    if (hasAnswered) return;
    setSelectedOption(optionIndex);
    if (optionIndex === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx + 1 >= QUIZ_QUESTIONS.length) {
      setQuizFinished(true);
    } else {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedOption(null);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setScore(0);
    setQuizFinished(false);
  };

  const getCuratorRank = (finalScore: number, total: number) => {
    const ratio = finalScore / total;
    if (ratio >= 0.85) return { title: 'Kurator Utama', note: 'Pemahaman Anda terhadap sejarah dan teknik maestro dunia sangat luar biasa.' };
    if (ratio >= 0.5) return { title: 'Sejarawan Seni Muda', note: 'Wawasan seni klasik Anda sudah kuat; jelajahi esai era di sebelah untuk memperdalam detail.' };
    return { title: 'Apresiator Galeri', note: 'Awal yang baik! Cobalah membaca kisah di balik setiap lukisan dan ulangi kuis kembali.' };
  };

  const rank = getCuratorRank(score, QUIZ_QUESTIONS.length);

  return (
    <section id="edukasi" className="border-b border-stone-200 bg-[#FBF9F5] py-16 lg:py-20">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        {/* Section Title */}
        <div className="border-b border-stone-200 pb-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#9E7B3B]">
            Pusat Studi &amp; Apresiasi
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-[#1C1917] sm:text-4xl">
            Ruang Edukasi &amp; Kuis Sejarah Seni
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-base">
            Telusuri perkembangan aliran seni rupa dari Renaisans hingga Post-Impresionisme, lalu uji kepekaan visual dan pengetahuan sejarah Anda lewat kuis interaktif.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left 7 Cols: Art History Era Reader */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-4 w-4 text-[#9E7B3B]" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-700">
                Artikel Ringkas Era Sejarah Seni
              </span>
            </div>

            {/* Era Tabs */}
            <div
              role="tablist"
              aria-label="Pilih era sejarah seni"
              className="flex flex-wrap gap-1.5 border-b border-stone-200 pb-4"
            >
              {ERA_ARTICLES.map((article) => {
                const active = article.id === selectedEraId;
                return (
                  <button
                    key={article.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedEraId(article.id)}
                    className={`min-h-[38px] px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                      active
                        ? 'bg-[#1C1917] text-[#FBF9F5]'
                        : 'border border-stone-200 bg-white text-stone-700 hover:border-[#9E7B3B]'
                    }`}
                  >
                    {article.era}
                  </button>
                );
              })}
            </div>

            {/* Editorial Article Container */}
            <article className="mt-6 border border-stone-200 bg-white p-6 sm:p-8 flex-1">
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                <span className="font-medium text-[#9E7B3B]">{activeArticle.period}</span>
                <span aria-hidden="true">·</span>
                <span>{activeArticle.readTime}</span>
                <span aria-hidden="true">·</span>
                <span>Tokoh: {activeArticle.keyFigures}</span>
              </div>

              <h3 className="mt-2 font-serif text-2xl font-semibold text-[#1C1917] sm:text-3xl">
                {activeArticle.title}
              </h3>
              <p className="mt-1 text-sm text-stone-500">{activeArticle.subtitle}</p>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-12 items-start">
                <div className="md:col-span-5">
                  <div className="overflow-hidden border border-stone-200 bg-[#F2EDE4]">
                    <div className="aspect-[4/3] w-full overflow-hidden">
                      <SafeArtworkImage
                        src={activeArticle.imageUrl}
                        alt={activeArticle.figureCaption}
                        title={activeArticle.era}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <p className="mt-2 font-serif text-xs italic text-stone-500">
                    {activeArticle.figureCaption}
                  </p>
                </div>

                <div className="md:col-span-7 space-y-4 text-sm leading-[1.8] text-stone-700">
                  <p className="first-letter:float-left first-letter:mr-2.5 first-letter:mt-1 first-letter:font-serif first-letter:text-4xl first-letter:font-semibold first-letter:leading-none first-letter:text-[#9E7B3B]">
                    {activeArticle.leadParagraph}
                  </p>
                  {activeArticle.bodyParagraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>

              <blockquote className="mt-6 border-t border-b border-stone-200 py-4 text-center font-serif text-lg italic text-[#292524] sm:text-xl">
                “{activeArticle.pullQuote}”
              </blockquote>
            </article>
          </div>

          {/* Right 5 Cols: Interactive Art History Quiz */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-[#9E7B3B]" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-700">
                  Kuis Tebak Lukisan &amp; Sejarah
                </span>
              </div>
              {!quizFinished && (
                <span className="text-xs font-mono text-stone-500 tabular-nums">
                  Skor: {score}/{QUIZ_QUESTIONS.length}
                </span>
              )}
            </div>

            <div className="flex-1 border border-stone-200 bg-white p-6 sm:p-7 flex flex-col justify-between">
              {quizFinished ? (
                <div className="my-auto py-4 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center border border-[#9E7B3B]/40 bg-[#FBF9F5] text-[#9E7B3B]">
                    <Award className="h-7 w-7" />
                  </div>
                  <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-[#9E7B3B]">
                    Hasil Evaluasi Kurator
                  </p>
                  <h3 className="mt-1 font-serif text-3xl font-semibold text-[#1C1917]">
                    {rank.title}
                  </h3>
                  <p className="mt-3 font-serif text-4xl font-semibold text-[#1C1917] tabular-nums">
                    {score} <span className="text-xl text-stone-400">/ {QUIZ_QUESTIONS.length}</span>
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">
                    {rank.note}
                  </p>

                  <button
                    type="button"
                    onClick={handleRestartQuiz}
                    className="mt-7 inline-flex min-h-[44px] items-center gap-2 bg-[#1C1917] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#FBF9F5] transition-colors hover:bg-[#9E7B3B] cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Ulangi Kuis Sejarah Seni</span>
                  </button>
                </div>
              ) : (
                <div>
                  {/* Progress Bar */}
                  <div className="flex items-center justify-between text-xs text-stone-500 tabular-nums mb-2">
                    <span>
                      Pertanyaan {currentQuestionIdx + 1} dari {QUIZ_QUESTIONS.length}
                    </span>
                    <span>
                      {Math.round(((currentQuestionIdx + 1) / QUIZ_QUESTIONS.length) * 100)}%
                    </span>
                  </div>
                  <div className="h-1 w-full bg-stone-100 overflow-hidden mb-5">
                    <div
                      className="h-full bg-[#9E7B3B] transition-all duration-300"
                      style={{
                        width: `${((currentQuestionIdx + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                      }}
                    />
                  </div>

                  {/* Question Image Clue */}
                  {currentQuestion.imageUrl && (
                    <div className="mb-4 overflow-hidden border border-stone-200 bg-[#F2EDE4]">
                      <div className="aspect-[16/9] w-full overflow-hidden">
                        <SafeArtworkImage
                          src={currentQuestion.imageUrl}
                          alt="Petunjuk visual kuis seni"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      {currentQuestion.imageHint && (
                        <p className="border-t border-stone-200 bg-[#FBF9F5] px-3 py-1.5 text-[11px] text-stone-600">
                          {currentQuestion.imageHint}
                        </p>
                      )}
                    </div>
                  )}

                  <h3 className="font-serif text-xl font-semibold leading-snug text-[#1C1917]">
                    {currentQuestion.question}
                  </h3>

                  {/* Answer Options */}
                  <div className="mt-5 space-y-2.5">
                    {currentQuestion.options.map((option, idx) => {
                      const isThisSelected = selectedOption === idx;
                      const isThisCorrect = idx === currentQuestion.correctIndex;

                      let buttonStyle =
                        'border-stone-200 bg-[#FBF9F5] text-[#1C1917] hover:border-[#9E7B3B]';
                      if (hasAnswered) {
                        if (isThisCorrect) {
                          buttonStyle =
                            'border-emerald-700 bg-emerald-50 text-emerald-950 font-medium';
                        } else if (isThisSelected && !isThisCorrect) {
                          buttonStyle =
                            'border-rose-700 bg-rose-50 text-rose-950';
                        } else {
                          buttonStyle = 'border-stone-200 bg-stone-50 text-stone-400';
                        }
                      }

                      return (
                        <button
                          key={option}
                          type="button"
                          disabled={hasAnswered}
                          onClick={() => handleChooseOption(idx)}
                          className={`flex min-h-[44px] w-full items-center justify-between gap-3 border px-4 py-2.5 text-left text-sm transition-colors ${
                            !hasAnswered ? 'cursor-pointer' : 'cursor-default'
                          } ${buttonStyle}`}
                        >
                          <span>{option}</span>
                          {hasAnswered && isThisCorrect && (
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" aria-label="Jawaban Benar" />
                          )}
                          {hasAnswered && isThisSelected && !isThisCorrect && (
                            <XCircle className="h-4 w-4 shrink-0 text-rose-700" aria-label="Jawaban Salah" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation & Next Action */}
                  {hasAnswered && (
                    <div className="mt-5 border-t border-stone-200 pt-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] mb-1 flex items-center gap-1.5">
                        {isCorrect ? (
                          <span className="text-emerald-800">Jawaban Anda Tepat</span>
                        ) : (
                          <span className="text-rose-800">Kurang Tepat</span>
                        )}
                      </p>
                      <p className="text-xs leading-relaxed text-stone-600">
                        {currentQuestion.explanation}
                      </p>

                      <button
                        type="button"
                        onClick={handleNextQuestion}
                        className="mt-4 flex min-h-[42px] w-full items-center justify-center bg-[#1C1917] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#FBF9F5] transition-colors hover:bg-[#9E7B3B] cursor-pointer"
                      >
                        {currentQuestionIdx + 1 >= QUIZ_QUESTIONS.length
                          ? 'Lihat Hasil Akhir Kuis'
                          : 'Pertanyaan Berikutnya →'}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
