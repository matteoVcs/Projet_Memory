export interface User {
  categories: Category[];
}

export interface GeneralDatabase {
  categories: Category[];
}

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
  media: string | null;
  spacedRepetition: SpacedRepetition;
  themeId: number;
}

export interface SpacedRepetition {
  level: number;
  nextReviewDate: string;
  levelGoal: number;
}
