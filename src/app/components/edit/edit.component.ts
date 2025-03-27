import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Category, Theme, Card } from '../../models';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  imports: [RouterModule, FormsModule, NgForOf]
})
export class EditComponent {
  categories: Category[] = [];
  themes: Theme[] = [];
  cards: Card[] = [];

  constructor(private dataService: DataService) {
    // Souscription pour obtenir les catégories, thèmes et cartes
    this.dataService.categories$.subscribe((categories) => {
      this.categories = categories;
    });
  }

  // Ajouter une nouvelle catégorie (en passant le nom en paramètre)
  addCategory(categoryName: string) {
    if (!categoryName.trim()) {
      alert("Le nom de la catégorie ne peut pas être vide.");
      return;
    }

    const id = Date.now();
    this.dataService.addCategory({ id, name: categoryName, themes: [] });
  }

  // Ajouter un nouveau thème dans une catégorie (en passant le nom du thème et l'ID de la catégorie)
  addTheme(themeName: string, categoryId: number) {
    if (!categoryId) {
      alert("Veuillez sélectionner une catégorie.");
      return;
    }

    if (!themeName.trim()) {
      alert("Le nom du thème ne peut pas être vide.");
      return;
    }

    const id = Date.now();
    this.dataService.addTheme({
      id,
      name: themeName,
      categoryId,
      cards: [],
    });
  }

  // Ajouter une nouvelle carte dans un thème (en passant la question et la réponse en paramètre)
  addCard(cardQuestion: string, cardAnswer: string, themeId: number) {
    if (!themeId) {
      alert("Veuillez sélectionner un thème.");
      return;
    }

    if (!cardQuestion.trim() || !cardAnswer.trim()) {
      alert("La question et la réponse de la carte ne peuvent pas être vides.");
      return;
    }

    const id = Date.now();
    this.dataService.addCard({
      id,
      question: cardQuestion,
      answer: cardAnswer,
      themeId,
    });
  }

  // Supprimer une catégorie
  deleteCategory(id: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
      this.dataService.deleteCategory(id);
    }
  }

  // Supprimer un thème
  deleteTheme(id: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce thème ?")) {
      this.dataService.deleteTheme(id);
    }
  }

  // Supprimer une carte
  deleteCard(id: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette carte ?")) {
      this.dataService.deleteCard(id);
    }
  }
}
