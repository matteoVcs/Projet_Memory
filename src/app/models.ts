export interface Category {
  id: number;
  name: string;
  themes: Theme[];
}

export interface Theme {
  id: number;
  name: string;
  categoryId: number;
  cards: Card[];
}

export interface Card {
  id: number;
  question: string;
  answer: string;
  media: File | null;
  spacedRepetition: {
    level: number;
    nextReviewDate: Date;
    lastReviewDate?: Date;
    isNew: boolean;
    levelGoal: number;
  };
  themeId: number;
}

