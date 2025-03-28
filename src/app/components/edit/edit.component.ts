import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Category, Theme, Card } from '../../models';
import { FormsModule } from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  imports: [RouterModule, FormsModule, NgForOf, NgIf]
})

export class EditComponent {
  categories: Category[] = [];
  themes: Theme[] = [];

  constructor(private dataService: DataService) {
    this.dataService.categories$.subscribe((categories) => {
      this.categories = categories;
    });
  }

  addCategory(categoryName: string) {
    if (!categoryName.trim()) {
      alert("Le nom de la catégorie ne peut pas être vide.");
      return;
    }

    const id = Date.now();
    this.dataService.addCategory({ id, name: categoryName, themes: [] });
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

    const id = Date.now();
    this.dataService.addTheme({
      id,
      name: themeName,
      categoryId,
      cards: [],
    });
  }

  addCard(cardQuestion: string, cardAnswer: string, mediaFile: File | null, themeId: number, levelGoal: string) {
    if (!themeId) {
      alert("Veuillez sélectionner un thème.");
      return;
    }

    if (!cardQuestion.trim() || !cardAnswer.trim()) {
      alert("La question et la réponse de la carte ne peuvent pas être vides.");
      return;
    }

    const id = Date.now();

    const media = mediaFile || null;

    this.dataService.addCard({
      id,
      question: cardQuestion,
      answer: cardAnswer,
      media: media,
      spacedRepetition: {
        level: 0,
        nextReviewDate: new Date(),
        isNew: true,
        levelGoal: Number(levelGoal)
      },
      themeId,
    });
  }

  deleteCategory(id: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
      this.dataService.deleteCategory(id);
    }
  }

  deleteTheme(id: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce thème ?")) {
      this.dataService.deleteTheme(id);
    }
  }

  deleteCard(id: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette carte ?")) {
      this.dataService.deleteCard(id);
    }
  }
}
