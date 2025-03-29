import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User, GeneralDatabase, Category, Theme, Card, SpacedRepetition } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private localStorageUserKey = 'user_categories';
  private localStorageGeneralKey = 'general_categories';

  private userData: User = {
    categories: [],
  };

  private generalDatabase: GeneralDatabase = {
    categories: [],
  };

  private userCategories = new BehaviorSubject<Category[]>(this.userData.categories);
  userCategories$ = this.userCategories.asObservable();

  private generalCategories = new BehaviorSubject<Category[]>(this.generalDatabase.categories);
  generalCategories$ = this.generalCategories.asObservable();

  private idCounter = 0;

  constructor() {
    this.loadData();
  }

  private loadData() {
    // Vérifier si les catégories sont présentes et non vides dans localStorage pour l'utilisateur
    const userCategories = localStorage.getItem(this.localStorageUserKey);
    if (userCategories) {
      this.userData.categories = JSON.parse(userCategories);
      // Vérifier si les catégories utilisateur sont vides
      if (this.userData.categories.length === 0) {
        this.initializeDefaultUserCategories();  // Initialiser avec des données par défaut si vide
      } else {
        this.userCategories.next([...this.userData.categories]);
      }
    } else {
      this.initializeDefaultUserCategories();  // Initialiser avec des données par défaut si localStorage est vide
    }

    // Vérifier si les catégories sont présentes et non vides dans localStorage pour les catégories générales
    const generalCategories = localStorage.getItem(this.localStorageGeneralKey);
    if (generalCategories) {
      this.generalDatabase.categories = JSON.parse(generalCategories);
      // Vérifier si les catégories générales sont vides
      if (this.generalDatabase.categories.length === 0) {
        this.initializeDefaultGeneralCategories();  // Initialiser avec des données par défaut si vide
      } else {
        this.generalCategories.next([...this.generalDatabase.categories]);
      }
    } else {
      this.initializeDefaultGeneralCategories();  // Initialiser avec des données par défaut si localStorage est vide
    }
  }

  private initializeDefaultUserCategories() {
    // Données de test réalistes pour les catégories utilisateur
    this.userData.categories = [
      {
        id: this.generateNumericId(),
        name: 'Mathematics',
        themes: [
          {
            id: this.generateNumericId(),
            name: 'Algebra',
            categoryId: 0,  // L'id de la catégorie parent
            cards: [
              {
                id: this.generateNumericId(),
                question: 'What is the quadratic formula?',
                answer: 'x = (-b ± √(b²-4ac)) / 2a',
                media: null,
                spacedRepetition: {
                  level: 0,
                  nextReviewDate: new Date().toISOString(),
                  levelGoal: 5,
                },
                themeId: 0,
              },
              {
                id: this.generateNumericId(),
                question: 'Simplify x^2 + 5x + 6.',
                answer: '(x + 2)(x + 3)',
                media: null,
                spacedRepetition: {
                  level: 0,
                  nextReviewDate: new Date().toISOString(),
                  levelGoal: 5,
                },
                themeId: 0,
              },
            ],
          },
          {
            id: this.generateNumericId(),
            name: 'Geometry',
            categoryId: 0,
            cards: [
              {
                id: this.generateNumericId(),
                question: 'What is the Pythagorean Theorem?',
                answer: 'a² + b² = c²',
                media: null,
                spacedRepetition: {
                  level: 0,
                  nextReviewDate: new Date().toISOString(),
                  levelGoal: 5,
                },
                themeId: 1,
              },
              {
                id: this.generateNumericId(),
                question: 'What is the area of a circle?',
                answer: 'πr²',
                media: null,
                spacedRepetition: {
                  level: 0,
                  nextReviewDate: new Date().toISOString(),
                  levelGoal: 5,
                },
                themeId: 1,
              },
            ],
          },
        ],
      },
      {
        id: this.generateNumericId(),
        name: 'Physics',
        themes: [
          {
            id: this.generateNumericId(),
            name: 'Mechanics',
            categoryId: 1,
            cards: [
              {
                id: this.generateNumericId(),
                question: 'What is Newton\'s Second Law of Motion?',
                answer: 'F = ma',
                media: null,
                spacedRepetition: {
                  level: 0,
                  nextReviewDate: new Date().toISOString(),
                  levelGoal: 5,
                },
                themeId: 0,
              },
              {
                id: this.generateNumericId(),
                question: 'What is the formula for kinetic energy?',
                answer: 'KE = 1/2 mv²',
                media: null,
                spacedRepetition: {
                  level: 0,
                  nextReviewDate: new Date().toISOString(),
                  levelGoal: 5,
                },
                themeId: 0,
              },
            ],
          },
        ],
      },
    ];
    this.userCategories.next([...this.userData.categories]);
    this.saveData();
  }

  private initializeDefaultGeneralCategories() {
    this.generalDatabase.categories = [
      {
        id: this.generateNumericId(),
        name: 'General Knowledge',
        themes: [
          {
            id: this.generateNumericId(),
            name: 'Geography',
            categoryId: 0,  // L'id de la catégorie parent
            cards: [
              {
                id: this.generateNumericId(),
                question: 'What is the capital of France?',
                answer: 'Paris',
                media: null,
                spacedRepetition: {
                  level: 0,
                  nextReviewDate: new Date().toISOString(),
                  levelGoal: 5,
                },
                themeId: 0,
              },
              {
                id: this.generateNumericId(),
                question: 'Which continent is Egypt located on?',
                answer: 'Africa',
                media: null,
                spacedRepetition: {
                  level: 0,
                  nextReviewDate: new Date().toISOString(),
                  levelGoal: 5,
                },
                themeId: 0,
              },
            ],
          },
          {
            id: this.generateNumericId(),
            name: 'History',
            categoryId: 0,
            cards: [
              {
                id: this.generateNumericId(),
                question: 'Who was the first president of the United States?',
                answer: 'George Washington',
                media: null,
                spacedRepetition: {
                  level: 0,
                  nextReviewDate: new Date().toISOString(),
                  levelGoal: 5,
                },
                themeId: 1,
              },
              {
                id: this.generateNumericId(),
                question: 'In which year did World War II end?',
                answer: '1945',
                media: null,
                spacedRepetition: {
                  level: 0,
                  nextReviewDate: new Date().toISOString(),
                  levelGoal: 5,
                },
                themeId: 1,
              },
            ],
          },
        ],
      },
      {
        id: this.generateNumericId(),
        name: 'Literature',
        themes: [
          {
            id: this.generateNumericId(),
            name: 'Shakespeare',
            categoryId: 2,
            cards: [
              {
                id: this.generateNumericId(),
                question: 'What is the title of Shakespeare\'s play about two star-crossed lovers?',
                answer: 'Romeo and Juliet',
                media: null,
                spacedRepetition: {
                  level: 0,
                  nextReviewDate: new Date().toISOString(),
                  levelGoal: 5,
                },
                themeId: 0,
              },
              {
                id: this.generateNumericId(),
                question: 'Which play features the character Hamlet?',
                answer: 'Hamlet',
                media: null,
                spacedRepetition: {
                  level: 0,
                  nextReviewDate: new Date().toISOString(),
                  levelGoal: 5,
                },
                themeId: 0,
              },
            ],
          },
        ],
      },
    ];
    this.generalCategories.next([...this.generalDatabase.categories]);
    this.saveData();
  }

  saveData() {
    localStorage.setItem(this.localStorageUserKey, JSON.stringify(this.userData.categories));
    localStorage.setItem(this.localStorageGeneralKey, JSON.stringify(this.generalDatabase.categories));
  }

  generateNumericId(): number {
    return Date.now() + this.idCounter++;
  }

  addCard(card: Card) {
    card.id = card.id || this.generateNumericId();
    const theme = this.userData.categories.flatMap(c => c.themes).find(t => t.id === card.themeId);
    if (theme) {
      theme.cards.push(card);
      this.userCategories.next([...this.userData.categories]);
      this.saveData();
    }
  }

  deleteCard(id: number) {
    this.userData.categories.forEach(category => {
      category.themes.forEach(theme => {
        theme.cards = theme.cards.filter(card => card.id !== id);
      });
    });
    this.userCategories.next([...this.userData.categories]);
    this.saveData();
  }

  updateCardRepetition(card: Card, isCorrect: boolean) {
    if (!card.spacedRepetition) return;

    if (isCorrect) {
      if (card.spacedRepetition.level < card.spacedRepetition.levelGoal) {
        card.spacedRepetition.level++;
      }
      const nextInterval = Math.pow(2, card.spacedRepetition.level);
      card.spacedRepetition.nextReviewDate = new Date(Date.now() + nextInterval * 24 * 60 * 60 * 1000).toISOString();
    } else {
      card.spacedRepetition.level = 0;
      card.spacedRepetition.nextReviewDate = new Date(Date.now()).toISOString();
    }
    this.userCategories.next([...this.userData.categories]);
    this.saveData();
  }

  addCategory(category: Category, isGeneral: boolean = false) {
    category.id = category.id || this.generateNumericId();
    if (isGeneral) {
      this.generalDatabase.categories.push(category);
      this.generalCategories.next([...this.generalDatabase.categories]);
    } else {
      this.userData.categories.push(category);
      this.userCategories.next([...this.userData.categories]);
    }
    this.saveData();
  }

  deleteCategory(id: number) {
    this.userData.categories = this.userData.categories.filter(c => c.id !== id);
    this.userCategories.next([...this.userData.categories]);
    this.saveData();
  }

  addTheme(theme: Theme) {
    theme.id = theme.id || this.generateNumericId();
    const category = this.userData.categories.find(c => c.id === theme.categoryId);
    if (category) {
      category.themes.push(theme);
      this.userCategories.next([...this.userData.categories]);
      this.saveData();
    }
  }

  deleteTheme(id: number) {
    this.userData.categories.forEach(category => {
      category.themes = category.themes.filter(t => t.id !== id);
    });
    this.userCategories.next([...this.userData.categories]);
    this.saveData();
  }

  importThemeFromGeneral(themeId: number, categoryId: number) {
    const theme = this.generalDatabase.categories.flatMap(c => c.themes).find(t => t.id === themeId);
    if (theme) {
      const category = this.userData.categories.find(c => c.id === categoryId);
      if (category) {
        category.themes.push({ ...theme, cards: [...theme.cards] });
        this.userCategories.next([...this.userData.categories]);
        this.saveData();
      }
    }
  }
}
