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
            { id: 1, question: 'Quelle est la solution de x + 2 = 5 ?', answer: 'x = 3', themeId: 1 },
            { id: 2, question: 'Développer (a + b)^2.', answer: 'a^2 + 2ab + b^2', themeId: 1 },
          ],
        },
        {
          id: 2,
          name: 'Géométrie',
          categoryId: 1,
          cards: [
            { id: 3, question: 'Quelle est la somme des angles d’un triangle ?', answer: '180 degrés', themeId: 2 },
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
            { id: 4, question: 'Comment dit-on "chien" en anglais ?', answer: 'Dog', themeId: 3 },
            { id: 5, question: 'Traduire : "I am learning Angular."', answer: 'J’apprends Angular.', themeId: 3 },
          ],
        },
        {
          id: 4,
          name: 'Espagnol',
          categoryId: 2,
          cards: [
            { id: 6, question: 'Traduire : "Bonjour"', answer: 'Hola', themeId: 4 },
          ],
        },
      ],
    },
  ];

  private categories = new BehaviorSubject<Category[]>(this.initialCategories);

  categories$ = this.categories.asObservable();

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
      // Retirer le thème de la catégorie
      const themeIndex = currentCategories[categoryIndex].themes.findIndex(t => t.id === id);
      if (themeIndex !== -1) {
        currentCategories[categoryIndex].themes.splice(themeIndex, 1);
      }
      this.categories.next([...currentCategories]);
    }
  }

  addCard(card: Card) {
    const currentCategories = this.categories.value;
    const category = currentCategories.find(c => c.themes.some(t => t.id === card.themeId));

    if (category) {
      const theme = category.themes.find(t => t.id === card.themeId);
      if (theme) {
        theme.cards.push(card);  // Ajout de la carte dans le thème
        this.categories.next([...currentCategories]);
      }
    }
  }

  deleteCard(id: number) {
    const currentCategories = this.categories.value;
    const category = currentCategories.find(c => c.themes.some(t => t.cards.some(card => card.id === id)));

    if (category) {
      const theme = category.themes.find(t => t.cards.some(card => card.id === id));
      if (theme) {
        const cardIndex = theme.cards.findIndex(card => card.id === id);
        if (cardIndex !== -1) {
          theme.cards.splice(cardIndex, 1);
        }
      }
      this.categories.next([...currentCategories]);
    }
  }
}
