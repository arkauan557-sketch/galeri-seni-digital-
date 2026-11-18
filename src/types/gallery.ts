export type ArtMovement =
  | 'Renaisans'
  | 'Barok'
  | 'Impresionisme'
  | 'Post-Impresionisme'
  | 'Ukiyo-e'
  | 'Ekspresionisme'
  | 'Surealisme'
  | 'Simbolisme';

export interface ColorSwatch {
  name: string;
  hex: string;
  pigmentNote: string;
}

export interface Painting {
  id: string;
  accessionNumber: string;
  title: string;
  englishTitle: string;
  artist: string;
  artistLifespan: string;
  nationality: string;
  year: number;
  yearDisplay: string;
  movement: ArtMovement;
  medium: string;
  dimensions: string;
  museumLocation: string;
  imageUrl: string;
  aspectRatio: '3:4' | '4:3' | '1:1';
  featuredWeekly?: boolean;
  quote: string;
  quoteAttribution: string;
  summary: string;
  history: {
    background: string;
    symbolism: string;
    mysteryAndFacts: string;
  };
  palette: ColorSwatch[];
  audioGuide: {
    durationSeconds: number;
    narrator: string;
    segments: {
      timeSeconds: number;
      label: string;
      transcript: string;
    }[];
  };
  reproductionBasePrice: number;
}

export interface EraArticle {
  id: string;
  era: string;
  period: string;
  title: string;
  subtitle: string;
  readTime: string;
  keyFigures: string;
  leadParagraph: string;
  bodyParagraphs: string[];
  pullQuote: string;
  figureCaption: string;
  imageUrl: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  imageUrl?: string;
  imageHint?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface VisitorReview {
  id: string;
  paintingId: string;
  reviewerName: string;
  reviewerRole: string;
  rating: number;
  comment: string;
  dateLabel: string;
}

export interface WallPreset {
  id: string;
  name: string;
  hex: string;
  isDark: boolean;
}

export type FrameStyleId = 'gold' | 'walnut' | 'charcoal';
