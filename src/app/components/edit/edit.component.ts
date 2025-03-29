import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Category, Theme, Card } from '../../models';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  imports: [RouterModule, FormsModule, NgForOf],
})
export class EditComponent {
  categories: Category[] = [];
  themes: Theme[] = [];

  constructor(private dataService: DataService) {
    this.loadUserCategories();
  }

  loadUserCategories() {
    this.dataService.userCategories$.subscribe((categories) => {
      this.categories = categories;
    });
  }

  saveUserCategories() {
    this.dataService.saveData(); // Appel à saveData pour sauvegarder dans localStorage
  }

  addCategory(categoryName: string) {
    if (!categoryName.trim()) {
      alert("Le nom de la catégorie ne peut pas être vide.");
      return;
    }

    const newCategory: Category = {
      id: this.dataService.generateNumericId(), // Utilise la méthode générant des IDs numériques
      name: categoryName,
      themes: [],
    };

    this.dataService.addCategory(newCategory);
    this.saveUserCategories();
  }

  addTheme(themeName: string, categoryId: number) {
    if (!categoryId) {
      alert("Veuillez sélectionner une catégorie.");
      return;
    }

    if (!themeName.trim()) {
      alert("Le nom du thème ne peut pas être vide.");
      return;
    }

    const newTheme: Theme = {
      id: this.dataService.generateNumericId(), // Utilise la méthode générant des IDs numériques
      name: themeName,
      categoryId,
      cards: [],
    };

    this.dataService.addTheme(newTheme);
    this.saveUserCategories();
  }

  addCard(cardQuestion: string, cardAnswer: string, mediaFile: string | null, themeId: number, levelGoal: number) {
    if (!cardQuestion.trim() || !cardAnswer.trim()) {
      alert("La question et la réponse de la carte ne peuvent pas être vides.");
      return;
    }

    const newCard: Card = {
      id: this.dataService.generateNumericId(), // Utilise la méthode générant des IDs numériques
      question: cardQuestion,
      answer: cardAnswer,
      media: mediaFile,
      spacedRepetition: {
        level: 0,
        nextReviewDate: new Date(Date.now()).toISOString(),
        levelGoal,
      },
      themeId,
    };

    this.dataService.addCard(newCard);
    this.saveUserCategories();
  }

  deleteCategory(id: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
      this.dataService.deleteCategory(id);
      this.saveUserCategories();
    }
  }

  deleteTheme(id: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce thème ?")) {
      this.dataService.deleteTheme(id);
      this.saveUserCategories();
    }
  }

  deleteCard(id: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette carte ?")) {
      this.dataService.deleteCard(id);
      this.saveUserCategories();
    }
  }

  showCategory(e: EventTarget, name: string) {
    const allCategories = document.querySelectorAll('.categories');
    for (const category of Array.from(allCategories)) {
      category.classList.remove('flex', 'flex-col');
      category.classList.add('hidden');
    }
    const allButtons = document.querySelectorAll('.category-button');
    for (const button of Array.from(allButtons)) {
      button.classList.remove('bg-blue-500');
      button.classList.add('bg-white');
      let buttonChild = button.querySelector('button') as HTMLButtonElement;
      buttonChild.classList.remove('text-white');
      buttonChild.classList.add('text-blue');
      console.log(button);
    }

    let button = e as HTMLButtonElement;
    let buttonDiv = button.parentElement?.parentElement as HTMLButtonElement;
    buttonDiv.classList.remove('bg-white');
    buttonDiv.classList.add('bg-blue-500');
    button.classList.remove('text-blue');
    button.classList.add('text-white');
    console.log(button);

    const categoryElement = document.getElementById(name);
    if (categoryElement) {
      categoryElement.classList.remove('hidden');
      categoryElement.classList.add('flex', 'flex-col');
    }
  }
}
