import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category, Theme, Card } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private initialCategories: Category[] = [
    {
      id: 1,
      name: 'Mathématiques',
      themes: [
        {
          id: 1,
          name: 'Algèbre',
          categoryId: 1,
          cards: [
            {
              id: 1,
              question: 'Quelle est la solution de x + 2 = 5 ?',
              answer: 'x = 3',
              media: null,
              spacedRepetition: {
                level: 0,
                nextReviewDate: new Date(),
                isNew: true,
                levelGoal: 5,
              },
              themeId: 1,
            },
            {
              id: 2,
              question: 'Développer (a + b)^2.',
              answer: 'a² + 2ab + b²',
              media: null,
              spacedRepetition: {
                level: 0,
                nextReviewDate: new Date(),
                isNew: true,
                levelGoal: 6,
              },
              themeId: 1,
            },
          ],
        },
        {
          id: 2,
          name: 'Géométrie',
          categoryId: 1,
          cards: [
            {
              id: 3,
              question: 'Quelle est la somme des angles d’un triangle ?',
              answer: '180 degrés',
              media: null,
              spacedRepetition: {
                level: 0,
                nextReviewDate: new Date(),
                isNew: true,
                levelGoal: 4,
              },
              themeId: 2,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'Langues',
      themes: [
        {
          id: 3,
          name: 'Anglais',
          categoryId: 2,
          cards: [
            {
              id: 4,
              question: 'Comment dit-on "chien" en anglais ?',
              answer: 'Dog',
              media: null,
              spacedRepetition: {
                level: 0,
                nextReviewDate: new Date(),
                isNew: true,
                levelGoal: 3,
              },
              themeId: 3,
            },
          ],
        },
      ],
    },
  ];

  private categories = new BehaviorSubject<Category[]>(this.initialCategories);
  categories$ = this.categories.asObservable();

  addCard(card: Card) {
    const currentCategories = this.categories.value;
    const category = currentCategories.find(c =>
      c.themes.some(t => t.id === card.themeId)
    );

    if (category) {
      const theme = category.themes.find(t => t.id === card.themeId);
      if (theme) {
        theme.cards.push(card);
        this.categories.next([...currentCategories]);
      }
    }
  }

  deleteCard(id: number) {
    const currentCategories = this.categories.value;
    const category = currentCategories.find(c =>
      c.themes.some(t => t.cards.some(card => card.id === id))
    );

    if (category) {
      const theme = category.themes.find(t =>
        t.cards.some(card => card.id === id)
      );
      if (theme) {
        const cardIndex = theme.cards.findIndex(card => card.id === id);
        if (cardIndex !== -1) {
          theme.cards.splice(cardIndex, 1);
        }
      }
      this.categories.next([...currentCategories]);
    }
  }

  updateCardRepetition(card: Card, isCorrect: boolean) {
    if (!card.spacedRepetition) return;

    const today = new Date();
    card.spacedRepetition.lastReviewDate = today;

    if (isCorrect) {
      if (card.spacedRepetition.level < card.spacedRepetition.levelGoal) {
        card.spacedRepetition.level++;
      }
      const nextInterval = Math.pow(2, card.spacedRepetition.level); // 2^n jours
      card.spacedRepetition.nextReviewDate = new Date(
        today.getTime() + nextInterval * 24 * 60 * 60 * 1000
      );
    } else {
      card.spacedRepetition.level = 0; // Réinitialisation en cas d'erreur
      card.spacedRepetition.nextReviewDate = new Date(
        today.getTime() + 24 * 60 * 60 * 1000
      );
    }

    card.spacedRepetition.isNew = false;
    this.categories.next([...this.categories.value]);
  }

  addCategory(category: Category) {
    const current = this.categories.value;
    this.categories.next([...current, category]);
  }

  deleteCategory(id: number) {
    const current = this.categories.value.filter((c) => c.id !== id);
    this.categories.next(current);
  }

  addTheme(theme: Theme) {
    const currentCategories = this.categories.value;
    const categoryIndex = currentCategories.findIndex((c) => c.id === theme.categoryId);

    if (categoryIndex !== -1) {
      currentCategories[categoryIndex].themes.push(theme);
      this.categories.next([...currentCategories]);
    }
  }

  deleteTheme(id: number) {
    const currentCategories = this.categories.value;
    const categoryIndex = currentCategories.findIndex((c) => c.themes.some(t => t.id === id));

    if (categoryIndex !== -1) {
      const themeIndex = currentCategories[categoryIndex].themes.findIndex(t => t.id === id);
      if (themeIndex !== -1) {
        currentCategories[categoryIndex].themes.splice(themeIndex, 1);
      }
      this.categories.next([...currentCategories]);
    }
  }

  /**
   * Mettre un thème en révision.
   * @param theme Le thème à marquer pour révision.
   */
  markThemeForReview(theme: Theme) {
    const today = new Date();
    for (const card of theme.cards) {
      if (card.spacedRepetition) {
        // Marquer toutes les cartes du thème comme prêtes pour révision
        card.spacedRepetition.nextReviewDate = today;
        card.spacedRepetition.isNew = false;
      }
    }

    // Mise à jour des catégories pour notifier les abonnés
    const currentCategories = this.categories.value;
    this.categories.next([...currentCategories]);
  }
}
