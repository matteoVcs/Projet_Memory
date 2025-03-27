export interface Category {
  id: number;
  name: string;
  themes: Theme[];
}

export interface Theme {
  id: number;
  name: string;
  categoryId: number; // Ajout du categoryId pour lier un thème à une catégorie
  cards: Card[];
}

export interface Card {
  id: number;
  question: string;
  answer: string;
  themeId: number; // Ajout du themeId pour lier une carte à un thème
}
